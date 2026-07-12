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

Seeding demo user

1. Install dependencies and run the seed script to insert a demo user:

```bash
cd backend
npm install
node seed.js
```

The seeded demo credentials:

- Email: `demo@ecos.com`
- Password: `password123`

If your system doesn't have Node.js installed, install Node 16+ and npm first.

