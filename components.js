/* ══════════════════════
   LEADOVI — Shared JS
══════════════════════ */

// ── Canvas animated background
function initCanvas(){
  const canvas = document.getElementById('canvas-bg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts=[];

  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  class Pt{
    constructor(){ this.reset(); }
    reset(){
      this.x=Math.random()*W; this.y=Math.random()*H;
      this.vx=(Math.random()-.5)*.25; this.vy=(Math.random()-.5)*.25;
      this.r=Math.random()*1.5+.4;
      this.alpha=Math.random()*.4+.1;
      this.c=Math.random()>.6?'91,71,251':Math.random()>.5?'71,213,251':'251,139,71';
    }
    tick(){
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
    }
    draw(){
      ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${this.c},${this.alpha})`; ctx.fill();
    }
  }

  for(let i=0;i<100;i++) pts.push(new Pt());

  function frame(){
    ctx.clearRect(0,0,W,H);
    pts.forEach((a,i)=>{
      a.tick(); a.draw();
      pts.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<110){
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(91,71,251,${(1-d/110)*.07})`; ctx.lineWidth=.6; ctx.stroke();
        }
      });
    });
    requestAnimationFrame(frame);
  }
  frame();
}

// ── Counter animation
function initCounters(){
  const els = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target, target=parseFloat(el.dataset.count), suffix=el.dataset.suffix||'', dec=el.dataset.dec||0;
      const dur=1800, start=performance.now();
      function tick(now){
        const p=Math.min((now-start)/dur,1), ease=1-Math.pow(1-p,3);
        const val=ease*target;
        el.textContent=(dec>0?val.toFixed(dec):(val>=1000?Math.round(val).toLocaleString('fr-FR'):Math.round(val)))+suffix;
        if(p<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  },{threshold:.4});
  els.forEach(el=>io.observe(el));
}

// ── Fade in on scroll (robuste : jamais de contenu bloqué invisible)
function initFade(){
  const els = [...document.querySelectorAll('.fade-in')];
  if(!els.length) return;
  const reveal = el => el.classList.add('visible');
  if(!('IntersectionObserver' in window)){ els.forEach(reveal); return; }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target); }});
  },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
  // Filet : tout élément dont le haut est entré dans le viewport est révélé,
  // même en scroll rapide (l'observer peut manquer un flick).
  const sweep = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for(const el of els){
      if(el.classList.contains('visible')) continue;
      if(el.getBoundingClientRect().top < vh){ reveal(el); io.unobserve(el); }
    }
  };
  window.addEventListener('scroll', sweep, {passive:true});
  window.addEventListener('resize', sweep);
  sweep();
  setTimeout(sweep, 1500);
}

// ── Active nav link
function initNav(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
}

// ── Live ticker duplication
function initTicker(){
  const inner = document.querySelector('.ticker-inner');
  if(!inner) return;
  inner.innerHTML += inner.innerHTML;
}

// ── Form submit (Web3Forms → email)
function initForm(){
  const form = document.getElementById('leadovi-form');
  if(!form) return;
  const successEl = document.getElementById('form-success');
  const btn = form.querySelector('button[type=submit]');
  const origLabel = btn ? btn.textContent : '';

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const data = new FormData(form);
    const key = window.WEB3FORMS_ACCESS_KEY;
    if(key){ data.append('access_key', key); }
    else { console.error('[LEADOVI] Clé Web3Forms absente (web3forms-key.js) — envoi impossible.'); }

    if(btn){ btn.disabled=true; btn.textContent='Envoi…'; }
    try{
      const res = await fetch('https://api.web3forms.com/submit', {
        method:'POST',
        headers:{ 'Accept':'application/json' },
        body:data
      });
      const json = await res.json();
      if(!json.success) throw new Error(json.message || 'Échec de l’envoi');
      form.style.display='none';
      successEl.style.display='block';
      successEl.scrollIntoView({ behavior:'smooth', block:'center' });
    } catch(err){
      console.error('[LEADOVI] Envoi du formulaire échoué :', err);
      alert('Une erreur est survenue lors de l’envoi. Merci de réessayer, ou de nous écrire directement à contact@leadovi.fr.');
      if(btn){ btn.disabled=false; btn.textContent=origLabel; }
    }
  });
}

// ── Dashboard live feed (homepage)
function initDashboard(){
  const feed = document.getElementById('lead-feed');
  if(!feed) return;
  const leads=[
    {n:'Martin D.',d:'Gard (30)',t:'PV Solaire',c:'#5B47FB',tag:'tag-indigo'},
    {n:'Claire P.',d:'Hérault (34)',t:'Pompe à chaleur',c:'#FB8B47',tag:'tag-orange'},
    {n:'Robert L.',d:'Bouches-du-Rhône (13)',t:'Isolation',c:'#47D5FB',tag:'tag-teal'},
    {n:'Isabelle M.',d:'Vaucluse (84)',t:'PV Solaire',c:'#5B47FB',tag:'tag-indigo'},
    {n:'Thomas K.',d:'Rhône (69)',t:'Rénovation',c:'#2ED573',tag:'tag-green'},
    {n:'Nathalie B.',d:'Haute-Garonne (31)',t:'Fenêtres',c:'#FB8B47',tag:'tag-orange'},
    {n:'Éric V.',d:'Alpes-Maritimes (06)',t:'PV Solaire',c:'#5B47FB',tag:'tag-indigo'},
    {n:'Lucie R.',d:'Gironde (33)',t:'Pergola',c:'#47D5FB',tag:'tag-teal'},
    {n:'David M.',d:'Var (83)',t:'PAC Air/Eau',c:'#FB8B47',tag:'tag-orange'},
    {n:'Sophie T.',d:'Isère (38)',t:'PV Solaire',c:'#5B47FB',tag:'tag-indigo'},
  ];
  let idx=0, todayC=23, monthC=341;
  document.getElementById('dash-today').textContent=todayC;
  document.getElementById('dash-month').textContent=monthC;

  function addLead(){
    const l=leads[idx%leads.length]; idx++;
    todayC++; monthC++;
    document.getElementById('dash-today').textContent=todayC;
    document.getElementById('dash-month').textContent=monthC;
    const initials=l.n.split(' ').map(w=>w[0]).join('');
    const item=document.createElement('div');
    item.style.cssText='display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid rgba(91,71,251,0.06);animation:sli .35s ease';
    item.innerHTML=`
      <div style="width:32px;height:32px;border-radius:50%;background:${l.c}22;color:${l.c};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">${initials}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:#E8EAFF">${l.n}</div>
        <div style="font-size:11px;color:#6B7A99">${l.d}</div>
      </div>
      <span class="tag ${l.tag}" style="font-size:10px">${l.t}</span>
      <span style="font-size:10px;color:#6B7A99;white-space:nowrap">À l'instant</span>`;
    feed.insertBefore(item, feed.firstChild);
    if(feed.children.length>5) feed.removeChild(feed.lastChild);
    feed.querySelectorAll('span:last-child').forEach((t,i)=>{
      t.textContent = i===0?'À l\'instant':i===1?'Il y a 1 min':`Il y a ${i+1} min`;
    });
  }

  // Init with 4 leads
  for(let i=0;i<4;i++) addLead();
  setInterval(addLead, 4200);
}

// ── Mobile nav (hamburger + menu) — injecté sur toutes les pages
function initMobileNav(){
  const nav = document.querySelector('.nav');
  if(!nav || document.querySelector('.nav-burger')) return;
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const links = [
    ['index.html','Accueil'],
    ['__label__','Nos leads'],
    ['pv-solaire.html','☀️ PV Solaire'],
    ['pac.html','🌡️ Pompe à Chaleur'],
    ['isolation.html','🏠 Isolation'],
    ['renovation.html','🔨 Rénovation Énergétique'],
    ['fenetres.html','🪟 Fenêtres & Menuiseries'],
    ['pergola.html','⛺ Pergola & Véranda'],
    ['contact.html','Contact'],
  ];
  const burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.setAttribute('aria-label','Ouvrir le menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  const menu = document.createElement('nav');
  menu.className = 'mobile-menu';
  menu.innerHTML = links.map(([href,label]) =>
    href === '__label__'
      ? `<div class="mm-label">${label}</div>`
      : `<a href="${href}"${href === current ? ' class="active"' : ''}>${label}</a>`
  ).join('') + '<a href="contact.html" class="mm-cta">Demander un devis →</a>';
  const close = () => { burger.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow=''; };
  const toggle = () => { const open = !menu.classList.contains('open'); burger.classList.toggle('open',open); menu.classList.toggle('open',open); document.body.style.overflow = open ? 'hidden' : ''; };
  burger.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  (nav.querySelector('.nav-right') || nav).appendChild(burger);
  document.body.appendChild(menu);
}

// ── Favicon — injecté sur toutes les pages (progressive enhancement)
function initFavicon(){
  if(document.querySelector('link[rel="icon"][type="image/svg+xml"]')) return;
  const add = (rel,type,href) => { const l=document.createElement('link'); l.rel=rel; if(type)l.type=type; l.href=href; document.head.appendChild(l); };
  add('icon','image/svg+xml','/favicon.svg');
  add('apple-touch-icon',null,'/apple-touch-icon.png');
}

// ── INIT ALL
document.addEventListener('DOMContentLoaded',()=>{
  initCanvas(); initCounters(); initFade(); initNav(); initMobileNav(); initFavicon(); initTicker(); initForm(); initDashboard();
});
