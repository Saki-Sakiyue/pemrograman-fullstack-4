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
