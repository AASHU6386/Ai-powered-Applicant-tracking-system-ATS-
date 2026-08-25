import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title='ATS Text Processing Service')

class ResumeText(BaseModel):
    text: str

@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'text-processing'}

@app.post('/extract-keywords')
def extract_keywords(payload: ResumeText):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail='Resume text is required')
    words = [word.strip('.,:;()[]').lower() for word in payload.text.split()]
    known_skills = {'python', 'javascript', 'react', 'node', 'mongodb', 'aws', 'sql', 'figma', 'docker', 'java'}
    return {'keywords': sorted({word for word in words if word in known_skills})}
