@echo off
echo 🚀 Building and starting Ecommerce application with Docker...

echo 🛑 Stopping existing containers...
docker-compose down

echo 🗑️ Removing old images...
docker-compose down --rmi all --volumes --remove-orphans

echo 🔨 Building and starting services...
docker-compose up --build -d

echo 📊 Container status:
docker-compose ps

echo ✅ Application should be available at:
echo    Frontend: http://localhost
echo    Backend API: http://localhost:5000
echo    MongoDB: localhost:27017

echo 📝 To view logs, run: docker-compose logs -f
echo 🛑 To stop, run: docker-compose down

pause
