# Render Deployment Troubleshooting Guide

## ✅ Build Tests Passed
- Backend TypeScript compilation: ✅ 
- Frontend React build: ✅
- All major errors fixed: ✅

## 🔍 Common Render Deployment Issues & Solutions

### 1. **Build Command Issues**
**Problem**: Build fails during deployment
**Solutions**:
- Use the correct build commands in `render.yaml`
- Backend: `cd backend && npm install && npm run build`  
- Frontend: `cd frontend && npm install && npm run build`
- Make sure all dependencies are in `package.json`, not just devDependencies

### 2. **Environment Variables**
**Problem**: App crashes due to missing environment variables
**Required Variables for Backend**:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/EasyShop?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
PAYPAL_CLIENT_ID=your-paypal-client-id
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### 3. **MongoDB Connection Issues**
**Problem**: Cannot connect to database
**Solutions**:
- ❌ Don't use `localhost` MongoDB in production
- ✅ Use MongoDB Atlas (cloud database)
- ✅ Whitelist Render's IP addresses (0.0.0.0/0 for simplicity)
- ✅ Ensure connection string has correct username/password
- ✅ Use connection string format: `mongodb+srv://...`

### 4. **CORS Issues**
**Problem**: Frontend can't connect to backend API
**Solutions**:
- Set `FRONTEND_URL` environment variable correctly
- Update CORS origins in backend code
- Make sure frontend uses correct API base URL

### 5. **Port Configuration**
**Problem**: App doesn't start on correct port
**Solutions**:
- Use `process.env.PORT` (Render provides this)
- Listen on `0.0.0.0` not just `localhost`
- Default fallback port should be 10000 for web services

### 6. **Static File Serving**
**Problem**: Frontend routes don't work (404 errors)
**Solutions**:
- Use proper static site configuration
- Set up SPA (Single Page Application) routing
- Configure fallback to `index.html` for all routes

### 7. **Memory/Resource Issues**
**Problem**: Build runs out of memory
**Solutions**:
- Use Free tier limits wisely
- Optimize bundle size
- Use code splitting for large applications

## 📝 Step-by-Step Deployment Process

### Backend Deployment:
1. **Create Web Service** on Render
2. **Connect GitHub** repository
3. **Configure Build Settings**:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Environment: Node
4. **Set Environment Variables** (all required ones above)
5. **Deploy**

### Frontend Deployment:
1. **Create Static Site** on Render
2. **Connect same GitHub** repository
3. **Configure Build Settings**:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
4. **Configure Routing** for SPA
5. **Deploy**

### Database Setup (MongoDB Atlas):
1. Create MongoDB Atlas account
2. Create new cluster (free tier available)
3. Create database user
4. Get connection string
5. Add to `MONGODB_URI` environment variable

## 🚨 Emergency Checklist

If deployment fails, check:
- [ ] All environment variables are set correctly
- [ ] MongoDB Atlas is configured and accessible
- [ ] Build commands are correct
- [ ] Dependencies are properly listed in package.json
- [ ] CORS is configured for your frontend domain
- [ ] Health endpoint returns 200: `/health`
- [ ] Logs don't show any critical errors

## 🔗 Testing Your Deployment

1. **Backend Health Check**: 
   ```
   GET https://your-backend-app.onrender.com/health
   ```
   Should return: `{"success": true, "message": "Server is healthy"}`

2. **API Endpoints**:
   ```
   GET https://your-backend-app.onrender.com/api/products
   ```

3. **Frontend**:
   - Check if site loads: `https://your-frontend-app.onrender.com`
   - Test navigation and API calls

## 📞 Support

If you're still having issues:
1. Check Render's deployment logs
2. Check application logs for errors
3. Test locally with production environment variables
4. Verify all external services (MongoDB Atlas, PayPal) are working

## 🎯 Success Indicators

Your deployment is successful when:
- ✅ Health endpoint returns 200
- ✅ Frontend loads without errors
- ✅ Can create account and sign in
- ✅ Can view products
- ✅ Can add items to cart
- ✅ API calls work between frontend and backend
