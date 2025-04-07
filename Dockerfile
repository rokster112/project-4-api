# Step 1: Build the frontend (React)
FROM node:16 AS frontend

# Set the working directory for frontend
WORKDIR /app

# Copy all necessary files to the container
COPY client/ ./client/

# Install dependencies
RUN cd client && npm install

# Build frontend
RUN cd client && npm run build

# Step 2: Setup the Backend (Django/Python)
FROM python:3.10-slim AS backend

# Set the working directory for backend
WORKDIR /app

# Install dependencies for the backend (Django, etc.)
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy backend Pipfile and Pipfile.lock
COPY Pipfile Pipfile.lock /app/

# Install Python dependencies (Pipenv)
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

# Copy the rest of the backend files
COPY . /app/

# Expose the backend port
EXPOSE 8000

# Run the backend server
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]

# Step 3: Setup Nginx to Serve the Frontend Build (Static files)
FROM nginx:alpine AS nginx

# Copy the build from frontend
COPY --from=frontend /app/client/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the Nginx port
EXPOSE 80

# Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
