## Task 1: API Documentation (Swagger/OpenAPI)

**Goal:** Generate comprehensive API docs accessible via `/api-docs`

**Milestones:**

### M1.1: Setup Dependencies
- Install: `swagger-jsdoc`, `swagger-ui-express`
- Config file: `be/src/config/swagger.js`
- Define base config: title, version, servers, security schemes (Bearer JWT)

### M1.2: Document Auth Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- Schema: User, LoginRequest, RegisterRequest, AuthResponse

### M1.3: Document Templates Endpoints
- `GET /api/templates` (with query params: search, category_id, tag_id[], stack_id[], page, limit)
- `GET /api/templates/:id`
- `POST /api/templates` (multipart/form-data — images)
- `PUT /api/templates/:id`
- `DELETE /api/templates/:id`
- `POST /api/templates/:id/upvote`
- `POST /api/templates/:id/bookmark`
- `POST /api/templates/:id/download`
- Schema: Template, TemplateListResponse, TemplateDetail

### M1.4: Document Profile Endpoints
- `GET /api/profile`
- `PUT /api/profile`
- `POST /api/profile/avatar`
- `GET /api/profile/bookmarks`
- `GET /api/profile/templates`
- Schema: Profile, ProfileUpdate

### M1.5: Document Admin Endpoints
- `GET /api/admin/users`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/templates`
- `PATCH /api/admin/templates/:id/status`
- `GET /api/admin/reports`
- `PATCH /api/admin/reports/:id`
- Schema: AdminUserList, AdminTemplateList, Report

### M1.6: Document Master Data Endpoints
- `GET /api/categories`
- `GET /api/tags`
- `GET /api/stacks`
- Schema: Category, Tag, Stack

### M1.7: Document Report Endpoint
- `POST /api/templates/:id/report`
- Schema: ReportRequest

### M1.8: Mount Swagger
- Add route di api.js atau index.js
- Serve docs di `/api-docs`

---

## Task 2: Database Seeding

**Goal:** Populate master tables dengan data realistic untuk development/demo

**Milestones:**

### M2.1: Setup Seeder Structure
- Create folder: `be/src/seeders/`
- Files: 
  - `index.js` (orchestrator)
  - `categories.seed.js`
  - `tags.seed.js`
  - `stacks.seed.js`
- Add npm script: `"seed": "node src/seeders/index.js"`

### M2.2: Categories Seeder (10 items)
Data contoh:
- Web Development
- Mobile App
- Desktop App
- Landing Page
- Dashboard
- E-commerce
- Portfolio
- Blog
- SaaS
- Admin Panel

Logic:
- Check existing via slug
- Insert hanya jika belum ada (idempotent)
- Return created/skipped count

### M2.3: Tags Seeder (50 items)
Data contoh groups:
- UI/UX: responsive, dark-mode, light-mode, minimalist, modern, glassmorphism
- Tech: typescript, javascript, api, rest, graphql, websocket
- Features: authentication, payment, search, filter, pagination, crud
- Framework: react, vue, angular, svelte, nextjs, nuxt
- Style: tailwind, bootstrap, material-ui, chakra-ui
- etc.

Logic: sama dengan categories (check + insert)

### M2.4: Stacks Seeder (30 items)
Data contoh dengan icons:
- Frontend: React (react.svg), Vue (vue.svg), Angular, Svelte, Next.js
- Backend: Node.js, Express, NestJS, Django, Flask, Laravel, Spring Boot
- Database: PostgreSQL, MySQL, MongoDB, Redis
- CSS: Tailwind, Bootstrap, Sass
- Tools: Docker, Git, VS Code
- etc.

Fields:
- `name`: "React"
- `slug`: "react"
- `icon_url`: "/icons/react.svg" (atau CDN)
- `category`: "frontend" / "backend" / "database" / "css" / "tool"

Logic: check existing + insert

### M2.5: Error Handling & Logging
- Wrap dalam try-catch per seeder
- Log progress: "Seeding categories... 10 created, 0 skipped"
- Exit gracefully, close DB connection

---

## Execution Plan

**Order:**
1. Task 1 first (documentation) → output: `/api-docs` endpoint
2. Task 2 second (seeding) → output: `npm run seed` command

**Dependencies:**
- Task 1 needs existing routes readable (sudah ada)
- Task 2 needs database schema (sudah ada)
- No inter-task dependency

**Estimated effort:**
- Task 1: ~2-3 hours (banyak endpoint)
- Task 2: ~1 hour

---

Lanjut implement Task 1 dulu atau Task 2? Atau ada yang perlu direvisi dari plan ini?