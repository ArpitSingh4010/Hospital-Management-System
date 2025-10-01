
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from '../middlewares/errorMiddleware.js';
import User from '../model/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

// Patient Registration Controller
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    // Guard: ensure req.body exists and is an object before destructuring
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return next(new ErrorHandler('Please fill the full form', 400));
    }
    const { firstName, lastName, email, gender, phone, aadharNumber, dob, password } = req.body;
    if (!firstName || !lastName || !email || !gender || !phone || !aadharNumber || !dob || !password) {
    return next(new ErrorHandler("Please fill the full form", 400));
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({ firstName, lastName, email, gender, phone, aadharNumber, dob, password }); // Create new user
    generateToken(user,"User registered successfully",200,res);   // Generate token and send response
});


// Login Controller
export const login = catchAsyncErrors(async (req, res, next) => {
    console.log('Login attempt:', { email: req.body.email, role: req.body.role });
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please fill the full form", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        console.log('User not found for email:', email);
        return next(new ErrorHandler("User not found", 404));
    }
    console.log('User found:', { email: user.email, role: user.role });
    const isPasswordMatched = await user.isPasswordValid(password);
    console.log('Password validation result:', isPasswordMatched);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    if (user.role !== role) {
        console.log('Role mismatch:', { userRole: user.role, requestedRole: role });
        return next(new ErrorHandler(`Please login as ${user.role}`, 400));
    }
    console.log('Login successful for:', email);
    generateToken(user,"Login successful",200,res);
});


// Add New Admin Controller
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, gender, phone, aadharNumber, dob, password } = req.body;
    if (!firstName || !lastName || !email || !gender || !phone || !aadharNumber || !dob || !password) {
        return next(new ErrorHandler("Please fill the full form", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already exists`, 400));
    }
    const admin = await User.create({ firstName, lastName, email, gender, phone, aadharNumber, dob, password, role: "Admin" });
    res.status(200).json({
        success: true,
        message: "Admin added successfully",
        admin
    });

})


// Get All Doctors Controller
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctors
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user=req.user;
    res.status(200).json({
        success: true,
        user
    });

})


// Logout Admin Controller
export const logoutAdmin=catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success: true,
        message: "Logged out successfully",
    });
})


// Logout Patient Controller
export const logoutPatient=catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success: true,
        message: "Logged out successfully",
    });
})



export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if(!req.files||Object.keys(req.files).length===0){
        return next(new ErrorHandler("Please upload a profile picture",400));
    }
    const {docAvatar}=req.files; // Get the uploaded file
    const allowedFormats=["image/jpeg","image/jpg","image/png","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("Invalid file format",400));
    }
    const {firstName,lastName,email,gender,phone,aadharNumber,dob,password,doctorDepartment}=req.body;
    if (!firstName || !lastName || !email || !gender || !phone || !aadharNumber || !dob || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please fill the full form",400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already exists`,400));
    }
   const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath)
   if(!cloudinaryResponse|| cloudinaryResponse.error){
    console.error(cloudinaryResponse.error||'Unknown error');
   }
    const doctor=await User.create({ firstName, lastName, email, gender, phone, aadharNumber, dob, password, role: "Doctor", doctorDepartment, docAvatar: {public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url} });
   res.status(200).json({
       success: true,
       message: "Doctor added successfully",
       doctor
   });
   })