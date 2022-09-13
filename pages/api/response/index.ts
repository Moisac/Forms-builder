import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getFormResponses(req, res)
    case 'POST':
      return await addResponse(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

const getFormResponses = async (req: NextApiRequest, res: NextApiResponse) => {
  const { form_id } = req.query
  try {
    if(form_id) {
      const responses = await prisma.response.findMany({
        where: { formId: form_id } 
      })
      res.status(200).json(responses)
    } else {
      res.status(401).json({ status: 'Required form_id query paremeter.' })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const addResponse = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await prisma.response.create({
      data: { ...req.body },
    })
    res.status(200).json(response)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
