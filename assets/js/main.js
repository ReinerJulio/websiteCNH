/* =====================================================================
   CENTRAL NIAGA HARDWARE — LOGIKA WEBSITE
   Tidak perlu diedit. Untuk mengubah isi & foto, edit pengaturan.js
   ===================================================================== */
(() => {
'use strict';

const CFG = PENGATURAN;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const waLink = t => `https://wa.me/${CFG.kontak.wa}?text=${encodeURIComponent(t)}`;
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const CEK = /[?&]cekfoto\b/.test(location.search);

/* =====================================================================
   FOTO — cari file otomatis (.jpg/.jpeg/.png/.webp) dari nama dasar
   ===================================================================== */
const EXT = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'PNG', 'JPG', 'JPEG', 'WEBP', 'SVG'];
const cache = new Map();

function cariFoto(path) {
  if (!path) return Promise.resolve(null);
  if (cache.has(path)) return cache.get(path);
  const kandidat = /\.[a-z0-9]{3,4}$/i.test(path) ? [path] : EXT.map(e => `${path}.${e}`);
  const p = new Promise(res => {
    let i = 0;
    const coba = () => {
      if (i >= kandidat.length) return res(null);
      const url = encodeURI(kandidat[i++]);
      const im = new Image();
      im.onload = () => res(url);
      im.onerror = coba;
      im.src = url;
    };
    coba();
  });
  cache.set(path, p);
  return p;
}

function pasangFoto(el) {
  const path = el.dataset.foto || (el.dataset.fotoKey && CFG.foto[el.dataset.fotoKey]);
  if (!path) return Promise.resolve(null);
  el._path = path;
  return cariFoto(path).then(url => {
    if (el._path !== path) return null;
    let img = $('img', el);
    if (url) {
      if (!img) { img = document.createElement('img'); el.appendChild(img); }
      img.alt = el.dataset.alt || '';
      img.decoding = 'async';
      img.onload = () => el.classList.add('ok');
      if (img.getAttribute('src') !== url) img.src = url; else el.classList.add('ok');
      el.dataset.src = url;
    } else {
      el.classList.remove('ok');
      if (img) img.remove();
      delete el.dataset.src;
    }
    if (CEK) labelCek(el, path, url);
    return url;
  });
}

function labelCek(el, path, url) {
  let t = $('.fcek', el);
  if (!t) { t = document.createElement('span'); t.className = 'fcek'; el.appendChild(t); }
  t.classList.toggle('ada', !!url);
  t.textContent = url ? '✓ ' + decodeURI(url) : '✗ ' + path + '.jpg';
}

const semuaFoto = (root = document) => Promise.all($$('[data-foto],[data-foto-key]', root).map(pasangFoto));

async function isiGaleri(dir) {
  const hasil = [];
  for (let i = 1; i <= 60; i++) {
    const u = await cariFoto(`${dir}/${i}`);
    if (!u) break;
    hasil.push(u);
  }
  return hasil;
}

/* =====================================================================
   ISI KONTEN DARI PENGATURAN
   ===================================================================== */
// Logo: emblem (foto/logo/logo.png) + tulisan CENTRAL NIAGA / HARDWARE
const huruf = t => [...t].map(c => `<span>${c}</span>`).join('');
$$('.logo').forEach(a => a.innerHTML =
  `<span class="logo-m" data-logo></span><span class="logo-t" aria-hidden="true"><b>CENTRAL NIAGA</b><small>${huruf('HARDWARE')}</small></span>`);
cariFoto(CFG.foto.logo).then(url => $$('[data-logo]').forEach(m => {
  m.classList.toggle('img', !!url);
  m.innerHTML = url ? `<img src="${url}" alt="">` : '<i>CN</i>'; // CN = cadangan jika file logo tidak ada
}));

const K = CFG.kontak;
$$('.k-wa').forEach(e => e.textContent = K.waTampil);
$$('.k-ig').forEach(e => e.textContent = (e.closest('footer') ? '' : '@') + K.instagram);
$$('.k-ig-link').forEach(e => e.href = 'https://instagram.com/' + K.instagram);
$$('.k-ad').forEach(e => e.textContent = K.alamat);
$$('.k-jm').forEach(e => e.textContent = K.jam);
$$('.k-map').forEach(e => e.href = K.maps);
$('#yr').textContent = new Date().getFullYear();

function pasangWA(root = document) {
  $$('[data-wa]', root).forEach(e => { e.href = waLink(e.dataset.wa); e.target = '_blank'; e.rel = 'noopener'; });
}

// Kartu produk beranda
$('#p-grid').innerHTML = CFG.produk.map((p, i) => `
  <a class="p" href="#/produk/${p.id}" data-cursor="Lihat">
    <div class="foto tex ${p.tekstur}" data-foto="${esc(p.sampul)}" data-alt="${esc(p.nama)}"></div>
    <div class="t"><div class="n">${String(i + 1).padStart(2, '0')} — ${String(CFG.produk.length).padStart(2, '0')}</div>
    <h3>${esc(p.nama)}</h3><p>${esc(p.deskripsi)}</p><span class="go"><b>→</b>Lihat Produk</span></div>
  </a>`).join('');

// Portofolio
$('#pf-track').innerHTML = CFG.portofolio.map((x, i) => `
  <figure class="gi" data-cursor="Buka" data-i="${i}">
    <div class="foto tex ${x.tekstur || 'wood oak'}" data-foto="${esc(x.foto)}" data-alt="${esc(x.judul)}"></div>
    <span class="gi-i">${String(i + 1).padStart(2, '0')}</span>
    <figcaption class="gi-t"><small>${esc(x.kategori || '')}</small><b>${esc(x.judul)}</b></figcaption>
  </figure>`).join('');
$('#hs-n').textContent = String(CFG.portofolio.length).padStart(2, '0');

// Footer, form, blog
$('#ft-p').innerHTML = CFG.produk.map(p => `<a href="#/produk/${p.id}">${esc(p.nama)}</a>`).join('');
$('#f-k').innerHTML = CFG.produk.map(p => `<option>${esc(p.nama)}</option>`).join('') + '<option>Konsultasi Umum</option>';
$('#posts').innerHTML = CFG.blog.map((b, i) => `
  <article class="post rv" style="--d:${i * .08}s"><small>${esc(b.label)}</small><h3>${esc(b.judul)}</h3><p>${esc(b.ringkas)}</p></article>`).join('');

// Bilah kayu hero (tampil saat foto hero belum ada)
const warna = ['#c8a070', '#a67b4d', '#b98e5e', '#8a6440', '#d0aa7c', '#9a7048', '#c19565', '#7d5a37'];
$('#slats').innerHTML = Array.from({ length: 18 }, (_, i) =>
  `<div class="slat" style="--c:${warna[i % 8]};animation-delay:${(0.9 + i * .05).toFixed(2)}s"></div>`).join('');

/* =====================================================================
   HALAMAN PRODUK
   ===================================================================== */
function renderProduk(id) {
  const p = CFG.produk.find(x => x.id === id) || CFG.produk[0];
  const m0 = p.motif[0] || { nama: '-', foto: p.sampul, tekstur: p.tekstur };
  const lain = CFG.produk.filter(x => x.id !== p.id);
  const v = $('#v-produk');
  document.title = `${p.nama} — Central Niaga Hardware`;
  v.innerHTML = `<div class="wrap">
    <nav class="crumb"><a href="#/">Beranda</a><span>/</span><a href="#/produk-kami">Produk</a><span>/</span><span>${esc(p.nama)}</span></nav>
    <div class="pd">
      <div class="pd-media rv">
        <div class="big" id="big" data-cursor="Perbesar"><div class="foto tex ${m0.tekstur}" id="big-f" data-foto="${esc(m0.foto)}" data-alt="${esc(p.nama + ' ' + m0.nama)}"></div><span class="big-tag" id="big-tag">${esc(m0.nama)}</span></div>
      </div>
      <div>
        <div class="eb">${esc(p.nama)}</div>
        <h1 data-split>${esc(p.tagline)}</h1>
        <p class="lead rv">${esc(p.deskripsi)}</p>
        <table class="spec rv">${p.spesifikasi.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}<tr><td>Motif</td><td id="m-n">${esc(m0.nama)}</td></tr><tr><td>Pilihan</td><td>${p.motif.length} motif / warna</td></tr></table>
        <div class="rv"><div class="sw-l">Pilihan Motif &amp; Warna</div>
        <div class="sw">${p.motif.map((m, i) => `<button type="button" class="${i ? '' : 'on'}" data-i="${i}" aria-pressed="${!i}"><div class="sw-ph"><div class="foto tex ${m.tekstur}" data-foto="${esc(m.foto)}" data-alt=""></div></div>${esc(m.nama)}</button>`).join('')}</div></div>
        <div class="cta rv"><a class="btn dark mag" id="p-wa" target="_blank" rel="noopener"><span>Tanya Harga via WhatsApp</span><i>→</i></a><a class="btn line mag" href="${esc(CFG.katalog)}" target="_blank" rel="noopener"><span>Download Katalog</span></a></div>
      </div>
    </div>
    ${(p.koleksi || []).map((k, ki) => renderKoleksi(p, k, ki)).join('')}
    <div class="kg">
      <div class="rv"><h3>Tampilan Premium</h3><span>Desain modern dan elegan.</span></div>
      <div class="rv" style="--d:.08s"><h3>Tahan Lama</h3><span>Kualitas terjaga bertahun-tahun.</span></div>
      <div class="rv" style="--d:.16s"><h3>Mudah Dipasang</h3><span>Praktis dengan hasil rapi.</span></div>
      <div class="rv" style="--d:.24s"><h3>Aman</h3><span>Material nyaman untuk hunian.</span></div>
    </div>
    <section class="gal-s" id="gal-s" hidden><div class="eb">Galeri</div><h2 data-split>${esc(p.nama)} <em>terpasang</em></h2><div class="gal" id="gal"></div></section>
    <div class="eb rv">Produk Lainnya</div>
    <div class="more">${lain.map(x => `<a href="#/produk/${x.id}" class="rv" data-cursor="Lihat"><div class="foto tex ${x.tekstur}" data-foto="${esc(x.sampul)}" data-alt="${esc(x.nama)}"></div><div class="t"><h3>${esc(x.nama)}</h3><span class="go"><b>→</b></span></div></a>`).join('')}</div>
  </div>`;

  const setWA = n => $('#p-wa').href = waLink(`Halo Central Niaga Hardware, saya ingin tanya harga ${p.nama} motif ${n}.`);
  setWA(m0.nama);

  const bf = $('#big-f');
  $$('.sw button', v).forEach(b => b.addEventListener('click', () => {
    const m = p.motif[b.dataset.i];
    $$('.sw button', v).forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
    b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
    bf.classList.add('swap');
    setTimeout(() => {
      bf.className = `foto tex ${m.tekstur} swap`;
      bf.dataset.foto = m.foto;
      bf.dataset.alt = `${p.nama} ${m.nama}`;
      $('img', bf)?.remove(); $('.fcek', bf)?.remove();
      pasangFoto(bf).finally(() => requestAnimationFrame(() => bf.classList.remove('swap')));
    }, 380);
    $('#m-n').textContent = m.nama; $('#big-tag').textContent = m.nama;
    setWA(m.nama);
  }));

  // Klik foto besar → lightbox semua motif yang sudah ada fotonya
  $('#big').addEventListener('click', async () => {
    const list = [];
    for (const m of p.motif) { const u = await cariFoto(m.foto); if (u) list.push({ src: u, cap: `${p.nama} — ${m.nama}` }); }
    if (!list.length) return;
    const cur = bf.dataset.src;
    lightbox(list, Math.max(0, list.findIndex(x => x.src === cur)));
  });

  // Koleksi: filter grup + klik motif → lightbox dengan tombol tanya harga
  $$('.kol', v).forEach(el => {
    const k = p.koleksi[el.dataset.k];
    const semua = k.grup.flatMap(g => g.motif.map(m => ({ m, g })));
    $$('.kol-f button', el).forEach(b => b.addEventListener('click', () => {
      $$('.kol-f button', el).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('.kol-g', el).forEach(g => {
        const tampil = b.dataset.g === '*' || g.dataset.g === b.dataset.g;
        g.hidden = !tampil;
        if (tampil) { g.classList.remove('muncul'); void g.offsetWidth; g.classList.add('muncul'); }
      });
      // kembali ke awal daftar motif agar hasil filter langsung terlihat
      const f = $('.kol-f', el), awal = $('.kol-g:not([hidden])', el).getBoundingClientRect().top + scrollY - f.offsetHeight - 110;
      if (scrollY > awal) scrollTo({ top: awal, behavior: REDUCED ? 'instant' : 'smooth' });
    }));
    $$('.mv', el).forEach(c => c.addEventListener('click', async () => {
      const list = [];
      let start = 0;
      for (const [i, { m, g }] of semua.entries()) {
        const u = await cariFoto(m.foto);
        if (!u) continue;
        if (i === +c.dataset.i) start = list.length;
        list.push({ src: u, cap: `${k.nama} · ${m.nama} — ${g.nama}`,
          wa: `Halo Central Niaga Hardware, saya ingin tanya harga ${p.nama} ${k.merek ? k.merek + ' ' : ''}${k.nama} motif ${m.nama}.` });
      }
      if (list.length) lightbox(list, start);
    }));
    $('.kol-kat', el)?.addEventListener('click', async () => {
      const u = await cariFoto(k.katalog);
      if (u) lightbox([{ src: u, cap: `Katalog ${k.nama}${k.merek ? ' — ' + k.merek : ''}` }]);
    });
  });

  // Galeri otomatis: foto/produk/<id>/galeri/1.jpg, 2.jpg, ...
  isiGaleri(p.galeri).then(urls => {
    if (!urls.length || !document.body.contains(v) || location.hash !== `#/produk/${p.id}`) return;
    const g = $('#gal');
    g.innerHTML = urls.map((u, i) => `<a class="rv" style="--d:${(i % 3) * .08}s" data-i="${i}" data-cursor="Buka"><img src="${u}" alt="${esc(p.nama)} — galeri ${i + 1}" loading="lazy" decoding="async"></a>`).join('');
    $('#gal-s').hidden = false;
    $$('a', g).forEach(a => a.addEventListener('click', () => lightbox(urls.map((src, i) => ({ src, cap: `${p.nama} — ${i + 1} / ${urls.length}` })), +a.dataset.i)));
    prepSplit(v); amati(); magnet(); kursorTarget();
  });
}

function renderKoleksi(p, k, ki) {
  const total = k.grup.reduce((n, g) => n + g.motif.length, 0);
  const chips = sp => sp && sp.length ? `<ul class="kol-sp">${sp.map(r => `<li><small>${esc(r[0])}</small>${esc(r[1])}</li>`).join('')}</ul>` : '';
  const kata = k.nama.split(' ');
  const judul = kata.length > 1 ? `${esc(kata.slice(0, -1).join(' '))} <em>${esc(kata.at(-1))}</em>` : `<em>${esc(k.nama)}</em>`;
  let i = 0;
  return `<section class="kol" data-k="${ki}">
    <div class="kol-hd">
      <div><div class="eb rv">Koleksi ${esc(p.nama)}${k.merek ? ' · ' + esc(k.merek) : ''}</div><h2 data-split>${judul}</h2></div>
      <div class="kol-in rv"><p class="lead">${esc(k.deskripsi || '')}</p>${chips(k.spesifikasi)}
        <div class="kol-meta"><span><b>${total}</b> motif</span>${k.katalog ? '<button type="button" class="ul kol-kat">Lihat katalog asli ↗</button>' : ''}</div></div>
    </div>
    ${k.grup.length > 1 ? `<div class="kol-f rv" role="group" aria-label="Filter motif"><button type="button" data-g="*" aria-pressed="true">Semua <sup>${total}</sup></button>${k.grup.map((g, gi) => `<button type="button" data-g="${gi}" aria-pressed="false">${esc(g.nama)} <sup>${g.motif.length}</sup></button>`).join('')}</div>` : ''}
    ${k.grup.map((g, gi) => `<div class="kol-g" data-g="${gi}">
      <div class="kol-gh rv"><h3>${esc(g.nama)}</h3><span>${g.motif.length} motif</span>${chips(g.spesifikasi)}</div>
      <div class="mv-grid">${g.motif.map((m, mi) => `<button type="button" class="mv rv" style="--d:${(mi % 6) * .05}s" data-i="${i++}" data-cursor="Lihat">
        <span class="mv-ph"><span class="foto tex stn" data-foto="${esc(m.foto)}" data-alt="${esc(k.nama + ' ' + m.nama)}"></span>${m.baru ? '<em class="mv-new">New</em>' : ''}</span>
        <span class="mv-n">${esc(m.nama)}</span></button>`).join('')}</div></div>`).join('')}
  </section>`;
}

/* =====================================================================
   LIGHTBOX
   ===================================================================== */
const lb = $('#lb'), lbImg = $('img', lb), lbCap = $('figcaption', lb), lbWa = $('.lb-wa', lb);
let lbList = [], lbI = 0;
function lbShow() {
  const it = lbList[lbI];
  lbImg.style.opacity = 0;
  const im = new Image();
  im.onload = () => { lbImg.src = it.src; lbImg.alt = it.cap || ''; lbCap.textContent = it.cap || ''; lbImg.style.opacity = 1; };
  im.src = it.src;
  lbWa.hidden = !it.wa;
  if (it.wa) lbWa.href = waLink(it.wa);
  $$('.lb-nav', lb).forEach(b => b.hidden = lbList.length < 2);
}
function lightbox(list, i = 0) {
  lbList = list; lbI = i; lbShow();
  lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock');
}
function lbClose() { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); }
const lbGo = d => { lbI = (lbI + d + lbList.length) % lbList.length; lbShow(); };
$('.lb-x', lb).onclick = lbClose;
$('.lb-p', lb).onclick = () => lbGo(-1);
$('.lb-n', lb).onclick = () => lbGo(1);
lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
addEventListener('keydown', e => {
  if (!lb.classList.contains('on')) { if (e.key === 'Escape') tutupMenu(); return; }
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbGo(-1);
  if (e.key === 'ArrowRight') lbGo(1);
});
let sx = 0;
lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) lbGo(dx < 0 ? 1 : -1); });

$('#pf-track').addEventListener('click', async e => {
  const gi = e.target.closest('.gi'); if (!gi) return;
  const list = [];
  let start = 0;
  for (const [i, x] of CFG.portofolio.entries()) {
    const u = await cariFoto(x.foto);
    if (!u) continue;
    if (i === +gi.dataset.i) start = list.length;
    list.push({ src: u, cap: `${x.judul}${x.kategori ? ' — ' + x.kategori : ''}` });
  }
  if (list.length) lightbox(list, start);
});

/* =====================================================================
   ANIMASI TEKS
   ===================================================================== */
function splitKata(el, cls) {
  let n = 0;
  const walk = node => {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
          const o = document.createElement('span');
          o.className = 'w';
          if (cls === 'split') { o.style.setProperty('--wi', n); const i = document.createElement('span'); i.textContent = w; o.appendChild(i); }
          else o.textContent = w;
          n++;
          frag.appendChild(o);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1) walk(ch);
    });
  };
  walk(el);
}
function prepSplit(root = document) {
  $$('[data-split]', root).forEach(el => { if (el._s) return; el._s = 1; splitKata(el, 'split'); });
}
const bigTxt = $('#big-txt');
splitKata(bigTxt, 'lit');
const bigW = $$('.w', bigTxt);

/* =====================================================================
   REVEAL SAAT SCROLL
   ===================================================================== */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  if (e.target.dataset.n) hitung(e.target);
  io.unobserve(e.target);
}), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
function amati() {
  $$('.rv,.rv-img,[data-split],[data-n],.mega').forEach(el => {
    if (el.classList.contains('in') || el._o) return;
    el._o = 1; io.observe(el);
  });
}
function hitung(el) {
  const n = +el.dataset.n, s = el.dataset.s || '', t0 = performance.now(), dur = 2000;
  if (REDUCED) { el.textContent = n + s; return; }
  (function f(t) {
    const p = clamp((t - t0) / dur);
    el.textContent = Math.floor(n * (1 - Math.pow(1 - p, 4))).toLocaleString('id-ID') + (p === 1 ? s : '');
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

/* =====================================================================
   KURSOR & TOMBOL MAGNET
   ===================================================================== */
const cur = $('#cur'), dot = $('#dot'), curT = $('#cur-t');
let mx = -100, my = -100, cx = -100, cy = -100;
if (FINE && !REDUCED) {
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    document.body.classList.add('has-cur');
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.body.classList.remove('has-cur'));
  (function loop() {
    cx += (mx - cx) * .16; cy += (my - cy) * .16;
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();
}
function kursorTarget() {
  if (!FINE) return;
  $$('a,button,summary,[data-cursor],input,select,textarea').forEach(el => {
    if (el._c) return; el._c = 1;
    el.addEventListener('pointerenter', () => {
      const t = el.closest('[data-cursor]');
      if (t) { curT.textContent = t.dataset.cursor; document.body.classList.add('cur-view'); }
      else document.body.classList.add('cur-hover');
    });
    el.addEventListener('pointerleave', () => document.body.classList.remove('cur-view', 'cur-hover'));
  });
}
function magnet() {
  if (!FINE || REDUCED) return;
  $$('.mag').forEach(b => {
    if (b._m) return; b._m = 1;
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .32}px)`;
    });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });
}

/* =====================================================================
   SCROLL: header, progres, parallax, teks menyala, portofolio horizontal
   ===================================================================== */
const hd = $('#hd'), prog = $('#progress'), heroM = $('#hero-media'), bandBg = $('.band-bg');
const hs = $('#portofolio'), track = $('#pf-track'), hsBar = $('#hs-bar'), hsI = $('#hs-i');
const waF = $('.wa-float');
let lastY = 0, ticking = false, view = 'home';
const desktop = () => innerWidth > 980;

function ukurHS() {
  if (desktop() && !REDUCED) hs.style.height = (track.scrollWidth - innerWidth + innerHeight) + 'px';
  else { hs.style.height = ''; track.style.transform = ''; }
}
function setHS(p) {
  hsBar.style.transform = `scaleX(${p})`;
  const n = CFG.portofolio.length;
  hsI.textContent = String(Math.min(n, 1 + Math.floor(p * n * .999))).padStart(2, '0');
}
track.addEventListener('scroll', () => { if (!desktop()) setHS(clamp(track.scrollLeft / (track.scrollWidth - track.clientWidth || 1))); }, { passive: true });

function onScroll() {
  ticking = false;
  const y = scrollY, vh = innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

  if (!document.body.classList.contains('menu-open')) {
    hd.classList.toggle('solid', y > 40);
    hd.classList.toggle('hide', y > 500 && y > lastY + 2);
    if (y < lastY - 2) hd.classList.remove('hide');
  }
  lastY = y;
  waF.classList.toggle('on', view !== 'home' || y > vh * .7);

  if (view !== 'home' || REDUCED) return;

  if (y < vh * 1.2) heroM.style.transform = `translate3d(0,${y * .3}px,0)`;

  const br = bandBg.parentElement.getBoundingClientRect();
  if (br.bottom > 0 && br.top < vh) bandBg.style.transform = `translate3d(0,${(br.top + br.height / 2 - vh / 2) * -.15}px,0)`;

  const r = bigTxt.getBoundingClientRect();
  if (r.top < vh && r.bottom > 0) {
    const p = clamp((vh * .8 - r.top) / (r.height + vh * .25));
    const lit = Math.round(p * bigW.length);
    bigW.forEach((w, i) => w.classList.toggle('lit', i < lit));
  }

  if (desktop()) {
    const hr = hs.getBoundingClientRect();
    const p = clamp(-hr.top / (hs.offsetHeight - vh || 1));
    track.style.transform = `translate3d(${-p * (track.scrollWidth - innerWidth)}px,0,0)`;
    setHS(p);
  }
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', () => { ukurHS(); onScroll(); });

/* =====================================================================
   MENU MOBILE
   ===================================================================== */
const burger = $('#burger'), menu = $('#menu');
function tutupMenu() { document.body.classList.remove('menu-open', 'lock'); burger.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); }
burger.addEventListener('click', () => {
  const o = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', o); document.body.classList.toggle('lock', o);
  burger.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o);
});

/* =====================================================================
   NAVIGASI (hash: #/, #/produk/wall-panel, #/blog, #/kontak, #/tentang ...)
   ===================================================================== */
const curtain = $('#curtain');
const wait = ms => new Promise(r => setTimeout(r, ms));

function parse() {
  const h = location.hash.replace(/^#\/?/, '');
  const [a, b] = h.split('/');
  if (a === 'produk' && b) return { v: 'produk', id: b };
  if (a === 'blog' || a === 'kontak') return { v: a };
  return { v: 'home', sec: a || null };
}

function gulirKe(id, smooth) {
  const el = id && document.getElementById(id);
  const top = el ? el.getBoundingClientRect().top + scrollY - (id === 'portofolio' ? 0 : 20) : 0;
  scrollTo({ top, behavior: smooth && !REDUCED ? 'smooth' : 'instant' });
}

function tampilkan(r) {
  ['home', 'produk', 'blog', 'kontak'].forEach(x => $('#v-' + x).hidden = x !== r.v);
  view = r.v;
  document.body.classList.toggle('on-light', r.v !== 'home');
  if (r.v === 'produk') renderProduk(r.id);
  else document.title = { home: 'Central Niaga Hardware — Material Bangunan & Interior', blog: 'Blog — Central Niaga Hardware', kontak: 'Kontak — Central Niaga Hardware' }[r.v];
  $$('.links a').forEach(a => a.classList.toggle('on', a.dataset.link === (r.v === 'home' ? r.sec : r.v)));
  prepSplit(); pasangWA(); semuaFoto($('#v-' + r.v)); amati(); magnet(); kursorTarget();
  hd.classList.remove('hide');
  if (r.v === 'home') ukurHS();
}

let busy = false;
async function route(first) {
  const r = parse();
  const sama = r.v === view && r.v === 'home' && !first;
  tutupMenu();
  if (sama) { gulirKe(r.sec, true); return; }
  if (first || REDUCED) { tampilkan(r); gulirKe(r.sec, false); onScroll(); return; }
  if (busy) return; busy = true;
  curtain.className = 'in';
  await wait(750);
  tampilkan(r);
  gulirKe(r.sec, false);
  onScroll();
  curtain.className = 'in out';
  await wait(800);
  curtain.className = '';
  busy = false;
  if (parse().v !== r.v || (r.v === 'produk' && parse().id !== r.id)) route();
}
addEventListener('hashchange', () => route());
// Klik tautan ke hash yang sama (mis. "Produk" dua kali) tetap menggulir
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#/"]');
  if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
});
$('#totop').addEventListener('click', e => { e.preventDefault(); if (view === 'home') gulirKe(null, true); else location.hash = '#/'; });

/* =====================================================================
   FORMULIR → WHATSAPP
   ===================================================================== */
$('#fm').addEventListener('submit', e => {
  e.preventDefault();
  const g = id => $('#' + id).value.trim();
  const nama = $('#f-n');
  nama.parentElement.classList.toggle('err', !g('f-n'));
  if (!g('f-n')) { nama.focus(); return; }
  open(waLink(`Halo Central Niaga Hardware,\nNama: ${g('f-n')}\nWA: ${g('f-p')}\nProduk: ${g('f-k')}\nProyek: ${g('f-j')}\nPesan: ${g('f-m')}`), '_blank', 'noopener');
});

/* =====================================================================
   LOADER & MULAI
   ===================================================================== */
$$('.ld-logo span').forEach((s, i) => s.style.setProperty('--i', i));
const ldN = $('#ld-n'), ldBar = $('.ld-bar i');
route(true);

const siap = Promise.race([
  Promise.all([cariFoto(CFG.foto.hero), document.fonts ? document.fonts.ready : null, new Promise(r => addEventListener('load', r, { once: true }))]),
  wait(4000)
]);
let pNow = 0, done = false;
siap.then(() => done = true);
const t0 = performance.now();
if (REDUCED) { $('#loader').remove(); document.body.classList.remove('loading'); $('.hero').classList.add('play'); }
else (function naik(t) {
  const target = done ? 100 : Math.min(90, (t - t0) / 18);
  pNow += (target - pNow) * (done ? .14 : .08);
  if (done && pNow > 99.4) pNow = 100;
  ldN.textContent = Math.round(pNow);
  ldBar.style.setProperty('--p', pNow / 100);
  if (pNow < 100 || t - t0 < 1400) return requestAnimationFrame(naik);
  $('#loader').classList.add('out');
  document.body.classList.remove('loading');
  setTimeout(() => { $('.hero').classList.add('play'); ukurHS(); onScroll(); }, 250);
  setTimeout(() => $('#loader').remove(), 1400);
})(t0);

})();
