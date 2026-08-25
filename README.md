# AI-Powered Applicant Tracking System

A full-stack ATS foundation with a React/Vite dashboard, React Query data layer, MUI-ready frontend dependencies, Express API, MongoDB persistence, PDF resume parsing, OpenAI extraction, presigned AWS S3 uploads, and an optional FastAPI text-processing service.

## Run locally

1. Install frontend dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure MongoDB, AWS, and AI keys as needed.
3. Start MongoDB: `docker compose up -d mongo`
4. Run the dashboard: `npm run dev`
5. Run the API in a second terminal: `npm run server` (http://localhost:4000)
6. Optional Python service: install `python-service/requirements.txt`, then run `npm run python`.

The dashboard falls back to seeded candidates when the API or MongoDB is unavailable, so the frontend remains immediately usable.

## API

- `GET /api/health`
- `GET /api/candidates`
- `POST /api/candidates`
- `POST /api/candidates/parse-resume` with multipart field `resume`
- `POST /api/uploads/resume` returns a 15-minute S3 presigned upload URL

Production hardening still required before deployment: authentication/authorization, rate limiting, antivirus scanning, audit logs, and secrets management.

## Project Team

This project was designed and developed collaboratively by three team members:

- **Aashu Tiwari** - Frontend development, backend API development, and GitHub repository management.
- **Yashvir Singh Parihar** - Full-stack development and integration of frontend and backend features.
- **Ramachandrudu Chakali** - Database design and data modeling for the applicant tracking system.

Together, the team worked on the architecture, implementation, integration, and documentation of this AI-powered Applicant Tracking System.

## Delivery Notes

The dashboard is designed for fast daily review: search, stage filters, shortlist actions, and clear pipeline signals are available from the overview.

The interface uses React, Vite, React Query, and Lucide icons to support a fast, focused recruiting workflow.

## Validation

Run `npm run lint` to validate the frontend before committing changes.
