import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import { Candidate } from './models/Candidate.js'
import { parseResume } from './services/resumeParser.js'
import { createResumeUploadUrl } from './services/storage.js'

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })
const port = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

const seedCandidates = [
  { name: 'Maya Chen', role: 'Product Designer', initials: 'MC', tone: 'lavender', stage: 'Interview', score: 94, time: '2h ago', location: 'San Francisco, CA' },
  { name: 'Ethan Brooks', role: 'Product Designer', initials: 'EB', tone: 'peach', stage: 'Review', score: 91, time: '4h ago', location: 'New York, NY' },
  { name: 'Priya Shah', role: 'Product Designer', initials: 'PS', tone: 'mint', stage: 'Sourced', score: 88, time: 'Yesterday', location: 'Austin, TX' },
  { name: 'Jordan Lee', role: 'Product Designer', initials: 'JL', tone: 'yellow', stage: 'Offer', score: 96, time: 'Yesterday', location: 'Toronto, CA' },
  { name: 'Noah Williams', role: 'Product Designer', initials: 'NW', tone: 'blue', stage: 'Review', score: 84, time: '2d ago', location: 'Chicago, IL' },
]

app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'ats-api' }))
app.get('/api/candidates', async (_request, response, next) => {
  try {
    if (mongoose.connection.readyState !== 1) return response.json(seedCandidates)
    const candidates = await Candidate.find().sort({ createdAt: -1 }).limit(100).lean()
    response.json(candidates.length ? candidates : seedCandidates)
  } catch (error) { next(error) }
})
app.post('/api/candidates', async (request, response, next) => {
  try {
    if (mongoose.connection.readyState !== 1) return response.status(503).json({ error: 'MongoDB is not connected' })
    const candidate = await Candidate.create(request.body)
    response.status(201).json(candidate)
  } catch (error) { next(error) }
})
app.post('/api/candidates/parse-resume', upload.single('resume'), async (request, response, next) => {
  try {
    if (!request.file) return response.status(400).json({ error: 'A PDF resume is required' })
    response.json(await parseResume(request.file))
  } catch (error) { next(error) }
})
app.post('/api/uploads/resume', async (request, response, next) => {
  try {
    const { fileName, contentType = 'application/pdf' } = request.body
    if (!fileName) return response.status(400).json({ error: 'fileName is required' })
    response.json(await createResumeUploadUrl({ fileName, contentType }))
  } catch (error) { next(error) }
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(error.status || 500).json({ error: error.message || 'Unexpected server error' })
})

if (process.env.MONGODB_URI) mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected')).catch(console.error)
app.listen(port, () => console.log(`ATS API listening on http://localhost:${port}`))
