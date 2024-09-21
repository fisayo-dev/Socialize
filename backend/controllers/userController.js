import User from '../mongodb/models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

const fakeUsers = [
    {
        id: 1,
        name: 'Fisayo',
        email: 'fisayo@fisayo.com',
        friends: [
            101
        ],
        requests: [
            100
        ]
    },
    {
        id: 2,
        name: 'Daniel',
        email: 'daniel@daniel.com',
        friends: [
            101
        ],
        requests: [
            100
        ]
    },
    {
        id: 3,
        name: 'Sofia',
        email: 'sofia@sofia.com',
        friends: [
            101
        ],
        requests: [
            100
        ]
    },
    {
        id: 4,
        name: 'Gbenga',
        email: 'gbenga@gbenga.com',
        friends: [
            101
        ],
        requests: [
            100
        ]
    },
    {
        id: 5,
        name: 'Elizabeth',
        email: 'lizzy@gmail.com',
        friends: [
            100,
        ],
          requests: [
            101
        ]
    },
    {
        id: 6,
        name: 'Demilade',
        email: 'ladezy@gmail.com',
        friends: [
            100,
        ],
          requests: [
            101
        ]
    },
    {
        id: 7,
        name: 'Ayokunle',
        email: 'kunzi@yahoo.com',
        friends: [
            100,
        ],
          requests: [
            101
        ]
    },
    {
        id: 8,
        name: 'Esther',
        email: 'kings@gmail.com',
        friends: [
            100,
        ],
          requests: [
            101
        ]
    },
    {
        id: 9,
        name: 'Bisilola',
        email: 'bode@gmail.com',
        friends: [
            100,
        ],
          requests: [
            101
        ]
    },
    {
        id: 10,
        name: 'Folusho',
        email: 'shola@yahoo.com',
        friends: [
            100,
        ],
          requests: [
            101
        ]
    },
]
const getUsers = (req, res) => { 
    res.status(201).json(fakeUsers)
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
const getUser = (req, res) => { }

const createUser = async (req, res) => {
    const { first_name, middle_name, last_name, profile_img, gender, country, dob, email,password } = req.body

    // console.log(req.body);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userExits = await User.findOne({ email })
        const existingUser = await User.find({ email: 'fisayobadina@gmail.com' });

        // If user exist return the user
        if (userExits) return res.status(400).json({ message: 'User already exist' });

        console.log(existingUser);
        
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
