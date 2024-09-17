import express from 'express'
import { getUsers, getUser, updateUser, deleteUser, createUser, getFriends, getFriendRequests, acceptRequest } from '../controllers/userControllers.js'

const router = express.Router()

// get Routes
router.get('/', getUsers)
router.get('/:id', getUser)

// Create Routes
router.post('/friends', getFriends)
router.post('/requests', getFriendRequests)
router.post('/', createUser)

// Update Routes
router.put('/', updateUser)
router.put('/friends', acceptRequest)

// Delete Routes
router.delete('/', deleteUser)


export default router