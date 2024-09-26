import User from '../mongodb/models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import mongoose  from 'mongoose'


dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

const getUsers = async (req, res) => { 
    const allUsers = await User.find()
    res.status(200).json(allUsers)
}
const getFriends = (req, res) => {
    const personId = parseInt(req.body.personId );
    // console.log(personId);
    const fetchedFriends = fakeUsers.filter((user) => user.friends.includes(personId))
    // console.log(fetchedFriends)
    res.status(200).json(fetchedFriends)
}
const getFriendRequests = async (req, res) => {
    const { userId } = req.body

    const formattedFriendID = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const totalRequests = await User.find({ requests: { $in: [formattedFriendID] } }) 
    res.status(200).json(totalRequests);
}
const acceptRequest = (req, res) => {
    const personId = req.body.personId
    const requestingUserId = req.body.requestingId;

    const users = fakeUsers.filter((user) => user.friends.includes(personId))

    const particluarRequestingUser = fakeUsers.find((user) => user.id == requestingUserId)
    particluarRequestingUser.requests.splice(1, personId)

    // Adding request friend to friend
    particluarRequestingUser.friends.push(personId)

    // Updating friend
    particluarRequestingUser.requests.splice(0,personId)

    users.push(particluarRequestingUser)
    res.status(200).json(users)
}
const getUser = async (req, res) => { 
    const {id} = req.params
    const user = await User.findOne({ _id: id })
    if (!user) {
        return res.status(404).json({message: `User with id ${id} not found`})
    }
    res.status(200).json(user)
}

const createUser = async (req, res) => {
    const { first_name, middle_name, last_name, profile_img, gender, country, dob, email,password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userExits = await User.findOne({ email })

        // If user exist return the user
        if (userExits) return res.status(400).json({ message: 'User already exist' });
        
        // If user doesn't exist, Create user 
        const newUser = new User({
            first_name, middle_name, last_name, profile_img, gender, country, email, dob, password: hashedPassword, friends: [], blockers: [], requests: [],    
        })
       const savedUser = await newUser.save();

        // Generate a JWT
        const token = jwt.sign({ userId: savedUser._id }, SECRET_KEY, { expiresIn: '1h' });

        // Return the token to the client
        res.status(201).json({ token });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ error: 'Error registering user' });
    }
}

const createFriends = async (req,res) => {
    const { userId, friendId } = req.body;

    // Getting requesting to friend
    const user = await User.findOne({ _id: friendId })
    
    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    // Add userId to the requests array of the friend
    await User.updateOne(
        { _id: friendId }, // Filter by the friend ID
        { $addToSet: { requests: userId } } // Add userId to the requests array (avoids duplicates)
    );
}

const validateUser = async (req,res) => {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email })
    
    // Check the user
    if (!user) return res.status(404).json({ message: `User with ${email} email does not have an ccount` })
    
    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) return res.status(401).json({message: 'User credentials not valid'})

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // Send a JWT to client
    res.json({token})
}
const updateUser = (req, res) => {}
const deleteUser = (req, res) => {}

export { getUser, getUsers, createUser, validateUser, updateUser, deleteUser, getFriends, getFriendRequests, acceptRequest, createFriends }

