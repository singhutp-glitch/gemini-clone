import express from 'express'
const router = express.Router();
import controller from '../controllers/chatController.js'

router.get('/chat',controller.sendMessage);

export default router;