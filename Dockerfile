# =========== Сборка FRONTEND (React) ===========
FROM node:18 AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# =========== Сборка BACKEND (Django) ===========
FROM python:3.11 AS backend
WORKDIR /app
RUN apt-get update && apt-get upgrade -y

# Копируем backend зависимости
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install gunicorn

# Копируем backend код
COPY backend/ /app/

# Копируем frontend билд в backend
COPY --from=frontend /frontend/dist /app/static/

# Открываем порт Django
EXPOSE 8000

# Запускаем сервер
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]