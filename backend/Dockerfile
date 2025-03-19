#python version
FROM python:3.11

RUN apt-get update
RUN apt-get upgrade


#define work directory
WORKDIR /app

# copy dependencies
#COPY /backend/requirements.txt /app/

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install gunicorn


# copy project to app
COPY backend/ /app/

# define django port
EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]

