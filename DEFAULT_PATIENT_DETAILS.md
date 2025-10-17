# 🏥 Hospital Management System - Default Patient Details

## 🚀 Quick Setup

### 1. Create Sample Data
Run this command to populate your database with sample data:
```bash
node createSampleData.js create
```

### 2. Default Login Credentials

#### 👤 **Admin Account**
- **Email:** `admin@hospital.com`
- **Password:** `adminpass123`
- **Role:** Admin

#### 🏥 **Doctor Accounts**
| Name | Email | Password | Department |
|------|-------|----------|------------|
| Dr. Smith Johnson | `dr.smith.johnson@hospital.com` | `doctorpass123` | Cardiology |
| Dr. Emily Davis | `dr.emily.davis@hospital.com` | `doctorpass123` | Dermatology |
| Dr. Robert Brown | `dr.robert.brown@hospital.com` | `doctorpass123` | Neurology |
| Dr. Lisa Anderson | `dr.lisa.anderson@hospital.com` | `doctorpass123` | Pediatrics |

#### 🧑‍⚕️ **Patient Accounts**
| Name | Email | Password | Phone | Aadhar |
|------|-------|----------|-------|---------|
| John Doe | `john.doe@email.com` | `password123` | 9876543210 | 123456789012 |
| Jane Smith | `jane.smith@email.com` | `password123` | 9876543211 | 123456789013 |
| Michael Johnson | `michael.johnson@email.com` | `password123` | 9876543212 | 123456789014 |
| Sarah Wilson | `sarah.wilson@email.com` | `password123` | 9876543213 | 123456789015 |
| Alex Chen | `alex.chen@email.com` | `password123` | 9876543214 | 123456789016 |

## 📝 Sample Form Data

### Registration Form (Copy & Paste Ready)

#### New Patient Registration:
```
First Name: John
Last Name: Doe
Email: john.doe@email.com
Phone: 9876543210
Aadhar Number: 123456789012
Date of Birth: 1990-05-15
Gender: Male
Password: password123
Confirm Password: password123
```

#### New Doctor Registration:
```
First Name: Dr. David
Last Name: Miller
Email: dr.david.miller@hospital.com
Phone: 9876543225
Aadhar Number: 987654321016
Date of Birth: 1979-03-12
Gender: Male
Password: doctorpass123
Confirm Password: doctorpass123
Department: Orthopedics
```

### Appointment Booking Form:
```
First Name: John
Last Name: Doe
Email: john.doe@email.com
Phone: 9876543210
Aadhar Number: 123456789012
Date of Birth: 1990-05-15
Gender: Male
Appointment Date: 2025-10-30
Department: Cardiology
Doctor: Dr. Smith Johnson
Address: 123 Main Street, New York, NY 10001
Has Visited Before: No
```

### Contact/Message Form:
```
First Name: John
Last Name: Doe
Email: john.doe@email.com
Phone: 9876543210
Message: I would like to schedule an appointment for a routine checkup. Please let me know available slots.
```

## 🔧 Available Departments
- Cardiology
- Dermatology
- Neurology
- Pediatrics
- Physical Therapy
- Radiology
- Oncology
- Orthopedics
- General Surgery
- Physician

## 📱 API Testing Endpoints

### Patient Registration
```bash
POST http://localhost:4000/api/v1/user/patient/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "9876543210",
  "aadharNumber": "123456789012",
  "dob": "1990-05-15",
  "gender": "Male",
  "password": "password123",
  "role": "Patient"
}
```

### Send Message
```bash
POST http://localhost:4000/api/v1/message/send
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "9876543210",
  "message": "I would like to schedule an appointment for a routine checkup."
}
```

### Login
```bash
POST http://localhost:4000/api/v1/user/login
Content-Type: application/json

{
  "email": "john.doe@email.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "Patient"
}
```

## 🎯 Quick Test Scenarios

### Scenario 1: Patient Journey
1. Register as patient using John Doe details
2. Login with John Doe credentials
3. Book appointment with Dr. Smith Johnson (Cardiology)
4. Send a message asking about appointment status

### Scenario 2: Admin Journey
1. Login as admin
2. View all messages
3. View all appointments
4. Add a new doctor

### Scenario 3: Doctor Journey
1. Login as Dr. Smith Johnson
2. View assigned appointments
3. Update appointment status

## ⚠️ Important Notes
- All sample passwords are simple for testing only
- Change passwords in production environment
- Aadhar numbers are sample data - use real numbers in production
- All patients are 18+ to meet validation requirements
- Phone numbers follow Indian format (10 digits)

## 🛠️ Troubleshooting

### If MongoDB Connection Fails:
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `config.env`
3. Try MongoDB Atlas for cloud database

### If Sample Data Creation Fails:
1. Make sure database is connected
2. Check for validation errors in console
3. Ensure no duplicate emails exist