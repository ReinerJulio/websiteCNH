/* =====================================================================
   PENGATURAN WEBSITE — CENTRAL NIAGA HARDWARE
   ---------------------------------------------------------------------
   File ini diperbarui oleh halaman admin (/admin/) — 10/10/2026, 10.51.08.
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
    { judul: "Kamar Tidur ", kategori: "Jotun", foto: "", tekstur: "wood oak" }
  ],
  blog: [
    {
      label: "Segera Hadir",
      judul: "Cara Memilih Wall Panel yang Tepat",
      ringkas: "Panduan motif, warna, dan ukuran untuk setiap ruangan.",
      id: "cara-memilih-wall-panel-yang-tepat"
    },
    {
      label: "Segera Hadir",
      judul: "Wall Board vs HPL: Apa Bedanya?",
      ringkas: "Perbandingan fungsi, ketahanan, dan penggunaan.",
      id: "wall-board-vs-hpl-apa-bedanya"
    },
    {
      label: "Segera Hadir",
      judul: "Tren Interior Kayu Modern",
      ringkas: "Ide penerapan material kayu untuk hunian dan kantor.",
      id: "tren-interior-kayu-modern"
    }
  ]
};
