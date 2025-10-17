// Test registration and login through API
import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1';

// Test patient data
const testPatient = {
  firstName: "John",
  lastName: "Doe", 
  email: "john.doe@test.com",
  phone: "9876543210",
  aadharNumber: "123456789012",
  dob: "1990-05-15",
  gender: "Male",
  password: "password123"
};

async function testRegistration() {
  try {
    console.log('🔄 Testing patient registration...');
    
    const response = await axios.post(`${baseURL}/user/patient/register`, testPatient, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('✅ Registration successful:', response.data.message);
    console.log('👤 User created:', {
      name: `${response.data.user.firstName} ${response.data.user.lastName}`,
      email: response.data.user.email,
      role: response.data.user.role
    });
    
    return true;
  } catch (error) {
    if (error.response?.data?.message === 'User already exists') {
      console.log('ℹ️  User already exists - that\'s okay!');
      return true;
    } else {
      console.error('❌ Registration failed:', error.response?.data?.message || error.message);
      return false;
    }
  }
}

async function testLogin() {
  try {
    console.log('🔄 Testing login...');
    
    const response = await axios.post(`${baseURL}/user/login`, {
      email: testPatient.email,
      password: testPatient.password,
      role: "Patient"
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    
    console.log('✅ Login successful:', response.data.message);
    console.log('🎫 Token received:', response.data.token ? 'Yes' : 'No');
    
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  // Test registration first
  const registrationSuccess = await testRegistration();
  
  if (registrationSuccess) {
    console.log('\n' + '='.repeat(50) + '\n');
    // Test login
    await testLogin();
  }
  
  console.log('\n🏁 Test completed!');
  console.log('\n📋 Test Credentials:');
  console.log(`Email: ${testPatient.email}`);
  console.log(`Password: ${testPatient.password}`);
  console.log('Role: Patient');
  
  process.exit(0);
}

runTests();