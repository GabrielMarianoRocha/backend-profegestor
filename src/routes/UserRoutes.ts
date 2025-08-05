import { Router } from 'express'
import { createUser, loginUser } from '../controllers/UserController'
import { createStudent, getAllStudents } from '../controllers/StudentController'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/users', createUser)
router.post('/students/createStudent', createStudent)
router.get('/getAllStudents', getAllStudents)
router.post('/login', loginUser)

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Olá, ${req.user?.email}` })
})


export default router
