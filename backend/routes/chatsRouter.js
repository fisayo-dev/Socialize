import {updateChat,getChats,deleteChat, createChat } from '../controllers/chatController.js'
import express from 'express'

const router = express.Router()

// Routes
router.get('/', getChats)
router.post('/', createChat)
router.put('/', updateChat)
router.delete('/', deleteChat)

export default router
