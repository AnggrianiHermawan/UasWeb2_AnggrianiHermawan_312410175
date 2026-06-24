# Sistem Manajemen Inventory (Master Barang) 
UAS Pemrograman Web 2 

Nama : Anggriani Hermawan

NIM : 312410175

## 1. Deskripsi Proyek
Sistem Manajemen Inventory adalah **aplikasi web (E-Inventory)** yang digunakan untuk mengelola data ketersediaan barang secara real-time dan terpusat. Aplikasi ini dibangun menggunakan **arsitektur Full-Stack** yang terpisah **(decoupled)** antara **backend dan frontend**. Komunikasi data dilakukan sepenuhnya melalui RESTful API.
Fitur utama yang disediakan meliputi:
- Manajemen data barang (nama barang, stok, harga, dll).
- Modul otentikasi admin menggunakan JWT (JSON Web Token).
- Tampilan antarmuka (User Interface) tabel dinamis dan form modal pop-up yang responsif.
- Proteksi halaman dan manipulasi data (Create, Update, Delete) yang diwajibkan menggunakan otorisasi token.

---

## 2. Teknologi yang Digunakan

Proyek ini menggunakan ekosistem teknologi modern sesuai spesifikasi mata kuliah:
**Backend**
- PHP Framework: CodeIgniter 4 (CI4) sebagai RESTful API Server.
- Database: MySQL / MariaDB.
Keamanan:
- Filter Auth untuk proteksi endpoint POST, PUT, DELETE menggunakan otorisasi Bearer Token (JWT).
- Pengaturan Header CORS global pada `public/index.php` untuk mengizinkan request lintas origin (Cross-Origin) dari frontend.

**Frontend**  
- Framework: Vue.js 3 dengan Vue Router berbasis CDN (Single Page Application / SPA).
- HTTP Client: Axios untuk komunikasi asynchronous ke backend API.
- UI Framework: TailwindCSS via CDN untuk desain antarmuka utility-first dengan tema warna kustom yang elegan.

---

## 3. Struktur Repository
Repositori ini memisahkan secara tegas antara lingkungan server dan client.
Struktur folder utama:
```
[UAS_WEB2]/
├─ backend-api/      # Project CodeIgniter 4 (RESTful API)
│  ├─ app/
│  ├─ public/
│  └─ ...
├─ frontend-spa/     # SPA Vue 3 + TailwindCSS
│   ├─ index.html
│   ├─ axiosConfig.js
│   └─ components/
│      ├─ Home.js
│      ├─ Login.js
│      ├─ Dashboard.js
│      └─ Barang.js
```

- Folder **backend-api/** berisi seluruh konfigurasi CI4, resource controller (Auth, Kategori, Barang), dan filter keamanan.
- Folder **frontend-spa/** berisi entry index.html dan komponen modular JavaScript (Vue Components).
---

## 4. Desain Database & Relasi
Aplikasi ini memanfaatkan tabel yang saling berelasi di dalam database:
- `users`: Menyimpan kredensial admin (username, password).
- `kategori`: Menyimpan master data kategori barang.
- `barang`: Menyimpan detail barang (nama_barang, stok, harga) dengan kategori_id sebagai foreign key yang merujuk pada tabel kategori.

<img width="533" height="56" alt="image" src="https://github.com/user-attachments/assets/8b8f52d9-a60c-46fa-a059-de158a683de4" />

---

## 5. Endpoint RESTful API (Ringkasan)
Backend menyediakan layanan endpoint CRUD. Berikut adalah route utamanya:

**Auth**
  - `POST /login` – Memvalidasi kredensial dan mengembalikan Bearer Token JWT.

**Barang** (Dilindungi Filter Auth untuk manipulasi data)
  - `GET /barang` – Menampilkan seluruh data barang.
  - `POST /barang` – Menambah data barang baru (Wajib Bearer Token).
  - `PUT /kategori/{:num}` – Memperbarui data barang spesifik (Wajib Bearer Token).
  - `DELETE /barang/{:num}` – Menghapus data barang spesifik (Wajib Bearer Token).

---

## 6. Fitur Keamanan
### 6.1 Server-Side Security (Backend)  
Menggunakan fitur Filters dari CodeIgniter 4. Fungsi operasi penambahan, perubahan, dan penghapusan data dikelompokkan ke dalam rute yang hanya bisa ditembus jika klien menyertakan `Authorization: Bearer {token}` yang valid.

### 6.2 Client-Side Security (Frontend)
Pemanfaatan Vue Router Navigation Guards di mana sistem mengecek ketersediaan token di `localStorage`. Jika user mencoba mengakses halaman dasbor tanpa token, sistem akan mengarahkannya kembali ke halaman login.

---

## 7. Fitur Frontend SPA
### 7.1 Modul Otentikasi (Login & Logout)
Otentikasi ditangani oleh komponen `Login.js`. Saat kredensial dikirim via Axios dan berhasil, token JWT disimpan dengan aman di `localStorage`. Terdapat fungsi Logout untuk menghapus token dan mengembalikan status akses pengunjung.

### 7.2 Manajemen Komponen & Routing
Penerapan Single Page Application memastikan pergantian halaman tidak membutuhkan reload browser. Komponen dikelola secara rapi, seperti `Barang.js` yang mengatur secara penuh logika fetch data, status loading anti-flicker, dan validasi form input.

### 7.3 Axios Interceptors
Terdapat file `axiosConfig.js` tersendiri yang bertugas:
- Request: Menyelipkan Bearer Token secara otomatis ke header setiap ada permintaan ke API.
- Response: Menangkap error spesifik seperti "401 Unauthorized" secara global, memberi peringatan sesi habis, dan me-reset login user.
  
### 7.4 Desain UI dengan TailwindCSS
Tidak menggunakan CSS konvensional sama sekali. Seluruh elemen visual, modal pop-up, transisi efek, hingga pewarnaan layer tabel dikonfigurasi murni menggunakan utility classes dari TailwindCSS (misal: hover effects, sudut melengkung, bayangan drop-shadow).

---

## 8. Hak Akses Pengguna (User Matrix)
- Pengunjung Publik (Tanpa Login): Hanya diperbolehkan mengakses halaman depan/Home yang berisi informasi umum.
- Administrator (Telah Login): Memiliki hak penuh untuk melihat Dasbor, mengeksekusi operasi CRUD pada modul Master Barang dan Kategori, serta melakukan pengelolaan ketersediaan (stok) dengan aman.

---

## 9. Screenshot yang Disertakan
1. **Skema Relasi Tabel Database**  
<img width="533" height="56" alt="Cuplikan layar 2026-06-24 095105" src="https://github.com/user-attachments/assets/e80e9f8c-5e6b-47dd-b7dd-b54b9263ecd5" />

2. **Screenshot API Error 401**  
<img width="960" height="540" alt="Cuplikan layar 2026-06-22 102733" src="https://github.com/user-attachments/assets/79000384-cace-4dfd-a93e-0ddf3e41023b" />

3. **Halaman Login**  
<img width="638" height="314" alt="image" src="https://github.com/user-attachments/assets/9c6e7b9f-65b1-414e-b083-facdccffe2ac" />

4. **Halaman Dashboard Admin**  
<img width="639" height="314" alt="image" src="https://github.com/user-attachments/assets/361e8cf4-7676-4fc1-9341-98ed3833834a" />
>

5. **Form Modal Tambah/Edit Data**  
<img width="640" height="314" alt="image" src="https://github.com/user-attachments/assets/2b3bf2af-aa68-4eaf-b4a0-0415283723a2" />

6. **Tabel Data Barang/Kategori**  
<img width="640" height="313" alt="image" src="https://github.com/user-attachments/assets/5f9e70d6-f16e-403f-b412-0309e5b9e156" />

---

## 10. Cara Menjalankan Proyek
### 10.1 Persiapan Database

1. Buat database baru, misalnya: `db_inventory_ci4`.  
2. Import file `.sql` yang telah disediakan.
3. Pastikan ada akun admin default, contoh:
   - Username: `superadmin`
   - Password: `password123` (sesuai yang digunakan di video/demo).

### 10.2 Menjalankan Backend (CodeIgniter 4)
- Buka folder `backend-api` melalui terminal (CMD/VS Code).
- Sesuaikan konfigurasi di file `.env`.
- Jalankan server API lokal dengan perintah:
`php spark serve`
- Server backend akan berjalan di `http://localhost:8080`.

### 10.3 Menjalankan Frontend (Vue 3 + Tailwind)
- Buka Workspace baru di Visual Studio Code, pilih spesifik hanya folder frontend-spa.
- Buka file index.html (atau apa saja).
- Klik Go Live di area kanan bawah
- Aplikasi akan otomatis terbuka di browser.
(Login menggunakan kredensial admin yang ada di database).
---

## 11. Link Demo & Video Presentasi
**Link Demo**  
  - `(http://127.0.0.1:5500/index.html#/login)`

**Link Video YouTube**  
  -  `(https://youtu.be/r-2ypgU6tBc?si=5F6c6Z3v0KlrccOE)`


---

## 12. Penutup
Proyek ini dibuat sebagai pemenuhan tugas **Ujian Akhir Semester mata kuliah Pemrograman Web 2**, dengan fokus penyelesaian pada penerapan arsitektur terpisah `backend-frontend`, konfigurasi `REST API`, proteksi keamanan sistem `(CORS & Authentication)`, serta pengembangan antarmuka `SPA` menggunakan `Vue 3` dan `TailwindCSS`.
