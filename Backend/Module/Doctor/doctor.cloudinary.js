import { v2 as cloudinary } from 'cloudinary'

export const uploadDoctorImage = async file =>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const b64 = Buffer.from(file.buffer).toString('base64')
        let dataURI = 'data:' + file.mimetype + ';base64,' + b64
        let result = await cloudinary.uploader.upload(dataURI, {
            asset_folder:'Doc_house/doctor/image',
            resource_type: file.fieldname
        })
        return result.url
    } catch (error) {
        console.log("Error inside the cloudinary uploader",error)
    }
}

export const deleteDoctorImage = async imageUrl =>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const urlParts = imageUrl.split("/");
        const filename = urlParts[urlParts.length - 1];
        const publicId = filename.split(".")[0];

        const result = await cloudinary.v2.uploader.destroy(publicId)
        return result
    } catch (error) {
        throw error
    }
}