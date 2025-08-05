import { Request, Response } from 'express'
import { prisma } from '../prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10) // 10 é o número de salt rounds

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    res.status(201).json({ id: user.id, name: user.name, email: user.email })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Erro ao cadastrar usuário', details: err })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const JWT_SECRET = process.env.JWT_SECRET || 'profegestor'

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }
  
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao realizar login', details: err })
  }
}