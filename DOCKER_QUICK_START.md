# 🐳 **Docker Deployment - Quick Start Guide**

## ✅ **What We've Created:**

1. **Backend Dockerfile** - Containerizes your Node.js/Express API
2. **Frontend Dockerfile** - Containerizes your React app with Nginx
3. **Docker Compose** - Orchestrates all services (Frontend, Backend, MongoDB)
4. **Environment Configuration** - Secure environment variables setup
5. **Deployment Scripts** - Easy deployment commands

## 🚀 **How to Deploy:**

### **Step 1: Set Environment Variables**
1. Copy `.env.docker` to `.env`
2. Update these important values:
   ```
   JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
   PAYPAL_CLIENT_ID=your-paypal-client-id-from-developer-console
   MONGO_PASSWORD=change-this-password
   ```

### **Step 2: Deploy (Choose One Method)**

**Method A - Using Docker Compose:**
```bash
docker-compose up --build -d
```

**Method B - Using NPM:**
```bash
npm run docker:deploy
```

**Method C - Using Script (Windows):**
```bash
deploy.bat
```

### **Step 3: Access Your App**
- **Website**: http://localhost (Port 80)
- **API**: http://localhost:5000
- **Database**: localhost:27017

## 🔧 **Useful Commands:**

```bash
# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Restart
docker-compose restart

# View running containers
docker-compose ps
```

## 🌐 **Cloud Deployment Options:**

### **1. DigitalOcean Droplet**
1. Create a droplet with Docker pre-installed
2. Upload your code
3. Run: `docker-compose -f docker-compose.prod.yml up -d`

### **2. AWS EC2**
1. Launch EC2 instance
2. Install Docker and Docker Compose
3. Clone your repo and run Docker commands

### **3. Google Cloud Run**
1. Build images: `docker build -t gcr.io/PROJECT_ID/ecommerce-backend ./backend`
2. Push: `docker push gcr.io/PROJECT_ID/ecommerce-backend`
3. Deploy: `gcloud run deploy --image gcr.io/PROJECT_ID/ecommerce-backend`

### **4. Heroku Container Registry**
```bash
heroku container:login
heroku create your-app-name
heroku container:push web --app your-app-name
heroku container:release web --app your-app-name
```

## 🐛 **Troubleshooting:**

**If containers won't start:**
```bash
docker-compose down --volumes
docker-compose up --build -d
```

**If database connection fails:**
- Check MongoDB logs: `docker-compose logs mongodb`
- Verify MONGODB_URI in .env file

**If frontend can't reach backend:**
- Check nginx configuration in `frontend/nginx.conf`
- Verify API proxy settings

## 🎯 **Benefits of This Docker Setup:**

✅ **Consistent Environment** - Works the same everywhere
✅ **Easy Deployment** - One command deployment
✅ **Scalable** - Can easily add load balancers, caching, etc.
✅ **Isolated** - Each service runs in its own container
✅ **Production Ready** - Includes Nginx, MongoDB, security headers

Your app is now fully containerized and ready for deployment on any cloud platform! 🎉
