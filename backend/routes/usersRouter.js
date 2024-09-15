import express from 'express'
import { getUsers, getUser, updateUser, deleteUser, createUser } from '../controllers/userControllers.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)


export default router