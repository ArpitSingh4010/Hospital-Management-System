import mongoose from 'mongoose';
import User from './model/userSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

async function testAdminLogin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // First, let's recreate the admin with a fresh password
    await User.findOneAndDelete({ email: 'admin@example.com' });
    console.log('Deleted existing admin if any');

    // Create new admin
    const admin = await User.create({
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
    
    console.log('Admin created successfully');

    // Now test the exact login flow
    const testEmail = 'admin@example.com';
    const testPassword = 'Admin@12345';
    const testRole = 'Admin';

    console.log('Testing login with:', { email: testEmail, role: testRole });

    // Find user
    const user = await User.findOne({ email: testEmail }).select("+password");
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    console.log('✅ User found:', { email: user.email, role: user.role });

    // Test password
    const isPasswordMatched = await user.isPasswordValid(testPassword);
    console.log('Password validation result:', isPasswordMatched);

    // Test role
    if (user.role !== testRole) {
      console.log('❌ Role mismatch:', { userRole: user.role, requestedRole: testRole });
      return;
    }
    console.log('✅ Role matches');

    if (isPasswordMatched) {
      console.log('🎉 LOGIN WOULD SUCCEED - All checks passed!');
    } else {
      console.log('❌ LOGIN WOULD FAIL - Password validation failed');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAdminLogin();