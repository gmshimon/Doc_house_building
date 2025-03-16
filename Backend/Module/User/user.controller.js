import generateToken from '../../Middleware/generateToken.js'
import { deleteUserImage, uploadUserImage } from './user.cloudinary.js'
import Users from './user.model.js'

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const { name, email, password } = req.body
    const user = await Users.findOne({ email })

    if (user) {
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      const token = generateToken(data)
      return res.status(200).json({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
      const result = await Users.create(userData)
      const token = generateToken({ _id: result?._id, ...userData })

      return res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: result,
        token: token
      })
    }
  } catch (error) {
    res.status(400).json({
        status: 'Error',
        message: error.message
    })
  }
}

export const fetchUser = async (req, res, next) => {
  try {
    const data = req.body
    const user = await Users.findOne({ email: data.email })
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch users',
      error: error.message
    })
  }
}

export const updateImage = async(req,res,next)=>{
    let newImageUrl = null
    try {
        const {email} = req.body
        const file = req.file;
        const image = await uploadUserImage (file)

        newImageUrl = image

        const user = await Users.findOne({email})

        if(user.image){
            const oldImageUrl = user.photo;
            await deleteUserImage(oldImageUrl)
        }
        const updateUser = await Users.updateOne(
            {_id:user?._id},
            {
                $set:{
                    image: newImageUrl
                }
            }
        )
        res.status(200).json({
            status: 'Success',
            message: 'Category image updated successfully'
          })
    } catch (error) {
        if (newImageUrl) {
            await deleteUserImage(newImageUrl);
          }
          res.status(400).json({
            status: 'Failed',
            message: error
          })
    }
}