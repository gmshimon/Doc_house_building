import mongoose from "mongoose";
import validate from 'validator'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        minLength: 3,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validate.isEmail, 'Please enter a valid email']
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    image:{
        type: String,
    },
    phone:{
        type: String,
        // required: true,
        // validate: {
        //     validator: function(v) {
        //         return /^\d{10}$/.test(v);
        //     },
        //     message: 'Please enter a 10-digit phone number'
        // }
    },
    address:{
        street:{
            type: String,
        },
        city:{
            type: String,
        },
        country:{
            type: String,
        }
    }
},{
    timestamps: true
})

const Users = mongoose.model('Users',userSchema)

export default Users;