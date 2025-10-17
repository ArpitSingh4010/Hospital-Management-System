import User from './model/userSchema.js';
import { Appointment } from './model/appointmentSchema.js';
import Message from './model/message.js';
import { dbConnection } from './database/dbConnection.js';
import { config } from 'dotenv';

// Load environment variables
config({ path: "./config/config.env" });

// Sample patient data
export const samplePatients = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "9876543210",
    aadharNumber: "123456789012",
    dob: new Date("1990-05-15"),
    gender: "Male",
    password: "password123",
    role: "Patient"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@email.com",
    phone: "9876543211",
    aadharNumber: "123456789013",
    dob: new Date("1985-08-22"),
    gender: "Female",
    password: "password123",
    role: "Patient"
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@email.com",
    phone: "9876543212",
    aadharNumber: "123456789014",
    dob: new Date("1992-12-10"),
    gender: "Male",
    password: "password123",
    role: "Patient"
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@email.com",
    phone: "9876543213",
    aadharNumber: "123456789015",
    dob: new Date("1988-03-18"),
    gender: "Female",
    password: "password123",
    role: "Patient"
  },
  {
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@email.com",
    phone: "9876543214",
    aadharNumber: "123456789016",
    dob: new Date("1995-09-25"),
    gender: "Other",
    password: "password123",
    role: "Patient"
  }
];

// Sample doctor data
export const sampleDoctors = [
  {
    firstName: "Dr. Smith",
    lastName: "Johnson",
    email: "dr.smith.johnson@hospital.com",
    phone: "9876543220",
    aadharNumber: "987654321012",
    dob: new Date("1975-04-12"),
    gender: "Male",
    password: "doctorpass123",
    role: "Doctor",
    doctorDepartment: "Cardiology",
    docAvatar: {
      public_id: "sample_doctor_1",
      url: "https://via.placeholder.com/150"
    }
  },
  {
    firstName: "Dr. Emily",
    lastName: "Davis",
    email: "dr.emily.davis@hospital.com",
    phone: "9876543221",
    aadharNumber: "987654321013",
    dob: new Date("1978-07-08"),
    gender: "Female",
    password: "doctorpass123",
    role: "Doctor",
    doctorDepartment: "Dermatology",
    docAvatar: {
      public_id: "sample_doctor_2",
      url: "https://via.placeholder.com/150"
    }
  },
  {
    firstName: "Dr. Robert",
    lastName: "Brown",
    email: "dr.robert.brown@hospital.com",
    phone: "9876543222",
    aadharNumber: "987654321014",
    dob: new Date("1980-11-15"),
    gender: "Male",
    password: "doctorpass123",
    role: "Doctor",
    doctorDepartment: "Neurology",
    docAvatar: {
      public_id: "sample_doctor_3",
      url: "https://via.placeholder.com/150"
    }
  },
  {
    firstName: "Dr. Lisa",
    lastName: "Anderson",
    email: "dr.lisa.anderson@hospital.com",
    phone: "9876543223",
    aadharNumber: "987654321015",
    dob: new Date("1982-09-20"),
    gender: "Female",
    password: "doctorpass123",
    role: "Doctor",
    doctorDepartment: "Pediatrics",
    docAvatar: {
      public_id: "sample_doctor_4",
      url: "https://via.placeholder.com/150"
    }
  }
];

// Sample admin data
export const sampleAdmin = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@hospital.com",
  phone: "9876543230",
  aadharNumber: "111111111111",
  dob: new Date("1985-01-01"),
  gender: "Male",
  password: "adminpass123",
  role: "Admin"
};

// Sample messages
export const sampleMessages = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "9876543210",
    message: "I would like to schedule an appointment for a routine checkup. Please let me know available slots."
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@email.com",
    phone: "9876543211",
    message: "I have been experiencing skin irritation and would like to consult a dermatologist. When is the earliest available appointment?"
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@email.com",
    phone: "9876543212",
    message: "I need to reschedule my upcoming appointment due to a work emergency. Please contact me at your earliest convenience."
  }
];

// Function to create sample data
export const createSampleData = async () => {
  try {
    // Connect to database
    await dbConnection();
    console.log("Connected to database successfully");

    // Clear existing data (optional - remove if you don't want to clear)
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Message.deleteMany({});
    await Appointment.deleteMany({});

    // Insert sample users (patients, doctors, admin)
    console.log("Creating sample patients...");
    const patients = await User.insertMany(samplePatients);
    console.log(`✅ Created ${patients.length} patients`);

    console.log("Creating sample doctors...");
    const doctors = await User.insertMany(sampleDoctors);
    console.log(`✅ Created ${doctors.length} doctors`);

    console.log("Creating admin user...");
    const admin = await User.create(sampleAdmin);
    console.log(`✅ Created admin user`);

    // Insert sample messages
    console.log("Creating sample messages...");
    const messages = await Message.insertMany(sampleMessages);
    console.log(`✅ Created ${messages.length} messages`);

    // Create sample appointments
    console.log("Creating sample appointments...");
    const sampleAppointments = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "9876543210",
        aadharNumber: "123456789012",
        dob: new Date("1990-05-15"),
        gender: "Male",
        appointment_date: new Date("2025-10-25T10:00:00.000Z"),
        department: "Cardiology",
        doctor: {
          firstName: "Dr. Smith",
          lastName: "Johnson"
        },
        hasVisited: false,
        doctorId: doctors[0]._id,
        patientId: patients[0]._id,
        address: "123 Main Street, New York, NY 10001",
        status: "Pending"
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@email.com",
        phone: "9876543211",
        aadharNumber: "123456789013",
        dob: new Date("1985-08-22"),
        gender: "Female",
        appointment_date: new Date("2025-10-26T14:30:00.000Z"),
        department: "Dermatology",
        doctor: {
          firstName: "Dr. Emily",
          lastName: "Davis"
        },
        hasVisited: true,
        doctorId: doctors[1]._id,
        patientId: patients[1]._id,
        address: "456 Oak Avenue, Los Angeles, CA 90210",
        status: "Confirmed"
      }
    ];

    const appointments = await Appointment.insertMany(sampleAppointments);
    console.log(`✅ Created ${appointments.length} appointments`);

    console.log("\n🎉 Sample data creation completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`- Patients: ${patients.length}`);
    console.log(`- Doctors: ${doctors.length}`);
    console.log(`- Admin: 1`);
    console.log(`- Messages: ${messages.length}`);
    console.log(`- Appointments: ${appointments.length}`);

    console.log("\n🔑 Login Credentials:");
    console.log("Admin: admin@hospital.com / adminpass123");
    console.log("Patient: john.doe@email.com / password123");
    console.log("Doctor: dr.smith.johnson@hospital.com / doctorpass123");

  } catch (error) {
    console.error("❌ Error creating sample data:", error.message);
  } finally {
    process.exit();
  }
};

// Function to get a specific patient by email
export const getPatientByEmail = (email) => {
  return samplePatients.find(patient => patient.email === email);
};

// Function to get all patients
export const getAllSamplePatients = () => {
  return samplePatients;
};

// Run sample data creation if this file is executed directly
if (process.argv[2] === 'create') {
  createSampleData();
}