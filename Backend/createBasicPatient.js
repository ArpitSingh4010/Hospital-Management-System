import mongoose from 'mongoose';
import User from './model/userSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

async function createBasicPatient() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Basic patient data
    const patientData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      phone: '9876543210',
      aadharNumber: '123456789012',
      dob: new Date('1990-05-15'),
      gender: 'Male',
      password: 'password123',
      role: 'Patient'
    };

    // Check if patient already exists
    const existingPatient = await User.findOne({ email: patientData.email });
    
    if (existingPatient) {
      console.log('✅ Patient already exists:', {
        email: patientData.email,
        name: `${existingPatient.firstName} ${existingPatient.lastName}`,
        role: existingPatient.role
      });
    } else {
      // Create patient
      const patient = new User(patientData);
      await patient.save();
      
      console.log('✅ Basic patient created successfully:');
      console.log({
        name: `${patientData.firstName} ${patientData.lastName}`,
        email: patientData.email,
        phone: patientData.phone,
        password: patientData.password,
        role: patientData.role
      });
    }

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createBasicPatient();