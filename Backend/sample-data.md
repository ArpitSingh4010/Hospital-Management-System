# Default Patient Details for Testing

## Sample Patient Registration Data

### Patient 1 - John Doe
```json
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

### Patient 2 - Jane Smith
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phone": "9876543211",
  "aadharNumber": "123456789013",
  "dob": "1985-08-22",
  "gender": "Female",
  "password": "password123",
  "role": "Patient"
}
```

### Patient 3 - Michael Johnson
```json
{
  "firstName": "Michael",
  "lastName": "Johnson",
  "email": "michael.johnson@email.com",
  "phone": "9876543212",
  "aadharNumber": "123456789014",
  "dob": "1992-12-10",
  "gender": "Male",
  "password": "password123",
  "role": "Patient"
}
```

### Patient 4 - Sarah Wilson
```json
{
  "firstName": "Sarah",
  "lastName": "Wilson",
  "email": "sarah.wilson@email.com",
  "phone": "9876543213",
  "aadharNumber": "123456789015",
  "dob": "1988-03-18",
  "gender": "Female",
  "password": "password123",
  "role": "Patient"
}
```

### Patient 5 - Alex Chen
```json
{
  "firstName": "Alex",
  "lastName": "Chen",
  "email": "alex.chen@email.com",
  "phone": "9876543214",
  "aadharNumber": "123456789016",
  "dob": "1995-09-25",
  "gender": "Other",
  "password": "password123",
  "role": "Patient"
}
```

## Sample Appointment Data

### Appointment 1 - John Doe
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "9876543210",
  "aadharNumber": "123456789012",
  "dob": "1990-05-15",
  "gender": "Male",
  "appointment_date": "2025-10-25T10:00:00.000Z",
  "department": "Cardiology",
  "doctor": {
    "firstName": "Dr. Smith",
    "lastName": "Johnson"
  },
  "hasVisited": false,
  "address": "123 Main Street, New York, NY 10001",
  "status": "Pending"
}
```

### Appointment 2 - Jane Smith
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phone": "9876543211",
  "aadharNumber": "123456789013",
  "dob": "1985-08-22",
  "gender": "Female",
  "appointment_date": "2025-10-26T14:30:00.000Z",
  "department": "Dermatology",
  "doctor": {
    "firstName": "Dr. Emily",
    "lastName": "Davis"
  },
  "hasVisited": true,
  "address": "456 Oak Avenue, Los Angeles, CA 90210",
  "status": "Confirmed"
}
```

## Sample Message Data

### Message 1
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "9876543210",
  "message": "I would like to schedule an appointment for a routine checkup. Please let me know available slots."
}
```

### Message 2
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phone": "9876543211",
  "message": "I have been experiencing skin irritation and would like to consult a dermatologist. When is the earliest available appointment?"
}
```

### Message 3
```json
{
  "firstName": "Michael",
  "lastName": "Johnson",
  "email": "michael.johnson@email.com",
  "phone": "9876543212",
  "message": "I need to reschedule my upcoming appointment due to a work emergency. Please contact me at your earliest convenience."
}
```

## Doctor Sample Data

### Doctor 1 - Cardiologist
```json
{
  "firstName": "Dr. Smith",
  "lastName": "Johnson",
  "email": "dr.smith.johnson@hospital.com",
  "phone": "9876543220",
  "aadharNumber": "987654321012",
  "dob": "1975-04-12",
  "gender": "Male",
  "password": "doctorpass123",
  "role": "Doctor",
  "doctorDepartment": "Cardiology"
}
```

### Doctor 2 - Dermatologist
```json
{
  "firstName": "Dr. Emily",
  "lastName": "Davis",
  "email": "dr.emily.davis@hospital.com",
  "phone": "9876543221",
  "aadharNumber": "987654321013",
  "dob": "1978-07-08",
  "gender": "Female",
  "password": "doctorpass123",
  "role": "Doctor",
  "doctorDepartment": "Dermatology"
}
```

### Doctor 3 - Neurologist
```json
{
  "firstName": "Dr. Robert",
  "lastName": "Brown",
  "email": "dr.robert.brown@hospital.com",
  "phone": "9876543222",
  "aadharNumber": "987654321014",
  "dob": "1980-11-15",
  "gender": "Male",
  "password": "doctorpass123",
  "role": "Doctor",
  "doctorDepartment": "Neurology"
}
```

## Admin Sample Data

### Admin 1
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@hospital.com",
  "phone": "9876543230",
  "aadharNumber": "111111111111",
  "dob": "1985-01-01",
  "gender": "Male",
  "password": "adminpass123",
  "role": "Admin"
}
```

## Notes:
- All passwords are set to simple values for testing (should be changed in production)
- Phone numbers follow Indian mobile format (10 digits)
- Aadhar numbers are sample 12-digit numbers (use valid ones in production)
- All users are 18+ years old to meet validation requirements
- Email addresses are unique for each user
- Dates are in ISO format for proper parsing