import express, { Router } from 'express';
import { postAppointment, updateAppointmentStatus } from '../controller/appointmentController.js';
import { isPatientAuthenticated } from '../middlewares/auth.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';
import { getAllAppointments } from '../controller/appointmentController.js';
import { deleteAppointment } from '../controller/appointmentController.js';



// Import the controller functions
const router = express.Router();

router.post('/book', isPatientAuthenticated, postAppointment);  // Route to book an appointment

router.get('/getall', isAdminAuthenticated, getAllAppointments);  // Route to get all appointments 

router.put('/update/:id',isAdminAuthenticated,updateAppointmentStatus) // Route to update appointment status


router.delete('/delete/:id',isAdminAuthenticated,deleteAppointment)// Route to delete an appointment

export default router;