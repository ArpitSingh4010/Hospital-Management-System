import Message from "../model/message.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
// Message Controller

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    let { firstName, lastName, email, phone, message } = req.body;

    // Trim all fields
    firstName = firstName ? firstName.trim() : "";
    lastName = lastName ? lastName.trim() : "";
    email = email ? email.trim() : "";
    phone = phone ? phone.trim() : "";
    message = message ? message.trim() : "";

    // Check for empty fields
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    // Email format validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        return next(new ErrorHandler("Please enter a valid email address", 400));
    }

    // Phone number validation (minimum 10 digits)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
        return next(new ErrorHandler("Please enter a valid phone number (at least 10 digits)", 400));
    }

    // Message field validation
    if (!message || message.length < 2) {
        return next(new ErrorHandler("Message field cannot be empty", 400));
    }

    try {
        // Save message to database only if all validations pass
        await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message
        });
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Database error while saving message:", error.message);
        return next(new ErrorHandler("Database connection error. Please try again later.", 500));
    }
});


// Get All Messages Controller
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages=await Message.find();   // Fetch all messages from the database
    res.status(200).json({
        success: true,
        messages
    });
});