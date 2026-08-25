import mongoose from 'mongoose'

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: String,
  role: { type: String, required: true },
  location: String,
  resumeKey: String,
  resumeUrl: String,
  stage: { type: String, enum: ['Sourced', 'Review', 'Interview', 'Offer', 'Rejected'], default: 'Sourced' },
  score: { type: Number, min: 0, max: 100, default: 0 },
  skills: [String],
  aiSummary: String,
}, { timestamps: true })

export const Candidate = mongoose.model('Candidate', candidateSchema)
