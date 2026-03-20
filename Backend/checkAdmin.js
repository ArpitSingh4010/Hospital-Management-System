import { config } from "dotenv";
import mongoose from "mongoose";
import User from "./model/userSchema.js";
import bcrypt from "bcrypt";

config({ path: "./config/config.env" });

const checkAndFixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Hospital-Management",
    });
    console.log("✅ Connected to MongoDB!\n");

    // Check if admin exists
    let admin = await User.findOne({ email: "admin@hospital.com" }).select("+password");
    
    if (admin) {
      console.log("📋 Admin found in database:");
      console.log("Email:", admin.email);
      console.log("Role:", admin.role);
      console.log("Name:", admin.firstName, admin.lastName);
      console.log("Has Password:", !!admin.password);
      
      // Test password validation
      const testPassword = "adminpass123";
      const isValid = await bcrypt.compare(testPassword, admin.password);
      console.log("\n🔐 Password test with 'adminpass123':", isValid ? "✅ VALID" : "❌ INVALID");
      
      if (!isValid) {
        console.log("\n⚠️  Password doesn't match! Updating password...");
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        admin.password = hashedPassword;
        await admin.save();
        console.log("✅ Password updated successfully!");
      }
    } else {
      console.log("❌ Admin not found! Creating new admin...\n");
      
      const hashedPassword = await bcrypt.hash("adminpass123", 10);
      admin = await User.create({
        firstName: "Admin",
        lastName: "User",
        email: "admin@hospital.com",
        phone: "1234567890",
        aadharNumber: "123456789012",
        dob: "1990-01-01",
        gender: "Male",
        password: hashedPassword,
        role: "Admin"
      });
      
      console.log("✅ Admin created successfully!");
    }

    console.log("\n🔐 Admin Login Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email:    admin@hospital.com");
    console.log("Password: adminpass123");
    console.log("Role:     Admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    mongoose.connection.close();
    console.log("✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
};

checkAndFixAdmin();
