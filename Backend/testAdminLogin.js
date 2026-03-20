import axios from 'axios';

async function testAdminLogin() {
    try {
        console.log('🔐 Testing Admin Login...\n');
        
        const response = await axios.post('${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/user/login', {
            email: 'admin@hospital.com',
            password: 'adminpass123',
            role: 'Admin'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Login Successful!');
        console.log('Response:', response.data);
        console.log('\n📝 Admin Details:');
        console.log('- Name:', response.data.user?.firstName, response.data.user?.lastName);
        console.log('- Email:', response.data.user?.email);
        console.log('- Role:', response.data.user?.role);
        
    } catch (error) {
        console.error('❌ Login Failed!');
        if (error.response) {
            console.error('Error:', error.response.data.message);
            console.error('Status:', error.response.status);
        } else {
            console.error('Error:', error.message);
        }
        
        console.log('\n💡 Possible Solutions:');
        console.log('1. Make sure Backend server is running on port 4000');
        console.log('2. Run: cd Backend && node createSampleData.js create');
        console.log('3. Check if MongoDB is connected');
    }
}

testAdminLogin();
