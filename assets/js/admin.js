/* =====================================================================
   HALAMAN ADMIN — CENTRAL NIAGA HARDWARE
   Mengedit isi assets/js/pengaturan.js (produk, katalog, kontak) dan
   mengunggah foto. Simpan langsung ke GitHub (token pribadi) atau unduh ZIP.
   ===================================================================== */
(() => {
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const slug = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const dirOf = p => p && p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '';
const EXT = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'PNG', 'JPG', 'JPEG', 'WEBP', 'SVG'];
const DATA_FILE = 'assets/js/pengaturan.js';

/* ---------- Status ---------- */
// Samakan bentuk data (kolom wajib selalu ada) agar perbandingan & tampilan konsisten
function siapkan(d) {
  d = clone(d);
  d.produk = d.produk || [];
  d.produk.forEach(p => { p.spesifikasi = p.spesifikasi || []; p.tagline = p.tagline || ''; p.deskripsi = p.deskripsi || ''; if (!p.tipe) p.motif = p.motif || []; });
  return d;
}
let S = siapkan(PENGATURAN);        // data yang sedang diedit
let ORIG = clone(S);                // data terakhir yang tersimpan
const pending = new Map();          // path file → { blob, url?, kind: 'img' | 'file', size }
let view = { tab: 'produk', i: 0 };
let sumber = 'lokal';               // 'lokal' | 'github'

/* ---------- Akses data lewat "path" (mis. produk.1.motif.3.nama) ---------- */
const keys = p => p.split('.').map(k => /^\d+$/.test(k) ? +k : k);
const get = p => keys(p).reduce((o, k) => o == null ? o : o[k], S);
function set(p, v) { const k = keys(p), last = k.pop(); const o = k.reduce((o, kk) => o[kk], S); o[last] = v; }
const parent = p => p.slice(0, p.lastIndexOf('.'));
const lastKey = p => keys(p).pop();

/* ---------- Template item baru ---------- */
const TPL = {
  spec: () => ['', ''],
  motif: () => ({ kode: '', nama: '', foto: '', tekstur: 'stn' }),
  tipe: () => ({ nama: '', foto: '', spesifikasi: [], warna: [] }),
  warna: () => ({ nama: '', warna: '#c8a070', foto: '' }),
  koleksi: () => ({ nama: 'Koleksi Baru', merek: '', deskripsi: '', spesifikasi: [], grup: [] }),
  grup: () => ({ nama: 'Grup Baru', spesifikasi: [], motif: [] }),
  gmotif: () => ({ nama: '', foto: '' }),
  portofolio: () => ({ judul: '', kategori: '', foto: '', tekstur: 'wood oak' }),
  blog: () => ({ id: '', label: 'Tips', judul: '', tanggal: new Date().toISOString().slice(0, 10), ringkas: '', foto: '', isi: '' }),
};
const TEKSTUR = [['stn', 'Batu / abu'], ['wht', 'Putih'], ['brd', 'Krem'], ['hpl', 'Abu terang'], ['wood oak', 'Kayu terang'], ['wood wal', 'Kayu gelap'], ['wood gry', 'Kayu abu'], ['wood blk', 'Kayu hitam']];

/* =====================================================================
   PESAN, MODAL, STATUS
   ===================================================================== */
let tTimer;
function toast(msg, err) {
  const t = $('#toast'); t.textContent = msg; t.className = 'toast' + (err ? ' err' : ''); t.hidden = false;
  clearTimeout(tTimer); tTimer = setTimeout(() => t.hidden = true, err ? 6000 : 3200);
}
function modal(judul, isi, tombol = [{ t: 'Tutup' }]) {
  return new Promise(res => {
    $('#m-t').textContent = judul; $('#m-b').innerHTML = isi;
    $('#m-a').innerHTML = tombol.map((b, i) => `<button type="button" class="b ${b.c || 'ghost'}" data-i="${i}">${esc(b.t)}</button>`).join('');
    $('#modal').hidden = false;
    $$('#m-a button').forEach(b => b.onclick = () => { $('#modal').hidden = true; res(+b.dataset.i); });
  });
}
const konfirmasi = async (judul, isi, ya = 'Ya, lanjutkan', bahaya) =>
  (await modal(judul, `<p>${isi}</p>`, [{ t: 'Batal' }, { t: ya, c: bahaya ? 'danger' : 'acc' }])) === 1;

const adaPerubahan = () => pending.size > 0 || JSON.stringify(S) !== JSON.stringify(ORIG);
function perbaruiStatus() {
  const d = $('#dirty'), n = pending.size;
  d.hidden = !adaPerubahan();
  d.textContent = n ? `Belum disimpan · ${n} file baru` : 'Belum disimpan';
  const gh = ghCfg();
  $('#b-save').disabled = !gh.token;
  $('#b-save').title = gh.token ? '' : 'Hubungkan GitHub dulu di menu Koneksi GitHub';
  const st = $('#st-mode');
  st.className = 'top-st' + (gh.token ? ' on' : '');
  st.innerHTML = gh.token ? `<i></i>GitHub: ${esc(gh.owner)}/${esc(gh.repo)} · ${esc(gh.branch)}` : '<i></i>Mode lokal (belum terhubung GitHub)';
}
addEventListener('beforeunload', e => { if (adaPerubahan()) { e.preventDefault(); e.returnValue = ''; } });

/* =====================================================================
   FOTO: cek file yang ada, pratinjau, kompres
   ===================================================================== */
const cache = new Map();
function cariFoto(path) {
  if (!path) return Promise.resolve(null);
  if (cache.has(path)) return cache.get(path);
  const kand = /\.[a-z0-9]{3,4}$/i.test(path) ? [path] : EXT.map(e => `${path}.${e}`);
  const pr = new Promise(res => {
    let i = 0;
    const coba = () => { if (i >= kand.length) return res(null); const u = encodeURI(kand[i++]); const im = new Image(); im.onload = () => res(u); im.onerror = coba; im.src = u; };
    coba();
  });
  cache.set(path, pr); return pr;
}
const pendingImg = base => { for (const [p, f] of pending) if (f.kind === 'img' && p.slice(0, p.lastIndexOf('.')) === base) return f; return null; };

function isiThumb(root = document) {
  $$('.th[data-base]', root).forEach(async el => {
    const base = el.dataset.base;
    const pd = base && pendingImg(base);
    const url = pd ? pd.url : await cariFoto(base);
    $('img', el)?.remove();
    el.classList.toggle('kosong', !url);
    const up = el.querySelector('.up'); if (up) up.textContent = url ? 'Ganti foto' : 'Unggah';
    if (url) { const im = new Image(); im.src = url; im.alt = ''; el.prepend(im); el.querySelector('.ph')?.remove(); }
    if (pd) el.insertAdjacentHTML('afterbegin', '<span class="badge">Baru</span>');
  });
}

async function prosesGambar(file, maks = 1600) {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, maks / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * s), h = Math.round(bmp.height * s);
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(bmp, 0, 0, w, h);
  // PNG transparan tetap PNG, selain itu JPEG (lebih ringan)
  let alpha = false;
  if (/png|webp|gif/i.test(file.type)) { const a = x.getImageData(0, 0, w, h).data; for (let i = 3; i < a.length; i += 16) if (a[i] < 250) { alpha = true; break; } }
  const ext = alpha ? 'png' : 'jpg';
  const blob = await new Promise(r => c.toBlob(r, alpha ? 'image/png' : 'image/jpeg', .86));
  return { blob, ext, url: URL.createObjectURL(blob), size: blob.size, w, h };
}

function pilihFile(accept, multiple = false) {
  return new Promise(res => {
    const inp = $('#file-in'); inp.value = ''; inp.accept = accept; inp.multiple = multiple;
    inp.onchange = () => res([...inp.files]); inp.click();
  });
}

/* Semua path foto yang dipakai data (untuk mencegah nama bentrok & menghapus file lama) */
function semuaFoto(o, out = new Set(), key = '') {
  if (typeof o === 'string') { if (o.startsWith('foto/') && key !== 'galeri') out.add(o); }
  else if (Array.isArray(o)) o.forEach(v => semuaFoto(v, out, key));
  else if (o && typeof o === 'object') for (const k in o) semuaFoto(o[k], out, k);
  return out;
}
function pathUnik(base, kecuali) {
  const dipakai = semuaFoto(S); let p = base, n = 2;
  while (p !== kecuali && (dipakai.has(p) || pendingImg(p))) p = `${base}-${n++}`;
  return p;
}

/* Unggah foto untuk satu item. el = tombol/thumbnail dengan data-p, data-key, data-dir, data-slug */
async function unggahFoto(el) {
  const p = el.dataset.p, key = el.dataset.key || 'foto';
  const obj = get(p);
  const [file] = await pilihFile('image/*'); if (!file) return;
  let base = obj[key];
  if (!base) {
    const nama = (el.dataset.slug || 'nama').split(',').map(k => obj[k]).find(Boolean);
    if (!nama && !el.dataset.fixed) { toast('Isi nama dulu sebelum mengunggah foto.', true); return; }
    base = pathUnik(el.dataset.fixed || `${el.dataset.dir}/${slug(nama)}`);
  }
  try {
    const g = await prosesGambar(file, +(el.dataset.max || 1600));
    for (const [pp, f] of pending) if (f.kind === 'img' && pp.slice(0, pp.lastIndexOf('.')) === base) { URL.revokeObjectURL(f.url); pending.delete(pp); }
    pending.set(`${base}.${g.ext}`, { kind: 'img', ...g });
    obj[key] = base;
    cache.delete(base);
    render(); toast(`Foto siap (${g.w}×${g.h}, ${(g.size / 1024).toFixed(0)} KB). Jangan lupa simpan.`);
  } catch (e) { toast('Gagal membaca foto: ' + e.message, true); }
}

/* =====================================================================
   KOMPONEN TAMPILAN
   ===================================================================== */
const inp = (p, label, opt = {}) => `<div class="f${opt.full ? ' full' : ''}"><label>${label}${opt.hint ? ` <em>${opt.hint}</em>` : ''}</label>${
  opt.area ? `<textarea data-p="${p}" rows="${opt.rows || 3}" placeholder="${esc(opt.ph || '')}">${esc(get(p))}</textarea>`
  : `<input type="${opt.type || 'text'}" data-p="${p}" value="${esc(get(p))}" placeholder="${esc(opt.ph || '')}"${opt.ro ? ' readonly' : ''}>`}</div>`;

function thumb(p, key, opt = {}) {
  const obj = get(p) || {};
  return `<div class="th${opt.cls ? ' ' + opt.cls : ''}" data-act="foto" data-p="${p}" data-key="${key}" data-base="${esc(obj[key] || '')}"
    data-dir="${esc(opt.dir || '')}" data-slug="${opt.slug || 'nama'}"${opt.fixed ? ` data-fixed="${esc(opt.fixed)}"` : ''}${opt.max ? ` data-max="${opt.max}"` : ''} title="Klik untuk mengunggah foto">
    <span class="ph">${opt.label || 'Belum ada foto'}</span><span class="up">Unggah</span></div>`;
}

const aksiItem = p => `<div class="it-act"><button type="button" class="ic" data-act="up" data-p="${p}" title="Geser ke atas/kiri">↑</button><button type="button" class="ic" data-act="down" data-p="${p}" title="Geser ke bawah/kanan">↓</button><button type="button" class="ic del" data-act="del" data-p="${p}" title="Hapus">✕</button></div>`;

function spek(p, judul = 'Spesifikasi') {
  const rows = get(p) || [];
  return `<div class="sec-l">${judul}</div><div class="spec">${rows.map((r, i) => `<div class="row">
      <input type="text" data-p="${p}.${i}.0" value="${esc(r[0])}" placeholder="Label (mis. Lebar)">
      <input type="text" data-p="${p}.${i}.1" value="${esc(r[1])}" placeholder="Isi (mis. 60 cm)">
      <button type="button" class="ic del" data-act="del" data-p="${p}.${i}" title="Hapus baris">✕</button></div>`).join('')}
    <div><button type="button" class="b line sm" data-act="add" data-p="${p}" data-tpl="spec">+ Baris spesifikasi</button></div></div>`;
}

const dirSaudara = (list, key = 'foto') => { const f = (list || []).map(x => x && x[key]).find(Boolean); return f ? dirOf(f) : ''; };

/* ---------- Editor produk ---------- */
function editorProduk(i) {
  const P = `produk.${i}`, p = S.produk[i];
  if (!p) return '<p class="empty">Produk tidak ditemukan.</p>';
  const mode = p.tipe ? 'tipe' : 'motif';
  return `
  <div class="hd"><div><div class="eb">Produk ${i + 1} dari ${S.produk.length}</div><h1>${esc(p.nama || 'Tanpa nama')}</h1></div>
    <div class="hd-act">
      <a class="b ghost sm" href="index.html#/produk/${esc(p.id)}" target="_blank" rel="noopener">Lihat di website ↗</a>
      <button type="button" class="ic" data-act="up" data-p="${P}" title="Pindah ke atas">↑</button>
      <button type="button" class="ic" data-act="down" data-p="${P}" title="Pindah ke bawah">↓</button>
    </div></div>

  <section class="card"><h2>Informasi produk</h2><p class="sub">Tampil di kartu produk beranda dan bagian atas halaman produk.</p>
    <div class="grid">
      ${inp(`${P}.nama`, 'Nama produk', { ph: 'mis. Wall Board' })}
      ${inp(`${P}.id`, 'Alamat halaman', { ro: true, hint: `index.html#/produk/${esc(p.id)}` })}
      ${inp(`${P}.merek`, 'Merek', { ph: 'mis. Champion', hint: 'opsional' })}
      ${inp(`${P}.seri`, 'Nama seri', { ph: 'mis. Fluted Panel', hint: 'opsional' })}
      ${inp(`${P}.tagline`, 'Judul besar (tagline)', { full: true, ph: 'mis. Praktis. Rapi. Tahan lama.' })}
      ${inp(`${P}.deskripsi`, 'Deskripsi', { full: true, area: true })}
      <div class="f full"><label>Katalog khusus produk ini <em>kosongkan untuk memakai katalog utama</em></label>
        <div class="row"><input type="text" data-p="${P}.katalog" value="${esc(p.katalog || '')}" placeholder="${esc(S.katalog || '')}"><button type="button" class="b ghost sm" data-act="pdf" data-p="${P}.katalog">Unggah PDF</button></div></div>
      <div class="f"><label>Foto sampul <em>kartu di beranda, potret</em></label>${thumb(P, 'sampul', { cls: 'sampul', fixed: `foto/produk/${p.id}/sampul`, max: 1800 })}</div>
      <div class="f"><label>Tekstur sementara <em>tampil jika foto belum ada</em></label><select data-p="${P}.tekstur">${TEKSTUR.map(([v, l]) => `<option value="${v}"${p.tekstur === v ? ' selected' : ''}>${l}</option>`).join('')}</select></div>
    </div>
    ${spek(`${P}.spesifikasi`, 'Spesifikasi umum')}
  </section>

  <section class="card"><h2>Pilihan di bagian atas halaman</h2>
    <p class="sub">Pilih bentuk tampilan: <b>Daftar motif</b> (mis. Wall Board Champion) atau <b>Pilihan tipe</b> — tiap tipe punya foto, ukuran & warna sendiri (mis. Wall Panel Fluted).</p>
    <div class="seg"><button type="button" class="${mode === 'motif' ? 'on' : ''}" data-act="mode" data-p="${P}" data-m="motif">Daftar motif</button><button type="button" class="${mode === 'tipe' ? 'on' : ''}" data-act="mode" data-p="${P}" data-m="tipe">Pilihan tipe</button></div>
    ${mode === 'tipe' ? editorTipe(i) : editorMotif(i)}
  </section>

  <section class="card"><h2>Koleksi / seri tambahan <span class="tag">opsional</span></h2>
    <p class="sub">Katalog motif di bagian bawah halaman, dikelompokkan per grup (mis. Marble Series Mevvah).</p>
    ${(p.koleksi || []).map((k, ki) => editorKoleksi(i, ki)).join('') || '<p class="empty">Belum ada koleksi.</p>'}
    <button type="button" class="b line" data-act="add" data-p="${P}.koleksi" data-tpl="koleksi">+ Tambah koleksi</button>
  </section>

  <section class="card"><h2>Galeri pemasangan</h2>
    <p class="sub">Foto hasil pemasangan, tampil di bawah halaman produk. Disimpan di <code>${esc(p.galeri || `foto/produk/${p.id}/galeri`)}/</code> sebagai 1.jpg, 2.jpg, …</p>
    <div class="items" id="galeri-list"><p class="empty">Memuat galeri…</p></div>
    <button type="button" class="b line" data-act="galeri" data-p="${P}">+ Tambah foto galeri</button>
  </section>

  <section class="card"><h2>Hapus produk</h2><p class="sub">Menghapus produk ini beserta datanya dari website.</p>
    <button type="button" class="b danger" data-act="hapus-produk" data-p="${P}">Hapus “${esc(p.nama)}”</button></section>`;
}

function editorMotif(i) {
  const P = `produk.${i}.motif`, list = S.produk[i].motif || [];
  const dir = dirSaudara(list) || `foto/produk/${S.produk[i].id}/motif`;
  return `<div class="items">${list.map((m, j) => `<div class="it">
      ${thumb(`${P}.${j}`, 'foto', { dir, slug: 'kode,nama' })}
      <div class="row"><input type="text" data-p="${P}.${j}.kode" value="${esc(m.kode || '')}" placeholder="Kode" style="flex:.45"><input type="text" data-p="${P}.${j}.nama" value="${esc(m.nama)}" placeholder="Nama motif"></div>
      <select data-p="${P}.${j}.tekstur" title="Tekstur sementara">${TEKSTUR.map(([v, l]) => `<option value="${v}"${m.tekstur === v ? ' selected' : ''}>${l}</option>`).join('')}</select>
      ${aksiItem(`${P}.${j}`)}</div>`).join('')}</div>
    <button type="button" class="b line" data-act="add" data-p="${P}" data-tpl="motif">+ Tambah motif</button>
    <p class="hint">Foto disimpan di <code>${esc(dir)}/</code>. Saran: persegi, minimal 1200×1200 px.</p>`;
}

function editorTipe(i) {
  const P = `produk.${i}.tipe`, list = S.produk[i].tipe || [];
  const dir = dirSaudara(list) || `foto/produk/${S.produk[i].id}/tipe`;
  return list.map((t, j) => {
    const T = `${P}.${j}`, wdir = dirSaudara(t.warna) || (t.foto || `${dir}/${slug(t.nama) || 'tipe-' + (j + 1)}`);
    return `<div class="tipe">
      <div class="tipe-hd">${thumb(T, 'foto', { dir, cls: 'contain', label: 'Foto produk tipe ini' })}
        <div><div class="row"><input type="text" data-p="${T}.nama" value="${esc(t.nama)}" placeholder="Nama tipe (mis. MVH.FLT-175)" style="font-weight:700">${aksiItem(T)}</div>
        ${spek(`${T}.spesifikasi`, 'Ukuran tipe ini')}</div></div>
      <div class="sec-l">Pilihan warna</div>
      <div class="warna">${(t.warna || []).map((w, k) => `<div class="row">
          ${thumb(`${T}.warna.${k}`, 'foto', { dir: wdir, cls: 'sm', label: 'Foto' })}
          <input type="color" data-p="${T}.warna.${k}.warna" value="${esc(w.warna || '#cccccc')}" title="Warna kotak">
          <input type="text" data-p="${T}.warna.${k}.nama" value="${esc(w.nama)}" placeholder="Nama warna">
          ${aksiItem(`${T}.warna.${k}`)}</div>`).join('')}
        <div><button type="button" class="b line sm" data-act="add" data-p="${T}.warna" data-tpl="warna">+ Warna</button></div></div>
      <p class="hint">Foto warna opsional — jika kosong, tampil kotak warna bergaris.</p></div>`;
  }).join('') + `<button type="button" class="b line" data-act="add" data-p="${P}" data-tpl="tipe">+ Tambah tipe</button>`;
}

function editorKoleksi(i, ki) {
  const K = `produk.${i}.koleksi.${ki}`, k = get(K);
  const semuaM = (k.grup || []).flatMap(g => g.motif || []);
  const dir = dirSaudara(semuaM) || `foto/produk/${S.produk[i].id}/${slug(k.nama) || 'koleksi'}`;
  return `<div class="kol">
    <div class="row" style="margin-bottom:12px"><input type="text" data-p="${K}.nama" value="${esc(k.nama)}" placeholder="Nama koleksi" style="font-weight:700;font-size:15px">${aksiItem(K)}</div>
    <div class="grid">
      ${inp(`${K}.merek`, 'Merek', { ph: 'mis. Mevvah' })}
      ${inp(`${K}.satuan`, 'Sebutan pilihan', { ph: 'motif', hint: 'mis. motif / warna' })}
      ${inp(`${K}.deskripsi`, 'Deskripsi', { full: true, area: true, rows: 2 })}
    </div>
    ${spek(`${K}.spesifikasi`, 'Spesifikasi koleksi')}
    ${(k.grup || []).map((g, gi) => { const G = `${K}.grup.${gi}`; return `<div class="grup">
      <div class="grup-hd"><input type="text" data-p="${G}.nama" value="${esc(g.nama)}" placeholder="Nama grup">${aksiItem(G)}</div>
      ${spek(`${G}.spesifikasi`, 'Spesifikasi grup')}
      <div class="sec-l">Motif (${(g.motif || []).length})</div>
      <div class="items">${(g.motif || []).map((m, mi) => `<div class="it">
        ${thumb(`${G}.motif.${mi}`, 'foto', { dir })}
        <input type="text" data-p="${G}.motif.${mi}.nama" value="${esc(m.nama)}" placeholder="Nama motif">
        <div class="row" style="justify-content:space-between"><label class="chk" title="Tampilkan label “New” di website"><input type="checkbox" data-p="${G}.motif.${mi}.baru"${m.baru ? ' checked' : ''}> New</label>${aksiItem(`${G}.motif.${mi}`)}</div>
      </div>`).join('')}</div>
      <button type="button" class="b line sm" data-act="add" data-p="${G}.motif" data-tpl="gmotif">+ Motif</button></div>`; }).join('')}
    <div style="margin-top:14px"><button type="button" class="b line sm" data-act="add" data-p="${K}.grup" data-tpl="grup">+ Grup</button></div>
    <p class="hint">Foto motif koleksi disimpan di <code>${esc(dir)}/</code>.</p></div>`;
}

async function isiGaleri(i) {
  const box = $('#galeri-list'); if (!box) return;
  const p = S.produk[i], dir = p.galeri || `foto/produk/${p.id}/galeri`;
  const list = [];
  for (let n = 1; n <= 60; n++) { const base = `${dir}/${n}`; const pd = pendingImg(base); const u = pd ? pd.url : await cariFoto(base); if (!u) break; list.push({ n, u, baru: !!pd }); }
  if (!document.body.contains(box)) return;
  box.innerHTML = list.length ? list.map(g => `<div class="it"><div class="th"><img src="${g.u}" alt="">${g.baru ? '<span class="badge">Baru</span>' : ''}</div><div class="hint" style="margin:0">${g.n}.jpg</div></div>`).join('') : '<p class="empty">Belum ada foto galeri.</p>';
  box.dataset.jumlah = list.length;
}

/* ---------- Katalog ---------- */
function editorKatalog() {
  return `<div class="hd"><div><div class="eb">Pengaturan</div><h1>Katalog</h1></div></div>
  <p class="lead">Tombol <b>Download Katalog</b> di halaman produk membuka file/link di bawah ini. Bisa berupa PDF yang diunggah ke website, atau link Google Drive.</p>
  <div class="note info"><b>Link Google Drive:</b> buka file di Drive → <b>Bagikan</b> → ubah akses menjadi <b>“Siapa saja yang memiliki link”</b> → <b>Salin link</b>, lalu tempel di sini.
    PDF besar (lebih dari ±25 MB) sebaiknya lewat Google Drive agar website tetap cepat.</div>
  <section class="card"><h2>Katalog utama</h2><p class="sub">Dipakai semua produk yang tidak punya katalog khusus.</p>
    <div class="row"><input type="text" data-p="katalog" value="${esc(S.katalog || '')}" placeholder="https://drive.google.com/file/d/…/view">
      <button type="button" class="b ghost sm" data-act="pdf" data-p="katalog">Unggah PDF</button>
      ${S.katalog ? `<a class="b ghost sm" href="${esc(S.katalog)}" target="_blank" rel="noopener">Buka ↗</a>` : ''}</div></section>
  <section class="card"><h2>Katalog per produk</h2><p class="sub">Kosongkan untuk memakai katalog utama.</p>
    ${S.produk.map((p, i) => `<div class="f" style="margin-bottom:12px"><label>${esc(p.nama)}${p.merek ? ' · ' + esc(p.merek) : ''}</label>
      <div class="row"><input type="text" data-p="produk.${i}.katalog" value="${esc(p.katalog || '')}" placeholder="(katalog utama)">
      <button type="button" class="b ghost sm" data-act="pdf" data-p="produk.${i}.katalog">Unggah PDF</button>
      ${p.katalog ? `<a class="b ghost sm" href="${esc(p.katalog)}" target="_blank" rel="noopener">Buka ↗</a>` : ''}</div></div>`).join('')}</section>`;
}

/* ---------- Portofolio ---------- */
function editorPortofolio() {
  const list = S.portofolio || (S.portofolio = []);
  return `<div class="hd"><div><div class="eb">Konten</div><h1>Portofolio</h1></div>
    <div class="hd-act"><a class="b ghost sm" href="index.html#/portofolio" target="_blank" rel="noopener">Lihat di website ↗</a></div></div>
  <p class="lead">Foto hasil pemasangan di bagian <b>Portofolio</b> beranda (bergulir ke samping). Urutan di sini = urutan di website. Saran foto: potret (tegak), mis. 1200×1500 px.</p>
  <datalist id="dl-kat">${S.produk.map(p => `<option value="${esc(p.nama)}">`).join('')}</datalist>
  <div class="items pf">${list.map((x, i) => `<div class="it">
      ${thumb(`portofolio.${i}`, 'foto', { dir: 'foto/portofolio', slug: 'judul', cls: 'potret', max: 1800 })}
      <input type="text" data-p="portofolio.${i}.judul" value="${esc(x.judul)}" placeholder="Judul (mis. Rumah Tinggal)">
      <input type="text" data-p="portofolio.${i}.kategori" value="${esc(x.kategori || '')}" placeholder="Kategori / produk" list="dl-kat">
      ${aksiItem(`portofolio.${i}`)}</div>`).join('') || '<p class="empty">Belum ada portofolio.</p>'}</div>
  <button type="button" class="b line" data-act="add" data-p="portofolio" data-tpl="portofolio">+ Tambah portofolio</button>
  <p class="hint">Isi judul dulu, lalu klik kotak foto untuk mengunggah.</p>`;
}

/* ---------- Blog ---------- */
function editorBlog() {
  const list = S.blog || (S.blog = []);
  return `<div class="hd"><div><div class="eb">Konten</div><h1>Blog</h1></div>
    <div class="hd-act"><a class="b ghost sm" href="index.html#/blog" target="_blank" rel="noopener">Lihat di website ↗</a></div></div>
  <p class="lead">Artikel yang <b>punya isi</b> bisa diklik dan dibuka sebagai halaman sendiri. Artikel tanpa isi tampil sebagai kartu “segera hadir”.</p>
  <div class="note info"><b>Format isi artikel:</b>
    <ul><li>Baris kosong = paragraf baru</li><li><code>## Judul bagian</code> = subjudul</li><li><code>- teks</code> = daftar berpoin</li><li><code>**teks**</code> = <b>tebal</b></li></ul></div>
  ${list.map((b, i) => { const B = `blog.${i}`; return `<section class="card blog-it">
    <div class="row" style="margin-bottom:14px"><input type="text" data-p="${B}.judul" value="${esc(b.judul)}" placeholder="Judul artikel" style="font-weight:700;font-size:15px">${aksiItem(B)}</div>
    <div class="blog-g">
      <div>${thumb(B, 'foto', { dir: 'foto/blog', slug: 'judul', label: 'Foto sampul (opsional)', max: 1800 })}
        ${b.isi?.trim() && b.id ? `<a class="b ghost sm wide" style="margin-top:10px" href="index.html#/blog/${esc(b.id)}" target="_blank" rel="noopener">Buka artikel ↗</a>` : ''}</div>
      <div class="grid">
        ${inp(`${B}.label`, 'Label', { ph: 'mis. Tips / Inspirasi / Segera Hadir' })}
        ${inp(`${B}.tanggal`, 'Tanggal', { type: 'date' })}
        ${inp(`${B}.ringkas`, 'Ringkasan', { full: true, area: true, rows: 2, hint: 'tampil di kartu' })}
      </div>
    </div>
    <div class="f" style="margin-top:14px"><label>Isi artikel <em>kosongkan jika belum siap</em></label><textarea data-p="${B}.isi" rows="10" placeholder="Tulis isi artikel di sini…">${esc(b.isi || '')}</textarea></div>
  </section>`; }).join('') || '<p class="empty">Belum ada artikel.</p>'}
  <button type="button" class="b line" data-act="add" data-p="blog" data-tpl="blog">+ Tambah artikel</button>`;
}

/* ---------- Kontak ---------- */
function editorKontak() {
  return `<div class="hd"><div><div class="eb">Pengaturan</div><h1>Kontak</h1></div></div>
  <section class="card"><div class="grid">
    ${inp('kontak.wa', 'Nomor WhatsApp (untuk link)', { hint: 'format 62…, tanpa + dan spasi', ph: '6287852328888' })}
    ${inp('kontak.waTampil', 'Nomor yang ditampilkan', { ph: '0878 5232 8888' })}
    ${inp('kontak.instagram', 'Instagram', { hint: 'tanpa @' })}
    ${inp('kontak.jam', 'Jam operasional')}
    ${inp('kontak.alamat', 'Alamat', { full: true, area: true, rows: 2 })}
    ${inp('kontak.maps', 'Link Google Maps', { full: true })}
  </div></section>`;
}

/* ---------- GitHub ---------- */
const GH_KEY = 'cnh-admin-github';
function ghCfg() {
  let c = {}; try { c = JSON.parse(localStorage.getItem(GH_KEY) || '{}'); } catch {}
  let t = ''; try { t = sessionStorage.getItem(GH_KEY + '-token') || c.token || ''; } catch {}
  // website kini di branch "main"; pengaturan lama yang masih memakai branch pengembangan ikut dipindah
  const branch = !c.branch || c.branch === 'claude/jolly-babbage-8qlhtb' ? 'main' : c.branch;
  return { owner: c.owner || 'ReinerJulio', repo: c.repo || 'websiteCNH', branch, token: t, ingat: !!c.token };
}
function simpanGhCfg(c) {
  try {
    localStorage.setItem(GH_KEY, JSON.stringify({ owner: c.owner, repo: c.repo, branch: c.branch, token: c.ingat ? c.token : undefined }));
    if (c.ingat) sessionStorage.removeItem(GH_KEY + '-token'); else sessionStorage.setItem(GH_KEY + '-token', c.token || '');
  } catch {}
}
function editorGithub() {
  const c = ghCfg();
  return `<div class="hd"><div><div class="eb">Pengaturan</div><h1>Koneksi GitHub</h1></div></div>
  <p class="lead">Website ini disimpan di GitHub. Dengan menghubungkan admin ke GitHub, tombol <b>Simpan ke GitHub</b> langsung menyimpan data & foto ke repo — website ter-update otomatis (jika di-hosting di GitHub Pages/Netlify/Vercel yang terhubung ke repo).</p>
  <section class="card"><h2>Hubungkan</h2>
    <div class="grid">
      <div class="f"><label>Pemilik (owner)</label><input type="text" id="gh-owner" value="${esc(c.owner)}"></div>
      <div class="f"><label>Repo</label><input type="text" id="gh-repo" value="${esc(c.repo)}"></div>
      <div class="f full"><label>Branch <em>branch yang dipakai website</em></label><input type="text" id="gh-branch" value="${esc(c.branch)}"></div>
      <div class="f full"><label>Token GitHub <em>disimpan hanya di browser ini</em></label><input type="password" id="gh-token" value="${esc(c.token)}" placeholder="github_pat_…" autocomplete="off"></div>
      <label class="chk full"><input type="checkbox" id="gh-ingat"${c.ingat ? ' checked' : ''}> Ingat token di perangkat ini (jangan dicentang di komputer umum)</label>
    </div>
    <div class="row" style="margin-top:16px;flex-wrap:wrap">
      <button type="button" class="b acc" data-act="gh-hubung">Hubungkan &amp; muat data terbaru</button>
      ${c.token ? '<button type="button" class="b danger" data-act="gh-putus">Putuskan</button>' : ''}
    </div></section>
  <section class="card"><h2>Cara membuat token</h2>
    <div class="note info"><ol>
      <li>Login GitHub → klik foto profil → <b>Settings</b> → <b>Developer settings</b> → <b>Personal access tokens</b> → <b>Fine-grained tokens</b> → <b>Generate new token</b>.</li>
      <li>Isi nama (mis. <i>Admin Website CNH</i>) dan masa berlaku.</li>
      <li><b>Repository access</b>: pilih <b>Only select repositories</b> → pilih <b>${esc(c.repo)}</b>.</li>
      <li><b>Permissions → Repository permissions → Contents</b>: pilih <b>Read and write</b>.</li>
      <li>Klik <b>Generate token</b>, salin, lalu tempel di kolom token di atas.</li>
    </ol></div>
    <div class="note warn">Token ini seperti kunci: jangan dibagikan. Token hanya disimpan di browser Anda dan hanya dikirim ke GitHub. Jika bocor, hapus token di GitHub lalu buat yang baru.</div>
  </section>`;
}

function editorPanduan() {
  return `<div class="hd"><div><div class="eb">Bantuan</div><h1>Panduan admin</h1></div></div>
  <section class="card"><h2>Langkah singkat</h2><div class="note info"><ol>
    <li>Pilih produk di menu kiri (atau <b>+ Produk baru</b>).</li>
    <li>Ubah teks, spesifikasi, motif/tipe/warna. Klik kotak foto untuk mengunggah — foto otomatis dikecilkan (maks. 1600 px) dan diberi nama rapi.</li>
    <li>Atur file/link katalog di menu <b>Katalog</b>.</li>
    <li>Klik <b>Simpan ke GitHub</b> (jika sudah terhubung) — website ter-update dalam 1–10 menit.<br>Belum pakai GitHub? Klik <b>Unduh ZIP</b>, ekstrak isinya ke folder website (timpa file lama), lalu unggah/push seperti biasa.</li>
  </ol></div></section>
  <section class="card"><h2>Tips</h2><ul style="margin-left:18px;color:var(--mut)">
    <li>Foto motif terbaik: persegi, minimal 1200×1200 px, pencahayaan rata.</li>
    <li>Foto PNG transparan (tanpa latar) tetap disimpan PNG; foto lain disimpan JPG agar ringan.</li>
    <li>Kode motif (mis. MB01) dipakai sebagai nama file foto — isi kode/nama dulu baru unggah foto.</li>
    <li>Perubahan belum tersimpan sebelum Anda klik Simpan/Unduh ZIP. Halaman ini akan mengingatkan jika Anda menutupnya.</li>
    <li>Data yang tampil saat halaman dibuka adalah data website saat ini. Setelah terhubung GitHub, klik <b>Hubungkan &amp; muat data terbaru</b> untuk memuat versi paling baru.</li>
  </ul></section>`;
}

/* =====================================================================
   RENDER
   ===================================================================== */
function renderNav() {
  $('#nav-produk').innerHTML = S.produk.map((p, i) => `<a data-tab="produk" data-i="${i}" class="${view.tab === 'produk' && view.i === i ? 'on' : ''}"><span>${esc(p.nama || 'Tanpa nama')}</span><small>${p.tipe ? 'tipe' : (p.motif || []).length + ' motif'}</small></a>`).join('');
  $$('.side nav a[data-tab]:not([data-i])').forEach(a => a.classList.toggle('on', view.tab === a.dataset.tab));
  $('#n-pf').textContent = (S.portofolio || []).length; $('#n-blog').textContent = (S.blog || []).length;
}
function render() {
  const y = scrollY;
  const m = $('#main');
  if (view.tab === 'produk') { view.i = Math.min(view.i, S.produk.length - 1); m.innerHTML = S.produk.length ? editorProduk(view.i) : '<div class="hd"><h1>Belum ada produk</h1></div>'; }
  else m.innerHTML = { katalog: editorKatalog, kontak: editorKontak, portofolio: editorPortofolio, blog: editorBlog, github: editorGithub, panduan: editorPanduan }[view.tab]();
  renderNav(); isiThumb(m); perbaruiStatus();
  if (view.tab === 'produk' && S.produk.length) isiGaleri(view.i);
  scrollTo(0, y);
}
function buka(tab, i = 0) { view = { tab, i }; render(); scrollTo(0, 0); }

/* =====================================================================
   INTERAKSI
   ===================================================================== */
document.addEventListener('input', e => {
  const el = e.target.closest('[data-p]'); if (!el || !el.matches('input,textarea,select')) return;
  set(el.dataset.p, el.type === 'checkbox' ? (el.checked || undefined) : el.value);
  if (/^produk\.\d+\.nama$/.test(el.dataset.p)) { renderNav(); const h = $('#main .hd h1'); if (h) h.textContent = el.value || 'Tanpa nama'; }
  perbaruiStatus();
});

document.addEventListener('click', async e => {
  const nav = e.target.closest('.side nav a[data-tab]');
  if (nav) { buka(nav.dataset.tab, +(nav.dataset.i || 0)); return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act, p = el.dataset.p;
  switch (act) {
    case 'add': { const list = get(p) ?? (set(p, []), get(p)); list.push(TPL[el.dataset.tpl]()); render(); break; }
    case 'del': {
      const it = get(p), nama = (it && (it.nama || it.kode)) || (Array.isArray(it) ? it.join(' ') : '');
      if (!Array.isArray(it) && !(await konfirmasi('Hapus item?', `“${esc(nama || 'item ini')}” akan dihapus.`, 'Hapus', true))) return;
      get(parent(p)).splice(lastKey(p), 1); render(); break; }
    case 'up': case 'down': {
      const list = get(parent(p)), j = lastKey(p), k = act === 'up' ? j - 1 : j + 1;
      if (k < 0 || k >= list.length) return;
      [list[j], list[k]] = [list[k], list[j]];
      if (p.split('.').length === 2) view.i = k;   // urutan produk
      render(); break; }
    case 'foto': await unggahFoto(el); break;
    case 'mode': {
      const prod = get(p), ke = el.dataset.m;
      if ((ke === 'tipe' && prod.tipe) || (ke === 'motif' && !prod.tipe)) return;
      const lama = ke === 'tipe' ? (prod.motif || []).length : (prod.tipe || []).length;
      if (lama && !(await konfirmasi('Ganti bentuk tampilan?', `Data ${ke === 'tipe' ? 'motif' : 'tipe'} yang ada (${lama}) akan dihapus dari produk ini.`, 'Ganti', true))) return;
      if (ke === 'tipe') { delete prod.motif; prod.tipe = []; } else { delete prod.tipe; prod.motif = []; }
      render(); break; }
    case 'pdf': {
      const [f] = await pilihFile('application/pdf'); if (!f) return;
      if (f.size > 95 * 1024 * 1024) { toast('PDF lebih dari 95 MB — terlalu besar. Simpan di Google Drive lalu tempel link-nya.', true); return; }
      if (f.size > 25 * 1024 * 1024 && !(await konfirmasi('PDF cukup besar', `Ukuran ${(f.size / 1048576).toFixed(0)} MB. Pengunjung akan lama mengunduhnya. Sebaiknya kompres dulu atau pakai Google Drive. Tetap unggah?`, 'Tetap unggah'))) return;
      const path = `katalog/${slug(f.name.replace(/\.pdf$/i, '')) || 'katalog'}.pdf`;
      pending.set(path, { kind: 'file', blob: f, size: f.size });
      set(p, path); render(); toast(`PDF siap: ${path}. Jangan lupa simpan.`); break; }
    case 'galeri': {
      const prod = get(p), dir = prod.galeri || (prod.galeri = `foto/produk/${prod.id}/galeri`);
      const files = await pilihFile('image/*', true); if (!files.length) return;
      if ($('#galeri-list')?.dataset.jumlah === undefined) await isiGaleri(view.i);
      let n = +($('#galeri-list')?.dataset.jumlah || 0);
      toast('Memproses foto…');
      for (const f of files) { const g = await prosesGambar(f, 1800); n++; pending.set(`${dir}/${n}.${g.ext}`, { kind: 'img', ...g }); cache.delete(`${dir}/${n}`); }
      render(); toast(`${files.length} foto galeri siap. Jangan lupa simpan.`); break; }
    case 'produk-baru': {
      const i = await modal('Produk baru', `<div class="f"><label>Nama produk</label><input type="text" id="np-nama" placeholder="mis. Vinyl Flooring"></div>`, [{ t: 'Batal' }, { t: 'Buat produk', c: 'acc' }]);
      const nama = ($('#np-nama')?.value || '').trim();
      if (i !== 1 || !nama) return;
      let id = slug(nama) || 'produk', n = 2; const ids = new Set(S.produk.map(x => x.id)); while (ids.has(id)) id = `${slug(nama)}-${n++}`;
      S.produk.push({ id, nama, merek: '', tagline: '', deskripsi: '', sampul: `foto/produk/${id}/sampul`, galeri: `foto/produk/${id}/galeri`, tekstur: 'stn', spesifikasi: [], motif: [] });
      buka('produk', S.produk.length - 1); toast('Produk dibuat. Lengkapi datanya lalu simpan.'); break; }
    case 'hapus-produk': {
      const i = lastKey(p), nama = S.produk[i].nama;
      if (!(await konfirmasi('Hapus produk?', `Produk <b>${esc(nama)}</b> dan semua datanya akan dihapus dari website setelah disimpan.`, 'Hapus produk', true))) return;
      S.produk.splice(i, 1); buka('produk', Math.max(0, i - 1)); break; }
    case 'gh-hubung': await hubungkanGithub(); break;
    case 'gh-putus': simpanGhCfg({ ...ghCfg(), token: '', ingat: false }); try { sessionStorage.removeItem(GH_KEY + '-token'); } catch {} render(); toast('Koneksi GitHub diputus.'); break;
  }
  perbaruiStatus();
});

/* =====================================================================
   MENULIS pengaturan.js
   ===================================================================== */
const ID_RE = /^[A-Za-z_$][\w$]*$/;
function tulis(v, ind = '') {
  const di = ind + '  ';
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  const bersih = Array.isArray(v) ? v : Object.fromEntries(Object.entries(v).filter(([, x]) => x !== undefined));
  const kunci = k => ID_RE.test(k) ? k : JSON.stringify(k);
  const sebaris = Array.isArray(bersih)
    ? `[${bersih.map(x => tulis(x, di)).join(', ')}]`
    : `{ ${Object.entries(bersih).map(([k, x]) => `${kunci(k)}: ${tulis(x, di)}`).join(', ')} }`;
  if (Array.isArray(bersih) ? !bersih.length : !Object.keys(bersih).length) return Array.isArray(bersih) ? '[]' : '{}';
  if (!sebaris.includes('\n') && sebaris.length + ind.length < 130) return sebaris;
  return Array.isArray(bersih)
    ? `[\n${bersih.map(x => di + tulis(x, di)).join(',\n')}\n${ind}]`
    : `{\n${Object.entries(bersih).map(([k, x]) => `${di}${kunci(k)}: ${tulis(x, di)}`).join(',\n')}\n${ind}}`;
}
function bersihkan(o) {   // buang nilai kosong yang tidak perlu (string kosong opsional, flag false)
  const OPS = new Set(['merek', 'seri', 'katalog', 'kode', 'satuan', 'baru', 'isi', 'tanggal']);
  if (Array.isArray(o)) return o.map(bersihkan);
  if (o && typeof o === 'object') { const r = {}; for (const [k, v] of Object.entries(o)) { if (v === undefined || (OPS.has(k) && (v === '' || v === false))) continue; r[k] = bersihkan(v); } return r; }
  return o;
}
function buatFileData() {
  const data = bersihkan(S);
  return `/* =====================================================================
   PENGATURAN WEBSITE — CENTRAL NIAGA HARDWARE
   ---------------------------------------------------------------------
   File ini diperbarui oleh halaman admin (admin.html) — ${new Date().toLocaleString('id-ID')}.
   Paling mudah mengubah isi website lewat halaman admin. Mengedit file ini
   langsung juga boleh (lihat PANDUAN-FOTO.md).

   Foto: tulis path TANPA ekstensi — .jpg/.jpeg/.png/.webp dikenali otomatis.
   Buka index.html?cekfoto untuk melihat foto yang sudah/belum ada.
   ===================================================================== */

const PENGATURAN = ${tulis(data)};
`;
}

// Alamat artikel blog (#/blog/<id>) dibuat dari judul, unik, dan tidak berubah setelah dibuat
function lengkapiBlog() {
  const dipakai = new Set();
  (S.blog || []).forEach(b => {
    let id = b.id || slug(b.judul) || 'artikel', n = 2; const dasar = id;
    while (dipakai.has(id)) id = `${dasar}-${n++}`;
    b.id = id; dipakai.add(id);
  });
}
function validasi() {
  lengkapiBlog();
  const err = [], ids = new Set();
  (S.blog || []).forEach((b, i) => { if (!b.judul?.trim()) err.push(`Blog: artikel ke-${i + 1} belum punya judul.`); });
  (S.portofolio || []).forEach((x, i) => { if (!x.judul?.trim()) err.push(`Portofolio ke-${i + 1} belum punya judul.`); });
  S.produk.forEach((p, i) => {
    if (!p.nama?.trim()) err.push(`Produk ke-${i + 1} belum punya nama.`);
    if (ids.has(p.id)) err.push(`Alamat halaman “${p.id}” dipakai dua produk.`); ids.add(p.id);
    (p.tipe || []).forEach((t, j) => { if (!t.nama?.trim()) err.push(`${p.nama}: tipe ke-${j + 1} belum punya nama.`); if (!(t.warna || []).length) err.push(`${p.nama}: tipe “${t.nama || j + 1}” belum punya warna.`); });
    if (p.tipe && !p.tipe.length) err.push(`${p.nama}: mode “Pilihan tipe” dipilih tapi belum ada tipe.`);
  });
  return err;
}

/* =====================================================================
   UNDUH ZIP
   ===================================================================== */
$('#b-zip').addEventListener('click', async () => {
  const err = validasi(); if (err.length) { modal('Periksa dulu', `<ul style="margin-left:18px">${err.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`); return; }
  const zip = new JSZip();
  zip.file(DATA_FILE, buatFileData());
  for (const [path, f] of pending) zip.file(path, f.blob);
  // file lama yang sebaiknya dihapus: foto yang tidak dipakai lagi & versi ekstensi lain dari foto yang diganti
  const hapus = [];
  const dipakai = semuaFoto(S);
  for (const base of semuaFoto(ORIG)) if (!dipakai.has(base)) { const u = await cariFoto(base); if (u) hapus.push(decodeURI(u)); }
  for (const [path, f] of pending) if (f.kind === 'img') { const base = path.slice(0, path.lastIndexOf('.')); const u = await cariFoto(base); if (u && decodeURI(u) !== path) hapus.push(decodeURI(u)); }
  zip.file('BACA-DULU.txt', `CARA MEMASANG PERUBAHAN
=======================
1. Ekstrak ZIP ini.
2. Salin SEMUA isinya ke folder website (folder yang berisi index.html).
   Jika ditanya, pilih "Ganti / Replace".
3. ${hapus.length ? 'HAPUS file lama berikut (sudah tidak dipakai / diganti versi baru):\n' + hapus.map(h => '   - ' + h).join('\n') : 'Tidak ada file lama yang perlu dihapus.'}
4. Unggah / git push seperti biasa.

Dibuat oleh halaman admin — ${new Date().toLocaleString('id-ID')}
`);
  const blob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `perubahan-website-${new Date().toISOString().slice(0, 10)}.zip`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('ZIP diunduh. Ikuti petunjuk di file BACA-DULU.txt.');
});

/* =====================================================================
   GITHUB
   ===================================================================== */
async function gh(method, url, body, cfg = ghCfg()) {
  const r = await fetch(`https://api.github.com/repos/${cfg.owner}/${cfg.repo}${url}`, {
    method, headers: { Authorization: `Bearer ${cfg.token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined });
  if (!r.ok) {
    let m = ''; try { m = (await r.json()).message; } catch {}
    const arti = { 401: 'Token salah atau kedaluwarsa.', 403: 'Token tidak punya izin (perlu Contents: Read and write).', 404: 'Repo atau branch tidak ditemukan (atau token tidak punya akses ke repo ini).', 409: 'Repo sedang berubah, coba lagi.', 422: 'Data ditolak GitHub.' }[r.status] || '';
    throw new Error(`${arti} [${r.status}${m ? ': ' + m : ''}]`);
  }
  return r.status === 204 ? null : r.json();
}
const b64ke = s => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\n/g, '')), c => c.charCodeAt(0)));
const keB64 = async blob => { const buf = new Uint8Array(await blob.arrayBuffer()); let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000)); return btoa(s); };

function bacaData(src) {   // jalankan isi pengaturan.js dari repo sendiri untuk mendapatkan objek PENGATURAN
  return new Function(`${src}\n;return PENGATURAN;`)();
}

async function hubungkanGithub() {
  const c = { owner: $('#gh-owner').value.trim(), repo: $('#gh-repo').value.trim(), branch: $('#gh-branch').value.trim(), token: $('#gh-token').value.trim(), ingat: $('#gh-ingat').checked };
  if (!c.owner || !c.repo || !c.branch || !c.token) { toast('Lengkapi semua kolom.', true); return; }
  if (adaPerubahan() && !(await konfirmasi('Muat data dari GitHub?', 'Perubahan yang belum disimpan di halaman ini akan diganti dengan data terbaru dari GitHub.', 'Muat data', true))) return;
  try {
    toast('Menghubungkan…');
    await gh('GET', `/branches/${encodeURIComponent(c.branch)}`, null, c);
    const f = await gh('GET', `/contents/${DATA_FILE}?ref=${encodeURIComponent(c.branch)}`, null, c);
    const data = siapkan(bacaData(b64ke(f.content)));
    simpanGhCfg(c);
    S = clone(data); ORIG = clone(data); pending.clear(); cache.clear(); sumber = 'github';
    buka('produk', 0);
    toast('Terhubung. Data terbaru dari GitHub sudah dimuat.');
  } catch (e) { toast('Gagal terhubung: ' + e.message, true); }
}

$('#b-save').addEventListener('click', async () => {
  const cfg = ghCfg(); if (!cfg.token) { buka('github'); return; }
  const err = validasi(); if (err.length) { modal('Periksa dulu', `<ul style="margin-left:18px">${err.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`); return; }
  if (!adaPerubahan()) { toast('Tidak ada perubahan untuk disimpan.'); return; }
  const btn = $('#b-save'); btn.disabled = true;
  const log = []; const tulisLog = m => { log.push(m); $('#m-b').innerHTML = `<div class="log">${esc(log.join('\n'))}</div>`; };
  $('#m-t').textContent = 'Menyimpan ke GitHub…'; $('#m-a').innerHTML = ''; $('#modal').hidden = false; tulisLog('Mulai…');
  try {
    const ref = await gh('GET', `/git/ref/heads/${cfg.branch}`);
    const commitLama = await gh('GET', `/git/commits/${ref.object.sha}`);
    const pohon = await gh('GET', `/git/trees/${commitLama.tree.sha}?recursive=1`);
    const ada = new Set(pohon.tree.filter(t => t.type === 'blob').map(t => t.path));
    // jika data di GitHub sudah berubah sejak dimuat, hentikan supaya tidak menimpa pekerjaan orang lain
    {
      const f = await gh('GET', `/contents/${DATA_FILE}?ref=${encodeURIComponent(ref.object.sha)}`);
      if (JSON.stringify(siapkan(bacaData(b64ke(f.content)))) !== JSON.stringify(ORIG)) throw new Error(sumber === 'github' ? 'Data di GitHub sudah diubah dari tempat lain sejak halaman ini memuatnya. Catat perubahan Anda, buka menu Koneksi GitHub → “Hubungkan & muat data terbaru”, lalu ulangi.' : 'Data di halaman ini bukan versi terbaru di GitHub. Catat perubahan Anda, buka menu Koneksi GitHub → “Hubungkan & muat data terbaru”, lalu ulangi.');
    }
    const entri = [];
    tulisLog('Menyiapkan data produk…');
    const isiFile = buatFileData();
    const dataBlob = await gh('POST', '/git/blobs', { content: isiFile, encoding: 'utf-8' });
    entri.push({ path: DATA_FILE, mode: '100644', type: 'blob', sha: dataBlob.sha });
    let n = 0;
    for (const [path, f] of pending) {
      tulisLog(`Mengunggah ${++n}/${pending.size}: ${path} (${(f.size / 1024).toFixed(0)} KB)`);
      const b = await gh('POST', '/git/blobs', { content: await keB64(f.blob), encoding: 'base64' });
      entri.push({ path, mode: '100644', type: 'blob', sha: b.sha });
    }
    // hapus versi ekstensi lain dari foto yang diganti, dan foto yang tidak dipakai lagi
    const baru = new Set(entri.map(e => e.path)), hapus = new Set();
    const varian = base => EXT.map(x => `${base}.${x}`).filter(pp => ada.has(pp) && !baru.has(pp));
    for (const [path, f] of pending) if (f.kind === 'img') varian(path.slice(0, path.lastIndexOf('.'))).forEach(pp => hapus.add(pp));
    const dipakai = semuaFoto(S);
    for (const base of semuaFoto(ORIG)) if (!dipakai.has(base)) varian(base).forEach(pp => hapus.add(pp));
    hapus.forEach(pp => { tulisLog('Menghapus file lama: ' + pp); entri.push({ path: pp, mode: '100644', type: 'blob', sha: null }); });
    tulisLog('Membuat commit…');
    const tree = await gh('POST', '/git/trees', { base_tree: commitLama.tree.sha, tree: entri });
    const ringkas = `Admin: perbarui data website${pending.size ? ` (+${pending.size} file)` : ''}`;
    const commit = await gh('POST', '/git/commits', { message: ringkas, tree: tree.sha, parents: [ref.object.sha] });
    await gh('PATCH', `/git/refs/heads/${cfg.branch}`, { sha: commit.sha });
    // selesai
    for (const f of pending.values()) if (f.url) URL.revokeObjectURL(f.url);
    pending.clear(); cache.clear(); S = siapkan(bacaData(isiFile)); ORIG = clone(S); sumber = 'github';
    tulisLog('Selesai ✓');
    $('#m-t').textContent = 'Tersimpan ✓';
    $('#m-b').insertAdjacentHTML('beforeend', `<div class="note ok" style="margin-top:12px">Perubahan tersimpan di GitHub. Website ter-update dalam ±1–10 menit (tergantung hosting & cache browser).<br><a class="ul" href="https://github.com/${esc(cfg.owner)}/${esc(cfg.repo)}/commit/${commit.sha}" target="_blank" rel="noopener"><b>Lihat commit di GitHub ↗</b></a></div>`);
    $('#m-a').innerHTML = '<button type="button" class="b acc">Tutup</button>';
    $('#m-a button').onclick = () => { $('#modal').hidden = true; render(); };
  } catch (e) {
    tulisLog('GAGAL: ' + e.message);
    $('#m-t').textContent = 'Gagal menyimpan';
    $('#m-a').innerHTML = '<button type="button" class="b ghost">Tutup</button>';
    $('#m-a button').onclick = () => { $('#modal').hidden = true; };
  } finally { btn.disabled = false; perbaruiStatus(); }
});

/* =====================================================================
   MULAI
   ===================================================================== */
buka('produk', 0);
if (!ghCfg().token) toast('Mode lokal. Hubungkan GitHub (menu kiri) agar bisa menyimpan langsung.');
})();
