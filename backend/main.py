from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import List, Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
# from passlib.context import CryptContext
import bcrypt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Funkce, která nám "půjčí" spojení s databází pro každý požadavek
def get_session():
    with Session(engine) as session:
        yield session

# --- MODEL (Tabulka v DB i Schéma pro API v jednom) ---
class Article(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = ""
    excerpt: str = ""
    content: str = ""  # Celý text článku
    category: str = ""
    date: str = ""
    image: str = ""
    is_premium: bool = False

SECRET_KEY = "tvoje-velmi-tajne-heslo" # V produkci pak změň!
ALGORITHM = "HS256"
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    is_admin: bool = False
    has_premium: bool = False

def get_password_hash(password: str):
    # Převedeme heslo na bajty, vygenerujeme sůl a zahashujeme
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')  # Uložíme jako string

def verify_password(plain_password: str, hashed_password: str):
    # Porovnáme čisté heslo se zahashovaným v DB
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_enc = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_byte_enc, hashed_password_enc)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7) # Token platí týden
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Port tvého Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.on_event("startup")
# def on_startup():
#     create_db_and_tables()

# --- ENDPOINTY ---

@app.get("/api/articles", response_model=List[Article])
def get_articles(session: Session = Depends(get_session)):
    # Načteme všechny články z databáze
    articles = session.exec(select(Article)).all()
    return articles

@app.post("/api/articles", response_model=Article)
def create_article(article: Article, session: Session = Depends(get_session)):
    # Uložíme nový článek do databáze
    session.add(article)
    session.commit()
    session.refresh(article)
    return article


# --- TENTO BLOK MOŽNÁ CHYBÍ NEBO JE CHYBNĚ ---

@app.get("/api/articles/{article_id}", response_model=Article)
def get_article(article_id: int, session: Session = Depends(get_session)):
    # session.get najde jeden konkrétní záznam podle ID
    article = session.get(Article, article_id)

    if not article:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Článek nenalezen")

    return article


@app.delete("/api/articles/{article_id}")
def delete_article(article_id: int, session: Session = Depends(get_session)):
    article = session.get(Article, article_id)
    if not article:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Článek nenalezen")
    session.delete(article)
    session.commit()
    return {"ok": True}


@app.get("/api/payment-info")
def get_payment_info():
    bank_account = "123456789/0100"  # Tvůj účet
    price = 490  # Cena v CZK
    message = "Premium_Fyzio"

    # Generátor QR kódu (použijeme veřejné API pro jednoduchost)
    qr_url = f"https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=123456789&bankCode=0100&amount={price}&currency=CZK&vs=123&message={message}"

    return {
        "account": bank_account,
        "price": price,
        "qr_code_url": qr_url,
        "instructions": "Po zaplacení mi pošlete email na info@fyzio.cz a já vám aktivuji přístup."
    }

@app.post("/api/users/{user_id}/toggle-premium")
def toggle_premium(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404)
    user.has_premium = not user.has_premium
    session.add(user)
    session.commit()
    return {"status": "updated", "has_premium": user.has_premium}


@app.post("/api/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    # Najdeme uživatele podle emailu (form_data.username)
    statement = select(User).where(User.email == form_data.username)
    user = session.exec(statement).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Špatný email nebo heslo")

    # Vytvoříme token
    access_token = create_access_token(data={"sub": user.email, "is_admin": user.is_admin})

    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/register")
def register(user: User, session: Session = Depends(get_session)):
    # Zkontrolujeme, jestli už email existuje
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email je již zaregistrován")

    # Zašifrujeme heslo (v 'user' objektu přijde v čistém textu)
    user.hashed_password = get_password_hash(user.hashed_password)
    user.is_admin = False  # Pro jistotu, aby se nikdo neregistroval jako admin
    user.has_premium = False

    session.add(user)
    session.commit()
    session.refresh(user)
    return {"message": "Uživatel vytvořen", "email": user.email}

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    with Session(engine) as session:
        # Zkontrolujeme, jestli už admin existuje
        admin_exists = session.exec(select(User).where(User.email == "admin@fyzio.cz")).first()
        if not admin_exists:
            admin = User(
                email="admin@fyzio.cz",
                hashed_password=get_password_hash("mojeheslo123"), # Tady si dej své heslo
                is_admin=True
            )
            session.add(admin)
            session.commit()
            print("--- ADMIN VYTVOŘEN (admin@fyzio.cz / mojeheslo123) ---")