import express from "express";
import { adminControlAuth, userControlAuth } from "../middleware/authMiddleware.js";
import { addUserTodo, getUserTodos, deleteUserTodo,updateTodoProfile } from "../controllers/todoController.js";
import upload from '../middleware/uploadMiddleware.js';


const router = express.Router();

router.post('/',  upload.single('photo'), userControlAuth, adminControlAuth, addUserTodo);
router.get('/', userControlAuth,  adminControlAuth, getUserTodos);
router.delete('/:id', userControlAuth, deleteUserTodo);
router.route('/profile')
.put(userControlAuth, upload.single('photo'), updateTodoProfile);

export default router;