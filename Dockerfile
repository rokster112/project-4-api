# Step 1: Build the React frontend
FROM node:16 AS frontend

WORKDIR /app
COPY client/ ./client/
RUN cd client && npm install && npm run build

# Step 2: Backend with Django & pipenv
FROM python:3.10-slim AS backend

WORKDIR /app

# Install system packages
RUN apt-get update && apt-get install -y build-essential libpq-dev curl && rm -rf /var/lib/apt/lists/*

# Install pipenv
RUN pip install pipenv

# Copy only Pipfiles first for caching
COPY Pipfile Pipfile.lock ./
RUN pipenv install --deploy --ignore-pipfile

# Copy backend code
COPY . .

# Step 3: Final Stage – Unified container with NGINX, backend, and static files
FROM python:3.10-slim

WORKDIR /app

# Install NGINX and other dependencies
RUN apt-get update && \
    apt-get install -y nginx curl build-essential libpq-dev && \
    pip install pipenv && \
    rm -rf /var/lib/apt/lists/*

# Copy backend + install deps
COPY --from=backend /app /app

# Copy frontend build into nginx
COPY --from=frontend /app/client/build /var/www/html/

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/sites-available/default
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled

# Make sure static dir exists
RUN mkdir -p /var/www/html

# Expose port
EXPOSE 80

# Start both backend and nginx
CMD sh -c "pipenv run python manage.py migrate && pipenv run python manage.py runserver 0.0.0.0:8000 & nginx -g 'daemon off;'"
