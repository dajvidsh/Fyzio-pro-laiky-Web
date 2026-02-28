from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import List, Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
# from passlib.context import CryptContext
import bcrypt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import os
from typing import Optional

DATABASE_PATH = os.getenv("DATABASE_PATH", "database.db")
sqlite_url = f"sqlite:///{DATABASE_PATH}"

# Vytvoření složky, pokud neexistuje (pro Render Disk)
db_dir = os.path.dirname(DATABASE_PATH)
if db_dir and not os.path.exists(db_dir):
    os.makedirs(db_dir, exist_ok=True)

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})
PORT = int(os.getenv("PORT", 8000))

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

SECRET_KEY = os.getenv("SECRET_KEY", "vyvojarske-heslo-pro-lokal")
ALGORITHM = "HS256"

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "mojeheslo123")
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
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
        "http://10.0.1.54:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.on_event("startup")
# def on_startup():
#     create_db_and_tables()

# --- ENDPOINTY ---

# Funkce, která ověří token a vrátí uživatele (nebo vyhodí chybu)
def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Neplatný token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Neplatný token")

    user = session.exec(select(User).where(User.email == email)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Uživatel neexistuje")
    return user


# Funkce, která ověří, jestli je uživatel ADMIN
def get_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Nemáte dostatečná oprávnění")
    return current_user

@app.get("/api/articles", response_model=List[Article])
def get_articles(session: Session = Depends(get_session)):
    # Načteme všechny články z databáze
    articles = session.exec(select(Article)).all()
    return articles

@app.post("/api/articles", response_model=Article)
def create_article(article: Article, session: Session = Depends(get_session), admin: User = Depends(get_admin_user)):
    # Uložíme nový článek do databáze
    session.add(article)
    session.commit()
    session.refresh(article)
    return article


# --- TENTO BLOK MOŽNÁ CHYBÍ NEBO JE CHYBNĚ ---
from fastapi import Request


# 1. Tato funkce zkusí přečíst token, ale pokud tam není, nevyhodí chybu
async def get_optional_user(request: Request, session: Session = Depends(get_session)):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email:
            return session.exec(select(User).where(User.email == email)).first()
    except:
        return None
    return None

# Získání info o aktuálně přihlášeném uživateli
@app.get("/api/me", response_model=User)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Změna hesla
class PasswordChange(SQLModel):
    new_password: str

@app.post("/api/change-password")
def change_password(
    data: PasswordChange,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    current_user.hashed_password = get_password_hash(data.new_password)
    session.add(current_user)
    session.commit()
    return {"message": "Heslo bylo úspěšně změněno"}


# 2. Samotný endpoint článku
@app.get("/api/articles/{article_id}", response_model=Article)
def get_article(
        article_id: int,
        session: Session = Depends(get_session),
        current_user: Optional[User] = Depends(get_optional_user)  # TADY JE TA ZMĚNA
):
    article = session.get(Article, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Článek nenalezen")

    # Pokud je článek Premium, zkontrolujeme práva
    if article.is_premium:
        # Pustíme dál jen pokud je uživatel Admin nebo má zaplacené Premium
        is_admin = current_user and current_user.is_admin
        has_paid = current_user and current_user.has_premium

        if not is_admin and not has_paid:
            raise HTTPException(
                status_code=402,  # Payment Required
                detail="Tento obsah vyžaduje Premium členství."
            )

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

@app.get("/api/users", response_model=List[User])
def get_users(
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user)
):
    # Tento příkaz vytáhne úplně všechny uživatele z databáze
    users = session.exec(select(User)).all()
    return users

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
        admin_exists = session.exec(select(User).where(User.email == "admin@fyzio.cz")).first()
        if not admin_exists:
            admin = User(
                email="admin@fyzio.cz",
                hashed_password=get_password_hash(ADMIN_PASSWORD), # Použije heslo z ENV nebo default
                is_admin=True
            )
            session.add(admin)
            session.commit()
            print("--- ADMIN PŘIPRAVEN ---")