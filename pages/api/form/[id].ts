import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getFormById(req, res)
    case 'PATCH':
      return await editForm(req, res)
    case 'DELETE':
      return await deleteForm(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

const getFormById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const forms = await prisma.form.findFirst({
      where: { id },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const editForm = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const forms = await prisma.form.update({
      where: { id },
      data: { ...req.body },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const deleteForm = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const forms = await prisma.form.delete({
      where: { id },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
