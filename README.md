# Doc House – Doctor Booking Platform

Modern web app for discovering clinicians, browsing services, checking real-time availability, and booking appointments. Includes rich patient UX, role-based admin tools, email notifications, and image/file handling.

## Highlights
- **Patient experience:** service catalog, doctor directory with search, detailed doctor profiles (overview, locations, reviews, business hours), contact page, appointment history with status pills.
- **Booking flow:** pick service → select date → choose doctor → see available slots → book with visit reason; prevents double booking for the same doctor/service/date.
- **Auth & profile:** Firebase email/password + Google OAuth, JWT persisted via backend, protected routes, profile editing with address fields and avatar upload.
- **Admin console:** dashboards with KPIs, user list, full service CRUD (duration/fee/doctor linking), doctor creation wizard (education, experience, awards, business hours, services, image upload), roster search and edit.
- **Notifications:** queued confirmation and reminder emails (BullMQ + Gmail SMTP) for both patient and doctor; templated HTML.
- **Media & storage:** Cloudinary-backed image upload for doctors/users; Redis caching for doctor lists/details; slot generation utilities.

## Architecture
- **Frontend:** React (Vite) + Tailwind for styling, Redux Toolkit for state, React Router for routing, Framer Motion/Swiper for animation/carousels.
- **Backend:** NestJS + Prisma; Postgres (Neon) via Prisma client; Redis for caching and BullMQ queues; Cloudinary for assets; Gmail SMTP for outbound mail; LLM agent leveraged for assistive flows.
- **Deployment:** Frontend on Vercel; backend + Neon Postgres + Redis services hosted separately; separates public/role-protected surfaces.

## Key Features (by surface)
**Patient**
- Hero + marketing blocks, service highlights, testimonials, featured doctors (Home).
- Full services catalog with duration/fee/linked doctors.
- Doctor directory with name/specialty search and profile deep links.
- Doctor profile tabs: overview, locations, reviews, business hours.
- Guided appointment booking and availability viewer; appointment history.
- Contact form + location/phone CTAs.

**Auth & Profile**
- Login, registration, Google sign-in; JWT persisted for API calls.
- Profile editing (name, phone, address, map link) and avatar upload.

**Admin**
- Dashboard KPIs + charts.
- User list with search and role counts.
- Service management: create, edit, delete, assign doctors, search.
- Doctor management: add/edit roster, specialties, services, education/experience/awards, schedules, image upload.

**Backend Services**
- Users: create/login token, fetch by email, profile/address update, avatar upload, admin-only user list.
- Doctors: CRUD (admin), fetch all/by id, filter by service, cached responses, business-hour–aware availability.
- Services: CRUD with doctor associations, name search.
- Appointments: create with slot conflict checks, user appointment history, duplicate-booking guard.
- Slots: generation utilities per doctor; fetch doctor slots.
- Notifications: queued confirmation + reminder emails.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit, React Router, Framer Motion, Swiper, React Calendar, Firebase Auth.
- **Backend:** NestJS, Prisma, Postgres (Neon), Redis, BullMQ, @nestjs-modules/mailer, Cloudinary, Multer, Passport JWT, LLM agent integration.
- **Tooling:** ESLint, Vercel config for frontend.

## Project Structure (high level)
- `Frontend/src/` – React app (pages, components, Redux slices, Firebase config, axios wrappers).
- `backend/src/` – NestJS modules (`user`, `docter`, `services`, `appointment`, `slots`, `notification`, `upload`, `cloudinary`, `Utils/redis_key`).

## Running Locally (indicative)
1) **Frontend**
```bash
cd Frontend
npm install
npm run dev
```
Set Firebase env and backend base URLs in `src/Utilis/axios*.js` if needed.

2) **Backend**
```bash
cd backend
npm install
# configure .env for Postgres, Redis, Cloudinary, Gmail SMTP, JWT secret
npm run start:dev
```
Ensure Postgres + Redis are reachable (e.g., local services, Neon + managed Redis).

## Notes
- Update `src/Utilis/axios.js` and `axiosSecure.js` to point to your backend host.
- Admin-only routes in the frontend are protected via `PrivateRoute` and role checks; backend double-enforces via JWT guard and role validation.
- Notification queue depends on Redis; email delivery depends on valid SMTP creds.
