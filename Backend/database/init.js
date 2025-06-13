import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile-management';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    trim: true,
    default: ''
  },
  pincode: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  collection: 'users'
});

const profileUpdateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  workflowId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'started', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true,
  collection: 'profile_updates'
});

// Create Models
export const User = mongoose.model('User', userSchema);
export const ProfileUpdate = mongoose.model('ProfileUpdate', profileUpdateSchema);

// Database connection
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    await mongoose.connect(MONGODB_URI, options);
    
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 MongoDB disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
      isConnected = true;
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    isConnected = false;
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    await connectToDatabase();
    
    // Create indexes for better performance
    await User.createIndexes();
    await ProfileUpdate.createIndexes();
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (isConnected) {
    await mongoose.connection.close();
    console.log('📡 MongoDB connection closed through app termination');
    process.exit(0);
  }
});

// Database helper functions
export const db = {
  // User operations
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  },

  async findUserByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  },

  async findUserById(id) {
    return await User.findById(id);
  },

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true, runValidators: true }
    );
  },

  // Profile update operations
  async createProfileUpdate(updateData) {
    const profileUpdate = new ProfileUpdate(updateData);
    return await profileUpdate.save();
  },

  async findProfileUpdateByWorkflowId(workflowId) {
    return await ProfileUpdate.findOne({ workflowId });
  },

  async updateProfileUpdateStatus(workflowId, status) {
    return await ProfileUpdate.findOneAndUpdate(
      { workflowId },
      { $set: { status } },
      { new: true }
    );
  }
};