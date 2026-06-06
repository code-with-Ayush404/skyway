# Starline Travel Platform

Starline Travel is a premium, production-grade travel & booking platform offering curated tour packages, airport/city transfers, and luxury wedding car rentals across India & Nepal. Designed with an editorial travel magazine aesthetic, the platform features a soft cream background, large serif headings, and a refined teal & gold duo-tone layout.

---

## 🚀 Key Features

- **Tabbed Authentication**: Toggleable Login/Signup page backed by NextAuth.js (email/password + Google OAuth) and bcrypt security.
- **Dynamic Homepage**: Auto-rotating crossfade hero slider, active search box, service teasers, brand stats, and guest stories.
- **Interactive Tour Catalog**: Client-side query search, sorting parameters (Recommended, Price low-high, Price high-low, Rating), price limit filter ($0–$5000), and category tabs (Beach, Adventure, Luxury, Cultural, Honeymoon) rendering 15+ rich tour cards.
- **Itinerary Viewers**: Detailed tabs for single packages (Day-wise checklists, Inclusions, Image galleries) and full collapsible accordions, with dynamic related tours.
- **Transfers Booking Engine**: Airport/city transfers estimator with a 2x2 vehicle type grid (Economy, Comfort, Luxury, Group Van), location lookups, and click-to-book prefilled WhatsApp notifications.
- **Wedding Rentals**: Similar rentals workflow with custom floral decorations configurators, red carpet rollouts, and uniformed chauffeur packages.
- **Contact Channels**: Contact enquiries submission forms, support info cards, and a live Ayodhya office Google Maps iframe integration.
- **Global Actions**: Floating quick chat WhatsApp access, scroll-to-top, and scroll-to-bottom accelerators.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Database & ORM**: PostgreSQL database integrated via Prisma ORM
- **Authentication**: NextAuth.js (JWT sessions, credentials validation, Google OAuth)
- **Validation**: Zod schema validation (Zod models in API controllers and page forms)
- **UI Feedback**: Elegant Sonner toast notifications
- **Icons**: Lucide React icon packs

---

## 📁 Workspace Directory Layout

```text
├── app/
│   ├── api/                   # REST API controllers
│   │   ├── auth/              # NextAuth & registration endpoints
│   │   ├── bookings/          # Booking creation & email logs
│   │   ├── enquiries/         # Contact inquiries
│   │   ├── newsletter/        # Newsletter subscriptions
│   │   ├── packages/          # Tour packages database queries
│   │   ├── taxi-cars/         # Taxi fleet querying
│   │   └── wedding-cars/      # Wedding fleet querying
│   ├── about/                 # About story and team directory
│   ├── auth/                  # Login and signup card
│   ├── contact/               # Contact forms and maps
│   ├── taxi-service/          # Fleet list and estimator
│   ├── tour-packages/         # Main catalog and details dynamic slug routes
│   ├── wedding-rentals/       # Wedding rentals catalog
│   ├── error.tsx              # Fallback error boundary layout
│   ├── globals.css            # Stylesheets with Google Fonts & design systems
│   ├── layout.tsx             # Root layout wraps layouts, provider, toaster
│   └── page.tsx               # Homepage sections assembler
├── components/                # Reusable modular layouts & cards
├── lib/                       # Prisma client, NextAuth configuration, mock data
├── prisma/                    # Schema models and seeding script
├── Dockerfile                 # Production environment packaging Docker instructions
├── docker-compose.yml         # Local PostgreSQL and Next.js orchestration
└── tailwind.config.ts         # Custom travel duo-tone color theme variables
```

---

## 💻 Local Setup Guide

Follow these steps to run Starline Travel on your local machine:

### 1. Prerequisites
- **Node.js**: v18.x or v20.x
- **NPM**: v9.x or newer

### 2. Clone and Install
In your workspace folder:
```bash
npm install
```

### 3. Environment Config
Copy the example variables and rename to `.env`:
```bash
cp .env.example .env
```
Fill in the parameters. For local development without a database connection, **the app has a built-in graceful fallback to mock data** that lets it run completely, but if you want database persistence, write a valid PostgreSQL connection string inside `DATABASE_URL`.

### 4. Database Setup & Seeding
If you have a PostgreSQL database connected, run migrations and seed the database with 15+ packages, 15+ taxis, 15+ wedding cars, and testimonials:
```bash
# Apply schema migrations
npx prisma db push

# Seed database
npx prisma db seed
```
*Note: The default seed command creates an admin account (`admin@starlinetravel.in` / `admin123`) and a traveler account (`traveler@starlinetravel.in` / `user123`).*

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment Guide

You can package and run the application using Docker:

### Run with Docker Compose (Recomended - includes DB)
Start the PostgreSQL database and Next.js container together:
```bash
docker-compose up --build
```
This launches:
- **Starline DB** (PostgreSQL) on port `5432`
- **Starline Web** (Next.js) on port `3000`

### Build Independent Container
```bash
# Build the image
docker build -t starline-travel-app .

# Run the container
docker run -p 3000:3000 --env-file .env starline-travel-app
```
