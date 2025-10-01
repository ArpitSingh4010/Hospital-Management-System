import express from 'express';
import { login,patientRegister } from '../controller/userController.js';
import { addNewAdmin } from '../controller/userController.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';
import { isPatientAuthenticated } from '../middlewares/auth.js';
import { getAllDoctors } from '../controller/userController.js';
import { getUserDetails } from '../controller/userController.js';
import { logoutAdmin } from '../controller/userController.js';
import { logoutPatient } from '../controller/userController.js';
import { addNewDoctor } from '../controller/userController.js';


// Debug route to verify router mounting
const router = express.Router();

//  route for patient registration
router.post('/patient/register',patientRegister)

//  route for login
router.post('/login',login)



// route for adding new admin
router.post('/admin/add',isAdminAuthenticated,addNewAdmin)


// route for getting all doctors
router.get('/doctors',getAllDoctors)

// Get admin details
router.get('/admin/me',isAdminAuthenticated,getUserDetails) 


// Get patient details
router.get('/patient/me',isPatientAuthenticated,getUserDetails)

// Logout admin
router.get('/admin/logout',isAdminAuthenticated,logoutAdmin)

// Logout patient
router.get('/patient/logout',isPatientAuthenticated,logoutPatient)


// Add new doctor
router.post('/doctor/add',isAdminAuthenticated,addNewDoctor)


export default router;