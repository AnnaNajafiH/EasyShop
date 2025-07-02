# Docker Deployment Guide

## Prerequisites
- install Docker Compose 

## Quick Start

### 1. Clone and Navigate
```bash
git clone <my-repo-url>
cd ecommerce
```

### 2. Set Environment Variables
Copy `.env.docker` to `.env` and update the values:
```bash
cp .env.docker .env
```

Update the following in `.env`:
- `JWT_SECRET`: Generate a strong secret key
- `PAYPAL_CLIENT_ID`: Get from PayPal Developer Console
- `MONGO_PASSWORD`: Change the default password

### 3. Deploy with Docker

#### Option A: Using Docker Compose
```bash
docker-compose up --build -d
```

#### Option B: Using NPM Scripts
```bash
npm run docker:deploy
```

#### Option C: Using Deployment Scripts
**Windows:**
```bash
deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## Access Your Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## Useful Commands

### View Logs
```bash
docker-compose logs -f
```

### Stop Application
```bash
docker-compose down
```

### Rebuild and Restart
```bash
docker-compose up --build -d
```

### View Running Containers
```bash
docker-compose ps
```

## Production Deployment

### 1. Use Production Docker Compose
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### 2. Environment Variables for Production
Set these environment variables in your production environment:
- `MONGODB_URI`
- `JWT_SECRET`
- `PAYPAL_CLIENT_ID`
- `MONGO_USERNAME`
- `MONGO_PASSWORD`

## Troubleshooting

### Container Issues
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Restart specific service
docker-compose restart backend
```

### Database Issues
```bash
# Connect to MongoDB container
docker exec -it ecommerce-mongodb mongo

# Reset database
docker-compose down -v
docker-compose up --build -d
```

### Build Issues
```bash
# Clean rebuild
docker-compose down --rmi all --volumes
docker-compose up --build -d
```

## Deployment Platforms

### AWS/DigitalOcean/Azure
1. Upload your project to your server
2. Install Docker and Docker Compose
3. Set environment variables
4. Run: `docker-compose -f docker-compose.prod.yml up -d`

### Heroku Container Registry
```bash
# Login to Heroku
heroku login
heroku container:login

# Create app
heroku create your-app-name

# Push and release
heroku container:push web --app your-app-name
heroku container:release web --app your-app-name
```
