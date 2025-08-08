import { Request, Response } from "express"
import { prisma } from '../prisma'

export const createStudent = async (req: Request, res: Response) => {
    const { name, email, phone, startDate, monthlyFee, notes, userId, classes, payments, progress } = req.body
    const user = (req as any).userId;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
        const student = await prisma.student.create({
        data: {
            name,
            email,
            phone,
            startDate: new Date(startDate),
            monthlyFee: parseFloat(monthlyFee),
            notes,
            userId,
            classes: {
            connect: []
            },
            payments: {
            connect: []
            },
            progress: {
            connect: []
            }
        }
        })

        res.status(201).json(student)
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: 'Erro ao cadastrar aluno', details: err })
    }
}

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        classes: true,
        payments: true,
        progress: true,
      },
    });

    res.status(200).json(students);
  } catch (err) {
    console.error("Erro ao buscar alunos:", err);
    res.status(500).json({ error: "Erro ao buscar alunos", details: err });
  }
};
