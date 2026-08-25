import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

export async function createResumeUploadUrl({ fileName, contentType }) {
  if (!process.env.AWS_S3_BUCKET) throw Object.assign(new Error('AWS_S3_BUCKET is not configured'), { status: 503 })
  const key = `resumes/${crypto.randomUUID()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '-')}`
  const command = new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key, ContentType: contentType })
  return { key, url: await getSignedUrl(client, command, { expiresIn: 900 }) }
}
