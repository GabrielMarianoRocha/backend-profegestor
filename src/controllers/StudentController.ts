import { Request, Response } from "express"
import { prisma } from '../prisma'

export const createStudent = async (req: Request, res: Response) => {
    const { name, email, phone, startDate, monthlyFee, notes, userId, classes, payments, progress } = req.body

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

        res.status(201).json(
            { 
              student: student.id,
              name: student.name, 
              email: student.email, 
              phone: student.phone, 
              startDate: student.startDate, 
              monthlyFee: student.monthlyFee, 
              notes: student.notes,
              userId: student.userId,
              classes: student.classes, 
              payments: student.payments, 
              progress: student.progress
            }

        )
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
