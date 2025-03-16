import express from 'express';
import {createDoctorProfile} from './doctor.controller.js'
import doctorImageUploader from '../../Middleware/Fileupload/doctorImage.js';
const router = express.Router()

// secure the api
router.route('/add-doctor').post( doctorImageUploader.single("image"), createDoctorProfile)

export default router;