import express from 'express'
import { getUsers, getUser, validateUser, updateUser, deleteUser, createUser, getFriends, getFriendRequests, acceptRequest, sendRequest } from '../controllers/userController.js'

const router = express.Router()

// get Routes
router.get('/', getUsers)
router.get('/:id', getUser)

// Create Routes
router.post('/friends', getFriends)
router.post('/requests', getFriendRequests)
router.post('/register', createUser)
router.post('/login', validateUser)
router.post('/friends/create', sendRequest)

// Update Routes
router.put('/:id', updateUser)
router.put('/friends', acceptRequest)

// Delete Routes
router.delete('/:id', deleteUser)


export default router