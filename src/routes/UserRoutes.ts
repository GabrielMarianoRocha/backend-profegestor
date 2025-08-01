import { Router } from 'express'
import { createUser } from '../controllers/UserController'

const router = Router()

router.post('/users', createUser)

export default router
