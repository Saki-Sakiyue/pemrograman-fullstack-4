# Dokumentasi Sprint Proyek - Kelompok 4
Dokumen ini berisi tabel pembagian tugas dan progress pengerjaan untuk **Sprint 9** (Frontend Layout & Komponen) dan **Sprint 10** (Konsumsi API Backend) menggunakan React/Next.js.

---

## 📅 Sprint 9: Frontend Layout & Component Architecture (React/Next.js)
**Fokus Utama:** Inisialisasi lingkungan React (Next.js), pembuatan layout dasar (Navbar, Sidebar, Wrapper), serta penyusunan kerangka halaman (Page Skeletons).

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | L | 5 | 2 | 2 | Feat | FE | Inisialisasi proyek Next.js, konfigurasi routing, setup Tailwind CSS, dan struktur global layout. | **RRT** | `>` | `>` | - | - | - | 100% |
| **2** | M | 3 | 1 | 1 | Feat | FE | Membuat komponen global `Navbar.tsx` dan `Sidebar.tsx` yang responsif. | **SR** | - | `>` | - | - | - | 100% |
| **3** | M | 3 | 1 | 1 | Feat | FE | Membuat kerangka halaman dasbor (`DashboardPage`) dan profil pengguna. | **MRP** | - | - | `>` | - | - | 100% |
| **4** | M | 3 | 1 | 1 | Feat | FE | Menyusun kerangka halaman galeri template kosong dan kartu detail template sebagai placeholder awal. | **NBZ** | - | - | - | `>` | `>` | 100% |

---

## 📅 Sprint 10: API Integration & Data Binding (Public / Tanpa Autentikasi)
**Fokus Utama:** Mengonsumsi API backend ke frontend menggunakan Axios dan React Query (TanStack Query), menampilkan data riil dari database ke UI, serta menangani aksi non-autentikasi (baca data).

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | L | 5 | 2 | 2 | Feat | FE | Membuat konfigurasi `apiClient` (`axiosInstance.ts`), setup penanganan error global via `Sonner` toast, serta registrasi `QueryProvider` (React Query). | **RRT** | `>` | `>` | - | - | - | 100% |
| **2** | M | 3 | 1 | 1 | Feat | FE | Mengonsumsi API `GET /api/templates` untuk menampilkan daftar template secara dinamis di galeri (`TemplatesPage`), lengkap dengan fitur search debounced dan pagination. | **MRP** | - | `>` | `>` | - | - | 100% |
| **3** | M | 3 | 1 | 1 | Feat | FE | Mengonsumsi API `GET /api/templates/:id` ke halaman detail (`TemplateDetailPage`) untuk merender data detail template (pembuat, deskripsi, tautan pratinjau). | **SR** | - | - | - | `>` | - | 100% |
| **4** | M | 3 | 1 | 1 | Feat | FE | Mengintegrasikan pemuatan gambar dinamis (galeri thumbnail), badge kategori, tech stacks dinamis, serta total download dan upvote dari database. | **NBZ** | - | - | - | - | `>` | 100% |

---

### Keterangan Simbol Timeline:
*   `>` : Periode pengerjaan aktif tugas tersebut.
*   `-` : Hari di mana tugas belum atau telah selesai dikerjakan.
*   **Progress 100%** menandakan fitur telah berhasil diverifikasi secara lokal dan siap dikumpulkan.

---

## 📊 Gap Analysis: PRD vs Implementasi Saat Ini (Sprint 11 ✅)

Tabel berikut merangkum status fitur PRD setelah **Sprint 11 selesai**. Bug kritis sudah ditangani semua.

| Kategori PRD | Fitur | Status |
|---|---|---|
| **MVP** | Register Page (UI) | ❌ Belum ada halaman `/register` di FE — dijadwalkan Sprint 12 |
| **MVP** | Upload Template (UI + API sudah ada) | ❌ Form upload belum ada di FE — dijadwalkan Sprint 13 |
| **MVP** | Search & Filter by Kategori | ✅ `GET /api/categories` sudah ada di BE & FE (`CategoryFilter` pakai `useCategories` hook) |
| **MVP** | Bookmark Page (Halaman daftar bookmark user) | ❌ Halaman `/bookmarks` belum ada di FE — dijadwalkan Sprint 13 |
| **MVP** | Admin Dashboard | ❌ Sama sekali belum ada — dijadwalkan Sprint 14 |
| **Enhancement** | User Profile Page (edit profil) | ❌ Halaman profil belum ada di FE (API sudah ada) — dijadwalkan Sprint 12 |
| **Enhancement** | Reporting System (UI) | ❌ API `POST /api/reports` ada, tapi UI belum ada — dijadwalkan Sprint 13 |
| **Bug Kritis** | SQL WHERE clause rusak saat search | ✅ **Fixed** — parentheses sudah ada di `TemplateController.index()` |
| **Bug Kritis** | `proxy.ts` → auth guard aktif | ✅ **Fixed** — Next.js 16.2.6 support `proxy.ts` native, diverifikasi redirect berjalan |
| **Bug Kritis** | Cookie token tanpa `httpOnly` | ✅ **Fixed** — hapus flag `httpOnly` dari `setCookie` client (browser tidak support); `secure` + `sameSite` tetap ada |
| **Bug Kritis** | IDOR di `update()` template | ✅ **Fixed** — ownership check `user_id !== userId && role !== 'admin'` sudah ada |
| **Bug Kritis** | `isSvgImage(null)` crash di Navbar | ✅ **Fixed** (Sprint 11 tambahan) — null guard di `lib/image.ts` |
| **Bug Kritis** | Avatar Navbar crash saat `avatar_url` null | ✅ **Fixed** (Sprint 11 tambahan) — refactor ke `AvatarImage` + `AvatarFallback` |
| **Performa** | `<Image fill>` tanpa `sizes` prop | ✅ **Fixed** (Sprint 11 tambahan) — `sizes` ditambahkan di `TemplateCard`, `[id]/page.tsx` |
| **Dashboard** | Statistik real dari API (bukan hardcode) | ❌ Angka dashboard masih hardcode — dijadwalkan Sprint 14 |
| **Advanced** | Popular Templates / Trending Page | ❌ Belum ada halaman trending — dijadwalkan Sprint 15 |

---

## 📅 Sprint 11: Bugfix Kritis & Fondasi Keamanan
**Fokus Utama:** Memperbaiki semua bug kritis yang ditemukan dari code review sebelum melanjutkan pengembangan fitur baru. Sprint ini adalah prasyarat keamanan.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | S | 2 | 1 | 1 | Bugfix | BE | Perbaiki SQL WHERE clause di `TemplateController.index()` — bungkus kondisi OR pencarian dalam parentheses `(t.title LIKE ? OR t.description LIKE ?)` agar filter `deleted_at` dan `is_active` tidak ter-bypass. ✅ Sudah ada di codebase. | **RRT** | `>` | - | - | - | - | 100% |
| **2** | M | 3 | 1 | 1 | Bugfix | BE | Perbaiki IDOR vulnerability di `TemplateController.update()` — ownership check (`template[0].user_id !== userId && userRole !== 'admin'`) sudah diimplementasikan di codebase, konsisten dengan `destroy()`. ✅ | **SR** | - | `>` | - | - | - | 100% |
| **3** | M | 3 | 1 | 1 | Bugfix | FE | Auth guard via `src/proxy.ts` — Next.js 16.2.6 mendukung `proxy.ts` secara native sebagai middleware file. `protectedRoutes` sudah mencakup `/dashboard`, `/templates`, `/bookmarks`, `/profile`, `/admin`. Diverifikasi: akses tanpa login redirect ke `/login?redirect=...`. ✅ | **MRP** | - | - | `>` | - | - | 100% |
| **4** | S | 2 | 1 | 1 | Bugfix | FE | Perbaiki cookie di login page: hapus `httpOnly: true` dari `setCookie` client-side (browser JS tidak bisa set httpOnly — hanya server yang bisa). Pertahankan `secure` (production), `sameSite: 'lax'`, `maxAge: 86400`. Perbaiki optional chaining `images?.find(...)` dan `images?.[0]?.image_url` di halaman detail. ✅ | **NBZ** | - | - | - | `>` | - | 100% |

### 🔧 Bugfix Tambahan (Ditemukan saat verifikasi Sprint 11)

| No | File | Bug | Fix | Status |
|---|---|---|---|---|
| **+1** | `src/lib/image.ts` | `isSvgImage(null)` crash — `TypeError: Cannot read properties of null` saat `avatar_url` user adalah `null` | Tambah guard `if (!url) return false`, ubah tipe ke `string \| null \| undefined` | ✅ |
| **+2** | `src/components/layout/Navbar.tsx` | `<Image fill>` di dalam `<AvatarFallback>` (parent `position:static`) → error `src=""` dan posisi invalid saat `avatar_url` null | Refactor ke pola `<AvatarImage>` + `<AvatarFallback>` yang benar dari shadcn/ui | ✅ |
| **+3** | `src/components/templates/TemplateCard.tsx` | `<Image fill>` tanpa `sizes` prop → Next.js performance warning | Tambah `sizes` responsive sesuai grid breakpoint | ✅ |
| **+4** | `src/app/(protected)/templates/[id]/page.tsx` | `<Image fill>` tanpa `sizes` di main image, thumbnail, dan avatar; LCP image tanpa `priority` | Tambah `sizes` + `priority` di main image, `sizes="128px"` di thumbnail, `sizes="40px"` di avatar | ✅ |

---

## 📅 Sprint 12: Autentikasi Lengkap & Profil Pengguna
**Fokus Utama:** Melengkapi fitur autentikasi (Register UI) dan halaman profil pengguna yang sudah ada API-nya tapi belum ada UI-nya. Ini adalah fitur MVP yang masih kurang.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | M | 3 | 1 | - | Feat | FE | Buat halaman Register (`/register`) dengan form `username`, `email`, `password`, `passwordConfirm`. Konsumsi `POST /api/auth/register`. Tambahkan validasi client-side yang sesuai dengan validator backend (3–20 karakter, password min 8 karakter + huruf besar + angka). Gunakan animasi Framer Motion serupa halaman login. | **RRT** | `>` | `>` | - | - | - | 0% |
| **2** | M | 3 | 1 | - | Feat | FE | Buat halaman Profil Pengguna (`/profile`) — tampilkan data user (username, email, role, avatar, tanggal bergabung) menggunakan `GET /api/profile`. Konsumsi `PATCH /api/profile` untuk update username dan password. Tambahkan form edit inline dengan feedback toast. | **SR** | - | - | `>` | `>` | - | 0% |
| **3** | M | 3 | 1 | - | Feat | FE | Implementasi upload avatar di halaman profil — gunakan `input type="file"` dengan preview gambar sebelum upload, kirim sebagai `multipart/form-data` ke `PATCH /api/profile`. Handle token baru yang dikembalikan API jika username berubah (update cookie dan Zustand store). | **NBZ** | - | - | - | - | `>` | 0% |
| **4** | S | 2 | 1 | - | Feat | BE | Tambahkan endpoint `GET /api/categories` yang mengembalikan semua kategori dari tabel `categories`. Endpoint ini bersifat publik (tanpa auth). Buat `CategoryController` dan update `api.js`. | **MRP** | `>` | - | - | - | - | 0% |

---

## 📅 Sprint 13: Filter Kategori, Bookmark Page & Upload Template
**Fokus Utama:** Menghubungkan fitur kategori ke FE, membuat halaman bookmark user, dan membangun form upload template — tiga fitur MVP yang belum ada di frontend.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | M | 3 | 1 | - | Feat | FE | Sambungkan `CategoryFilter` ke API nyata: buat `useCategories` hook (TanStack Query) yang mengkonsumsi `GET /api/categories`. Hapus data mock dan uncomment `useCategories()` di `CategoryFilter.tsx`. Hubungkan `selectedCategory` ke parameter `category_id` saat memanggil `GET /api/templates`. | **MRP** | `>` | `>` | - | - | - | 0% |
| **2** | L | 5 | 2 | - | Feat | FE | Buat halaman Bookmark (`/bookmarks`) — tambahkan endpoint `GET /api/bookmarks` di BE yang mengambil semua template yang di-bookmark user yang sedang login. Di FE, tampilkan daftar template yang dibookmark menggunakan `TemplateCard` dengan state kosong yang menarik. | **SR** | - | - | `>` | `>` | - | 0% |
| **3** | L | 5 | 2 | - | Feat | FE | Buat halaman Upload Template (`/templates/upload`) dengan form lengkap: `title`, `description`, `category_id` (dropdown dari API), `upload_type` (radio: file/url/both), `source_url`, `demo_url`. Konsumsi `POST /api/templates`. Tambahkan navigasi ke Sidebar. | **RRT** | - | - | - | - | `>` | 0% |
| **4** | S | 2 | 1 | - | Feat | FE | Tampilkan tombol Report di halaman detail template — buat modal/dialog konfirmasi dengan textarea `reason`. Konsumsi `POST /api/reports`. Tambahkan feedback toast sukses/gagal. | **NBZ** | `>` | - | - | - | - | 0% |

---

## 📅 Sprint 14: Admin Dashboard & Dashboard Statistik Real
**Fokus Utama:** Membangun Admin Dashboard untuk moderasi konten (fitur MVP yang belum ada) dan mengganti data hardcode di Dashboard dengan data real dari API.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | L | 5 | 2 | - | Feat | BE | Buat endpoint `GET /api/admin/users` (admin only), `GET /api/admin/reports` (admin only), dan `PATCH /api/admin/reports/:id` untuk update status laporan (pending→resolved/rejected). Tambahkan middleware pengecekan role admin (`req.user.role === 'admin'`). | **RRT** | `>` | `>` | - | - | - | 0% |
| **2** | L | 5 | 2 | - | Feat | FE | Buat halaman Admin Dashboard (`/admin`) dengan tab navigasi: (1) **Manajemen Template** — tabel semua template dengan tombol soft-delete; (2) **Manajemen Laporan** — tabel semua laporan dengan tombol ubah status; (3) **Manajemen User** — tabel semua user. Halaman ini hanya accessible untuk role `admin`. | **NBZ** | - | - | `>` | `>` | - | 0% |
| **3** | M | 3 | 1 | - | Feat | BE | Buat endpoint `GET /api/profile/stats` yang mengembalikan statistik user yang sedang login: total template diupload, total download kumulatif, total upvote diterima, total bookmark diterima. | **MRP** | `>` | - | - | - | - | 0% |
| **4** | M | 3 | 1 | - | Feat | FE | Ganti data hardcode di `DashboardPage` dengan data real dari `GET /api/profile/stats`. Gunakan `useQuery` TanStack Query. Tampilkan skeleton loading yang sesuai. | **SR** | - | - | - | - | `>` | 0% |

---

## 📅 Sprint 15: Halaman Trending, Polish UI & Quality Assurance
**Fokus Utama:** Menyelesaikan fitur enhancement terakhir (Popular/Trending page), melakukan polish UI menyeluruh, memperbaiki root page yang masih boilerplate Next.js, dan melakukan QA final sebelum demo.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | M | 3 | 1 | - | Feat | BE+FE | Tambahkan endpoint `GET /api/templates/trending` di BE (query templates diurutkan `ORDER BY popularity_score DESC LIMIT 10`). Di FE, buat halaman `/trending` yang menampilkan template terpopuler dalam grid card dengan badge ranking. | **NBZ** | `>` | `>` | - | - | - | 0% |
| **2** | L | 5 | 2 | - | Feat | FE | Buat Landing Page (`/`) yang layak — ganti boilerplate Next.js default. Tampilkan: hero section dengan tagline Templas, grid 6 template populer (konsumsi API), section fitur unggulan, dan tombol CTA (Login / Explore Templates). | **MRP** | - | - | `>` | `>` | - | 0% |
| **3** | M | 3 | 1 | - | Fix | FE | Polish UI menyeluruh: (1) Tambahkan icon yang tepat di Sidebar (`Search` atau `Compass` untuk Explore, bukan `Beaker`); (2) Aktifkan Pino HTTP logger di `BE/index.js`; (3) Sambungkan menu "Pengaturan Profil" di Navbar ke `/profile`; (4) Tambahkan link `/templates/upload` di Sidebar; (5) Perbaiki root redirect `/` ke `/login` atau landing page. | **SR** | - | - | - | `>` | - | 0% |
| **4** | M | 3 | 1 | - | QA | BE+FE | Quality Assurance & Testing Final: (1) Uji semua alur happy path (register→login→browse→download→upvote→bookmark→logout); (2) Uji error handling (token expired, input invalid, template tidak ditemukan); (3) Verifikasi auth guard middleware berjalan di semua protected routes; (4) Test responsivitas mobile. | **RRT** | - | - | - | - | `>` | 0% |

---

### 📋 Rekap Story Points Sprint 11–15

| Sprint | Fokus | Total SP | Keterangan |
|---|---|---|---|
| Sprint 11 | Bugfix Kritis & Keamanan | 10 SP | **Prioritas Tertinggi** — harus selesai sebelum sprint lain |
| Sprint 12 | Auth Lengkap & Profil | 11 SP | Fitur MVP yang masih kurang |
| Sprint 13 | Kategori, Bookmark & Upload | 15 SP | Fitur MVP terbesar |
| Sprint 14 | Admin Dashboard & Stats Real | 16 SP | Enhancement + MVP Admin |
| Sprint 15 | Trending, Landing Page & QA | 14 SP | Polish & finalisasi |
| **Total** | | **66 SP** | |

---

## 📚 Pembagian Tugas per Sprint — Kurikulum Kelas

> Bagian ini memetakan **topik kurikulum kelas** ke implementasi nyata proyek Kelompok 4.
> Anggota: **RRT** (Ketua), **SR**, **MRP**, **NBZ**

---

## 📅 Sprint 10 (Kelas): Consume API Backend → Frontend (Tanpa Autentikasi)
**Fokus Utama:** Mengonsumsi API backend ke frontend menggunakan Axios dan TanStack Query (React Query). Semua endpoint yang diakses bersifat publik — belum menggunakan token autentikasi.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Setup HTTP Client & Query Provider | Konfigurasi `axiosInstance` dengan `baseURL`, interceptor error global via Sonner toast, registrasi `QueryClientProvider` di layout | `src/api/axiosInstance.ts`, `src/providers/QueryProvider.tsx` | ✅ 100% |
| **2** | **MRP** | Consume `GET /api/templates` | Implementasi `useTemplates` hook (TanStack Query), tampilkan daftar template di `TemplatesPage` dengan search debounced (500ms) dan pagination | `src/hooks/queries/template.queries.ts`, `src/app/(protected)/templates/page.tsx` | ✅ 100% |
| **3** | **SR** | Consume `GET /api/templates/:id` | Implementasi `useTemplateDetail` hook, render data detail template (pembuat, deskripsi, tautan pratinjau) di `TemplateDetailPage` | `src/app/(protected)/templates/[id]/page.tsx` | ✅ 100% |
| **4** | **NBZ** | Integrasi Gambar, Badge & Statistik | Pemuatan gambar dinamis (galeri thumbnail dengan `getFullImageUrl`), badge kategori, tech stacks dinamis, total download & upvote dari database | `src/components/templates/TemplateCard.tsx`, `src/types/template.types.ts` | ✅ 100% |

---

## 📅 Sprint 11 (Kelas): Frontend Layout, Routing, Login/Register UI & Reusable Components
**Fokus Utama:** Membangun struktur layout utama aplikasi, mengimplementasikan routing berbasis Next.js App Router, membuat halaman Login & Register, dan menyusun komponen reusable untuk kebutuhan frontend.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Inisialisasi Proyek & Routing | Setup Next.js 16 dengan App Router, konfigurasi Tailwind CSS, struktur folder `app/(protected)/`, global layout dengan font & metadata | `fe/next.config.ts`, `src/app/layout.tsx` | ✅ 100% |
| **2** | **SR** | Reusable Component: Navbar & Sidebar | `Navbar.tsx` responsif dengan dropdown user (Avatar, logout), `Sidebar.tsx` dengan navigasi link aktif | `src/components/layout/Navbar.tsx`, `src/components/layout/Sidebar.tsx` | ✅ 100% |
| **3** | **MRP** | Halaman Login UI | `LoginPage` dengan animasi Framer Motion, parallax mouse effect, floating stat cards (count-up animation), form username+password, ripple button | `src/app/login/page.tsx` | ✅ 100% |
| **4** | **NBZ** | Reusable Component: TemplateCard & Skeleton | `TemplateCard` komponen kartu template reusable (thumbnail, badge, stats, tombol View), skeleton loading state untuk galeri | `src/components/templates/TemplateCard.tsx`, `src/components/templates/CategoryFilter.tsx` | ✅ 100% |

---

## 📅 Sprint 12 (Kelas): React Fundamentals — JSX, Component, Props, State, Events, Forms, dll
**Fokus Utama:** Mengimplementasikan konsep-konsep dasar React dalam komponen proyek nyata.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | JSX + Component + Props | Semua komponen ditulis dalam JSX. `TemplateCard` menerima prop `template: Template`. `CategoryFilter` menerima `selectedId` & `onSelect` sebagai props | `src/components/templates/TemplateCard.tsx`, `src/components/templates/CategoryFilter.tsx` | ✅ 100% |
| **2** | **MRP** | State + List & Keys + Conditional Rendering | `useState` untuk `page`, `searchQuery`, `selectedCategory`. `.map()` dengan `key={template.id}` untuk render daftar template. Render kondisional: loading skeleton / error / empty / data | `src/app/(protected)/templates/page.tsx` | ✅ 100% |
| **3** | **SR** | Events + Forms | `onChange` pada input search, `onClick` pada pagination & tombol kategori, `onSubmit` pada form login, `handleLogin` async event handler | `src/app/login/page.tsx`, `src/app/(protected)/templates/page.tsx` | ✅ 100% |
| **4** | **NBZ** | Lifting State + Composition | `selectedCategory` state di-lift ke `TemplatesPage`, diteruskan ke `CategoryFilter` via props. Komposisi: `TemplatesPage` menyusun `CategoryFilter` + `TemplateCard` + pagination menjadi satu halaman | `src/app/(protected)/templates/page.tsx`, `src/components/templates/CategoryFilter.tsx` | ✅ 100% |

---

## 📅 Sprint 13 (Kelas): Autentikasi, Global State Management, Protected Routes & Git
# Dokumentasi Sprint Proyek - Kelompok 4
Dokumen ini berisi tabel pembagian tugas dan progress pengerjaan untuk **Sprint 9** (Frontend Layout & Komponen) dan **Sprint 10** (Konsumsi API Backend) menggunakan React/Next.js.

---

## 📅 Sprint 9: Frontend Layout & Component Architecture (React/Next.js)
**Fokus Utama:** Inisialisasi lingkungan React (Next.js), pembuatan layout dasar (Navbar, Sidebar, Wrapper), serta penyusunan kerangka halaman (Page Skeletons).

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | L | 5 | 2 | 2 | Feat | FE | Inisialisasi proyek Next.js, konfigurasi routing, setup Tailwind CSS, dan struktur global layout. | **RRT** | `>` | `>` | - | - | - | 100% |
| **2** | M | 3 | 1 | 1 | Feat | FE | Membuat komponen global `Navbar.tsx` dan `Sidebar.tsx` yang responsif. | **SR** | - | `>` | - | - | - | 100% |
| **3** | M | 3 | 1 | 1 | Feat | FE | Membuat kerangka halaman dasbor (`DashboardPage`) dan profil pengguna. | **MRP** | - | - | `>` | - | - | 100% |
| **4** | M | 3 | 1 | 1 | Feat | FE | Menyusun kerangka halaman galeri template kosong dan kartu detail template sebagai placeholder awal. | **NBZ** | - | - | - | `>` | `>` | 100% |

---

## 📅 Sprint 10: API Integration & Data Binding (Public / Tanpa Autentikasi)
**Fokus Utama:** Mengonsumsi API backend ke frontend menggunakan Axios dan React Query (TanStack Query), menampilkan data riil dari database ke UI, serta menangani aksi non-autentikasi (baca data).

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | L | 5 | 2 | 2 | Feat | FE | Membuat konfigurasi `apiClient` (`axiosInstance.ts`), setup penanganan error global via `Sonner` toast, serta registrasi `QueryProvider` (React Query). | **RRT** | `>` | `>` | - | - | - | 100% |
| **2** | M | 3 | 1 | 1 | Feat | FE | Mengonsumsi API `GET /api/templates` untuk menampilkan daftar template secara dinamis di galeri (`TemplatesPage`), lengkap dengan fitur search debounced dan pagination. | **MRP** | - | `>` | `>` | - | - | 100% |
| **3** | M | 3 | 1 | 1 | Feat | FE | Mengonsumsi API `GET /api/templates/:id` ke halaman detail (`TemplateDetailPage`) untuk merender data detail template (pembuat, deskripsi, tautan pratinjau). | **SR** | - | - | - | `>` | - | 100% |
| **4** | M | 3 | 1 | 1 | Feat | FE | Mengintegrasikan pemuatan gambar dinamis (galeri thumbnail), badge kategori, tech stacks dinamis, serta total download dan upvote dari database. | **NBZ** | - | - | - | - | `>` | 100% |

---

### Keterangan Simbol Timeline:
*   `>` : Periode pengerjaan aktif tugas tersebut.
*   `-` : Hari di mana tugas belum atau telah selesai dikerjakan.
*   **Progress 100%** menandakan fitur telah berhasil diverifikasi secara lokal dan siap dikumpulkan.

---

## 📊 Gap Analysis: PRD vs Implementasi Saat Ini (Sprint 11 ✅)

Tabel berikut merangkum status fitur PRD setelah **Sprint 11 selesai**. Bug kritis sudah ditangani semua.

| Kategori PRD | Fitur | Status |
|---|---|---|
| **MVP** | Register Page (UI) | ❌ Belum ada halaman `/register` di FE — dijadwalkan Sprint 12 |
| **MVP** | Upload Template (UI + API sudah ada) | ❌ Form upload belum ada di FE — dijadwalkan Sprint 13 |
| **MVP** | Search & Filter by Kategori | ✅ `GET /api/categories` sudah ada di BE & FE (`CategoryFilter` pakai `useCategories` hook) |
| **MVP** | Bookmark Page (Halaman daftar bookmark user) | ❌ Halaman `/bookmarks` belum ada di FE — dijadwalkan Sprint 13 |
| **MVP** | Admin Dashboard | ❌ Sama sekali belum ada — dijadwalkan Sprint 14 |
| **Enhancement** | User Profile Page (edit profil) | ❌ Halaman profil belum ada di FE (API sudah ada) — dijadwalkan Sprint 12 |
| **Enhancement** | Reporting System (UI) | ❌ API `POST /api/reports` ada, tapi UI belum ada — dijadwalkan Sprint 13 |
| **Bug Kritis** | SQL WHERE clause rusak saat search | ✅ **Fixed** — parentheses sudah ada di `TemplateController.index()` |
| **Bug Kritis** | `proxy.ts` → auth guard aktif | ✅ **Fixed** — Next.js 16.2.6 support `proxy.ts` native, diverifikasi redirect berjalan |
| **Bug Kritis** | Cookie token tanpa `httpOnly` | ✅ **Fixed** — hapus flag `httpOnly` dari `setCookie` client (browser tidak support); `secure` + `sameSite` tetap ada |
| **Bug Kritis** | IDOR di `update()` template | ✅ **Fixed** — ownership check `user_id !== userId && role !== 'admin'` sudah ada |
| **Bug Kritis** | `isSvgImage(null)` crash di Navbar | ✅ **Fixed** (Sprint 11 tambahan) — null guard di `lib/image.ts` |
| **Bug Kritis** | Avatar Navbar crash saat `avatar_url` null | ✅ **Fixed** (Sprint 11 tambahan) — refactor ke `AvatarImage` + `AvatarFallback` |
| **Performa** | `<Image fill>` tanpa `sizes` prop | ✅ **Fixed** (Sprint 11 tambahan) — `sizes` ditambahkan di `TemplateCard`, `[id]/page.tsx` |
| **Dashboard** | Statistik real dari API (bukan hardcode) | ❌ Angka dashboard masih hardcode — dijadwalkan Sprint 14 |
| **Advanced** | Popular Templates / Trending Page | ❌ Belum ada halaman trending — dijadwalkan Sprint 15 |

---

## 📅 Sprint 11: Bugfix Kritis & Fondasi Keamanan
**Fokus Utama:** Memperbaiki semua bug kritis yang ditemukan dari code review sebelum melanjutkan pengembangan fitur baru. Sprint ini adalah prasyarat keamanan.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | S | 2 | 1 | 1 | Bugfix | BE | Perbaiki SQL WHERE clause di `TemplateController.index()` — bungkus kondisi OR pencarian dalam parentheses `(t.title LIKE ? OR t.description LIKE ?)` agar filter `deleted_at` dan `is_active` tidak ter-bypass. ✅ Sudah ada di codebase. | **RRT** | `>` | - | - | - | - | 100% |
| **2** | M | 3 | 1 | 1 | Bugfix | BE | Perbaiki IDOR vulnerability di `TemplateController.update()` — ownership check (`template[0].user_id !== userId && userRole !== 'admin'`) sudah diimplementasikan di codebase, konsisten dengan `destroy()`. ✅ | **SR** | - | `>` | - | - | - | 100% |
| **3** | M | 3 | 1 | 1 | Bugfix | FE | Auth guard via `src/proxy.ts` — Next.js 16.2.6 mendukung `proxy.ts` secara native sebagai middleware file. `protectedRoutes` sudah mencakup `/dashboard`, `/templates`, `/bookmarks`, `/profile`, `/admin`. Diverifikasi: akses tanpa login redirect ke `/login?redirect=...`. ✅ | **MRP** | - | - | `>` | - | - | 100% |
| **4** | S | 2 | 1 | 1 | Bugfix | FE | Perbaiki cookie di login page: hapus `httpOnly: true` dari `setCookie` client-side (browser JS tidak bisa set httpOnly — hanya server yang bisa). Pertahankan `secure` (production), `sameSite: 'lax'`, `maxAge: 86400`. Perbaiki optional chaining `images?.find(...)` dan `images?.[0]?.image_url` di halaman detail. ✅ | **NBZ** | - | - | - | `>` | - | 100% |

### 🔧 Bugfix Tambahan (Ditemukan saat verifikasi Sprint 11)

| No | File | Bug | Fix | Status |
|---|---|---|---|---|
| **+1** | `src/lib/image.ts` | `isSvgImage(null)` crash — `TypeError: Cannot read properties of null` saat `avatar_url` user adalah `null` | Tambah guard `if (!url) return false`, ubah tipe ke `string \| null \| undefined` | ✅ |
| **+2** | `src/components/layout/Navbar.tsx` | `<Image fill>` di dalam `<AvatarFallback>` (parent `position:static`) → error `src=""` dan posisi invalid saat `avatar_url` null | Refactor ke pola `<AvatarImage>` + `<AvatarFallback>` yang benar dari shadcn/ui | ✅ |
| **+3** | `src/components/templates/TemplateCard.tsx` | `<Image fill>` tanpa `sizes` prop → Next.js performance warning | Tambah `sizes` responsive sesuai grid breakpoint | ✅ |
| **+4** | `src/app/(protected)/templates/[id]/page.tsx` | `<Image fill>` tanpa `sizes` di main image, thumbnail, dan avatar; LCP image tanpa `priority` | Tambah `sizes` + `priority` di main image, `sizes="128px"` di thumbnail, `sizes="40px"` di avatar | ✅ |

---

## 📅 Sprint 12: Autentikasi Lengkap & Profil Pengguna
**Fokus Utama:** Melengkapi fitur autentikasi (Register UI) dan halaman profil pengguna yang sudah ada API-nya tapi belum ada UI-nya. Ini adalah fitur MVP yang masih kurang.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | M | 3 | 1 | - | Feat | FE | Buat halaman Register (`/register`) dengan form `username`, `email`, `password`, `passwordConfirm`. Konsumsi `POST /api/auth/register`. Tambahkan validasi client-side yang sesuai dengan validator backend (3–20 karakter, password min 8 karakter + huruf besar + angka). Gunakan animasi Framer Motion serupa halaman login. | **RRT** | `>` | `>` | - | - | - | 0% |
| **2** | M | 3 | 1 | - | Feat | FE | Buat halaman Profil Pengguna (`/profile`) — tampilkan data user (username, email, role, avatar, tanggal bergabung) menggunakan `GET /api/profile`. Konsumsi `PATCH /api/profile` untuk update username dan password. Tambahkan form edit inline dengan feedback toast. | **SR** | - | - | `>` | `>` | - | 0% |
| **3** | M | 3 | 1 | - | Feat | FE | Implementasi upload avatar di halaman profil — gunakan `input type="file"` dengan preview gambar sebelum upload, kirim sebagai `multipart/form-data` ke `PATCH /api/profile`. Handle token baru yang dikembalikan API jika username berubah (update cookie dan Zustand store). | **NBZ** | - | - | - | - | `>` | 0% |
| **4** | S | 2 | 1 | - | Feat | BE | Tambahkan endpoint `GET /api/categories` yang mengembalikan semua kategori dari tabel `categories`. Endpoint ini bersifat publik (tanpa auth). Buat `CategoryController` dan update `api.js`. | **MRP** | `>` | - | - | - | - | 0% |

---

## 📅 Sprint 13: Filter Kategori, Bookmark Page & Upload Template
**Fokus Utama:** Menghubungkan fitur kategori ke FE, membuat halaman bookmark user, dan membangun form upload template — tiga fitur MVP yang belum ada di frontend.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | M | 3 | 1 | - | Feat | FE | Sambungkan `CategoryFilter` ke API nyata: buat `useCategories` hook (TanStack Query) yang mengkonsumsi `GET /api/categories`. Hapus data mock dan uncomment `useCategories()` di `CategoryFilter.tsx`. Hubungkan `selectedCategory` ke parameter `category_id` saat memanggil `GET /api/templates`. | **MRP** | `>` | `>` | - | - | - | 0% |
| **2** | L | 5 | 2 | - | Feat | FE | Buat halaman Bookmark (`/bookmarks`) — tambahkan endpoint `GET /api/bookmarks` di BE yang mengambil semua template yang di-bookmark user yang sedang login. Di FE, tampilkan daftar template yang dibookmark menggunakan `TemplateCard` dengan state kosong yang menarik. | **SR** | - | - | `>` | `>` | - | 0% |
| **3** | L | 5 | 2 | - | Feat | FE | Buat halaman Upload Template (`/templates/upload`) dengan form lengkap: `title`, `description`, `category_id` (dropdown dari API), `upload_type` (radio: file/url/both), `source_url`, `demo_url`. Konsumsi `POST /api/templates`. Tambahkan navigasi ke Sidebar. | **RRT** | - | - | - | - | `>` | 0% |
| **4** | S | 2 | 1 | - | Feat | FE | Tampilkan tombol Report di halaman detail template — buat modal/dialog konfirmasi dengan textarea `reason`. Konsumsi `POST /api/reports`. Tambahkan feedback toast sukses/gagal. | **NBZ** | `>` | - | - | - | - | 0% |

---

## 📅 Sprint 14: Admin Dashboard & Dashboard Statistik Real
**Fokus Utama:** Membangun Admin Dashboard untuk moderasi konten (fitur MVP yang belum ada) dan mengganti data hardcode di Dashboard dengan data real dari API.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | L | 5 | 2 | - | Feat | BE | Buat endpoint `GET /api/admin/users` (admin only), `GET /api/admin/reports` (admin only), dan `PATCH /api/admin/reports/:id` untuk update status laporan (pending→resolved/rejected). Tambahkan middleware pengecekan role admin (`req.user.role === 'admin'`). | **RRT** | `>` | `>` | - | - | - | 0% |
| **2** | L | 5 | 2 | - | Feat | FE | Buat halaman Admin Dashboard (`/admin`) dengan tab navigasi: (1) **Manajemen Template** — tabel semua template dengan tombol soft-delete; (2) **Manajemen Laporan** — tabel semua laporan dengan tombol ubah status; (3) **Manajemen User** — tabel semua user. Halaman ini hanya accessible untuk role `admin`. | **NBZ** | - | - | `>` | `>` | - | 0% |
| **3** | M | 3 | 1 | - | Feat | BE | Buat endpoint `GET /api/profile/stats` yang mengembalikan statistik user yang sedang login: total template diupload, total download kumulatif, total upvote diterima, total bookmark diterima. | **MRP** | `>` | - | - | - | - | 0% |
| **4** | M | 3 | 1 | - | Feat | FE | Ganti data hardcode di `DashboardPage` dengan data real dari `GET /api/profile/stats`. Gunakan `useQuery` TanStack Query. Tampilkan skeleton loading yang sesuai. | **SR** | - | - | - | - | `>` | 0% |

---

## 📅 Sprint 15: Halaman Trending, Polish UI & Quality Assurance
**Fokus Utama:** Menyelesaikan fitur enhancement terakhir (Popular/Trending page), melakukan polish UI menyeluruh, memperbaiki root page yang masih boilerplate Next.js, dan melakukan QA final sebelum demo.

| No | Size | Story Points | Mandays (Est) | Mandays (Real) | Sprint Backlog Feature | Group | Issue / Task Description | Assignee(s) | Rabu | Kamis | Jumat | Senin | Selasa | Progress |
| :-: | :-: | :-: | :-: | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | M | 3 | 1 | - | Feat | BE+FE | Tambahkan endpoint `GET /api/templates/trending` di BE (query templates diurutkan `ORDER BY popularity_score DESC LIMIT 10`). Di FE, buat halaman `/trending` yang menampilkan template terpopuler dalam grid card dengan badge ranking. | **NBZ** | `>` | `>` | - | - | - | 0% |
| **2** | L | 5 | 2 | - | Feat | FE | Buat Landing Page (`/`) yang layak — ganti boilerplate Next.js default. Tampilkan: hero section dengan tagline Templas, grid 6 template populer (konsumsi API), section fitur unggulan, dan tombol CTA (Login / Explore Templates). | **MRP** | - | - | `>` | `>` | - | 0% |
| **3** | M | 3 | 1 | - | Fix | FE | Polish UI menyeluruh: (1) Tambahkan icon yang tepat di Sidebar (`Search` atau `Compass` untuk Explore, bukan `Beaker`); (2) Aktifkan Pino HTTP logger di `BE/index.js`; (3) Sambungkan menu "Pengaturan Profil" di Navbar ke `/profile`; (4) Tambahkan link `/templates/upload` di Sidebar; (5) Perbaiki root redirect `/` ke `/login` atau landing page. | **SR** | - | - | - | `>` | - | 0% |
| **4** | M | 3 | 1 | - | QA | BE+FE | Quality Assurance & Testing Final: (1) Uji semua alur happy path (register→login→browse→download→upvote→bookmark→logout); (2) Uji error handling (token expired, input invalid, template tidak ditemukan); (3) Verifikasi auth guard middleware berjalan di semua protected routes; (4) Test responsivitas mobile. | **RRT** | - | - | - | - | `>` | 0% |

---

### 📋 Rekap Story Points Sprint 11–15

| Sprint | Fokus | Total SP | Keterangan |
|---|---|---|---|
| Sprint 11 | Bugfix Kritis & Keamanan | 10 SP | **Prioritas Tertinggi** — harus selesai sebelum sprint lain |
| Sprint 12 | Auth Lengkap & Profil | 11 SP | Fitur MVP yang masih kurang |
| Sprint 13 | Kategori, Bookmark & Upload | 15 SP | Fitur MVP terbesar |
| Sprint 14 | Admin Dashboard & Stats Real | 16 SP | Enhancement + MVP Admin |
| Sprint 15 | Trending, Landing Page & QA | 14 SP | Polish & finalisasi |
| **Total** | | **66 SP** | |

---

## 📚 Pembagian Tugas per Sprint — Kurikulum Kelas

> Bagian ini memetakan **topik kurikulum kelas** ke implementasi nyata proyek Kelompok 4.
> Anggota: **RRT** (Ketua), **SR**, **MRP**, **NBZ**

---

## 📅 Sprint 10 (Kelas): Consume API Backend → Frontend (Tanpa Autentikasi)
**Fokus Utama:** Mengonsumsi API backend ke frontend menggunakan Axios dan TanStack Query (React Query). Semua endpoint yang diakses bersifat publik — belum menggunakan token autentikasi.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Setup HTTP Client & Query Provider | Konfigurasi `axiosInstance` dengan `baseURL`, interceptor error global via Sonner toast, registrasi `QueryClientProvider` di layout | `src/api/axiosInstance.ts`, `src/providers/QueryProvider.tsx` | ✅ 100% |
| **2** | **MRP** | Consume `GET /api/templates` | Implementasi `useTemplates` hook (TanStack Query), tampilkan daftar template di `TemplatesPage` dengan search debounced (500ms) dan pagination | `src/hooks/queries/template.queries.ts`, `src/app/(protected)/templates/page.tsx` | ✅ 100% |
| **3** | **SR** | Consume `GET /api/templates/:id` | Implementasi `useTemplateDetail` hook, render data detail template (pembuat, deskripsi, tautan pratinjau) di `TemplateDetailPage` | `src/app/(protected)/templates/[id]/page.tsx` | ✅ 100% |
| **4** | **NBZ** | Integrasi Gambar, Badge & Statistik | Pemuatan gambar dinamis (galeri thumbnail dengan `getFullImageUrl`), badge kategori, tech stacks dinamis, total download & upvote dari database | `src/components/templates/TemplateCard.tsx`, `src/types/template.types.ts` | ✅ 100% |

---

## 📅 Sprint 11 (Kelas): Frontend Layout, Routing, Login/Register UI & Reusable Components
**Fokus Utama:** Membangun struktur layout utama aplikasi, mengimplementasikan routing berbasis Next.js App Router, membuat halaman Login & Register, dan menyusun komponen reusable untuk kebutuhan frontend.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Inisialisasi Proyek & Routing | Setup Next.js 16 dengan App Router, konfigurasi Tailwind CSS, struktur folder `app/(protected)/`, global layout dengan font & metadata | `fe/next.config.ts`, `src/app/layout.tsx` | ✅ 100% |
| **2** | **SR** | Reusable Component: Navbar & Sidebar | `Navbar.tsx` responsif dengan dropdown user (Avatar, logout), `Sidebar.tsx` dengan navigasi link aktif | `src/components/layout/Navbar.tsx`, `src/components/layout/Sidebar.tsx` | ✅ 100% |
| **3** | **MRP** | Halaman Login UI | `LoginPage` dengan animasi Framer Motion, parallax mouse effect, floating stat cards (count-up animation), form username+password, ripple button | `src/app/login/page.tsx` | ✅ 100% |
| **4** | **NBZ** | Reusable Component: TemplateCard & Skeleton | `TemplateCard` komponen kartu template reusable (thumbnail, badge, stats, tombol View), skeleton loading state untuk galeri | `src/components/templates/TemplateCard.tsx`, `src/components/templates/CategoryFilter.tsx` | ✅ 100% |

---

## 📅 Sprint 12 (Kelas): React Fundamentals — JSX, Component, Props, State, Events, Forms, dll
**Fokus Utama:** Mengimplementasikan konsep-konsep dasar React dalam komponen proyek nyata.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | JSX + Component + Props | Semua komponen ditulis dalam JSX. `TemplateCard` menerima prop `template: Template`. `CategoryFilter` menerima `selectedId` & `onSelect` sebagai props | `src/components/templates/TemplateCard.tsx`, `src/components/templates/CategoryFilter.tsx` | ✅ 100% |
| **2** | **MRP** | State + List & Keys + Conditional Rendering | `useState` untuk `page`, `searchQuery`, `selectedCategory`. `.map()` dengan `key={template.id}` untuk render daftar template. Render kondisional: loading skeleton / error / empty / data | `src/app/(protected)/templates/page.tsx` | ✅ 100% |
| **3** | **SR** | Events + Forms | `onChange` pada input search, `onClick` pada pagination & tombol kategori, `onSubmit` pada form login, `handleLogin` async event handler | `src/app/login/page.tsx`, `src/app/(protected)/templates/page.tsx` | ✅ 100% |
| **4** | **NBZ** | Lifting State + Composition | `selectedCategory` state di-lift ke `TemplatesPage`, diteruskan ke `CategoryFilter` via props. Komposisi: `TemplatesPage` menyusun `CategoryFilter` + `TemplateCard` + pagination menjadi satu halaman | `src/app/(protected)/templates/page.tsx`, `src/components/templates/CategoryFilter.tsx` | ✅ 100% |

---

## 📅 Sprint 13 (Kelas): Autentikasi, Global State Management, Protected Routes & Git
**Fokus Utama:** Implementasi autentikasi pengguna end-to-end, Global State Management untuk konsistensi data antar halaman, proteksi rute tanpa refresh, dan upload source code ke Git.

| No | Anggota | Topik Kurikulum | Implementasi Nyata di Proyek | File Utama | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Autentikasi Frontend (Login Flow) | `authService.login()` via Axios, simpan JWT ke cookie (`cookies-next`) dengan `secure` + `sameSite: 'lax'` + `maxAge: 86400`, redirect ke dashboard setelah sukses | `src/services/auth.service.ts`, `src/app/login/page.tsx` | ✅ 100% |
| **2** | **SR** | Global State Management | Implementasi `useAuthStore` menggunakan **Zustand** (bukan Context API, lebih ringan & no boilerplate). Store menyimpan `user` dan menyediakan `setUser`, `clearAuth`. Persist antar halaman tanpa refresh | `src/store/useAuthStore.ts` | ✅ 100% |
| **3** | **MRP** | Protected Routes (Auth Guard) | Middleware via `src/proxy.ts` (Next.js 16.2.6 native). Cek cookie `templas_token` — redirect ke `/login?redirect=...` jika belum login, redirect ke `/dashboard` jika sudah login & akses auth page | `src/proxy.ts` | ✅ 100% |
| **4** | **NBZ** | Upload Git & Hydration Guard | Push source code ke GitHub repository kelompok. Implementasi `useHydration` hook untuk mencegah hydration mismatch antara SSR dan client-side Zustand store | `src/hooks/common/useHydration.ts` | ✅ 100% |

---

## 📅 Sprint 14 (Kelas): Register UI, Profile Page, Upload Template & Bookmark Page
**Fokus Utama:** Melengkapi fitur MVP yang masih kurang — halaman Register, Profile User, Form Upload Template, dan Bookmark Page. Beberapa anggota mengambil 2 tugas karena backlog besar.

| No | Anggota | Tugas | Deskripsi Implementasi | File Target | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Register Page UI (`/register`) | Buat halaman Register dengan form `username`, `email`, `password`, `passwordConfirm`. Validasi client-side (3–20 karakter, password min 8+huruf besar+angka). Konsumsi `POST /api/auth/register`. Animasi Framer Motion serupa Login Page | `src/app/register/page.tsx`, `src/services/auth.service.ts` | ⬜ 0% |
| **2** | **RRT** *(tugas ke-2)* | BE: Endpoint `GET /api/profile/stats` | Tambah endpoint yang mengembalikan statistik user: total template diupload, total download, total upvote, total bookmark. Digunakan di Dashboard & Profile | `BE/src/controllers/ProfileController.js`, `BE/src/routes/api.js` | ⬜ 0% |
| **3** | **SR** | Upload Template Form (`/templates/upload`) | Form lengkap: `title`, `description`, `category_id` (dropdown dari API), `upload_type` (radio: file/url/both), `source_url`, `demo_url`. Konsumsi `POST /api/templates`. Tambah link di Sidebar | `src/app/(protected)/templates/upload/page.tsx` | ⬜ 0% |
| **4** | **SR** *(tugas ke-2)* | BE: Endpoint `GET /api/bookmarks` | Buat endpoint yang mengembalikan semua template yang di-bookmark user yang sedang login. Diperlukan oleh Bookmark Page | `BE/src/controllers/TemplateController.js`, `BE/src/routes/api.js` | ⬜ 0% |
| **5** | **MRP** | User Profile Page (`/profile`) | Tampilkan data user (`username`, `email`, `role`, `avatar`, tanggal bergabung) via `GET /api/profile`. Form edit inline untuk update `username` & `password` via `PATCH /api/profile`. Feedback toast sukses/gagal | `src/app/(protected)/profile/page.tsx` | ⬜ 0% |
| **6** | **NBZ** | Bookmark Page (`/bookmarks`) | Halaman daftar template yang di-bookmark user. Konsumsi `GET /api/bookmarks`. Tampilkan menggunakan komponen `TemplateCard`. State kosong yang menarik jika belum ada bookmark | `src/app/(protected)/bookmarks/page.tsx` | ⬜ 0% |

---

## 📅 Sprint 15 (Kelas): Admin Dashboard, Reporting System, Trending Page & Dashboard Stats Real
**Fokus Utama:** Menyelesaikan seluruh sisa PRD — Admin Dashboard (MVP terakhir), Reporting UI, Trending Page, dan mengganti data hardcode di Dashboard dengan data real dari API.

| No | Anggota | Tugas | Deskripsi Implementasi | File Target | Status |
|---|---|---|---|---|---|
| **1** | **RRT** | Admin Dashboard FE (`/admin`) | Halaman dengan 3 tab: (1) **Manajemen Template** — tabel semua template + soft-delete; (2) **Manajemen Laporan** — tabel laporan + ubah status; (3) **Manajemen User** — tabel semua user. Hanya accessible untuk role `admin` | `src/app/(protected)/admin/page.tsx` | ⬜ 0% |
| **2** | **RRT** *(tugas ke-2)* | BE: Admin Endpoints | Buat `GET /api/admin/users` (admin only), `GET /api/admin/reports` (admin only), `PATCH /api/admin/reports/:id` (update status). Tambah middleware pengecekan `req.user.role === 'admin'` | `BE/src/controllers/AdminController.js`, `BE/src/routes/api.js` | ⬜ 0% |
| **3** | **SR** | Reporting System UI | Tombol "Laporkan" di halaman detail template. Modal/dialog konfirmasi dengan textarea `reason`. Konsumsi `POST /api/reports`. Toast sukses/gagal | `src/app/(protected)/templates/[id]/page.tsx` | ⬜ 0% |
| **4** | **SR** *(tugas ke-2)* | Avatar Upload di Profile | `input type="file"` dengan preview gambar sebelum upload. Kirim sebagai `multipart/form-data` ke `PATCH /api/profile`. Handle token baru jika username berubah (update cookie + Zustand) | `src/app/(protected)/profile/page.tsx` | ⬜ 0% |
| **5** | **MRP** | Dashboard Statistik Real | Ganti data hardcode di `DashboardPage` dengan data real dari `GET /api/profile/stats`. Gunakan `useQuery` TanStack Query. Tambah skeleton loading | `src/app/(protected)/dashboard/page.tsx`, `src/hooks/queries/profile.queries.ts` | ⬜ 0% |
| **6** | **NBZ** | Trending / Popular Page (`/trending`) | Tambah endpoint `GET /api/templates/trending` di BE (query `ORDER BY popularity_score DESC LIMIT 10`). Di FE buat halaman yang menampilkan template terpopuler dalam grid card dengan badge ranking | `src/app/(protected)/trending/page.tsx`, `BE/src/routes/api.js` | ⬜ 0% |

---

### 📋 Rekap Pembagian Tugas per Anggota (Sprint 10–15 Kurikulum)

| Anggota | Sprint 10 | Sprint 11 | Sprint 12 | Sprint 13 | Sprint 14 | Sprint 15 |
|---|---|---|---|---|---|---|
| **RRT** | Setup axiosInstance & QueryProvider | Inisialisasi Next.js & Routing | JSX + Component + Props | Login Flow & Auth Service | Register UI + BE Stats Endpoint | Admin Dashboard FE + BE Admin Endpoints |
| **SR** | Consume Template Detail API | Navbar & Sidebar | Events & Forms | Zustand Global State | Upload Template Form + BE Bookmarks | Reporting UI + Avatar Upload |
| **MRP** | Consume Templates List API | Login Page UI | State + List + Conditional Render | Protected Routes (proxy.ts) | User Profile Page | Dashboard Stats Real |
| **NBZ** | Integrasi Gambar & Statistik | TemplateCard & Skeleton | Lifting State & Composition | Git Upload & Hydration Guard | Bookmark Page | Trending/Popular Page |

### 📊 Sisa Fitur PRD setelah Sprint 14–15 Selesai

| Kategori | Fitur | Target Sprint |
|---|---|---|
| **MVP** | Register Page | Sprint 14 — RRT |
| **MVP** | Upload Template UI | Sprint 14 — SR |
| **MVP** | Bookmark Page | Sprint 14 — NBZ |
| **MVP** | Admin Dashboard | Sprint 15 — RRT |
| **Enhancement** | User Profile Page | Sprint 14 — MRP |
| **Enhancement** | Reporting System UI | Sprint 15 — SR |
| **Enhancement** | Dashboard Stats Real | Sprint 15 — MRP |
| **Advanced** | Trending Page | Sprint 15 — NBZ |
| **Advanced** | Validity Checker (cron job) | Opsional — belum dijadwalkan |
| **Advanced** | Web Scraper | Opsional — belum dijadwalkan |
