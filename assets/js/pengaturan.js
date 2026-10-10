/* =====================================================================
   PENGATURAN WEBSITE — CENTRAL NIAGA HARDWARE
   ---------------------------------------------------------------------
   File ini diperbarui oleh halaman admin (/admin/) — 10/10/2026, 11.36.04.
   Paling mudah mengubah isi website lewat halaman admin. Mengedit file ini
   langsung juga boleh (lihat PANDUAN-FOTO.md).

   Foto: tulis path TANPA ekstensi — .jpg/.jpeg/.png/.webp dikenali otomatis.
   Buka index.html?cekfoto untuk melihat foto yang sudah/belum ada.
   ===================================================================== */

const PENGATURAN = {
  kontak: {
    wa: "6287852328888",
    waTampil: "0878 5232 8888",
    instagram: "centralniagahardware_",
    alamat: "Ruko Central Niaga Pandaan Blok C3-5, Jl. Raya Kasri No.321, Petung Sari, Petungasri, Kec. Pandaan, Pasuruan, Jawa Timur",
    jam: "Senin – Minggu, 07.00 – 18.00",
    maps: "https://share.google/HbRGai5cvOndSn72E"
  },
  katalog: "https://drive.google.com/file/d/1GGWT_loI6mL0cCGUkQRsLZre-zpTAthS/view?usp=sharing",
  foto: { logo: "foto/logo/logo", hero: "foto/beranda/hero", tentang: "foto/beranda/tentang", konsultasi: "foto/beranda/konsultasi" },
  produk: [
    {
      id: "wall-panel",
      nama: "Wall Panel",
      merek: "Mevvah",
      seri: "Fluted Panel",
      tagline: "Transform your wall. Elevate your space.",
      deskripsi: "Panel dinding bergaris (fluted) untuk aksen dinding yang modern dan berdimensi. Tersedia 3 tipe profil dengan pilihan warna kayu hingga warna solid.",
      sampul: "foto/produk/wall-panel/sampul",
      galeri: "foto/produk/wall-panel/galeri",
      tekstur: "wood oak",
      tipe: [
        {
          nama: "MVH.FLT-175",
          foto: "foto/produk/wall-panel/fluted/flt-175",
          spesifikasi: [["Lebar", "17,5 cm"], ["Panjang", "290 cm"], ["Tebal", "2 cm"]],
          warna: [
            { nama: "Dark Wood", warna: "#6a453b", foto: "foto/produk/wall-panel/fluted/flt-175/dark-wood" },
            { nama: "Wood", warna: "#bc7647", foto: "foto/produk/wall-panel/fluted/flt-175/wood" },
            { nama: "Light Wood", warna: "#ebcab3", foto: "foto/produk/wall-panel/fluted/flt-175/light-wood" },
            { nama: "Blue", warna: "#3c8c9a", foto: "foto/produk/wall-panel/fluted/flt-175/blue" },
            { nama: "Dark Grey", warna: "#7f7f7f", foto: "foto/produk/wall-panel/fluted/flt-175/dark-grey" },
            { nama: "Grey", warna: "#bebebe", foto: "foto/produk/wall-panel/fluted/flt-175/grey" },
            { nama: "Light Blue", warna: "#83a9d9", foto: "foto/produk/wall-panel/fluted/flt-175/light-blue" }
          ]
        },
        {
          nama: "MVH.FLT-195",
          foto: "foto/produk/wall-panel/fluted/flt-195",
          spesifikasi: [["Lebar", "19,5 cm"], ["Panjang", "290 cm"], ["Tebal", "1,2 cm"]],
          warna: [
            { nama: "Dark Wood", warna: "#6a453b", foto: "foto/produk/wall-panel/fluted/flt-195/dark-wood" },
            { nama: "Wood", warna: "#bc7647", foto: "foto/produk/wall-panel/fluted/flt-195/wood" },
            { nama: "Light Wood", warna: "#ebcab3", foto: "foto/produk/wall-panel/fluted/flt-195/light-wood" }
          ]
        },
        {
          nama: "MVH.FLT-202",
          foto: "foto/produk/wall-panel/fluted/flt-202",
          spesifikasi: [["Lebar", "20,2 cm"], ["Panjang", "290 cm"], ["Tebal", "2,7 cm"]],
          warna: [
            { nama: "Dark Wood", warna: "#6a453b", foto: "foto/produk/wall-panel/fluted/flt-202/dark-wood" },
            { nama: "Wood", warna: "#bc7647", foto: "foto/produk/wall-panel/fluted/flt-202/wood" },
            { nama: "Light Wood", warna: "#ebcab3", foto: "foto/produk/wall-panel/fluted/flt-202/light-wood" }
          ]
        }
      ],
      spesifikasi: []
    },
    {
      id: "wall-board",
      nama: "Wall Board",
      merek: "Champion",
      tagline: "Praktis. Rapi. Tahan lama.",
      deskripsi: "Solusi papan dinding praktis untuk interior maupun eksterior.",
      sampul: "foto/produk/wall-board/sampul",
      galeri: "foto/produk/wall-board/galeri",
      tekstur: "brd",
      spesifikasi: [["Lebar", "60 cm"], ["Panjang", "300 cm"], ["Tebal", "9 mm"]],
      motif: [
        { kode: "MB01", nama: "Pearl Beige", foto: "foto/produk/wall-board/champion/mb01", tekstur: "wht" },
        { kode: "MB02", nama: "Vanilla Cloud", foto: "foto/produk/wall-board/champion/mb02", tekstur: "brd" },
        { kode: "MB03", nama: "Linen Touch", foto: "foto/produk/wall-board/champion/mb03", tekstur: "stn" },
        { kode: "MB04", nama: "Dove Feather", foto: "foto/produk/wall-board/champion/mb04", tekstur: "stn" },
        { kode: "MB05", nama: "Natural Maple", foto: "foto/produk/wall-board/champion/mb05", tekstur: "wood oak" },
        { kode: "MB06", nama: "Golden Hickory", foto: "foto/produk/wall-board/champion/mb06", tekstur: "wood oak" },
        { kode: "MB07", nama: "Schatt Walnut", foto: "foto/produk/wall-board/champion/mb07", tekstur: "wood wal" },
        { kode: "MB08", nama: "White Marble", foto: "foto/produk/wall-board/champion/mb08", tekstur: "wht" },
        { kode: "MB09", nama: "White Beige", foto: "foto/produk/wall-board/champion/mb09", tekstur: "wht" },
        { kode: "MB10", nama: "Vanilla Brown", foto: "foto/produk/wall-board/champion/mb10", tekstur: "stn" }
      ],
      koleksi: [
        {
          nama: "Marble Series",
          merek: "Mevvah",
          deskripsi: "Panel dinding bermotif marmer dengan pilihan motif lengkap — dari desain spesial berwarna berani hingga marmer klasik hitam, putih, dan krem.",
          katalog: "foto/produk/wall-board/marble-series/katalog",
          spesifikasi: [],
          grup: [
            {
              nama: "Special Design",
              spesifikasi: [],
              motif: [
                { nama: "Atlantic", foto: "foto/produk/wall-board/marble-series/atlantic" },
                { nama: "Andromeda", foto: "foto/produk/wall-board/marble-series/andromeda" },
                { nama: "Aztec", foto: "foto/produk/wall-board/marble-series/aztec" },
                { nama: "Pegasus", foto: "foto/produk/wall-board/marble-series/pegasus" }
              ]
            },
            {
              nama: "Premium Matte Material",
              spesifikasi: [],
              motif: [{ nama: "Matt Concrete", foto: "foto/produk/wall-board/marble-series/matt-concrete", baru: true }]
            },
            {
              nama: "Motif Marble",
              spesifikasi: [["Lebar", "120 cm"], ["Panjang", "240 cm"], ["Ketebalan", "3 mm"]],
              motif: [
                { nama: "New York", foto: "foto/produk/wall-board/marble-series/new-york" },
                { nama: "Nagoya", foto: "foto/produk/wall-board/marble-series/nagoya" },
                { nama: "London", foto: "foto/produk/wall-board/marble-series/london" },
                { nama: "Prague", foto: "foto/produk/wall-board/marble-series/prague" },
                { nama: "Moscow", foto: "foto/produk/wall-board/marble-series/moscow" },
                { nama: "Alexandria", foto: "foto/produk/wall-board/marble-series/alexandria" },
                { nama: "Berlin", foto: "foto/produk/wall-board/marble-series/berlin" },
                { nama: "Shanghai", foto: "foto/produk/wall-board/marble-series/shanghai" },
                { nama: "Cairo", foto: "foto/produk/wall-board/marble-series/cairo" },
                { nama: "Dubai", foto: "foto/produk/wall-board/marble-series/dubai" },
                { nama: "Milan", foto: "foto/produk/wall-board/marble-series/milan" },
                { nama: "Helsinki", foto: "foto/produk/wall-board/marble-series/helsinki" },
                { nama: "Tokyo", foto: "foto/produk/wall-board/marble-series/tokyo" },
                { nama: "Rome", foto: "foto/produk/wall-board/marble-series/rome" },
                { nama: "Brussels", foto: "foto/produk/wall-board/marble-series/brussels" }
              ]
            },
            {
              nama: "New Size",
              spesifikasi: [["Lebar", "120 cm"], ["Panjang", "240 / 300 cm"], ["Ketebalan", "3 mm"]],
              motif: [
                { nama: "Zürich", foto: "foto/produk/wall-board/marble-series/zurich" },
                { nama: "Santorini", foto: "foto/produk/wall-board/marble-series/santorini" },
                { nama: "Montreal", foto: "foto/produk/wall-board/marble-series/montreal" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "hpl",
      nama: "HPL",
      tagline: "Permukaan kuat. Tampilan abadi.",
      deskripsi: "High Pressure Laminate tahan lama, mudah dirawat, dengan ragam motif.",
      sampul: "foto/produk/hpl/sampul",
      galeri: "foto/produk/hpl/galeri",
      tekstur: "hpl",
      spesifikasi: [],
      motif: [
        { nama: "Wood", foto: "foto/produk/hpl/motif/wood", tekstur: "wood oak" },
        { nama: "Stone", foto: "foto/produk/hpl/motif/stone", tekstur: "stn" },
        { nama: "Solid White", foto: "foto/produk/hpl/motif/white", tekstur: "wht" },
        { nama: "Charcoal", foto: "foto/produk/hpl/motif/charcoal", tekstur: "wood blk" }
      ]
    },
    {
      id: "pintu",
      nama: "Pintu",
      merek: "Fortress",
      tagline: "Smart Door, Smart Lock, Smart Life",
      deskripsi: "PROMO BULAN OKTOBER - FORTRESS!\nDISKON 10%\n\nFortress Legion 80.02\n\n- Material kuat & kokoh\n- Dilengkapi fitur keamanan\n- Desain elegan dan modern\n",
      sampul: "foto/produk/pintu/sampul",
      galeri: "foto/produk/pintu/galeri",
      tekstur: "stn",
      spesifikasi: [
        ["Lebar", "80 cm"],
        ["Tinggi ", "200 cm"],
        ["Tebal", "4 cm"],
        ["Warna", "Urat Kayu"],
        ["Ketebalan Panel", "0.3 mm"],
        ["Ketebalan Kusen", "0.6 mm"]
      ],
      seri: "Legion",
      tipe: [
        {
          nama: "Legion 80.01",
          foto: "foto/produk/pintu/tipe/legion-80-01",
          spesifikasi: [
            ["Lebar", "80 cm"],
            ["Tinggi ", "200 cm"],
            ["Tebal", "4 cm"],
            ["Ketebalan Panel", "0.3 mm"],
            ["Ketebalan Kusen", "0.6 mm"]
          ],
          warna: [
            { nama: "Putih", warna: "#ffffff", foto: "foto/produk/pintu/tipe/legion-80-01/putih" },
            { nama: "Urat Kayu", warna: "#674113", foto: "foto/produk/pintu/tipe/legion-80-01/urat-kayu" }
          ]
        },
        {
          nama: "Legion 80.02",
          foto: "foto/produk/pintu/tipe/legion-80-02",
          spesifikasi: [
            ["Lebar", "80 cm"],
            ["Tinggi", "200 cm"],
            ["Tebal", "4 cm"],
            ["Ketebalan Panel", "0.3 mm"],
            ["Ketebalan Kusen", "0.6 mm"]
          ],
          warna: [
            { nama: "Putih", warna: "#ffffff", foto: "foto/produk/pintu/tipe/legion-80-02/putih" },
            { nama: "Urat Kayu", warna: "#674113", foto: "foto/produk/pintu/tipe/legion-80-02/urat-kayu" }
          ]
        }
      ]
    },
    {
      id: "jotun",
      nama: "Jotun",
      merek: "JOTUN ",
      tagline: "JOTUN INTERIOR & EXTERIOR",
      deskripsi: "JOTUN merupakan merek cat berkualitas untuk kebutuhan interior dan eksterior yang membantu memperindah serta melindungi bangunan Anda. Tersedia berbagai pilihan warna dan produk cat untuk dinding dalam maupun luar ruangan, sehingga Anda dapat menciptakan hunian yang nyaman, elegan, dan tahan lama.\n\nTemukan berbagai pilihan cat JOTUN di Central Niaga Hardware – Jotun Studio Pandaan, mitra kebutuhan cat untuk rumah, bangunan, dan proyek Anda.",
      sampul: "foto/produk/jotun/sampul",
      galeri: "foto/produk/jotun/galeri",
      tekstur: "stn",
      spesifikasi: [],
      seri: "Cat Jotun",
      koleksi: [],
      tipe: [
        {
          nama: "MAJESTIC PURE COLOR",
          foto: "foto/produk/jotun/tipe/majestic-pure-color",
          spesifikasi: [
            [
              "INTERIOR ",
              "Majestic Pure Color, cat paling indah kami. Dengan hasil akhir matt yang premium dan tahan lama, mampu meningkatkan keindahan pada dinding anda. "
            ],
            [
              "",
              "Our Most Beautiful Paint  Unique Color Experience  Most Durable Matt  Anti-Reflection  Easily Washable  Anti-Bacterial & Anti-Fungal"
            ]
          ],
          warna: [{ nama: "7236 - CHI", warna: "#fffaf5", foto: "foto/produk/jotun/tipe/majestic-pure-color/chi" }]
        },
        {
          nama: "MAJESTIC SENSE",
          foto: "foto/produk/jotun/tipe/majestic-sense",
          spesifikasi: [
            [
              "INTERIOR",
              "Cat interior terbaik yang tak hanya memberikan hasil akhir mulus dan mewah, tapi juga memurnikan udara dalam ruangan dengan Clean Air Technology."
            ],
            [
              "",
              "Untuk kecantikan sempurna & rumah yang sehat  Clean Air Technology  Odour-Less Comfort  Luxuriously Smooth  Covers Hairline Cracks  Superior Washability"
            ]
          ],
          warna: [{ nama: "7236 - CHI", warna: "#f7f3ed", foto: "foto/produk/jotun/tipe/majestic-sense/7236-chi" }]
        },
        {
          nama: "MAJESTIC TRUE BEAUTY SHEEN",
          foto: "foto/produk/jotun/tipe/majestic-sheen",
          spesifikasi: [
            [
              "INTERIOR",
              "Tingkatkan keanggunan ruangan dengan sentuhan mewah yang tahan lama. Majestic True Beauty menghadirkan warna-warna indah dan hidup yang tahan lama."
            ],
            [
              "",
              "Untuk tampilan cantik dan tahan lama  True Colour Experience  Luxurious Smooth Finish  Superior Easy Clean  Low Odour  Anti Bacteria & Anti Fungal"
            ]
          ],
          warna: [{ nama: "7236 - CHI", warna: "#fbf3ea", foto: "foto/produk/jotun/tipe/majestic-sheen/7236-chi" }]
        },
        {
          nama: "MAJESTIC TRUE BEAUTY MATT",
          foto: "foto/produk/jotun/tipe/majestic-true-beauty-matt",
          spesifikasi: [
            [
              "INTERIOR",
              "Tingkatkan keanggunan ruangan dengan sentuhan mewah yang tahan lama. Majestic True Beauty menghadirkan warna-warna indah dan hidup yang tahan lama."
            ],
            [
              "",
              "Untuk tampilan cantik dan tahan lama  True Colour Experience  Luxurious Smooth Finish  Superior Easy Clean  Low Odour  Anti Bacteria & Anti Fungal"
            ]
          ],
          warna: [{ nama: "7236 - CHI", warna: "#f1e9df", foto: "foto/produk/jotun/tipe/majestic-true-beauty-matt/7236-chi" }]
        },
        {
          nama: "MAJESTIC PRIMER",
          foto: "foto/produk/jotun/tipe/majestic-primer",
          spesifikasi: [
            [
              "INTERIOR",
              "Cat dasar akrilik premium berbahan dasar air untuk menahan alkali, dirancang khusus sebagai primer cat interior untuk kecantikan yang tahan lama."
            ],
            [
              "",
              "Mempercantik dan meningkatkan ketahanan warna  Enhances Beautiful Colours  Improves Colour Last  Low Odour  Alkaline & Water Resistant  Good Adhesion"
            ]
          ],
          warna: [{ nama: "Cat Dasar - Putih ", warna: "#ffffff", foto: "foto/produk/jotun/tipe/majestic-primer/cat-dasar-putih" }]
        },
        {
          nama: "MAJESTIC SUPREME FINISH GLOSS",
          foto: "foto/produk/jotun/tipe/majestic-supreme-finish-gloss",
          spesifikasi: [
            [
              "INTERIOR",
              "Cat kayu dan besi berbahan dasar air yang memberikan hasil akhir yang indah dan sempurna untuk kesan abadi."
            ],
            [
              "",
              "Rumah indah melalui detail yang lebih halus  Beautiful Flawless Finish  Superior Easy Clean  Low Odour  Rust Resistance  Fast Drying Time"
            ]
          ],
          warna: [
            {
              nama: "1032 - IRON GREY",
              warna: "#7d7d7d",
              foto: "foto/produk/jotun/tipe/majestic-supreme-finish-gloss/1032-iron-grey"
            }
          ]
        },
        {
          nama: "MAJESTIC SUPREME FINISH SILKY MATT",
          foto: "foto/produk/jotun/tipe/majestic-supreme-finish-silky-matt",
          spesifikasi: [
            [
              "INTERIOR",
              "Cat kayu dan besi berbahan dasar air yang memberikan hasil akhir yang indah dan sempurna untuk kesan abadi."
            ],
            [
              "",
              "Rumah indah melalui detail yang lebih halus  Beautiful Flawless Finish  Superior Easy Clean  Low Odour  Rust Resistance  Fast Drying Time"
            ]
          ],
          warna: [
            {
              nama: "1974 - GOLDEN WALNUT",
              warna: "#c8a070",
              foto: "foto/produk/jotun/tipe/majestic-supreme-finish-silky-matt/1974-golden-walnut"
            }
          ]
        },
        {
          nama: "MAJESTIC PRIMER FOR WOOD AND METAL",
          foto: "foto/produk/jotun/tipe/majestic-primer-for-wood-and-metal",
          spesifikasi: [
            [
              "INTERIOR",
              "Primer akrilik berbahan dasar air premium dan ramah lingkungan yang meningkatkan daya rekat luar biasa pada substrat kayu and besi."
            ],
            [
              "",
              "Memperjelas warna-warna dan adhesi yang baik  Memperjelas warna-warna yang indah  Rendah bau  Adhesi yang baik"
            ]
          ],
          warna: [{ nama: "PUTIH ", warna: "#fefdfb", foto: "foto/produk/jotun/tipe/majestic-primer-for-wood-and-metal/putih" }]
        }
      ]
    }
  ],
  portofolio: [
    { judul: "Rumah Tinggal", kategori: "Wall Panel", foto: "foto/portofolio/1", tekstur: "wood oak" },
    { judul: "Apartemen", kategori: "HPL", foto: "foto/portofolio/2", tekstur: "wood wal" },
    { judul: "Kantor", kategori: "Wall Board", foto: "foto/portofolio/3", tekstur: "wood gry" },
    { judul: "Commercial Space", kategori: "Wall Panel", foto: "foto/portofolio/4", tekstur: "wood blk" },
    { judul: "Ruang Keluarga", kategori: "Wall Panel", foto: "foto/portofolio/5", tekstur: "brd" },
    { judul: "Kafe & Resto", kategori: "HPL", foto: "foto/portofolio/6", tekstur: "stn" },
    { judul: "Kamar Tidur ", kategori: "Jotun", foto: "foto/portofolio/kamar-tidur", tekstur: "wood oak" },
    { judul: "Dapur", kategori: "Jotun", foto: "foto/portofolio/dapur", tekstur: "wood oak" }
  ],
  blog: [
    {
      label: "Tips Interior",
      judul: "Cara Memilih Wall Panel yang Tepat",
      ringkas: "Panduan motif, warna, dan ukuran untuk setiap ruangan.",
      id: "cara-memilih-wall-panel-yang-tepat",
      foto: "foto/blog/cara-memilih-wall-panel-yang-tepat",
      isi: "Cara Memilih Wall Panel yang Tepat untuk Hunian Anda\n\nWall panel merupakan salah satu elemen dekorasi interior yang dapat membuat ruangan terlihat lebih modern, elegan, dan menarik. Selain memperindah tampilan dinding, wall panel juga dapat memberikan kesan ruangan yang lebih berkarakter.\n\nNamun, sebelum memilih wall panel, ada beberapa hal yang perlu diperhatikan agar hasil pemasangan sesuai dengan konsep ruangan dan kebutuhan Anda.\n\n1. Sesuaikan dengan Konsep Interior\n\nPilih wall panel sesuai dengan gaya interior yang diinginkan. Untuk konsep minimalis, Anda dapat memilih panel dengan motif sederhana dan warna netral. Sementara itu, untuk tampilan mewah dan elegan, motif marmer atau kombinasi panel dengan aksen garis dapat menjadi pilihan.\n\n2. Perhatikan Warna dan Motif\n\nWarna wall panel sebaiknya disesuaikan dengan warna cat dinding, lantai, furnitur, dan pencahayaan ruangan. Warna abu-abu, putih, krem, dan motif kayu sering digunakan karena mudah dipadukan dengan berbagai desain interior.\n\n3. Pilih Bahan yang Sesuai\n\nSetiap jenis wall panel memiliki karakteristik yang berbeda. Ada panel berbahan PVC, WPC, dan material dekoratif lainnya. Pertimbangkan lokasi pemasangan, kondisi kelembapan, kemudahan perawatan, serta petunjuk penggunaan dari produsen.\n\n4. Ukur Luas Dinding dengan Tepat\n\nSebelum membeli, ukur panjang dan tinggi dinding yang akan dipasang panel. Perhitungan yang tepat membantu menentukan jumlah material yang dibutuhkan dan mengurangi sisa bahan. Pertimbangkan juga pola sambungan serta kebutuhan pemotongan.\n\n5. Sesuaikan dengan Fungsi Ruangan\n\nUntuk ruang tamu, wall panel dapat digunakan sebagai aksen dinding utama atau area belakang televisi. Untuk kamar tidur, panel dapat menjadi dekorasi dinding belakang tempat tidur. Pastikan material yang dipilih sesuai dengan kondisi dan fungsi ruangan.\n\n6. Perhatikan Perawatan dan Pemasangan\n\nPilih material yang mudah dirawat dan sesuai dengan kondisi dinding. Pastikan permukaan dinding serta metode pemasangan mengikuti rekomendasi produsen agar hasilnya rapi dan tahan lama.\n\nKesimpulan\n\nMemilih wall panel yang tepat tidak hanya soal tampilan, tetapi juga tentang bahan, ukuran, fungsi, dan perawatan. Dengan perencanaan yang baik, wall panel dapat menjadi elemen dekorasi yang mempercantik ruangan sekaligus mendukung konsep interior rumah Anda.\n\nKunjungi Central Niaga Hardware untuk mendapatkan pilihan material dan perlengkapan bangunan yang sesuai dengan kebutuhan proyek Anda.",
      tanggal: "2026-10-10"
    },
    {
      label: "Tips Interior",
      judul: "Wall Board vs HPL: Apa Bedanya?",
      ringkas: "Perbandingan fungsi, ketahanan, dan penggunaan.",
      id: "wall-board-vs-hpl-apa-bedanya",
      isi: "Wall Board vs HPL: Kenali Perbedaannya Sebelum Memilih\n\nDalam dunia interior, wall board dan HPL merupakan dua istilah yang sering dijumpai ketika merencanakan dekorasi dinding maupun furnitur. Keduanya dapat digunakan untuk menghasilkan tampilan ruangan yang menarik, tetapi sebenarnya memiliki fungsi dan karakteristik yang berbeda.\n\nAgar tidak salah memilih, mari kenali perbedaannya.\n\n1. Apa Itu Wall Board?\n\nWall board merupakan istilah yang digunakan untuk berbagai jenis panel atau papan yang diaplikasikan pada dinding maupun sebagai bagian dari konstruksi interior. Jenis materialnya dapat berbeda-beda, misalnya papan berbahan gypsum, PVC, WPC, atau material panel lainnya.\n\nWall board dekoratif dapat digunakan untuk memperindah dinding ruang tamu, kamar tidur, area televisi, dan berbagai area interior lainnya. Karakteristik serta ketahanannya bergantung pada jenis bahan yang digunakan.\n\n2. Apa Itu HPL?\n\nHPL atau High Pressure Laminate adalah material pelapis dekoratif yang dibuat melalui proses tekanan tinggi. HPL tersedia dalam beragam pilihan motif, seperti kayu, marmer, warna polos, dan tekstur tertentu.\n\nMaterial ini banyak digunakan sebagai lapisan permukaan furnitur, kabinet, meja, dan aplikasi interior lainnya. Penggunaan HPL pada dinding juga memungkinkan, tergantung pada sistem pemasangan dan bidang dasar yang digunakan.\n\n3. Perbedaan Fungsi\n\nPerbedaan utama keduanya terletak pada peran material tersebut. Wall board umumnya berfungsi sebagai panel atau papan yang membentuk permukaan interior. Sementara itu, HPL pada dasarnya merupakan lapisan dekoratif yang diaplikasikan pada permukaan dasar.\n\nKarena itu, wall board dan HPL tidak selalu menjadi pilihan yang saling menggantikan. Keduanya bahkan dapat dikombinasikan dalam satu desain interior.\n\n4. Perbedaan Tampilan\n\nWall board tersedia dalam berbagai bentuk, ketebalan, tekstur, dan desain, bergantung pada jenis produknya. HPL menawarkan banyak pilihan motif dan warna untuk menghasilkan tampilan permukaan yang konsisten.\n\nPemilihan keduanya perlu disesuaikan dengan konsep desain, pencahayaan, furnitur, serta suasana ruangan yang ingin diciptakan.\n\n5. Ketahanan dan Perawatan\n\nKetahanan wall board bergantung pada bahan, kualitas produk, dan kondisi pemasangannya. Begitu juga dengan HPL, yang ketahanannya dipengaruhi kualitas lapisan, material dasar, sambungan, dan cara penggunaannya.\n\nHPL bukan berarti sepenuhnya tahan air atau tidak dapat rusak. Pemilihan produk yang sesuai dan pemasangan yang benar tetap diperlukan, terutama pada area yang berpotensi lembap.\n\n6. Mana yang Sebaiknya Dipilih?\n\nPilih wall board apabila Anda membutuhkan panel untuk membentuk atau menghias permukaan dinding sesuai jenis produk yang tersedia. Pilih HPL apabila Anda membutuhkan lapisan dekoratif dengan pilihan motif dan warna tertentu pada bidang dasar yang sesuai.\n\nJika menginginkan desain yang lebih menarik, keduanya dapat dikombinasikan untuk menciptakan aksen dinding yang modern dan elegan.\n\nKesimpulan\n\nWall board dan HPL memiliki fungsi yang berbeda, tetapi keduanya dapat saling melengkapi dalam desain interior. Sebelum membeli, periksa jenis material, spesifikasi, kondisi area pemasangan, dan rekomendasi produsen.\n\nDapatkan kebutuhan material dan perlengkapan proyek Anda di Central Niaga Hardware. Kami siap membantu Anda menemukan pilihan yang sesuai untuk mewujudkan interior yang fungsional dan menarik.",
      tanggal: "2026-10-10"
    },
    {
      label: "Tips Interior",
      judul: "Tren Interior Kayu Modern",
      ringkas: "Ide penerapan material kayu untuk hunian dan kantor agar tampil lebih hangat, elegan, modern, dan nyaman.",
      id: "tren-interior-kayu-modern",
      isi: "Tren Interior Kayu Modern: Sentuhan Natural untuk Hunian dan Kantor\n\nMaterial kayu menjadi salah satu pilihan populer dalam desain interior modern. Warna dan teksturnya mampu menghadirkan suasana hangat, natural, serta elegan pada berbagai jenis ruangan. Kini, material bermotif kayu juga hadir dalam beragam pilihan desain dan bahan yang dapat disesuaikan dengan kebutuhan interior.\n\nMulai dari ruang tamu, kamar tidur, hingga ruang kerja dan kantor, sentuhan kayu dapat memberikan karakter tersendiri sekaligus membuat ruangan terlihat lebih menarik.\n\n1. Wall Panel Motif Kayu untuk Dinding yang Elegan\n\nWall panel motif kayu dapat digunakan sebagai aksen dinding untuk mempercantik interior. Penerapannya cocok untuk area belakang televisi, dinding ruang tamu, maupun bagian belakang tempat tidur.\n\nPilih motif dan warna kayu yang sesuai dengan konsep ruangan. Warna kayu terang memberikan kesan bersih dan luas, sedangkan warna kayu gelap menciptakan suasana yang lebih mewah dan berkarakter.\n\n2. Kombinasi Kayu dan Warna Netral\n\nSalah satu cara menciptakan interior modern adalah memadukan motif kayu dengan warna putih, krem, abu-abu, atau hitam. Kombinasi ini menghasilkan tampilan yang seimbang dan mudah dipadukan dengan berbagai jenis furnitur.\n\nSebagai contoh, wall panel motif kayu dapat dikombinasikan dengan dinding berwarna krem dan aksen hitam untuk menghadirkan suasana modern minimalis.\n\n3. Interior Kayu untuk Ruang Tamu\n\nRuang tamu merupakan area yang tepat untuk menerapkan elemen kayu. Penggunaan panel dekoratif pada satu sisi dinding dapat menjadi titik fokus tanpa membuat ruangan terlihat berlebihan.\n\nAgar hasilnya maksimal, sesuaikan ukuran panel dengan luas dinding dan tambahkan pencahayaan yang tepat untuk memperkuat tekstur serta warna material.\n\n4. Sentuhan Kayu pada Kamar Tidur\n\nUntuk kamar tidur, motif kayu dapat diaplikasikan pada dinding belakang tempat tidur sebagai elemen dekoratif. Pilihan warna kayu natural dapat menciptakan suasana yang hangat dan menenangkan.\n\nPadukan dengan pencahayaan hangat, furnitur sederhana, serta warna dinding yang lembut agar kamar terlihat nyaman dan harmonis.\n\n5. Desain Kantor Modern dengan Aksen Kayu\n\nMaterial bermotif kayu juga cocok digunakan pada ruang kantor, ruang rapat, maupun area resepsionis. Aksen kayu dapat memberikan kesan profesional sekaligus membuat suasana ruang kerja terasa lebih nyaman.\n\nKombinasikan panel kayu dengan warna netral dan pencahayaan yang memadai untuk menghasilkan desain kantor yang modern, rapi, dan fungsional.\n\n6. Pilih Material Sesuai Kebutuhan\n\nSebelum menentukan material interior, perhatikan jenis bahan, motif, ukuran, metode pemasangan, dan kondisi ruangan. Wall panel, WPC, PVC, serta material pelapis dekoratif seperti HPL memiliki karakteristik dan fungsi yang berbeda.\n\nPastikan material yang dipilih sesuai dengan lokasi pemasangan, tingkat kelembapan, kebutuhan perawatan, dan rekomendasi produsen.\n\nKesimpulan\n\nTren interior kayu modern menawarkan perpaduan antara keindahan alami, kenyamanan, dan tampilan elegan. Dengan memilih motif, warna, serta material yang tepat, Anda dapat menciptakan hunian maupun kantor yang lebih menarik dan sesuai dengan karakter yang diinginkan.\n\nIngin mempercantik ruangan dengan material interior yang tepat? Kunjungi Central Niaga Hardware untuk menemukan berbagai kebutuhan perkakas, teknik, dan material bangunan bagi proyek Anda."
    }
  ]
};
