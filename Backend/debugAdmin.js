import User from './model/userSchema.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
    
    const admin = await User.findOne({ email: 'admin@example.com' }).select('+password');
    if (admin) {
      console.log('Admin found:', {
        email: admin.email,
        role: admin.role,
        hasPassword: !!admin.password,
        passwordLength: admin.password ? admin.password.length : 0
      });
      
      // Test password validation
      const testPassword = 'Admin@12345';
      const isValid = await admin.isPasswordValid(testPassword);
      console.log('Password validation result:', isValid);
    } else {
      console.log('Admin not found');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkAdmin();