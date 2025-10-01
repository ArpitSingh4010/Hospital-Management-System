import mongoose from 'mongoose';
import User from './model/userSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

async function resetAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Delete existing admin user
    const deletedAdmin = await User.findOneAndDelete({ email: 'admin@example.com' });
    if (deletedAdmin) {
      console.log('Existing admin user deleted');
    }

    // Create fresh admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      phone: '1234567890',
      aadharNumber: '123456789012',
      dob: new Date('1990-01-01'),
      gender: 'Male',
      password: 'Admin@12345',
      role: 'Admin'
    });

    await adminUser.save();
    console.log('Fresh admin user created successfully');
    
    // Test password validation immediately
    const testAdmin = await User.findOne({ email: 'admin@example.com' }).select('+password');
    const isPasswordValid = await testAdmin.isPasswordValid('Admin@12345');
    console.log('Password validation test:', isPasswordValid);

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

resetAdminUser();