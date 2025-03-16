import { deleteDoctorImage, uploadDoctorImage } from "./doctor.cloudinary.js";
import Doctors from "./doctor.model.js";

export const createDoctorProfile = async(req,res,next)=>{
    let newImageUrl = null
    try {
        const data = req.body;
        const file = req.file;
        const image = await uploadDoctorImage(file) 
        newImageUrl = image
        data.image = image;

        const doctor = await Doctors.create(data);
        res.status(200).json({
            status: 'Success',
            data: doctor
        });
    } catch (error) {
        if(newImageUrl){
            await deleteDoctorImage(newImageUrl)
        }   
        res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
}