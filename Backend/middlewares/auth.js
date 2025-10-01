import { catchAsyncErrors } from "./catchAsyncErrors.js"
import { ErrorHandler } from "./errorMiddleware.js"
import User from "../model/userSchema.js"
import jwt from "jsonwebtoken"


// Admin Authentication Middleware
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    console.log('isAdminAuthenticated: start');
    const token = req.cookies.adminToken;
    console.log('isAdminAuthenticated: token', token);
    if (!token) {
        console.log('isAdminAuthenticated: no token');
        return next(new ErrorHandler("Please login as Admin to access this resource", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('isAdminAuthenticated: decoded', decoded);
    req.user = await User.findById(decoded.id);
    console.log('isAdminAuthenticated: req.user', req.user);
    if (req.user.role !== "Admin") {
        console.log('isAdminAuthenticated: not admin');
        return next(new ErrorHandler("Please login as Admin to access this resource", 403));
    }
    console.log('isAdminAuthenticated: success');
    next();
});



// Patient Authentication Middleware
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    console.log('isPatientAuthenticated: start');
    const token = req.cookies.patientToken;
    console.log('isPatientAuthenticated: token', token);
    if (!token) {
        console.log('isPatientAuthenticated: no token');
        return next(new ErrorHandler("Please login as Patient", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('isPatientAuthenticated: decoded', decoded);
    req.user = await User.findById(decoded.id);
    console.log('isPatientAuthenticated: req.user', req.user);
    if (req.user.role !== "Patient") {
        console.log('isPatientAuthenticated: not patient');
        return next(new ErrorHandler("Please login as Patient", 403));
    }
    console.log('isPatientAuthenticated: success');
    next();
});