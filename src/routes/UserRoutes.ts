import { Router } from 'express'
import { createUser, loginUser } from '../controllers/UserController'
import { createStudent, getAllStudents } from '../controllers/StudentController'
import { authMiddleware  } from '../middlewares/authMiddleware'

const router = Router()

router.post('/users', createUser)
router.post('/students/createStudent', authMiddleware, createStudent)
router.get('/getAllStudents', getAllStudents)
router.post('/login', loginUser)

export default router
