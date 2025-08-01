import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/UserRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', userRoutes)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
