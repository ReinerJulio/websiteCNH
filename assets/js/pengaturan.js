/* =====================================================================
   PENGATURAN WEBSITE — CENTRAL NIAGA HARDWARE
   ---------------------------------------------------------------------
   Ini SATU-SATUNYA file yang perlu Anda edit untuk mengubah isi website.

   CARA MEMASUKKAN FOTO (tanpa edit kode):
   1. Taruh foto di folder "foto/" sesuai nama yang tertulis di bawah.
   2. Tidak perlu menulis ekstensi — .jpg, .jpeg, .png, dan .webp
      semuanya otomatis dikenali.
      Contoh: foto untuk  'foto/beranda/hero'  cukup diberi nama
              hero.jpg (atau hero.png / hero.webp) di folder foto/beranda/
   3. Selama foto belum ada, website menampilkan tekstur sementara.
   4. Buka website dengan tambahan  ?cekfoto  di alamatnya
      (misal: index.html?cekfoto) untuk melihat label nama file
      yang dibutuhkan di setiap tempat foto, beserta statusnya.

   Panduan lengkap: lihat PANDUAN-FOTO.md
   ===================================================================== */

const PENGATURAN = {

  /* ---------- KONTAK ---------- */
  kontak: {
    wa: '6287852328888',                 // nomor WA format internasional, tanpa + dan spasi
    waTampil: '0878 5232 8888',          // nomor yang ditampilkan di website
    instagram: 'centralniagahardware_',  // tanpa @
    alamat: 'Ruko Central Niaga Pandaan Blok C3-5, Jl. Raya Kasri No.321, Petung Sari, Petungasri, Kec. Pandaan, Pasuruan, Jawa Timur',
    jam: 'Senin – Minggu, 07.00 – 18.00',
    maps: 'https://share.google/HbRGai5cvOndSn72E'
  },

  /* ---------- KATALOG PDF ---------- */
  katalog: 'katalog/katalog.pdf',

  /* ---------- FOTO HALAMAN BERANDA ---------- */
  foto: {
    logo: 'foto/logo/logo',               // logo/emblem (PNG transparan) — tampil di header, footer & loader
    hero: 'foto/beranda/hero',            // foto besar paling atas (landscape, min. 1920px)
    tentang: 'foto/beranda/tentang',      // foto bagian "Tentang Kami" (portrait 4:5)
    konsultasi: 'foto/beranda/konsultasi' // latar bagian "Punya proyek?" (landscape)
  },

  /* ---------- PRODUK ----------
     sampul      : foto kartu produk di beranda (portrait)
     spesifikasi : daftar [label, isi]. Contoh: ['Ukuran', '16 x 290 cm']
                   Biarkan [] jika belum ada.
     motif       : pilihan motif/warna. Foto motif ada di folder .../motif/
     galeri      : folder galeri. Isi dengan 1.jpg, 2.jpg, 3.jpg, dst.
                   (berurutan, tanpa lompat nomor) — tampil otomatis.
     tekstur     : tampilan sementara saat foto belum ada (tidak perlu diubah) */
  produk: [
    {
      id: 'wall-panel',
      nama: 'Wall Panel',
      tagline: 'Transform your wall. Elevate your space.',
      deskripsi: 'Panel dinding dengan tampilan kayu modern untuk interior yang hangat dan elegan.',
      sampul: 'foto/produk/wall-panel/sampul',
      galeri: 'foto/produk/wall-panel/galeri',
      tekstur: 'wood oak',
      spesifikasi: [],
      motif: [
        { nama: 'Oak Wood',  foto: 'foto/produk/wall-panel/motif/oak',    tekstur: 'wood oak' },
        { nama: 'Walnut',    foto: 'foto/produk/wall-panel/motif/walnut', tekstur: 'wood wal' },
        { nama: 'Grey Wood', foto: 'foto/produk/wall-panel/motif/grey',   tekstur: 'wood gry' },
        { nama: 'Black Oak', foto: 'foto/produk/wall-panel/motif/black',  tekstur: 'wood blk' }
      ]
    },
    {
      id: 'wall-board',
      nama: 'Wall Board',
      tagline: 'Praktis. Rapi. Tahan lama.',
      deskripsi: 'Solusi papan dinding praktis untuk interior maupun eksterior.',
      sampul: 'foto/produk/wall-board/sampul',
      galeri: 'foto/produk/wall-board/galeri',
      tekstur: 'brd',
      spesifikasi: [],
      motif: [
        { nama: 'Natural', foto: 'foto/produk/wall-board/motif/natural', tekstur: 'brd' },
        { nama: 'White',   foto: 'foto/produk/wall-board/motif/white',   tekstur: 'wht' },
        { nama: 'Grey',    foto: 'foto/produk/wall-board/motif/grey',    tekstur: 'stn' }
      ],
      /* KOLEKSI / SERI — tampil sebagai katalog motif di halaman produk.
         Foto motif ada di folder: foto/produk/wall-board/marble-series/  (nama file = nama motif, huruf kecil, spasi jadi -)
         Tambah motif   : salin satu baris { nama: ..., foto: ... }
         Motif baru     : tambahkan  baru: true  (muncul label "New")
         spesifikasi    : [label, isi] — boleh per seri atau per grup. Kosongkan [] jika tidak ada. */
      koleksi: [
        {
          nama: 'Marble Series',
          merek: 'Mevvah',
          deskripsi: 'Panel dinding bermotif marmer dengan pilihan motif lengkap — dari desain spesial berwarna berani hingga marmer klasik hitam, putih, dan krem.',
          katalog: 'foto/produk/wall-board/marble-series/katalog',
          spesifikasi: [],
          grup: [
            { nama: 'Special Design', spesifikasi: [], motif: [
              { nama: 'Atlantic', foto: 'foto/produk/wall-board/marble-series/atlantic' },
              { nama: 'Andromeda', foto: 'foto/produk/wall-board/marble-series/andromeda' },
              { nama: 'Aztec', foto: 'foto/produk/wall-board/marble-series/aztec' },
              { nama: 'Pegasus', foto: 'foto/produk/wall-board/marble-series/pegasus' }
            ] },
            { nama: 'Premium Matte Material', spesifikasi: [], motif: [
              { nama: 'Matt Concrete', foto: 'foto/produk/wall-board/marble-series/matt-concrete', baru: true }
            ] },
            { nama: 'Motif Marble', spesifikasi: [], motif: [
              { nama: 'New York', foto: 'foto/produk/wall-board/marble-series/new-york' },
              { nama: 'Nagoya', foto: 'foto/produk/wall-board/marble-series/nagoya' },
              { nama: 'London', foto: 'foto/produk/wall-board/marble-series/london' },
              { nama: 'Prague', foto: 'foto/produk/wall-board/marble-series/prague' },
              { nama: 'Moscow', foto: 'foto/produk/wall-board/marble-series/moscow' },
              { nama: 'Alexandria', foto: 'foto/produk/wall-board/marble-series/alexandria' },
              { nama: 'Berlin', foto: 'foto/produk/wall-board/marble-series/berlin' },
              { nama: 'Shanghai', foto: 'foto/produk/wall-board/marble-series/shanghai' },
              { nama: 'Cairo', foto: 'foto/produk/wall-board/marble-series/cairo' },
              { nama: 'Dubai', foto: 'foto/produk/wall-board/marble-series/dubai' },
              { nama: 'Milan', foto: 'foto/produk/wall-board/marble-series/milan' },
              { nama: 'Helsinki', foto: 'foto/produk/wall-board/marble-series/helsinki' },
              { nama: 'Tokyo', foto: 'foto/produk/wall-board/marble-series/tokyo' },
              { nama: 'Rome', foto: 'foto/produk/wall-board/marble-series/rome' },
              { nama: 'Brussels', foto: 'foto/produk/wall-board/marble-series/brussels' }
            ] },
            { nama: 'New Size', spesifikasi: [['Lebar', '120 cm'], ['Panjang', '240 / 300 cm'], ['Ketebalan', '3 mm']], motif: [
              { nama: 'Zurich', foto: 'foto/produk/wall-board/marble-series/zurich' },
              { nama: 'Santorini', foto: 'foto/produk/wall-board/marble-series/santorini' },
              { nama: 'Montreal', foto: 'foto/produk/wall-board/marble-series/montreal' }
            ] }
          ]
        }
      ]
    },
    {
      id: 'hpl',
      nama: 'HPL',
      tagline: 'Permukaan kuat. Tampilan abadi.',
      deskripsi: 'High Pressure Laminate tahan lama, mudah dirawat, dengan ragam motif.',
      sampul: 'foto/produk/hpl/sampul',
      galeri: 'foto/produk/hpl/galeri',
      tekstur: 'hpl',
      spesifikasi: [],
      motif: [
        { nama: 'Wood',        foto: 'foto/produk/hpl/motif/wood',     tekstur: 'wood oak' },
        { nama: 'Stone',       foto: 'foto/produk/hpl/motif/stone',    tekstur: 'stn' },
        { nama: 'Solid White', foto: 'foto/produk/hpl/motif/white',    tekstur: 'wht' },
        { nama: 'Charcoal',    foto: 'foto/produk/hpl/motif/charcoal', tekstur: 'wood blk' }
      ]
    }
  ],

  /* ---------- PORTOFOLIO ----------
     Tambah / hapus baris sesuka Anda. Foto: foto/portofolio/1.jpg, 2.jpg, dst. */
  portofolio: [
    { judul: 'Rumah Tinggal',    kategori: 'Wall Panel', foto: 'foto/portofolio/1', tekstur: 'wood oak' },
    { judul: 'Apartemen',        kategori: 'HPL',        foto: 'foto/portofolio/2', tekstur: 'wood wal' },
    { judul: 'Kantor',           kategori: 'Wall Board', foto: 'foto/portofolio/3', tekstur: 'wood gry' },
    { judul: 'Commercial Space', kategori: 'Wall Panel', foto: 'foto/portofolio/4', tekstur: 'wood blk' },
    { judul: 'Ruang Keluarga',   kategori: 'Wall Panel', foto: 'foto/portofolio/5', tekstur: 'brd' },
    { judul: 'Kafe & Resto',     kategori: 'HPL',        foto: 'foto/portofolio/6', tekstur: 'stn' }
  ],

  /* ---------- BLOG ---------- */
  blog: [
    { label: 'Segera Hadir', judul: 'Cara Memilih Wall Panel yang Tepat', ringkas: 'Panduan motif, warna, dan ukuran untuk setiap ruangan.' },
    { label: 'Segera Hadir', judul: 'Wall Board vs HPL: Apa Bedanya?', ringkas: 'Perbandingan fungsi, ketahanan, dan penggunaan.' },
    { label: 'Segera Hadir', judul: 'Tren Interior Kayu Modern', ringkas: 'Ide penerapan material kayu untuk hunian dan kantor.' }
  ]
};
