import { Request, Response } from 'express'
import { prisma } from '../prisma'
import bcrypt from 'bcrypt'

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
