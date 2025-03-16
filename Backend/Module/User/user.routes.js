import express from 'express';
import { createUser,fetchUser,updateImage } from './user.controller.js';
import userImageUploader from '../../Middleware/Fileupload/userImage.js';
// const { createUser, getAllUsers, fetchUser, getUserDetails, adminDetails } = require('./user.controller')
// const verifyToken = require('../../middleware/verifyToken')
// const verifyAdmin = require('../../middleware/verifyAdmin')
const router = express.Router()

router.route('/').post(createUser)
router.route('/update-image').post(userImageUploader.single('image'),updateImage)
// router.route('/').get(getAllUsers)
// router.route('/admin-details').get(verifyAdmin,adminDetails)
router.route('/get-user').post(fetchUser)
// router.route('/get-details').get(verifyToken,getUserDetails)

export default router