import Cors from 'cors'
import { get } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: (
    _req: NextApiRequest,
    _res: NextApiResponse,
    next: (result: unknown) => void,
  ) => void,
) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await runMiddleware(req, res, cors)
  } catch (err) {
    return res.status(500).json({
      message: get(err, 'message', 'Unknown error occurred in cors middleware'),
    })
  }

  // Only POST is supported
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Request body is required
  if (!req.body) {
    return res.status(400).json({ message: 'Invalid request' })
  }

  // Check for secret to confirm this is a valid request
  if (!req.headers) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const token = Buffer.from(authorization.split(' ')[1], 'base64').toString()
  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }

  // Check that urlPath is provided
  if (!req.body.urlPath) {
    return res.status(400).json({ message: 'urlPath is required' })
  }

  // Try to revalidate the page at the url path
  try {
    const urlPath = req.body.urlPath as string
    await res.revalidate(urlPath)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
