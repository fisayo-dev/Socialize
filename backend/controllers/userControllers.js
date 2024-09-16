const fakeUsers = [
    {
        id: 1,
        name: 'Fisayo',
        email: 'test@test.com',
        friends: [
            101
        ]
    },
    {
        id: 2,
        name: 'Daniel',
        email: 'test@test.com',
        friends: [
            101
        ]
    },
    {
        id: 3,
        name: 'Sofia',
        email: 'test@test.com',
        friends: [
            101
        ]
    },
    {
        id: 4,
        name: 'Daniel',
        email: 'test@test.com',
        friends: [
            101
        ]
    },
    {
        id: 5,
        name: 'Elizabeth',
        email: 'test@test.com',
        friends: [
            100,
        ]
    },
    {
        id: 6,
        name: 'Demilade',
        email: 'test@test.com',
        friends: [
            100,
        ]
    },
    {
        id: 7,
        name: 'Ayokunle',
        email: 'test@test.com',
        friends: [
            100,
        ]
    },
    {
        id: 8,
        name: 'Esther',
        email: 'test@test.com',
        friends: [
            100,
        ]
    },
    {
        id: 9,
        name: 'Bisilola',
        email: 'test@test.com',
        friends: [
            100,
        ]
    },
    {
        id: 10,
        name: 'Folusho',
        email: 'test@test.com',
        friends: [
            100,
        ]
    },
]
const getUsers = (req, res) => { 
    res.status(201).json(fakeUsers)
}
const getFriends = (req, res) => {
    const personId = parseInt(req.body.personId );
    console.log(personId)
    // Get Friends of requesting user
    const fetchedFriends = fakeUsers.filter((user) => user.friends.includes(personId))
    console.log(fetchedFriends)
    res.status(200).json(fetchedFriends)
}
const getUser = (req, res) => {}
const createUser = (req, res) => {}
const updateUser = (req, res) => {}
const deleteUser = (req, res) => {}

export {getUser,getUsers,createUser,updateUser,deleteUser, getFriends}