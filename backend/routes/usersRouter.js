import express from 'express'
import { getUsers, getUser, updateUser, deleteUser, createUser, getFriends } from '../controllers/userControllers.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/friends', getFriends)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)


export default router