import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/EasyShop";
    
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 Connection URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    mongoose.set('strictQuery', true);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      // Add connection options for better performance
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      retryWrites: true,
      w: 'majority'
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('📡 Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📵 Mongoose disconnected from DB');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Mongoose reconnected to DB');
    });

    // Close connection on app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 Mongoose connection closed due to app termination');
      process.exit(0);
    });

  } catch (error: any) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.error('💡 Troubleshooting tips:');
    console.error('   1. Check your MONGODB_URI in .env file');
    console.error('   2. Ensure MongoDB Docker container is running: docker ps');
    console.error('   3. Restart MongoDB container: docker restart easyShop');
    console.error('   4. Check Docker logs: docker logs easyShop');
    
    process.exit(1);
  }
};

export default connectDB;
