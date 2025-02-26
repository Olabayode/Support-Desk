const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
//@desc    Register a new user
//@route   /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password}= req.body
    
    //Validation
    if(!name || !email ||!password){
       res.status(400)
       throw new Error('Please Include All Fields')
    }

    //Find if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc    Login a user
//@route   /api/users/login
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
    const{email, password} = req.body

    const user = await User.findOne({email})

    //Check if username and password matches
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

//@desc    Get current user
//@route   /api/users/me
//@access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

//Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '50d'
    })
} 

module.exports = {
    registerUser,
    loginUser,
    getMe
}