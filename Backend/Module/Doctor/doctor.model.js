import mongoose from "mongoose";
import validate from 'validator'

const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validate.isEmail, 'Please enter a valid email']
    },
    phone:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\+?[0-9]{1,15}$/.test(v);
            },
            message: 'Please enter a valid phone number'
        }
    },
    qualification:{
        type: String,
        required: true,
        maxLength: 100
    },
    specialties: [String],
    image:{
        type: String,
    },
    services: [String],
    description:{
        type: String,
        required: true,
        maxLength: 2000
    },
    education:[
        {
            degree: String,
            institution: String,
            startDate: Date,
            endDate: Date
        }
    ],
    experience:[
        {
            title: String,
            company: String,
            startDate: String,
            endDate: String,
        }
    ],
    awards:[
        {
            title: String,
            description: String,
            year: String
        }   
    ],
    location:{
        institution: String,
        street: String,
        city: String,
        country: String,
        map: String
    },
    business_hour:[
        {
            day: String,
            open: String,
            close: String,
            isClose:{
                type: Boolean,
                default: false
            },
            special_notes:{
                type: String
            }
        }
    ],
    // add the id of review
    // reviews: [
    //     type:ObjectId     
    // ]
})

const Doctors = mongoose.model('Doctors',doctorSchema)

export default Doctors;