# Render Deployment Environment Variables

## Backend Service Environment Variables

Set these in your Render service dashboard:

### Required Variables:
- `NODE_ENV=production`
- `PORT=10000` (Render assigns this automatically)
- `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/EasyShop?retryWrites=true&w=majority`
- `JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random-for-production`
- `PAYPAL_CLIENT_ID=your-paypal-client-id-from-developer-console`
- `FRONTEND_URL=https://your-frontend-app.onrender.com`

### Optional Variables:
- `PAYPAL_CLIENT_SECRET=your-paypal-client-secret`
- `JWT_EXPIRES_IN=30d`

## MongoDB Atlas Setup (Required for Production)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get the connection string
5. Replace `<username>`, `<password>`, and `<dbname>` in the connection string
6. Add the connection string to `MONGODB_URI` in Render

## Deployment Steps:

1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Create a new Web Service
4. Set build command: `cd backend && npm install && npm run build`
5. Set start command: `cd backend && npm start`
6. Add all environment variables in the dashboard
7. Deploy!

## Frontend Deployment:

1. Create a new Static Site on Render
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/dist`
4. Deploy!

## Common Issues:

1. **MongoDB Connection**: Use MongoDB Atlas, not local MongoDB
2. **CORS Issues**: Make sure FRONTEND_URL matches your frontend domain
3. **Build Failures**: Check that all dependencies are in package.json
4. **Environment Variables**: Double-check all required env vars are set
5. **Port Issues**: Use process.env.PORT in production

## Testing Deployment:

1. Check health endpoint: `https://your-backend-app.onrender.com/health`
2. Test API endpoints
3. Verify frontend can connect to backend
