import express from 'express'
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userControllers.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/', updateUser)
router.delete('/', deleteUser)


export default router