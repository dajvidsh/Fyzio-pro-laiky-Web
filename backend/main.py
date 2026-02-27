from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import List, Optional

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
    title: str
    excerpt: str
    category: str
    date: str
    image: str
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Port tvého Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

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