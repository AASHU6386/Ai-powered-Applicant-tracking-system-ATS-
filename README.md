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

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
