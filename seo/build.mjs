/* =====================================================================
   SEO BUILD — dijalankan otomatis oleh Cloudflare Pages setiap deploy
   (Build command: node seo/build.mjs   ·   Build output directory: /)

   Membuat dari assets/js/pengaturan.js:
   - halaman /produk/<id>/, /blog/, /blog/<id>/, /kontak/ dengan judul, deskripsi,
     canonical, Open Graph (preview WhatsApp/Facebook) & data terstruktur Google
   - sitemap.xml dan robots.txt
   Tidak perlu diedit. Produk/artikel baru dari halaman admin ikut otomatis.
   ===================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = (process.env.SITE_URL || 'https://centralniagahardware.com').replace(/\/+$/, '');
const BRAND = 'Central Niaga Hardware';

const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/js/pengaturan.js'), 'utf8') + ';this.P = PENGATURAN;', ctx, { timeout: 2000 });
const P = ctx.P;
const K = P.kontak || {};
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!/<!-- SEO:MULAI[\s\S]*?<!-- SEO:SELESAI -->/.test(TEMPLATE)) throw new Error('Penanda SEO tidak ada di index.html');

const slug = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rapikan = (s, n = 158) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, t.lastIndexOf(' ', n - 1)) + '…' : t; };
const foto = p => { if (!p) return null; for (const e of ['.jpg', '.jpeg', '.png', '.webp']) if (fs.existsSync(path.join(ROOT, p + e))) return `${SITE}/${encodeURI(p + e)}`; return null; };
const LOGO = foto('foto/logo/logo') || foto('foto/logo/logo-asli');
const HARI_INI = new Date().toISOString().slice(0, 10);

const TOKO = {
  '@type': 'HardwareStore',
  '@id': `${SITE}/#toko`,
  name: BRAND,
  alternateName: 'Jotun Studio Pandaan',
  url: `${SITE}/`,
  logo: LOGO || undefined,
  image: foto(P.foto?.hero) || LOGO || undefined,
  telephone: K.waTampil ? '+62 ' + K.waTampil.replace(/^0/, '') : undefined,
  address: { '@type': 'PostalAddress', streetAddress: 'Ruko Central Niaga Pandaan Blok C3-5, Jl. Raya Kasri No.321, Petungsari', addressLocality: 'Pandaan', addressRegion: 'Jawa Timur', addressCountry: 'ID' },
  areaServed: ['Pandaan', 'Pasuruan', 'Malang', 'Surabaya', 'Jawa Timur'],
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '07:00', closes: '18:00' }],
  sameAs: [K.instagram && `https://www.instagram.com/${K.instagram}/`, K.maps].filter(Boolean),
};

function halaman({ jalur, judul, desk, gambar, jenis = 'website', ld = [] }) {
  const url = `${SITE}/${jalur ? jalur + '/' : ''}`;
  const blok = `<!-- SEO:MULAI (diisi otomatis oleh seo/build.mjs) -->
<title>${esc(judul)}</title>
<meta name="description" content="${esc(desk)}">
<link rel="canonical" href="${url}">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:type" content="${jenis}">
<meta property="og:title" content="${esc(judul)}">
<meta property="og:description" content="${esc(desk)}">
<meta property="og:url" content="${url}">
${gambar ? `<meta property="og:image" content="${gambar}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<meta property="og:locale" content="id_ID">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [TOKO, ...ld] }).replace(/</g, '\\u003c')}</script>
<!-- SEO:SELESAI -->`;
  const html = TEMPLATE.replace(/<!-- SEO:MULAI[\s\S]*?<!-- SEO:SELESAI -->/, () => blok);
  const file = path.join(ROOT, jalur, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return url;
}

const remah = (...x) => ({ '@type': 'BreadcrumbList', itemListElement: [{ name: 'Beranda', item: `${SITE}/` }, ...x].map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.item })) });
const peta = [];

// Beranda
peta.push({ url: halaman({
  jalur: '',
  judul: 'Central Niaga Hardware Pandaan — Jotun Studio, Wall Panel, WPC & Material Bangunan',
  desk: rapikan(`Toko material bangunan & interior di Pandaan, Pasuruan: ${P.produk.map(p => p.nama.trim()).join(', ')}. Konsultasi gratis via WhatsApp ${K.waTampil || ''}.`),
  gambar: foto(P.foto?.hero) || LOGO,
}), prioritas: '1.0' });

// Produk
for (const p of P.produk) {
  const nama = p.nama.trim();
  const varian = [...(p.tipe || []).map(t => t.nama), ...(p.motif || []).map(m => [m.kode, m.nama].filter(Boolean).join(' '))].slice(0, 6).join(', ');
  const desk = rapikan(`${nama}${p.tagline ? ' — ' + p.tagline : ''} di ${BRAND} Pandaan. ${p.deskripsi || ''} ${varian ? 'Pilihan: ' + varian + '.' : ''}`);
  const gambar = foto(p.sampul);
  peta.push({ url: halaman({
    jalur: `produk/${p.id}`,
    judul: `${nama} Pandaan & Pasuruan — ${BRAND}`.replace(/\s+/g, ' '),
    desk, gambar,
    ld: [remah({ name: 'Produk', item: `${SITE}/produk-kami/` }, { name: nama, item: `${SITE}/produk/${p.id}/` }),
      { '@type': 'CollectionPage', name: nama, description: desk, url: `${SITE}/produk/${p.id}/`, image: gambar || undefined, isPartOf: { '@id': `${SITE}/#toko` } }],
  }), prioritas: '0.9' });
}

// Blog
const blog = (P.blog || []).map(b => ({ ...b, id: b.id || slug(b.judul) }));
peta.push({ url: halaman({ jalur: 'blog', judul: `Blog & Tips Material Bangunan — ${BRAND}`, desk: rapikan(`Tips memilih cat Jotun, wall panel, WPC, HPL dan inspirasi interior dari ${BRAND} Pandaan.`), gambar: LOGO }), prioritas: '0.7' });
for (const b of blog.filter(x => x.isi)) {
  const gambar = foto(b.foto);
  peta.push({ url: halaman({
    jalur: `blog/${b.id}`, jenis: 'article', judul: `${b.judul} — ${BRAND}`, desk: rapikan(b.ringkas || b.isi), gambar,
    ld: [remah({ name: 'Blog', item: `${SITE}/blog/` }, { name: b.judul, item: `${SITE}/blog/${b.id}/` }),
      { '@type': 'BlogPosting', headline: b.judul, description: rapikan(b.ringkas || b.isi), datePublished: b.tanggal || undefined, image: gambar || undefined, author: { '@type': 'Organization', name: BRAND }, publisher: { '@id': `${SITE}/#toko` }, mainEntityOfPage: `${SITE}/blog/${b.id}/` }],
  }), prioritas: '0.6', ubah: b.tanggal });
}

// Kontak
peta.push({ url: halaman({ jalur: 'kontak', judul: `Kontak & Lokasi Toko — ${BRAND} Pandaan`, desk: rapikan(`${K.alamat || ''}. Buka ${K.jam || ''}. WhatsApp ${K.waTampil || ''}.`), gambar: LOGO }), prioritas: '0.8' });

peta.push({ url: `${SITE}/privasi/`, prioritas: '0.3' });

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${peta.map(x => `  <url><loc>${x.url}</loc><lastmod>${x.ubah || HARI_INI}</lastmod><priority>${x.prioritas}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nDisallow: /admin/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`SEO: ${peta.length} halaman + sitemap.xml untuk ${SITE}`);
