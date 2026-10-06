# Website Central Niaga Hardware

Website toko material interior (Wall Panel, Wall Board, HPL) — satu halaman statis, tanpa build tool.
Cukup buka `index.html` di browser, atau unggah seluruh folder ke hosting (GitHub Pages, Netlify, cPanel, dll).

## Struktur folder

```
index.html                 ← halaman utama (tidak perlu diedit)
admin.html                 ← halaman admin: input produk, katalog & kontak
assets/
  css/style.css            ← tampilan & animasi (warna utama di bagian :root)
  js/pengaturan.js         ← ✏️ EDIT DI SINI: kontak, teks produk, motif, portofolio, blog
  js/main.js               ← logika website (tidak perlu diedit)
  js/admin.js, css/admin.css ← halaman admin
  vendor/jszip.min.js      ← pustaka ZIP untuk tombol "Unduh ZIP" (MIT)
foto/                      ← 📷 TARUH FOTO DI SINI (lihat PANDUAN-FOTO.md)
  beranda/                 ← hero, tentang, konsultasi
  produk/<produk>/         ← sampul, motif/, galeri/
  portofolio/              ← 1.jpg, 2.jpg, ...
katalog/katalog.pdf        ← file katalog untuk tombol "Download Katalog"
```

## Halaman admin (input produk & katalog)

Buka **`admin.html`** (mis. `https://domain-anda.com/admin.html`) untuk mengelola isi website tanpa mengedit kode:

- **Produk** — tambah/ubah/hapus produk, merek, tagline, deskripsi, spesifikasi, motif (dengan kode),
  tipe + pilihan warna, koleksi/seri, dan foto galeri. Foto cukup diunggah — otomatis dikecilkan
  (maks. 1600 px), dikompres, dan disimpan di folder yang rapi dengan nama sesuai kode/nama motif.
- **Katalog** — link Google Drive atau unggah PDF, untuk katalog utama maupun per produk.
- **Portofolio** — tambah/ubah/hapus/urutkan foto hasil pemasangan beserta judul & kategori.
- **Blog** — tulis artikel (judul, label, tanggal, ringkasan, foto sampul, isi). Artikel yang punya isi
  bisa dibuka sebagai halaman sendiri (`#/blog/<judul-artikel>`).
- **Kontak** — nomor WhatsApp, Instagram, alamat, jam buka, Google Maps.

Menyimpan perubahan:

1. **Simpan ke GitHub** (disarankan) — hubungkan sekali di menu *Koneksi GitHub* dengan
   *fine-grained personal access token* (akses hanya ke repo ini, izin **Contents: Read and write**).
   Semua data & foto tersimpan dalam satu commit; file foto lama yang diganti/dihapus ikut dibersihkan.
2. **Unduh ZIP** — tanpa token: ekstrak ke folder website (timpa file lama), ikuti `BACA-DULU.txt`, lalu push.

Token hanya disimpan di browser Anda. Halaman admin tidak bisa mengubah website tanpa token
(website ini statis), dan sudah ditandai `noindex` agar tidak muncul di mesin pencari.

## Memasukkan foto

Taruh foto dengan nama yang sesuai di folder `foto/` — tidak perlu mengubah kode.
Panduan lengkap: **[PANDUAN-FOTO.md](PANDUAN-FOTO.md)**.
Buka `index.html?cekfoto` untuk melihat foto mana yang sudah/belum ada.

> Catatan: beberapa browser membatasi pemuatan file saat `index.html` dibuka langsung dari
> komputer. Jika foto tidak muncul, jalankan server lokal sederhana, misalnya
> `python -m http.server` di folder ini, lalu buka `http://localhost:8000`.

## Fitur

- Loader, transisi halaman bertirai, kursor kustom, tombol magnetik
- Judul muncul per kata, teks intro "menyala" saat di-scroll, efek parallax
- Portofolio bergulir horizontal (desktop) / geser (ponsel)
- Galeri produk otomatis + lightbox (bisa geser di ponsel & pakai tombol panah keyboard)
- Formulir kontak & tombol harga langsung ke WhatsApp
- Mode gelap otomatis, responsif, dan menghormati pengaturan "kurangi animasi"
