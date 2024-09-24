import User from '../mongodb/models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;
async function callUsers() {
    const allUsers = await User.findOne({ email })
    return allUsers;
} 

const getUsers = (req, res) => { 
    res.status(201).json(callUsers())
}
const getFriends = (req, res) => {
    const personId = parseInt(req.body.personId );
    // console.log(personId);
    const fetchedFriends = fakeUsers.filter((user) => user.friends.includes(personId))
    // console.log(fetchedFriends)
    res.status(200).json(fetchedFriends)
}
const getFriendRequests = (req, res) => {
    const friendID = parseInt(req.body.personId);
    const fetchedRequestingFriends = fakeUsers.filter((user) => user.requests.includes(friendID));
    res.status(200).json(fetchedRequestingFriends);
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
const getUser = (req, res) => { 
    const id = req.params.id;
    const particularUser = new User.findById(id)
    if (particularUser) {
        res.status(200).json(particularUser);
    } else {
        res.status(404).json({message: `User with id ${id} not found`})
    }
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
const updateUser = (req, res) => {}
const deleteUser = (req, res) => {}

export { getUser, getUsers, createUser, updateUser, deleteUser, getFriends, getFriendRequests, acceptRequest }
