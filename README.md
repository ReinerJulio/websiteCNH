# Website Central Niaga Hardware

Website toko **Central Niaga Hardware**, Pandaan: cat Jotun, wall panel, wall board, HPL, pintu,
perlengkapan safety, dan lainnya. Alamat: **https://centralniagahardware.com**

## Cara kerja singkat

```
Admin (/admin/) atau edit file  →  branch main di GitHub  →  Cloudflare otomatis memperbarui website (±1–2 menit)
```

- **`main` adalah satu-satunya branch yang penting.** Isinya = website yang sedang tayang.
- Branch lain (mis. `claude/...`) hanya tempat kerja sementara untuk perubahan dari Claude.
  Setelah pull request di-*merge* ke `main`, branch itu boleh dihapus (lihat bagian *Merapikan branch*).

## Peta folder

```
index.html            Halaman utama website (tidak perlu diedit)
assets/
  js/pengaturan.js    ✏️ SEMUA ISI WEBSITE: kontak, produk, motif, portofolio, blog (diubah lewat admin)
  js/main.js          Logika & animasi website
  js/asisten.js       Asisten chat (jawab dari data website, harga → WhatsApp)
  css/style.css       Tampilan & warna
foto/                 📷 Semua foto (diatur otomatis oleh admin)
  logo/               Logo & ikon tab browser
  beranda/            Foto besar halaman depan
  produk/<produk>/    sampul, motif/, tipe/, galeri/ per produk
  portofolio/         Foto hasil pemasangan
  blog/               Foto sampul artikel
katalog/              PDF katalog (opsional; katalog utama memakai link Google Drive)
admin/                Halaman admin, dikunci login email (Cloudflare Access)
privasi/              Halaman Kebijakan Privasi
seo/build.mjs         Dijalankan otomatis oleh Cloudflare: membuat halaman produk/blog/kontak + sitemap untuk Google
robots.txt            Aturan untuk mesin pencari
panduan/              📘 Panduan untuk pemilik website (lihat di bawah)
```

## Panduan

| Perlu apa? | Baca |
|---|---|
| Menambah/mengganti foto secara manual | [panduan/foto.md](panduan/foto.md) |
| Hosting Cloudflare & mengunci halaman admin | [panduan/online-cloudflare.md](panduan/online-cloudflare.md) |
| Domain, redirect www & pages.dev, Google Search Console | [panduan/domain-seo.md](panduan/domain-seo.md) |

## Halaman admin

Buka **https://centralniagahardware.com/admin/** (login dengan email yang diizinkan, kode dikirim ke email).

- **Produk**: tambah/ubah/hapus produk, merek, tagline, deskripsi, spesifikasi, motif (dengan kode),
  tipe + pilihan warna, koleksi/seri, foto galeri. Foto otomatis dikecilkan, dikompres, dan disimpan di folder yang benar.
- **Katalog**: link Google Drive atau unggah PDF.
- **Portofolio**: foto hasil pemasangan beserta judul & kategori.
- **Blog**: artikel (judul, label, tanggal, ringkasan, foto sampul, isi), tayang di `/blog/<judul-artikel>/`.
- **Kontak**: WhatsApp, Instagram, alamat, jam buka, Google Maps.

Simpan dengan **Simpan ke GitHub** (sekali hubungkan token di menu *Koneksi GitHub*). Website ikut
terbarui sendiri ±1–2 menit kemudian. Token hanya disimpan di browser Anda.

> Setelah update, jika website masih tampak lama: tekan **Ctrl + Shift + R** (HP: buka di tab penyamaran).

## Merapikan branch

Agar branch lama tidak menumpuk: GitHub → repo ini → **Settings → General → Pull Requests** →
centang **Automatically delete head branches**. Setelah itu setiap branch otomatis terhapus begitu
pull request-nya di-merge.

## Fitur

- Loader, transisi halaman, kursor kustom, tombol magnetik
- Teks "menyala" saat di-scroll, efek parallax, portofolio bergulir horizontal (desktop) / geser (HP)
- Scroll ringan: animasi diproses GPU, listener pasif, tanpa efek blur berat di HP
- Galeri produk + lightbox (bisa digeser di HP)
- Asisten chat gratis, formulir & tombol harga langsung ke WhatsApp
- Halaman produk/blog/kontak dengan alamat asli + sitemap (SEO)
- Mode gelap otomatis, responsif, menghormati pengaturan "kurangi animasi"
- `?cekfoto` di belakang alamat → tampilkan foto mana yang sudah/belum ada

## Mencoba di komputer sendiri

Jalankan `python -m http.server` di folder ini lalu buka `http://localhost:8000`.
