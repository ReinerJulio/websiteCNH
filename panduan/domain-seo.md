# Panduan Domain centralniagahardware.com + SEO

Kerjakan langkah ini **berurutan**. Perkiraan total waktu: 30–60 menit, ditambah waktu tunggu aktifnya domain.

## Apa yang berubah di website

- Alamat halaman berubah dari `…/#/produk/jotun` menjadi **`…/produk/jotun/`**. Sebelumnya Google hanya melihat **satu** halaman (beranda); sekarang setiap produk dan artikel menjadi halaman sendiri yang bisa muncul di pencarian.
- Link lama (`#/produk/...`) yang sudah tersebar di WhatsApp/Instagram **tetap berfungsi** dan otomatis dialihkan ke alamat baru.
- Setiap deploy, `seo/build.mjs` otomatis membuat:
  - judul dan deskripsi per halaman,
  - preview link yang rapi (foto + judul) saat dibagikan di WhatsApp/Facebook,
  - data toko untuk Google (alamat, jam buka, Instagram),
  - `sitemap.xml`.
- Produk dan artikel baru dari halaman admin atau agen AI ikut otomatis.

---

## Langkah 1 — Beli domain (lewati jika sudah punya)

Paling mudah membeli langsung di Cloudflare, karena tidak perlu mengganti nameserver dan harganya sesuai biaya pokok (±US$10–11 per tahun untuk `.com`):

1. **dash.cloudflare.com** → menu **Domain Registration → Register Domains**.
2. Cari `centralniagahardware.com` → **Purchase**. Isi data pemilik dan bayar dengan kartu.
3. Aktifkan **Auto-renew**, supaya domain tidak hangus.

Jika domain sudah dibeli di tempat lain (Niagahoster, Rumahweb, dll.):

1. Cloudflare → **Add a domain** → ketik `centralniagahardware.com` → pilih paket **Free**.
2. Cloudflare akan menampilkan 2 nameserver. Ganti nameserver domain di tempat Anda membelinya dengan keduanya.
3. Tunggu sampai status domain di Cloudflare menjadi **Active** (beberapa menit sampai 24 jam).

## Langkah 2 — Aktifkan pembuat SEO di Cloudflare Pages

**Workers & Pages** → project website → **Settings → Build** → **Build configuration → Edit**:

- **Build command**: `node seo/build.mjs || echo "SEO dilewati"`
- **Build output directory**: `/` (tetap)

Klik **Save**. Perintah ini aman: jika ada masalah pada skrip SEO, website tetap tampil seperti biasa.

## Langkah 3 — Gabungkan perubahan website

1. Cek dulu hasil percobaan di alamat preview `https://seo-domain.<nama-project>.pages.dev`. Alamat persisnya terlihat di **Deployments**. Klik beberapa produk, lalu coba tombol back.
2. Jika sudah oke, buka GitHub → repo **websiteCNH** → **Pull requests** → *SEO: alamat halaman asli + sitemap* → **Merge pull request**.
3. Tunggu ±2 menit sampai deploy di Cloudflare selesai (status **Success**).

## Langkah 4 — Pasang domain ke website

1. **Workers & Pages** → project website → **Custom domains** → **Set up a custom domain**.
2. Ketik `centralniagahardware.com` → **Continue → Activate domain**.
3. Ulangi untuk `www.centralniagahardware.com`.
4. Tunggu status **Active**. Sertifikat HTTPS (gembok) dibuat otomatis.

## Langkah 5 — Satu alamat utama (penting untuk SEO)

Google sebaiknya hanya melihat **satu** alamat, yaitu `https://centralniagahardware.com`.

**a. www → tanpa www:**
1. **DNS → Records → Add record**: Type `CNAME`, Name `www`, Target `centralniagahardware.com`, Proxy **menyala** (awan oranye).
   Tanpa record ini alamat www tidak bisa dibuka sama sekali.
2. **Rules → Redirect Rules → Create rule → template "Redirect from WWW to root"** → Deploy.
3. **SSL/TLS → Edge Certificates → Always Use HTTPS** = menyala (agar `http://` juga ikut pindah ke `https://`).

**b. pages.dev → .com:**

1. Akun Cloudflare → **Bulk Redirects** → **Create Bulk Redirect List**, beri nama `ke_domain`.
2. Tambah baris:
   - Source URL `centralniagahardware.pages.dev`
   - Target URL `https://centralniagahardware.com`
   - Status `301`
   - Centang **Preserve query string**, **Subpath matching**, dan **Preserve path suffix**
3. **Create Bulk Redirect Rule** → pilih list `ke_domain` → Save.

## Langkah 6 — Kunci halaman admin di domain baru

**Zero Trust → Access → Applications → Admin Website → Edit**:

1. Tambah hostname `centralniagahardware.com` dengan path `admin`.
2. Save.

Uji dengan membuka `https://centralniagahardware.com/admin/` di jendela incognito. Halaman login harus muncul.

## Langkah 7 — Daftarkan ke Google

1. Buka **search.google.com/search-console** dan login dengan akun Google bisnis.
2. **Add property → Domain** → ketik `centralniagahardware.com` → pilih verifikasi otomatis lewat **Cloudflare** (atau salin record TXT ke **DNS** di Cloudflare).
3. Menu **Sitemaps** → masukkan `sitemap.xml` → **Submit**.
4. Menu **URL Inspection** → ketik `https://centralniagahardware.com/produk/jotun/` → **Request indexing**. Ulangi untuk 3–5 produk utama.

Hasil di pencarian Google biasanya mulai terlihat dalam 1–4 minggu.

## Langkah 8 — Perbarui link di tempat lain

Ganti alamat website menjadi `https://centralniagahardware.com` di:

- **Google Business Profile** (Google Maps) → Edit profil → Website
- Bio **Instagram**, **TikTok**, **Facebook**
- Kantor virtual AI: di file `.env`, isi `WEBSITE_URL=https://centralniagahardware.com`
