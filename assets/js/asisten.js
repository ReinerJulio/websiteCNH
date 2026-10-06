/* =====================================================================
   ASISTEN CHAT — CENTRAL NIAGA HARDWARE
   Menjawab pertanyaan pelanggan dari data website (pengaturan.js):
   produk, motif, ukuran, kontak, alamat, jam buka, katalog, artikel.
   Gratis — tanpa AI berbayar. Pertanyaan HARGA langsung diteruskan ke
   WhatsApp. Data selalu ikut ter-update saat admin menambah produk.
   ===================================================================== */
(() => {
'use strict';
if (typeof PENGATURAN === 'undefined' || !window.CNH) return;

const CFG = PENGATURAN, K = CFG.kontak || {};
const { cariFoto, waLink, esc } = CNH;
const $ = (s, r = document) => r.querySelector(s);

/* ---------- Teks ---------- */
const norm = s => ' ' + String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/(\d)[.,](\d)/g, '$1$2').replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
// Sinonim sederhana Indonesia → nama di katalog
const SINONIM = [
  [/ marmer /g, ' marble '], [/ kayu /g, ' wood '], [/ abu ?abu | abu /g, ' grey gray '], [/ putih /g, ' white '],
  [/ hitam /g, ' black '], [/ coklat | cokelat /g, ' brown '], [/ biru muda /g, ' light blue '], [/ biru /g, ' blue '],
  [/ krem /g, ' beige cream '], [/ beton /g, ' concrete '], [/ panel dinding /g, ' wall panel '], [/ papan dinding /g, ' wall board '],
  [/ wallpanel /g, ' wall panel '], [/ wallboard /g, ' wall board '], [/ wpc /g, ' wall panel '], [/ fluted | flute | lis /g, ' fluted '],
  [/ pintu /g, ' pintu door '], [/ grey /g, ' grey gray '],
];
const perluas = t => { let x = t; for (const [re, ganti] of SINONIM) x = x.replace(re, m => m + ganti.trim() + ' '); return x; };
const ada = (t, ...kata) => kata.some(k => t.includes(' ' + k + ' ') || (k.endsWith('*') && new RegExp(' ' + k.slice(0, -1)).test(t)));

/* ---------- Indeks data produk ---------- */
const INDEKS = [];
const masuk = (o, nama, bobot) => { for (const n of nama.filter(Boolean)) { const v = norm(n); if (v.trim().length >= 2) INDEKS.push({ ...o, kunci: v, rapat: v.replace(/ /g, '') ? ' ' + v.replace(/ /g, '') + ' ' : '', bobot }); } };
(CFG.produk || []).forEach(p => {
  masuk({ jenis: 'produk', p }, [p.nama, p.id.replace(/-/g, ' '), p.seri], 10);
  if (p.merek) masuk({ jenis: 'produk', p }, [p.merek], 6);
  (p.motif || []).forEach(m => { masuk({ jenis: 'motif', p, m }, [m.kode], 14); masuk({ jenis: 'motif', p, m }, [m.nama], 9); });
  (p.tipe || []).forEach(t => {
    masuk({ jenis: 'tipe', p, t }, [t.nama, t.nama.replace(/^[a-z]+\./i, '')], 14);
    (t.warna || []).forEach(w => masuk({ jenis: 'warna', p, t, w }, [w.nama], 4));
  });
  (p.koleksi || []).forEach(k => {
    masuk({ jenis: 'koleksi', p, k }, [k.nama], 11);
    // kata khas nama koleksi (mis. "marble" dari "Marble Series")
    masuk({ jenis: 'koleksi', p, k }, k.nama.split(/\s+/).filter(w => w.length >= 4 && !/^(series|seri|koleksi|collection|design|motif)$/i.test(w)), 7);
    if (k.merek) masuk({ jenis: 'koleksi', p, k }, [k.merek], 5);
    (k.grup || []).forEach(g => {
      masuk({ jenis: 'grup', p, k, g }, [g.nama], 7);
      (g.motif || []).forEach(m => masuk({ jenis: 'kmotif', p, k, g, m }, [m.nama], 9));
    });
  });
});
const ARTIKEL = (CFG.blog || []).filter(b => b.isi && b.isi.trim()).map(b => ({ b, id: b.id || norm(b.judul).trim().replace(/ /g, '-'), kunci: norm(b.judul + ' ' + (b.ringkas || '')) }));

function cocokkan(t) {
  const rapat = ' ' + t.replace(/ /g, '') + ' ';
  const hasil = [];
  for (const e of INDEKS) {
    const kena = t.includes(e.kunci) || (e.kunci.trim().includes(' ') && rapat.includes(e.rapat));
    if (kena) hasil.push({ ...e, skor: e.bobot + e.kunci.trim().split(' ').length * 2 });
  }
  // produk yang disebut ikut menaikkan skor turunannya (mis. "wall board pearl beige")
  const produkDisebut = new Set(hasil.filter(h => h.jenis === 'produk').map(h => h.p.id));
  const tipeDisebut = new Set(hasil.filter(h => h.jenis === 'tipe').map(h => h.t));
  hasil.forEach(h => { if (h.jenis !== 'produk' && produkDisebut.has(h.p.id)) h.skor += 5; if (h.jenis === 'warna' && tipeDisebut.has(h.t)) h.skor += 8; });
  // gabungkan entri ganda (nama & kode motif yang sama)
  const unik = new Map();
  for (const h of hasil.sort((a, b) => b.skor - a.skor)) {
    const id = [h.jenis, h.p.id, h.m?.nama, h.t?.nama, h.w?.nama, h.k?.nama, h.g?.nama].join('|');
    if (!unik.has(id)) unik.set(id, h);
  }
  return [...unik.values()];
}

/* ---------- Pembuat jawaban ---------- */
const labelMotif = m => (m.kode ? m.kode + ' · ' : '') + m.nama;
const namaLengkap = p => [p.nama, p.merek, p.seri].filter(Boolean).join(' ');
const tombol = (teks, href, gaya = '', luar) => `<a class="as-b ${gaya}" href="${esc(href)}"${luar ? ' target="_blank" rel="noopener"' : ''}>${teks}</a>`;
const tombolWA = (teks, pesan) => tombol(`<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3Z"/></svg>${teks}`, waLink(pesan), 'wa', true);
const spekTeks = sp => (sp || []).filter(r => r[0] && r[1]).map(r => `${esc(r[0])} <b>${esc(r[1])}</b>`).join(' · ');
const kartu = (judul, sub, foto, href) => `<a class="as-card" href="${esc(href)}"><span class="as-th" data-foto="${esc(foto || '')}"></span><span><b>${esc(judul)}</b><small>${sub}</small></span></a>`;

function infoProduk(p) {
  const bag = [];
  const d = String(p.deskripsi || '').trim(), pendek = d.length > 220 ? d.slice(0, 220).replace(/\s+\S*$/, '') + '…' : d;
  bag.push(`<b>${esc(namaLengkap(p))}</b>${pendek ? '<br>' + esc(pendek).replace(/\n+/g, '<br>') : ''}`);
  if (p.spesifikasi?.length) bag.push('Ukuran: ' + spekTeks(p.spesifikasi));
  if (p.tipe?.length) bag.push('Tersedia ' + p.tipe.length + ' tipe:<br>' + p.tipe.map(t => `• <b>${esc(t.nama)}</b> — ${spekTeks(t.spesifikasi)}${t.warna?.length ? ` <span class="as-mut">(${t.warna.map(w => esc(w.nama)).join(', ')})</span>` : ''}`).join('<br>'));
  if (p.motif?.length) bag.push(`Pilihan motif (${p.motif.length}): ` + p.motif.slice(0, 12).map(m => esc(labelMotif(m))).join(', ') + (p.motif.length > 12 ? ', dan lainnya' : ''));
  (p.koleksi || []).forEach(k => { const n = (k.grup || []).reduce((a, g) => a + (g.motif || []).length, 0); bag.push(`Koleksi <b>${esc(k.nama)}</b>${k.merek ? ' (' + esc(k.merek) + ')' : ''}: ${n} motif.`); });
  return bag.join('<br><br>');
}

function jawabEntri(h) {
  const p = h.p, href = `#/produk/${p.id}`;
  const tHarga = label => tombolWA('Tanya harga via WhatsApp', `Halo Central Niaga Hardware, saya ingin tanya harga ${label}.`);
  switch (h.jenis) {
    case 'motif': return { teks: `<b>${esc(labelMotif(h.m))}</b> tersedia di <b>${esc(namaLengkap(p))}</b>.${p.spesifikasi?.length ? '<br>Ukuran: ' + spekTeks(p.spesifikasi) : ''}`,
      kartu: kartu(labelMotif(h.m), esc(namaLengkap(p)), h.m.foto, href), aksi: tombol('Lihat produk →', href) + tHarga(`${namaLengkap(p)} motif ${labelMotif(h.m)}`) };
    case 'tipe': return { teks: `<b>${esc(h.t.nama)}</b> — ${esc(namaLengkap(p))}<br>${spekTeks(h.t.spesifikasi)}${h.t.warna?.length ? `<br>Warna: ${h.t.warna.map(w => esc(w.nama)).join(', ')}` : ''}`,
      kartu: kartu(h.t.nama, esc(namaLengkap(p)), h.t.foto, href), aksi: tombol('Lihat produk →', href) + tHarga(`${namaLengkap(p)} tipe ${h.t.nama}`) };
    case 'warna': return { teks: `Warna <b>${esc(h.w.nama)}</b> tersedia di ${esc(namaLengkap(p))} tipe <b>${esc(h.t.nama)}</b> (${spekTeks(h.t.spesifikasi)}).`,
      aksi: tombol('Lihat produk →', href) + tHarga(`${namaLengkap(p)} tipe ${h.t.nama} warna ${h.w.nama}`) };
    case 'kmotif': return { teks: `<b>${esc(h.m.nama)}</b> adalah motif dari koleksi <b>${esc(h.k.nama)}</b>${h.k.merek ? ' (' + esc(h.k.merek) + ')' : ''}, grup ${esc(h.g.nama)}.${h.g.spesifikasi?.length ? '<br>Ukuran: ' + spekTeks(h.g.spesifikasi) : ''}`,
      kartu: kartu(h.m.nama, `${esc(h.k.nama)} · ${esc(p.nama)}`, h.m.foto, href), aksi: tombol('Lihat koleksi →', href) + tHarga(`${p.nama} ${h.k.merek || ''} ${h.k.nama} motif ${h.m.nama}`.replace(/\s+/g, ' ')) };
    case 'koleksi': case 'grup': {
      const grup = h.g ? [h.g] : (h.k.grup || []);
      return { teks: `Koleksi <b>${esc(h.k.nama)}</b>${h.k.merek ? ' (' + esc(h.k.merek) + ')' : ''} di ${esc(p.nama)}:<br>` + grup.map(g => `• <b>${esc(g.nama)}</b> (${(g.motif || []).length} motif)${g.spesifikasi?.length ? ' — ' + spekTeks(g.spesifikasi) : ''}`).join('<br>'),
        aksi: tombol('Lihat koleksi →', href) + tHarga(`${p.nama} ${h.k.nama}`) };
    }
    default: return { teks: infoProduk(p), kartu: kartu(namaLengkap(p), p.tipe?.length ? p.tipe.length + ' tipe' : (p.motif?.length || 0) + ' motif', p.sampul, href), aksi: tombol('Lihat produk →', href) + tHarga(namaLengkap(p)) };
  }
}

const daftarProduk = () => ({
  teks: `Kami punya ${CFG.produk.length} kategori produk:`,
  aksi: tombolWA('Cari produk lain? Tanya kami', 'Halo Central Niaga Hardware, apakah tersedia produk '),
  kartu: CFG.produk.map(p => kartu(namaLengkap(p), esc(String(p.deskripsi || '').replace(/\s+/g, ' ').slice(0, 70)), p.sampul, `#/produk/${p.id}`)).join(''),
});

let konteks = null;   // produk/motif yang terakhir dibicarakan
const labelKonteks = () => !konteks ? '' : konteks.m ? `${namaLengkap(konteks.p)} motif ${labelMotif(konteks.m)}` : konteks.w ? `${namaLengkap(konteks.p)} tipe ${konteks.t.nama} warna ${konteks.w.nama}` : konteks.t ? `${namaLengkap(konteks.p)} tipe ${konteks.t.nama}` : konteks.k ? `${konteks.p.nama} ${konteks.k.nama}` : namaLengkap(konteks.p);

function jawab(tanya) {
  const t = perluas(norm(tanya));
  const cocok = cocokkan(t);
  const terbaik = cocok[0];
  if (terbaik) konteks = terbaik;

  // 1. HARGA → langsung ke WhatsApp
  if (ada(t, 'harga', 'harganya', 'berapa', 'brp', 'brapa', 'price', 'biaya', 'tarif', 'diskon', 'promo', 'murah', 'mahal', 'budget', 'rp', 'rupiah', 'ongkir', 'per lembar', 'perlembar', 'per meter', 'permeter', 'per m2', 'nego', 'cicil*', 'kredit') &&
      !ada(t, 'ukuran', 'ukurannya', 'tebal', 'lebar', 'panjang', 'jam', 'buka', 'tutup', 'motif', 'warna', 'pilihan', 'tipe', 'macam', 'jenis', 'banyak', 'jumlah', 'lama', 'hari')) {
    const label = labelKonteks() || 'produk';
    const pesan = `Halo Central Niaga Hardware, saya ingin tanya harga ${label}.` + (tanya.trim().length < 140 ? `\n(Pertanyaan dari website: "${tanya.trim()}")` : '');
    return { teks: `Untuk harga${konteks ? ' <b>' + esc(label) + '</b>' : ''}, tim kami akan menjawab langsung di WhatsApp agar Anda mendapat harga terbaru. Kami sambungkan sekarang…`,
      aksi: tombolWA('Buka WhatsApp', pesan), wa: pesan };
  }
  // 2. Stok
  if (ada(t, 'stok', 'stock', 'ready', 'tersedia', 'kosong', 'habis', 'inden')) {
    const label = labelKonteks() || 'produk';
    return { teks: `Ketersediaan stok selalu berubah, jadi paling akurat dicek langsung oleh tim kami${konteks ? ' untuk <b>' + esc(label) + '</b>' : ''}.`, aksi: tombolWA('Cek stok via WhatsApp', `Halo Central Niaga Hardware, apakah ${label} ready stok?`) };
  }
  // 3. Kontak & toko
  if (ada(t, 'alamat', 'lokasi', 'dimana', 'di mana', 'maps', 'map', 'peta', 'arah', 'datang', 'mampir') || (!terbaik && ada(t, 'toko', 'showroom'))) return { teks: `📍 <b>Alamat toko:</b><br>${esc(K.alamat || '-')}${K.jam ? `<br><br>🕒 ${esc(K.jam)}` : ''}`, aksi: (K.maps ? tombol('Buka Google Maps ↗', K.maps, '', true) : '') + tombolWA('Tanya arah via WhatsApp', 'Halo Central Niaga Hardware, saya ingin datang ke toko.') };
  if (ada(t, 'jam', 'buka', 'tutup', 'operasional', 'libur', 'minggu', 'sabtu', 'hari ini')) return { teks: `🕒 <b>Jam operasional:</b> ${esc(K.jam || '-')}`, aksi: K.maps ? tombol('Lokasi toko ↗', K.maps, '', true) : '' };
  if (ada(t, 'instagram', 'ig', 'sosmed', 'sosial media')) return { teks: `Instagram kami: <b>@${esc(K.instagram || '')}</b>`, aksi: tombol('Buka Instagram ↗', 'https://instagram.com/' + (K.instagram || ''), '', true) };
  if (ada(t, 'wa', 'whatsapp', 'nomor', 'no', 'telepon', 'telp', 'hp', 'kontak', 'hubungi', 'admin', 'cs', 'call')) return { teks: `Hubungi kami di WhatsApp <b>${esc(K.waTampil || K.wa || '')}</b>.`, aksi: tombolWA('Chat WhatsApp', 'Halo Central Niaga Hardware, saya ingin bertanya.') };
  if (ada(t, 'katalog', 'catalog', 'brosur', 'pdf')) {
    const p = konteks?.p, link = (p && p.katalog) || CFG.katalog;
    return { teks: `Silakan lihat katalog${p && p.katalog ? ' ' + esc(p.nama) : ''} kami:`, aksi: link ? tombol('Buka katalog ↗', link, '', true) : tombolWA('Minta katalog via WhatsApp', 'Halo, saya ingin minta katalog.') };
  }
  if (ada(t, 'kirim', 'pengiriman', 'antar', 'delivery', 'ongkos kirim', 'luar kota', 'ekspedisi')) return { teks: 'Ya, kami melayani <b>pengiriman ke lokasi proyek</b>. Area dan estimasi biaya kirim bisa dikonfirmasi langsung dengan tim kami.', aksi: tombolWA('Tanya pengiriman', 'Halo Central Niaga Hardware, saya ingin tanya pengiriman ke lokasi saya.') };
  if (ada(t, 'pasang', 'pemasangan', 'tukang', 'instalasi', 'jasa')) return { teks: 'Untuk informasi pemasangan, silakan konsultasi dengan tim kami — kami bantu hitung kebutuhan material juga.', aksi: tombolWA('Tanya pemasangan', `Halo Central Niaga Hardware, saya ingin tanya pemasangan${konteks ? ' ' + labelKonteks() : ''}.`) };
  if (ada(t, 'konsultasi', 'saran', 'rekomendasi', 'cocok', 'bagus', 'pilih', 'hitung', 'kebutuhan')) {
    const r = { teks: 'Dengan senang hati! Konsultasi gratis — ceritakan ruangan dan ukuran dinding Anda, tim kami bantu memilih motif dan menghitung kebutuhan material.', aksi: tombolWA('Konsultasi gratis', 'Halo Central Niaga Hardware, saya ingin konsultasi untuk proyek saya.') };
    if (!terbaik) r.kartu = daftarProduk().kartu;
    return r;
  }
  // 4. Ukuran / spesifikasi untuk produk yang sedang dibahas
  if (ada(t, 'ukuran', 'ukurannya', 'dimensi', 'tebal', 'ketebalan', 'lebar', 'panjang', 'spesifikasi', 'spek', 'size') && konteks) {
    const p = konteks.p;
    const sp = konteks.t ? `<b>${esc(konteks.t.nama)}</b>: ${spekTeks(konteks.t.spesifikasi)}`
      : konteks.g?.spesifikasi?.length ? `<b>${esc(konteks.g.nama)}</b>: ${spekTeks(konteks.g.spesifikasi)}`
      : p.tipe?.length ? p.tipe.map(x => `• <b>${esc(x.nama)}</b>: ${spekTeks(x.spesifikasi)}`).join('<br>')
      : p.spesifikasi?.length ? spekTeks(p.spesifikasi) : '';
    return sp ? { teks: `Ukuran ${esc(namaLengkap(p))}:<br>${sp}`, aksi: tombol('Lihat produk →', '#/produk/' + p.id) }
      : { teks: `Detail ukuran ${esc(p.nama)} belum tercantum di website. Tim kami siap membantu.`, aksi: tombolWA('Tanya ukuran', `Halo, saya ingin tanya ukuran ${namaLengkap(p)}.`) };
  }
  // 5. Produk / motif yang disebut
  if (terbaik) {
    const sejenis = cocok.filter(c => c.skor === terbaik.skor && ['motif', 'kmotif', 'warna'].includes(c.jenis) && c.jenis === terbaik.jenis);
    if (sejenis.length > 1) return { teks: `Saya menemukan beberapa pilihan untuk “${esc(tanya.trim())}”:`, kartu: sejenis.slice(0, 6).map(c => c.m ? kartu(c.m.kode ? labelMotif(c.m) : c.m.nama, esc(c.k ? c.k.nama + ' · ' + c.p.nama : namaLengkap(c.p)), c.m.foto, '#/produk/' + c.p.id) : kartu(`${c.w.nama} — ${c.t.nama}`, esc(namaLengkap(c.p)), c.t.foto, '#/produk/' + c.p.id)).join('') };
    return jawabEntri(terbaik);
  }
  // 6. Daftar produk
  if (ada(t, 'produk', 'jual', 'menjual', 'barang', 'apa saja', 'apa aja', 'kategori', 'material', 'koleksi', 'motif', 'pilihan')) return daftarProduk();
  // 7. Artikel blog
  const art = ARTIKEL.map(a => ({ a, n: t.trim().split(' ').filter(w => w.length > 3 && a.kunci.includes(' ' + w + ' ')).length })).sort((x, y) => y.n - x.n)[0];
  if (art && art.n >= 2) return { teks: 'Mungkin artikel ini membantu:', kartu: kartu(art.a.b.judul, esc(art.a.b.ringkas || ''), art.a.b.foto, '#/blog/' + art.a.id) };
  // 8. Sapaan
  if (ada(t, 'halo', 'hai', 'hi', 'hello', 'pagi', 'siang', 'sore', 'malam', 'permisi', 'assalamualaikum', 'p')) return { teks: 'Halo! 👋 Ada yang bisa kami bantu? Anda bisa bertanya tentang produk, motif, ukuran, alamat toko, atau jam buka.' };
  if (ada(t, 'terima kasih', 'makasih', 'thanks', 'thank', 'trims', 'ok', 'oke', 'sip', 'siap')) return { teks: 'Sama-sama! 😊 Jika ada pertanyaan lain, silakan tanyakan kapan saja.' };
  // 9. Tidak ketemu
  return { teks: 'Maaf, saya belum menemukan jawabannya. Tim kami siap membantu langsung lewat WhatsApp.', aksi: tombolWA('Tanya via WhatsApp', `Halo Central Niaga Hardware, saya ingin bertanya: ${tanya.trim()}`) };
}

/* =====================================================================
   TAMPILAN CHAT
   ===================================================================== */
const SARAN = ['Produk apa saja?', 'Motif wall board', 'Alamat toko', 'Jam buka', 'Tanya harga', 'Lihat katalog'];
document.body.insertAdjacentHTML('beforeend', `
<button class="as-fab" id="as-fab" type="button" aria-label="Buka asisten chat" aria-expanded="false">
  <svg class="as-i1" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.8 7L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke-width="2.6"/></svg>
  <svg class="as-i2" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
  <span class="as-tip">Ada pertanyaan?</span>
</button>
<section class="as-panel" id="as-panel" role="dialog" aria-label="Asisten Central Niaga" aria-hidden="true">
  <header class="as-hd"><span class="as-av"><img src="foto/logo/logo.png" alt=""></span><div><b>Asisten Central Niaga</b><small><i></i>Online · jawab instan</small></div>
    <button class="as-x" type="button" aria-label="Tutup">✕</button></header>
  <div class="as-log" id="as-log" aria-live="polite"></div>
  <div class="as-sug" id="as-sug">${SARAN.map(s => `<button type="button">${esc(s)}</button>`).join('')}</div>
  <form class="as-in" id="as-in" autocomplete="off"><input id="as-q" placeholder="Tulis pertanyaan…" maxlength="300" aria-label="Pertanyaan"><button type="submit" aria-label="Kirim"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>
  <p class="as-ft">Untuk harga & stok, Anda akan diarahkan ke WhatsApp.</p>
</section>`);

const fab = $('#as-fab'), panel = $('#as-panel'), log = $('#as-log'), form = $('#as-in'), q = $('#as-q');
let dibuka = false, sapa = false;

function isiFoto(root) {
  root.querySelectorAll('.as-th[data-foto]').forEach(async el => { const u = el.dataset.foto && await cariFoto(el.dataset.foto); if (u) el.style.backgroundImage = `url("${u}")`; else el.classList.add('kosong'); });
}
function tulis(dari, html) {
  const el = document.createElement('div'); el.className = 'as-m ' + dari; el.innerHTML = html;
  log.appendChild(el); isiFoto(el);
  requestAnimationFrame(() => log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' }));
  return el;
}
function balasBot(r) {
  const ketik = tulis('bot ketik', '<span></span><span></span><span></span>');
  setTimeout(() => {
    ketik.remove();
    tulis('bot', `<div class="as-t">${r.teks}</div>${r.kartu ? `<div class="as-cards">${r.kartu}</div>` : ''}${r.aksi ? `<div class="as-act">${r.aksi}</div>` : ''}`);
  }, 380 + Math.min(500, r.teks.length * 3));
}
function kirim(teks) {
  teks = teks.trim(); if (!teks) return;
  tulis('user', esc(teks));
  const r = jawab(teks);
  // Pertanyaan harga: buka WhatsApp langsung (dalam aksi klik/kirim pengguna agar tidak diblokir browser)
  if (r.wa) window.open(waLink(r.wa), '_blank', 'noopener');
  balasBot(r);
}
function buka(v) {
  dibuka = v; panel.classList.toggle('on', v); fab.classList.toggle('on', v);
  panel.setAttribute('aria-hidden', !v); fab.setAttribute('aria-expanded', v);
  document.body.classList.toggle('as-open', v);
  if (v && !sapa) { sapa = true; tulis('bot', `<div class="as-t">Halo! 👋 Saya asisten <b>Central Niaga Hardware</b>.<br>Tanyakan produk, motif, ukuran, alamat, atau jam buka. Untuk <b>harga</b>, saya sambungkan langsung ke WhatsApp tim kami.</div>`); }
  if (v && matchMedia('(hover: hover)').matches) setTimeout(() => q.focus(), 300);
}
fab.addEventListener('click', () => buka(!dibuka));
panel.querySelector('.as-x').addEventListener('click', () => buka(false));
form.addEventListener('submit', e => { e.preventDefault(); kirim(q.value); q.value = ''; });
$('#as-sug').addEventListener('click', e => { const b = e.target.closest('button'); if (b) kirim(b.textContent); });
log.addEventListener('click', e => { if (e.target.closest('a[href^="#/"]') && innerWidth < 640) buka(false); });
addEventListener('keydown', e => { if (e.key === 'Escape' && dibuka) buka(false); });

// untuk pengujian / pengembangan
window.CNH.asisten = { jawab: t => jawab(t), buka };
})();
