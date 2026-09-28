# Website Central Niaga Hardware

Website toko material interior (Wall Panel, Wall Board, HPL) — satu halaman statis, tanpa build tool.
Cukup buka `index.html` di browser, atau unggah seluruh folder ke hosting (GitHub Pages, Netlify, cPanel, dll).

## Struktur folder

```
index.html                 ← halaman utama (tidak perlu diedit)
assets/
  css/style.css            ← tampilan & animasi (warna utama di bagian :root)
  js/pengaturan.js         ← ✏️ EDIT DI SINI: kontak, teks produk, motif, portofolio, blog
  js/main.js               ← logika website (tidak perlu diedit)
foto/                      ← 📷 TARUH FOTO DI SINI (lihat PANDUAN-FOTO.md)
  beranda/                 ← hero, tentang, konsultasi
  produk/<produk>/         ← sampul, motif/, galeri/
  portofolio/              ← 1.jpg, 2.jpg, ...
katalog/katalog.pdf        ← file katalog untuk tombol "Download Katalog"
```

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
