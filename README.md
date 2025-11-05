
Monorepo: **FastAPI (backend)** + **React/Vite/TS (frontend)** + **PostgreSQL** using Docker Compose.

## Быстрый старт

```bash
cp .env.example .env
docker compose up --build -d
```

- Frontend: http://localhost:5173  
- API docs: http://localhost:8000/docs

## Стуктура
```
backend/   # FastAPI app
frontend/  # React + Vite + TypeScript
docker-compose.yml
.env.example
```

## Команды
```bash
# stop
docker compose down
# logs
docker compose logs -f backend
docker compose logs -f frontend
```


