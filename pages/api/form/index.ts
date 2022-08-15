import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getAllForms(req, res)
    case 'POST':
      return await addForm(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

const getAllForms = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const forms = await prisma.form.findMany()
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const addForm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const forms = await prisma.form.create({
      data: { ...req.body },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
