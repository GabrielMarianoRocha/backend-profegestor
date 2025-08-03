import { Router } from 'express'
import { createUser } from '../controllers/UserController'
import { createStudent } from '../controllers/StudentController'

const router = Router()

router.post('/users', createUser)
router.post('/students', createStudent)

export default router
