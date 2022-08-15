import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getFormById(req, res)
    case 'PUT':
      return await editForm(req, res)
    case 'DELETE':
      return await deleteForm(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

const getFormById = async (req, res) => {
  try {
    const forms = await prisma.form.findUnique({
      where: { id: req.params.id },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const editForm = async (req, res) => {
  try {
    const forms = await prisma.form.edit({
      where: { id: req.params.id },
      data: { ...req.body },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const deleteForm = async (req, res) => {
  try {
    const forms = await prisma.form.delete({
      where: { id: req.params.id },
    })
    res.status(200).json(forms)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
