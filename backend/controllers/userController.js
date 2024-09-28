import User from '../mongodb/models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

const getUsers = async (req, res) => { 
    const allUsers = await User.find()
    res.status(200).json(allUsers)
}
const getFriends = async (req, res) => {
    const { personID } = req.body
    try {
        const currentUser = await User.findById(personID);    
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }    
        const friensdUsers = currentUser.friends;
        const listOfRequestingUsers = await Promise.all(
            friensdUsers.map(async (thisId) => {
                const foundFriend = await User.findById(thisId);
                return foundFriend;
            })
        );
    
        res.status(200).json(listOfRequestingUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
const getFriendRequests = async (req, res) => {
    const { userId } = req.body

    const formattedFriendID = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const totalRequests = await User.find({ requests: { $in: [formattedFriendID] } }) 
    res.status(200).json(totalRequests);
}
const getRequestingFriendRequests = async (req, res) => {
    const { userId } = req.body;

    try {
        const currentUser = await User.findById(userId);    
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }    
        const requestingUsersId = currentUser.requests;
        const listOfRequestingUsers = await Promise.all(
            requestingUsersId.map(async (thisId) => {
                const foundRequestingUser = await User.findById(thisId);
                return foundRequestingUser;
            })
        );
    
        res.status(200).json(listOfRequestingUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
    
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
        res.status(500).json({ error: 'Error registering user' });
    }
}

const sendRequest = async (req,res) => {
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

const declineRequest = async (req, res) => {
    const { personID, requestingFriendID } = req.body;
    const user = await User.findById(personID);
    const user2 = await User.findById(requestingFriendID);

    if (!user) return res.status(404).json({ message: 'User Does not exist' })
    
    await User.updateOne({ _id: personID }, { $pull: { requests: requestingFriendID } })
    res.status(200).json({message: `You have successfully declined request from ${user2.first_name}`})    
}
const acceptRequest = async (req, res) => {
    const { personID, requestingFriendID } = req.body;

    // Checking is user exist
    const user = await User.findById(personID);
    const user2 = await User.findById(requestingFriendID);
    if (!user) return res.status(404).json({ message: 'User Does not exist' })
    
    // Remove request person id from requests person list
    await User.updateOne({ _id: personID }, { $pull: { requests: requestingFriendID } })
    
    // Add friend to the this person
    await User.updateOne({ _id: personID }, {
        $addToSet: { friends: requestingFriendID }
    })
    // Add this person to his friend
    await User.updateOne({ _id: requestingFriendID}, {
        $addToSet: { friends: personID }
    })
    // In essence creating both friends
        
    res.status(200).json({message: `${user2.first_name} has been successfully added as your friend`})
}

const unsendRequest = async (req,res) => {
    const { personID, requestingPersonID } = req.body;
    const user = await User.findById(personID)
    if (!user) {
        return res.status(404).json({message: `User with id ${id} not found`})
    }
    await User.updateOne({ _id: personID }, { $pull: { requests: requestingPersonID } })
    res.status(200).json({message: 'Request has been succesfully canceled.'})    
}
const updateUser = (req, res) => {}
const deleteUser = (req, res) => {}

export { getUser, getUsers, createUser, validateUser, updateUser, deleteUser, getFriends, getFriendRequests, getRequestingFriendRequests, acceptRequest, sendRequest, unsendRequest, declineRequest }

