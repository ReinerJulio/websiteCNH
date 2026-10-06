# Panduan Memasang Website Online

Hosting **Cloudflare Pages** (gratis) + domain sendiri + halaman admin yang **dikunci**
sehingga hanya email tertentu yang bisa membukanya.

> Tampilan menu Cloudflare kadang berubah sedikit. Jika nama tombol berbeda, cari menu dengan arti yang sama.

---

## Langkah 0 — Pastikan repo sudah rapi
1. Pull request ke branch `main` sudah di-**merge**.
2. GitHub → repo `websiteCNH` → **Settings → General → Default branch** = `main`.

## Langkah 1 — Pasang website di Cloudflare Pages (gratis)
1. Daftar / masuk di **dash.cloudflare.com**.
2. Menu **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git**.
3. Hubungkan akun GitHub → pilih repo **`websiteCNH`** → **Begin setup**.
4. Isi:
   - **Project name**: `centralniaga` (menjadi alamat `centralniaga.pages.dev`)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `/`
5. **Save and Deploy**. Setelah ±1 menit website bisa dibuka di `https://centralniaga.pages.dev`.

Mulai sekarang, setiap kali admin klik **Simpan ke GitHub**, Cloudflare otomatis memperbarui website (±1–2 menit).

## Langkah 2 — Kunci halaman admin (Cloudflare Access, gratis)
Halaman admin ada di **`/admin/`**. Kita kunci agar hanya email yang diizinkan yang bisa membukanya.

**Email yang diizinkan saat ini:**
- `reinerjulio17@gmail.com`

Langkah:
1. Di Cloudflare, buka **Zero Trust** (menu kiri). Pertama kali: pilih nama tim (mis. `centralniaga`) dan paket **Free** — mungkin diminta data kartu, tetapi paket Free **tidak ditagih**.
2. **Access → Applications → Add an application → Self-hosted**.
3. Isi:
   - **Application name**: `Admin Website`
   - **Session duration**: `24 hours` (atau sesuai keinginan)
   - **Public hostname / Application domain**: domain website, mis. `centralniaga.pages.dev` (nanti tambahkan juga domain sendiri, mis. `centralniaga.co.id`), dengan **Path**: `admin`
4. **Policy** (aturan akses):
   - **Policy name**: `Admin`
   - **Action**: `Allow`
   - **Include → Emails**: `reinerjulio17@gmail.com`
5. **Login methods**: pastikan **One-time PIN** aktif (kode login dikirim ke email).
6. **Save**.

Kunci juga alamat *preview*: **Workers & Pages → centralniaga → Settings → General → Access policy → Enable**
(supaya alamat percobaan seperti `xxxx.centralniaga.pages.dev/admin/` ikut terkunci).

**Uji:** buka `https://centralniaga.pages.dev/admin/` di jendela penyamaran (incognito).
Harus muncul halaman login Cloudflare. Masukkan email → masukkan kode dari email → halaman admin terbuka.
Email lain tidak akan menerima akses.

**Menambah admin baru:** Zero Trust → Access → Applications → `Admin Website` → **Policies** →
`Admin` → tambahkan email di **Include → Emails** → Save. (Admin baru juga perlu akun GitHub + token —
lihat menu *Koneksi GitHub* di halaman admin.)

## Langkah 3 — Domain sendiri (disarankan)
1. Beli domain (mis. `centralniaga.co.id` di Domainesia / Niagahoster / Rumahweb; `.co.id` butuh KTP + dokumen usaha).
2. Cloudflare → **Workers & Pages → centralniaga → Custom domains → Set up a custom domain** → ketik domain → ikuti petunjuk
   (biasanya mengganti *nameserver* di tempat membeli domain ke nameserver Cloudflare yang ditampilkan).
3. Tunggu aktif (beberapa menit sampai 24 jam). HTTPS (gembok) otomatis gratis.
4. Tambahkan domain baru ke aplikasi **Admin Website** di Cloudflare Access (Langkah 2 nomor 3) dengan path `admin`.
5. Aktifkan **perpanjangan otomatis (auto-renew)** domain di tempat Anda membelinya.

---

### Ringkasan alamat
| Untuk | Alamat |
|---|---|
| Pelanggan | `https://centralniaga.pages.dev` (nanti `https://centralniaga.co.id`) |
| Admin | `https://centralniaga.pages.dev/admin/` (dikunci, login dengan email) |
