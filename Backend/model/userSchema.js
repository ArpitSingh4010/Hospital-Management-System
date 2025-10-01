import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Please enter a valid phone number"]
  },
  aadharNumber: {
    type: String,
    required: true,
    minLength: 12,
    maxLength: 12,
    validate: [validator.isNumeric, "Please enter a valid Aadhar number"]
  },
  dob: {
    type: Date,
    required: [true, "Please provide your date of birth"],
    validate: {
      validator: function(value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      },
      message: "You must be at least 18 years old to register"
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"]
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be greater than 8 characters"],
    select: false // to not show password in any output
  },
  role: {
    type: String,
    enum: ["Admin", "Patient", "Doctor"],
    default: "Patient",
    required: true
  },
  doctorDepartment: {
    type: String,
    enum: ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Physical Therapy", "Radiology", "Oncology", "Orthopedics", "General Surgery","Physician"],
  },
  docAvatar: {
    public_id: {
      type: String,
      required: function() { return this.role === 'Doctor'; }
    },
    url: {
      type: String,
      required: function() { return this.role === 'Doctor'; }
    }
  },

}, { timestamps: true });


// Encrypting password before saving user
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {     //if password is not modified then don't hash it again
    next();
  }
  this.password = await bcrypt.hash(this.password, 10); //hashing password with salt rounds 10
});

// Compare password
userSchema.methods.isPasswordValid = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //comparing entered password with hashed password
}

// Generate JWT Token
userSchema.methods.generateJsonWebToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}


const user = mongoose.model("User", userSchema);
export default user;
