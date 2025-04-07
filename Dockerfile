# FROM node:16 AS frontend
# WORKDIR /app/frontend
# COPY client/package*.json ./
# RUN npm install
# RUN npm run build
# FROM python:3.10-slim AS backend
# WORKDIR /app
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libpq-dev \
#     && rm -rf /var/lib/apt/lists/*
# COPY Pipfile Pipfile.lock /app/
# RUN pip install pipenv && pipenv install --deploy --ignore-pipfile
# COPY . /app/
# COPY --from=frontend /app/frontend/build /app/static
# ENV PYTHONUNBUFFERED 1
# EXPOSE 8000
# CMD ["pipenv", "run", "gunicorn", "--bind", "0.0.0.0:8000", "project.wsgi:application"]

# Step 1: Build the Frontend
FROM node:16 AS frontend

# Set working directory for frontend (inside /app)
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY client/package*.json ./client/

# Install frontend dependencies
RUN cd client && npm install

# Build the frontend assets (React, Vue, etc.)
RUN cd client && npm run build

# Step 2: Setup the Backend (Django/Python)
FROM python:3.10 AS backend

# Set working directory for the backend
WORKDIR /app

# Install system dependencies for Python/Django (like libpq-dev for PostgreSQL)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the Pipfile and Pipfile.lock for pipenv installation
COPY Pipfile Pipfile.lock /app/

# Install Python dependencies using pipenv
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

# Copy the entire project to the backend working directory
COPY . /app/

# Copy the build frontend files into the Django static directory (adjust the path if needed)
COPY --from=frontend /app/client/build /app/static

# Set environment variable for Python (unbuffered output)
ENV PYTHONUNBUFFERED 1

# Expose port 8000 for the Django application
EXPOSE 8000

# Command to run the application (use Gunicorn for production)
CMD ["pipenv", "run", "gunicorn", "--bind", "0.0.0.0:8000", "project.wsgi:application"]
