import mongoose from 'mongoose';
import User from './model/userSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com', role: 'Admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', {
        email: 'admin@example.com',
        name: `${existingAdmin.firstName} ${existingAdmin.lastName}`
      });
    } else {
      // Create admin user
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
      console.log('Admin user created successfully:', {
        email: 'admin@example.com',
        password: 'Admin@12345',
        role: 'Admin'
      });
    }

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdminUser();