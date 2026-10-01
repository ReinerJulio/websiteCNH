# Panduan Memasukkan Foto

Website ini dibuat agar Anda **cukup menaruh foto di folder yang tepat dengan nama yang tepat** — tanpa mengedit kode.

## Langkah singkat

1. Buka folder `foto/`.
2. Taruh foto di subfolder yang sesuai, dengan nama persis seperti tabel di bawah.
3. Ekstensi bebas: `.jpg`, `.jpeg`, `.png`, atau `.webp` — semuanya otomatis dikenali.
4. Buka / refresh website. Selesai.

Selama sebuah foto belum ada, website menampilkan **tekstur kayu sementara**, jadi tampilan tetap rapi.

## Peta folder

```
foto/
├── logo/
│   ├── logo.png            ← emblem logo, PNG latar transparan (header, footer, loader)
│   └── favicon.png         ← ikon tab browser (persegi)
│
├── beranda/
│   ├── hero.jpg            ← foto besar paling atas (landscape, ≥1920 px)
│   ├── tentang.jpg         ← bagian "Tentang Kami" (portrait 4:5)
│   └── konsultasi.jpg      ← latar bagian "Punya proyek?" (landscape)
│
├── produk/
│   ├── wall-panel/
│   │   ├── sampul.jpg      ← kartu produk di beranda (portrait)
│   │   ├── motif/          ← oak.jpg, walnut.jpg, grey.jpg, black.jpg (persegi 1:1)
│   │   └── galeri/         ← 1.jpg, 2.jpg, 3.jpg, ... (hasil pemasangan)
│   ├── wall-board/
│   │   ├── sampul.jpg
│   │   ├── motif/          ← natural.jpg, white.jpg, grey.jpg
│   │   ├── marble-series/  ← 23 motif Mevvah: atlantic.jpg, new-york.jpg, ... (lihat BACA-SAYA.txt)
│   │   └── galeri/         ← 1.jpg, 2.jpg, ...
│   └── hpl/
│       ├── sampul.jpg
│       ├── motif/          ← wood.jpg, stone.jpg, white.jpg, charcoal.jpg
│       └── galeri/         ← 1.jpg, 2.jpg, ...
│
└── portofolio/             ← 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg (portrait)

katalog/katalog.pdf         ← file untuk tombol "Download Katalog"
```

Setiap folder juga berisi file `BACA-SAYA.txt` sebagai pengingat.

## Galeri produk (otomatis)

Taruh foto hasil pemasangan di `foto/produk/<produk>/galeri/` dengan nama **1.jpg, 2.jpg, 3.jpg, dst.**
Semua foto langsung tampil sebagai galeri di halaman produk, bisa diklik untuk diperbesar.
Nomor harus **berurutan** — jika 3.jpg tidak ada, foto 4.jpg dan seterusnya tidak akan dibaca.

## Koleksi / seri motif (mis. Marble Series)

Wall Board punya bagian **Koleksi** berisi Marble Series dari Mevvah: 23 motif dalam 4 grup
(Special Design, Premium Matte Material, Motif Marble, New Size), lengkap dengan filter dan tombol
"Tanya Harga Motif Ini" ke WhatsApp.

- Foto motif ada di `foto/produk/wall-board/marble-series/`, satu file per motif
  (nama motif huruf kecil, spasi jadi `-`, mis. `new-york.jpg`).
- Foto saat ini dipotong dari gambar katalog sehingga resolusinya rendah —
  **timpa dengan foto HD memakai nama file yang sama**.
- Menambah motif, grup, atau seri baru (juga untuk produk lain): edit bagian `koleksi`
  di `assets/js/pengaturan.js`. Tandai motif baru dengan `baru: true` agar muncul label "New".

## Cek foto mana yang sudah / belum ada

Buka website dengan tambahan `?cekfoto` di alamatnya, contoh:

```
index.html?cekfoto
https://domain-anda.com/?cekfoto
```

Setiap tempat foto akan diberi label:
- **hijau ✓** — foto sudah ditemukan (beserta nama filenya)
- **merah ✗** — foto belum ada, dan label menunjukkan nama file yang harus Anda buat

## Mengubah teks, motif, atau menambah portofolio

Semua isi diatur di satu file: **`assets/js/pengaturan.js`**. Contoh:

- **Tambah motif baru** di Wall Panel — tambahkan satu baris di bagian `motif`:
  ```js
  { nama: 'Teak', foto: 'foto/produk/wall-panel/motif/teak', tekstur: 'wood oak' },
  ```
  lalu taruh `teak.jpg` di `foto/produk/wall-panel/motif/`.

- **Tambah portofolio** ke-7 — tambahkan di bagian `portofolio`:
  ```js
  { judul: 'Hotel', kategori: 'HPL', foto: 'foto/portofolio/7', tekstur: 'wood wal' },
  ```
  lalu taruh `7.jpg` di `foto/portofolio/`.

- **Isi spesifikasi produk** — isi bagian `spesifikasi`, misalnya:
  ```js
  spesifikasi: [['Ukuran', '16 x 290 cm'], ['Tebal', '9 mm'], ['Material', 'WPC']],
  ```

## Tips foto agar website tetap cepat

| Jenis              | Ukuran disarankan     | Berat file  |
|--------------------|-----------------------|-------------|
| Hero / konsultasi  | 1920 – 2400 px lebar  | < 500 KB    |
| Sampul, portofolio | 1200 × 1500 px        | < 350 KB    |
| Motif              | 1400 × 1400 px        | < 300 KB    |
| Galeri             | 1600 px sisi terpanjang | < 400 KB  |

- Kompres foto gratis di **squoosh.app** atau **tinypng.com** sebelum diunggah.
- Gunakan huruf kecil dan tanpa spasi untuk nama file (`oak.jpg`, bukan `Oak Wood.JPG`).
  Huruf besar pada ekstensi (`.JPG`) tetap dikenali, tetapi nama file harus sama persis.
