import mongoose from "mongoose";
import express from "express";
import validator from "validator";




const appointmentSchema = new mongoose.Schema({
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
  appointment_date: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  doctor: {
   firstName: {
    type: String,
    required: true
  },
    lastName: {
      type: String,
      required: true
    },
  },
  hasVisited: {
    type: Boolean,
    default: false
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
    patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending"
  },

}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
