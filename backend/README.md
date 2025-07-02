# 🛍️ E-commerce Backend API

A modern, production-ready e-commerce backend built with TypeScript, Express.js, and MongoDB.

## 🚀 Features

- **TypeScript** - Type-safe backend development
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - Document database with Mongoose ODM
- **Docker** - Containerized MongoDB for consistent development
- **Security** - Helmet, CORS, rate limiting, input validation
- **Performance** - Compression, connection pooling, optimized queries
- **Logging** - Winston logger with Morgan HTTP logging
- **Error Handling** - Global error handling with custom middleware

## 📦 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Docker)
- **ODM**: Mongoose with Typegoose
- **Security**: Helmet, express-rate-limit
- **Validation**: Joi, express-validator
- **Authentication**: JWT, bcrypt
- **Logging**: Winston, Morgan

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16+)
- Docker
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB container**
   ```bash
   npm run docker:mongo
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run build:watch` - Build with watch mode
- `npm run clean` - Remove build directory
- `npm run docker:mongo` - Start MongoDB Docker container
- `npm run docker:mongo:start` - Start existing MongoDB container
- `npm run docker:mongo:stop` - Stop MongoDB container
- `npm run seed` - Seed database with sample data

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product by slug

### Users
- `POST /api/users/signin` - User login
- `POST /api/users/signup` - User registration
- `GET /api/users/profile` - Get user profile (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/history` - Get user order history (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

### Utility
- `GET /api/seed` - Seed database with sample data
- `GET /health` - Health check endpoint
- `GET /api/key/paypal` - Get PayPal client ID

## 🔐 Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/EasyShop

# JWT Configuration
JWT_SECRET=your-secret-key

# PayPal Configuration
PAYPAL_CLIENT_ID=your-paypal-client-id

# Server Configuration
PORT=5000
NODE_ENV=development
```

## 🐳 Docker Commands

```bash
# Start MongoDB container
docker run --name easyShop -d -p 27017:27017 mongo:7.0

# Check container status
docker ps

# View container logs
docker logs easyShop

# Stop container
docker stop easyShop

# Start existing container
docker start easyShop
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection
│   ├── data/
│   │   └── data.ts              # Sample data
│   ├── middleware/
│   │   ├── errorHandler.ts     # Error handling
│   │   ├── rateLimiter.ts       # Rate limiting
│   │   └── validation.ts       # Input validation
│   ├── models/
│   │   ├── productModel.ts     # Product schema
│   │   ├── userModel.ts        # User schema
│   │   └── orderModel.ts       # Order schema
│   ├── routers/
│   │   ├── productRouter.ts    # Product routes
│   │   ├── userRouter.ts       # User routes
│   │   ├── orderRouter.ts      # Order routes
│   │   ├── seedRouter.ts       # Seed routes
│   │   └── keyRouter.ts        # API key routes
│   ├── utils/
│   │   ├── logger.ts           # Winston logger
│   │   └── utils.ts            # Utility functions
│   └── index.ts                # Main application file
├── build/                      # Compiled JavaScript
├── .env                        # Environment variables
├── .env.example               # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Security Features

- **Helmet** - Sets security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Validates request data
- **Password Hashing** - bcrypt for password security
- **JWT Authentication** - Secure token-based auth

## 🚀 Deployment

The backend is ready for deployment to platforms like:
- Heroku
- Render
- AWS EC2
- DigitalOcean
- Vercel

For production deployment:
1. Set `NODE_ENV=production`
2. Use a cloud MongoDB service (MongoDB Atlas)
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use HTTPS

## 📝 License

This project is licensed under the ISC License.
