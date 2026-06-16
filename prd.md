# Product Requirements Document (PRD)
## Templas — Community-Driven UI/UX Asset & Code Template Repository

**Tim Pengembang:** Abdul Developer
**Institusi:** Sekolah Tinggi Teknologi Terpadu Nurul Fikri
**Tahun:** 2026

**Anggota Tim:**
- Muhammad Riandana Pranatha - 0110224076 (Scrum Master)
- Raffi Ramadhan Tajudin - 0110224204 (User & Admin Manager)
- Sholahuddin Robbani - 0110224091 (Content & File Manager)
- Nathania Belva Zerlina - 0110224048 (Discovery & Presentation)

---

## 1. Latar Belakang & Deskripsi Produk

Templas adalah platform community-driven berbasis web yang berfungsi sebagai pusat repositori aset UI/UX dan template kode. Tujuannya adalah memudahkan pengembang dan desainer dalam menemukan, berbagi, dan mengelola aset digital secara gratis.

Platform ini memfasilitasi kolaborasi komunitas di mana pengguna dapat:
- Mengunggah karya mereka
- Memberikan apresiasi melalui sistem upvote
- Menyimpan referensi melalui fitur bookmark

Dengan fokus pada kemudahan pencarian melalui sistem tagging dan kategori yang terkurasi, Templas hadir sebagai solusi efisiensi alur kerja pengembangan perangkat lunak bagi mahasiswa maupun profesional.

---

## 2. Tujuan Produk

- Menyediakan repositori terpusat untuk template UI/UX dan kode sumber.
- Mempermudah proses pencarian aset melalui filter kategori, tag, dan stack teknologi.
- Membangun komunitas kontributor melalui sistem apresiasi (upvote) dan bookmark.
- Menjaga kualitas konten melalui sistem moderasi, reporting, dan validity checker.

---

## 3. Daftar Fitur

### 3.1 Fitur MVP (Minimum Viable Product)
| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Authentication | Register, Login, Logout |
| 2 | Template Listing | Menampilkan judul, deskripsi, screenshot, kategori, tag, stack teknologi, link download/repo |
| 3 | Upload Template | Upload via file ZIP atau link repository (GitHub/Drive) |
| 4 | Search & Filter | Berdasarkan keyword, kategori, tag, dan stack teknologi |
| 5 | Bookmark | Menyimpan template ke daftar pribadi |
| 6 | Upvote | Memberikan dukungan pada template yang bermanfaat |
| 7 | Admin Dashboard | CRUD data template, user, dan moderasi konten |
| 8 | Download Counter | Statistik jumlah download untuk popularitas |

### 3.2 Fitur Enhancement
| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Template Preview | Halaman detail dengan informasi lengkap dan link live demo |
| 2 | Reporting System | Fitur lapor link mati atau template bermasalah |
| 3 | Popularity Score | Skor = (Upvotes × 3) + (Bookmarks × 2) + (Downloads × 1) |
| 4 | User Profile | Menampilkan info akun, daftar upload, dan bookmark |

### 3.3 Fitur Advanced (Opsional)
| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Validity Checker | Pengecekan otomatis link mati/repo dihapus menggunakan cron job |
| 2 | Web Scraper | Mengambil template otomatis dari GitHub atau penyedia lain (Puppeteer/Cheerio) |
| 3 | Popular Templates Page | Halaman khusus trending dan template paling banyak diunduh |

---

## 4. Alur Sistem

### 4.1 Alur Pengguna (User Journey)
1. **Pencarian & Penemuan** — Pengguna (Guest) masuk ke landing page, melihat trending templates, atau mencari aset menggunakan Search & Filter berdasarkan kategori (misal: "Admin Dashboard") atau tech stack (misal: "Tailwind CSS").
2. **Autentikasi** — Jika ingin mengunduh atau memberikan apresiasi, pengguna diarahkan untuk Login/Register.
3. **Kontribusi (Upload)** — Pengguna yang sudah login dapat mengunggah template (mengisi metadata, link GitHub/Drive, dan screenshot).
4. **Interaksi** — Pengguna dapat melakukan Upvote (meningkatkan ranking template) atau Bookmark (menyimpan ke profil pribadi).
5. **Konsumsi** — Pengguna mengunduh aset. Sistem secara otomatis meningkatkan Download Counter.

### 4.2 Alur Teknis Data (System Workflow)

#### A. Proses Upload & Penyimpanan (Dev C & B)
1. **Client-side**: User mengisi form dan mengunggah gambar screenshot.
2. **Middleware**: Express.js memvalidasi token JWT (Dev A) dan memproses file gambar menggunakan Multer.
3. **Storage**: Gambar/aset disimpan ke Server File, sedangkan link file template (zip/repo) dan metadata disimpan ke MySQL.
4. **Database**: Record baru tercipta di tabel `templates` dengan relasi ke `categories` dan `tags`.

#### B. Sistem Ranking & Popularity (Dev B & D)
Setiap kali ada interaksi, sistem menjalankan logika berikut:

```
Score = (Upvotes × 3) + (Bookmarks × 2) + (Downloads × 1)
```

Skor ini dihitung secara real-time atau melalui scheduled task untuk menentukan urutan template di halaman "Popular".

---

## 5. Workflow Kolaborasi Tim (Git Flow)

Menggunakan **Feature Branch Workflow**:

1. **Main Branch** — Hanya berisi kode yang sudah stabil dan siap demo.
2. **Develop Branch** — Tempat integrasi fitur dari semua anggota.
3. **Feature Branch** — Setiap anggota membuat branch sendiri dari develop:
   - `feat/auth-module` (Dev A)
   - `feat/template-listing` (Dev B)
   - `feat/upload-system` (Dev C)
   - `feat/admin-dashboard` (Dev D)
4. **Pull Request (PR)** — Setelah fitur selesai (Frontend + Backend), lakukan PR ke develop. Anggota lain wajib melakukan code review singkat sebelum di-merge.

---

## 6. Pembagian Tugas (Roles & Responsibilities)

| Anggota Tim | Modul Utama | Tugas Frontend (React/Next.js) | Tugas Backend & DB (Express.js) | Prioritas |
|---|---|---|---|---|
| **Raffi** (User & Admin Manager) | Autentikasi & Manajemen Pengguna | UI Login & Register, Halaman Profil Pengguna, Tab "Manajemen User" di Admin Dashboard | API Auth (Register, Login, JWT/Session), Middleware Otorisasi (Admin vs User), CRUD API untuk Data User | MVP & Enhancement |
| **Bani** (Content & File Manager) | Manajemen Template & Upload | Form Upload Template (File ZIP & Link), Tab "Manajemen Template" di Admin Dashboard, UI Notifikasi Upload Sukses/Gagal, Logika validasi input form | API Upload & Handling File ZIP (Multer), CRUD API untuk Data Template | MVP |
| **Nathania** (Discovery & Presentation) | Eksplorasi & Tampilan Template | UI Halaman Utama (Template Listing), Komponen Search Bar & Filter, Halaman Detail Template (Preview) | API Get Templates (dengan pagination), API Search & Filter (Kategori, Tag, Stack), API Detail Template | MVP & Enhancement |
| **Saki** (Engagement & Analytics) | Interaksi & Analitik Data | UI Tombol Bookmark & Upvote, Halaman Daftar Bookmark User, UI Popularity Score (Trending) & Form Report | API Bookmark & Upvote, Logika Download Counter, Algoritma Popularity Score & API Report | MVP & Enhancement |
| **Semua Anggota** | Fitur Lanjutan (Advanced) | Integrasi UI jika ada data dari Scraper atau Validity Checker | Web Scraping (Puppeteer/Cheerio), Cron Job untuk Validity Checker | Advanced (Opsional) |

---

## 7. Desain Basis Data (Database Schema)

### Tabel Utama

**users**
- `id` (PK, int)
- `username` (varchar, NN)
- `email` (varchar, NN)
- `password_hash` (varchar, NN)
- `role` (enum: user_role)
- `avatar_url` (varchar)
- `created_at`, `updated_at`, `deleted_at` (timestamp)

**templates**
- `id` (PK, int)
- `user_id` (FK → users.id)
- `category_id` (FK → categories.id)
- `title` (varchar, NN)
- `description` (text)
- `upload_type` (varchar)
- `source_url` (varchar)
- `demo_url` (varchar)
- `download_count` (int)
- `popularity_score` (int)
- `is_active` (boolean)
- `created_at`, `updated_at`, `deleted_at` (timestamp)

**categories**
- `id` (PK, int)
- `name` (varchar, NN)
- `slug` (varchar, NN)

**tags**
- `id` (PK, int)
- `name` (varchar, NN)
- `slug` (varchar, NN)

**stacks**
- `id` (PK, int)
- `name` (varchar, NN)
- `icon_url` (varchar)

### Tabel Relasi

**template_tags**
- `id` (PK, int)
- `template_id` (FK → templates.id)
- `tag_id` (FK → tags.id)

**template_stacks**
- `id` (PK, int)
- `template_id` (FK → templates.id)
- `stack_id` (FK → stacks.id)

**template_images**
- `id` (PK, int)
- `template_id` (FK → templates.id)
- `image_url` (varchar, NN)
- `is_primary` (boolean)

**bookmarks**
- `id` (PK, int)
- `user_id` (FK → users.id)
- `template_id` (FK → templates.id)
- `created_at` (timestamp)

**upvotes**
- `id` (PK, int)
- `user_id` (FK → users.id)
- `template_id` (FK → templates.id)
- `created_at` (timestamp)

**reports**
- `id` (PK, int)
- `template_id` (FK → templates.id)
- `user_id` (FK → users.id)
- `reason` (text, NN)
- `status` (enum: report_status)
- `created_at`, `deleted_at` (timestamp)

---

## 8. Referensi Tambahan

- **Sprint Report**: Sprint 7 Report — Fullstack App (23–30 April 2026)
  - Product Owner: Abdul Developer
  - Scrum Master: Muhammad Riandana Pranatha (MRP)
  - Team Dev: Raffi Ramadhan Tajudin (RRT), Sholahuddin Robbani (SR), Nathania Belva Zerlina (NBZ)
  - Total Story Points Sprint 7: 14 (Selesai 100%)
  - Backlog Sprint 7 mencakup: setup konfigurasi Multer & API upload, API fitur Bookmark/Simpan, API Report, API fitur Upvote/Like.

---

## 9. Tech Stack

- **Frontend**: React / Next.js
- **Backend**: Express.js
- **Database**: MySQL
- **File Handling**: Multer
- **Authentication**: JWT/Session
- **Advanced Tools**: Puppeteer/Cheerio (Web Scraping), Cron Job (Validity Checker)
