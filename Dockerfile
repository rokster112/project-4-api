FROM node:16 AS frontend
WORKDIR /app/frontend
COPY client/package*.json ./
RUN npm install
RUN npm run build
FROM python:3.10-slim AS backend
WORKDIR /app
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
COPY Pipfile Pipfile.lock /app/
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile
COPY . /app/
COPY --from=frontend /app/frontend/build /app/static
ENV PYTHONUNBUFFERED 1
EXPOSE 8000
CMD ["pipenv", "run", "gunicorn", "--bind", "0.0.0.0:8000", "project.wsgi:application"]
