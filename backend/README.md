Backend for EcoSphere demo

Quick start

1. Install dependencies:

```bash
cd backend
npm install
```

2. Start server:

```bash
npm run start
# or for development with auto-reload:
npm run dev
```

The server serves the existing frontend from `../Ecosphere/frontend` and exposes simple auth endpoints at `/api/auth`.

Environment

- `PORT` (default 3000)
- `JWT_SECRET` (default `dev_secret_change_me`)
