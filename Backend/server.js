import app from './app.js';
import cloudinary from 'cloudinary';
// Removed MongoDB dependency

//configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const startServer = async () => {
  try {
    // No database connection needed
    console.log('✅ Server starting without database...');
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
      console.log(`✅ Frontend can connect to: http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();