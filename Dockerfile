# ========== СТАДИЯ 1: СОЗДАНИЕ FRONTEND (React) ===========
FROM node:23 AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ========== СТАДИЯ 2: СОЗДАНИЕ BACKEND (Django) ===========
FROM python:3.11 AS backend
WORKDIR /app
#COPY .env /app/.env
RUN apt-get update && apt-get upgrade -y
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install gunicorn

# Копируем код бэкенда в контейнер
COPY backend/ /app/backend

# Копируем собранный фронтенд из контейнера frontend в статическую директорию Django
COPY --from=frontend /frontend/ /app/frontend

# Открываем порт для Django
EXPOSE 8000

# Установить переменную окружения для Django
ENV DJANGO_SETTINGS_MODULE=backend.backend.settings


# Запускаем сервер Gunicorn для Django
CMD ["gunicorn", "backend.backend.wsgi:application", "--bind", "0.0.0.0:8000"]
