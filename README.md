# react-express-mesto-full

**Node.js:** 18.18.0+

Mesto — интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки

Full-stack репозиторий проекта `Mesto`: React (frontend) + Express/MongoDB (backend)

## Функционал

- Регистрация и авторизация пользователя
- Получение данных о пользователях (все / один / текущий)
- Редактирование профиля и аватара
- Создание, просмотр и удаление карточек
- Лайки карточек


## Стек технологий

- Frontend: React, React Router, Vite
- Backend: Node.js, Express, MongoDB, Mongoose
- Авторизация и безопасность: JWT, httpOnly cookies, CSRF protection, Helmet, CORS
- Валидация и тесты: Joi, Jest, Supertest, Vitest, Testing Library

---

## Локальный запуск

### Требования

- Node.js 18+
- MongoDB (локально или удалённый инстанс)

### 1. Backend

```bash
cd backend
npm install
cp .env_example .env
npm run dev
```

Сервер запустится на `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

По умолчанию CRA стартует на `http://localhost:3000`. Если порт занят backend-ом, React предложит другой порт (например `3001`)

### 3. Переменные окружения

**Backend** (`backend/.env`):

| Переменная | Описание | Пример |
|---|---|---|
| `PORT` | Порт API | `3000` |
| `MONGO_URL` | Строка подключения MongoDB | `mongodb://127.0.0.1:27017/mestodb` |
| `JWT_SECRET` | Секрет для JWT (обязателен) | произвольная строка |
| `NODE_ENV` | Режим работы | `development` для локальной разработки |
| `CORS_ORIGINS` | Разрешённые origins в production (через запятую) | `https://example.com` |

**Frontend** (`frontend/.env`):

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_API_URL` | URL backend API | `http://localhost:3000` |

> **Важно:** для локальной разработки в backend используйте `NODE_ENV=development`.  
> В этом режиме CORS автоматически разрешает запросы с любого `localhost:*`.  
> В production обязательно задайте `CORS_ORIGINS`, иначе браузерные запросы с frontend-домена будут заблокированы.  
> Авторизация работает через httpOnly cookie — после изменения `.env` перезапустите оба сервера.

---

## Структура проекта

```
backend/          — Express API, MongoDB, JWT, middleware
frontend/         — React SPA, роутинг, hooks (useAuth, useCards, usePopups)
.github/workflows — CI-тесты и деплой frontend
```

---

## Деплой frontend

Деплой выполняется через GitHub Actions (workflow `Deploy Frontend`, ручной запуск)

Необходимые secrets в репозитории:

| Secret | Описание |
|---|---|
| `VITE_API_URL` | URL production API |
| `DEPLOY_HOST` | IP или домен сервера |
| `DEPLOY_USER` | SSH-пользователь |
| `DEPLOY_PATH` | Путь к папке frontend на сервере |
| `DEPLOY_SSH_KEY` | Приватный SSH-ключ |

---

## English

**Mesto** — an interactive page where you can add photos, delete them, and like them

**Features:** user registration & login, profile editing, CRUD for photo cards, likes


**Local setup:**

1. `cd backend && npm install && cp .env_example .env && npm run dev`
2. `cd frontend && npm install && cp .env.example .env && npm start`
3. Set `VITE_API_URL=http://localhost:3000` in `frontend/.env`
4. Set `NODE_ENV=development` in `backend/.env` for local CORS and cookies

**Deploy:** GitHub Actions workflow with SSH secrets (see table above)
