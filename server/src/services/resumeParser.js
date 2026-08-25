import pdfParse from 'pdf-parse'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function parseResume(file) {
  if (file.mimetype !== 'application/pdf') throw Object.assign(new Error('Only PDF resumes are supported'), { status: 415 })
  const { text } = await pdfParse(file.buffer)
  if (!openai) return { text, provider: 'text-only', profile: { skills: [], summary: text.slice(0, 500) } }
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Extract a candidate profile as JSON with name, email, role, skills array, yearsExperience number, and summary string.' },
      { role: 'user', content: text.slice(0, 12000) },
    ],
  })
  return { text, provider: 'openai', profile: JSON.parse(completion.choices[0].message.content) }
}
