import express from 'express'
import { getUsers, getUser, validateUser, updateUser, deleteUser, createUser, getFriends, getFriendRequests,getRequestingFriendRequests, acceptRequest, declineRequest, sendRequest, unsendRequest } from '../controllers/userController.js'

const router = express.Router()

// get Routes
router.get('/', getUsers)
router.get('/:id', getUser)

// Create Routes
router.post('/friends', getFriends)
router.post('/requests', getFriendRequests)
router.post('/requests/requesting', getRequestingFriendRequests)
router.post('/register', createUser)
router.post('/login', validateUser)
router.post('/request/decline', declineRequest)
router.post('/request/accept', acceptRequest)
router.post('/requests/unsend', unsendRequest)
router.post('/friends/create', sendRequest)

// Update Routes
router.put('/:id', updateUser)
router.put('/friends', acceptRequest)

// Delete Routes
router.delete('/:id', deleteUser)


export default router