const FLOWER_TYPES = {
  rose:      { label:"Rose",      build: buildRose },
  tulip:     { label:"Tulip",     build: buildTulip },
  sunflower: { label:"Sunflower", build: buildSunflower },
  daisy:     { label:"Daisy",     build: buildDaisy },
  lavender:  { label:"Lavender",  build: buildLavender }
};

const GREEN = '#4C9A6A', GREEN_DARK = '#2F6B45', INK = '#23211f';

function stemAndLeaf(){
  return `
    <path d="M70,158 C68,130 72,110 70,92" fill="none" stroke="#1f4a2e" stroke-width="2" opacity="0.85"/>
    <path d="M70,125 C55,120 44,128 40,142 C56,144 66,136 70,125 Z" fill="${GREEN}" stroke="#1f4a2e" stroke-width="1.2" opacity="0.9"/>
  `;
}

function petalRing(cx, cy, n, dist, rx, ry, fill, strokeColor, extraRotate){
  let out = '';
  for(let i=0;i<n;i++){
    const angle = (360/n)*i + (extraRotate||0);
    const rad = angle*Math.PI/180;
    const px = cx + dist*Math.cos(rad);
    const py = cy + dist*Math.sin(rad);
    out += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${strokeColor}" stroke-width="1" opacity="0.95" transform="rotate(${(angle+90).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  return out;
}

function buildRose(){
  const cx=70, cy=62;
  let petals = '';
  const layers = [
    {r:30, fill:'#E4344F', off:0},
    {r:24, fill:'#EF5B76', off:7},
    {r:18, fill:'#F1728E', off:0},
    {r:11, fill:'#FFD3E0', off:5},
  ];
  layers.forEach((l,i)=>{
    const a = i*44;
    const ox = cx + l.off*Math.cos(a*Math.PI/180);
    const oy = cy + l.off*Math.sin(a*Math.PI/180)*0.6;
    petals += `<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="${l.r}" fill="${l.fill}" stroke="#8f1030" stroke-width="1" opacity="0.96"/>`;
  });
  petals += `
    <path d="M70 36 C84 34 98 42 104 58 C96 50 86 48 74 48 C66 48 58 50 50 58 C56 42 62 36 70 36 Z" fill="#F8A7C0" stroke="#8f1030" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="7" fill="#8f1030"/>
    <path d="M58 72 C48 82 42 100 44 116" fill="none" stroke="#4f7a3d" stroke-width="2" stroke-linecap="round"/>
  `;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${petals}</svg>`;
}

function buildTulip(){
  const body = `
    <path d="M42,82 C34,44 50,16 70,22 C90,16 106,44 98,82
              C90,66 80,70 70,58 C60,70 50,66 42,82 Z"
          fill="#FF6FA5" stroke="#c93d6e" stroke-width="1.2"/>
    <path d="M70,58 C60,70 50,66 42,82" fill="none" stroke="#E14E86" stroke-width="1.2" opacity="0.8"/>
    <path d="M70,58 C80,70 90,66 98,82" fill="none" stroke="#E14E86" stroke-width="1.2" opacity="0.8"/>
    <path d="M62 87 C58 98 58 116 62 130" fill="none" stroke="#4f7a3d" stroke-width="2" stroke-linecap="round"/>
    <path d="M78 87 C82 100 82 118 78 130" fill="none" stroke="#4f7a3d" stroke-width="2" stroke-linecap="round"/>
  `;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${body}</svg>`;
}

function buildSunflower(){
  const cx=70, cy=62;
  let petals = petalRing(cx,cy,12,34,15,8,'#FFC93C','#d99a1a',0);
  let dots = '';
  for(let i=0;i<10;i++){
    const a = i*36*Math.PI/180;
    const r = 6+ (i%3)*3;
    dots += `<circle cx="${(cx+r*Math.cos(a)).toFixed(1)}" cy="${(cy+r*Math.sin(a)).toFixed(1)}" r="1.4" fill="#5b3818"/>`;
  }
  const center = `<circle cx="${cx}" cy="${cy}" r="19" fill="#7A4B21" stroke="#5b3818" stroke-width="1"/>${dots}`;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${petals}${center}</svg>`;
}

function buildDaisy(){
  const cx=70, cy=62;
  let petals = petalRing(cx,cy,10,36,17,6,'#FFFDF0','#e0d4a0',0);
  const center = `<circle cx="${cx}" cy="${cy}" r="14" fill="#FFD93C" stroke="#c9971a" stroke-width="1"/><path d="M54 79 C62 88 74 90 86 82" fill="none" stroke="#f2b84f" stroke-width="2" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${petals}${center}</svg>`;
}

function buildLavender(){
  const cx=70;
  let dots = '';
  for(let k=0;k<8;k++){
    const cy = 96 - k*10;
    const r = 7 - k*0.45;
    const ox = (k%2===0)? -4:4;
    const fill = k%2===0? '#8E6FCE':'#6E4FAE';
    dots += `<circle cx="${(cx+ox).toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" stroke="#4a2f7a" stroke-width="0.8" opacity="0.95"/>`;
  }
  dots += `<path d="M70 90 C58 104 56 118 70 132" fill="none" stroke="#4f7a3d" stroke-width="2" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${dots}</svg>`;
}

/* ---------------- setup ---------------- */
const flowerArea = document.getElementById('flowerArea');
const wrapperShape = document.getElementById('wrapperShape');
const wrapperInner = document.getElementById('wrapperInner');
const emptyNote = document.getElementById('emptyNote');

const grid = document.getElementById('flowerGrid');
Object.entries(FLOWER_TYPES).forEach(([key,val])=>{
  const btn = document.createElement('button');
  btn.className = 'flower-btn';
  btn.type = 'button';
  btn.innerHTML = `${val.build()}<span>${val.label}</span>`;
  btn.addEventListener('click', ()=>addFlower(key));
  grid.appendChild(btn);
});

const WRAPS = [
  {name:'plain', style:{background:'var(--paper)'}},
  {name:'dotted', style:{background:'radial-gradient(circle at 6px 6px, rgba(35,33,31,0.18) 1.4px, transparent 0) 0 0/16px 16px, var(--paper)'}},
  {name:'stripe', style:{background:'repeating-linear-gradient(45deg, rgba(35,33,31,0.06) 0 6px, transparent 6px 14px), var(--paper)'}},
  {name:'grid', style:{background:'linear-gradient(rgba(35,33,31,0.08) 1px, transparent 1px) 0 0/18px 18px, linear-gradient(90deg, rgba(35,33,31,0.08) 1px, transparent 1px) 0 0/18px 18px, var(--paper)'}}
];

const PASTEL_COLORS = [
  { name:'Warm Yellow', color:'#ffea85' },
  { name:'Blush Pink',  color:'#ffd1dc' },
  { name:'Mint Green',  color:'#baffc9' },
  { name:'Baby Blue',   color:'#bae1ff' },
  { name:'Lavender',    color:'#e8c5ff' },
  { name:'Peach',       color:'#ffdcc2' }
];

const INNER_COLORS = [
  { name:'Cream',       color:'#fffdf7' },
  { name:'Warm Yellow', color:'#ffea85' },
  { name:'Blush Pink',  color:'#ffd1dc' },
  { name:'Mint Green',  color:'#baffc9' },
  { name:'Baby Blue',   color:'#bae1ff' },
  { name:'Lavender',    color:'#e8c5ff' }
];

const wrapRow = document.getElementById('wrapRow');
const colorRow = document.getElementById('colorRow');
const innerColorRow = document.getElementById('innerColorRow');
const stage = document.getElementById('stage');

WRAPS.forEach((w,i)=>{
  const sw = document.createElement('div');
  sw.className = 'wrap-swatch' + (i===0?' active':'');
  sw.style.background = '#efece3';
  sw.title = w.name;
  sw.addEventListener('click', ()=>{
    document.querySelectorAll('.wrap-swatch').forEach(s=>s.classList.remove('active'));
    sw.classList.add('active');
    Object.assign(stage.style, w.style);
  });
  wrapRow.appendChild(sw);
});

function buildColorRow(container, colors, targetEl, defaultIndex){
  colors.forEach((c,i)=>{
    const sw = document.createElement('div');
    sw.className = 'color-swatch' + (i===defaultIndex?' active':'');
    sw.style.background = c.color;
    sw.title = c.name;
    sw.addEventListener('click', ()=>{
      container.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));
      sw.classList.add('active');
      targetEl.style.fill = c.color;
    });
    container.appendChild(sw);
  });
}

buildColorRow(colorRow, PASTEL_COLORS, wrapperShape, 4);
buildColorRow(innerColorRow, INNER_COLORS, wrapperInner, 0);

/* ---------------- bloom progress & suggestions ---------------- */
const REQUIRED = 5;
let mainCount = 0, sideCount = 0;

const mainFill = document.getElementById('mainFill');
const sideFill = document.getElementById('sideFill');
const mainCountLabel = document.getElementById('mainCountLabel');
const sideCountLabel = document.getElementById('sideCountLabel');
const progressHint = document.getElementById('progressHint');
const suggestBox = document.getElementById('suggestBox');

function updateProgress(){
  mainFill.style.width = Math.min(100, (mainCount/REQUIRED)*100) + '%';
  sideFill.style.width = Math.min(100, (sideCount/REQUIRED)*100) + '%';
  mainCountLabel.textContent = `${mainCount}/${REQUIRED}`;
  sideCountLabel.textContent = `${sideCount}/${REQUIRED}`;

  const unlocked = mainCount >= REQUIRED && sideCount >= REQUIRED;
  suggestBox.classList.toggle('visible', unlocked);

  if(unlocked){
    progressHint.textContent = "You're all set — pick an arrangement below, or keep arranging by hand.";
  } else {
    const needMain = Math.max(0, REQUIRED-mainCount);
    const needSide = Math.max(0, REQUIRED-sideCount);
    const parts = [];
    if(needMain) parts.push(`${needMain} more main`);
    if(needSide) parts.push(`${needSide} more side`);
    progressHint.textContent = `Add ${parts.join(' and ')} bloom${(needMain+needSide)>1?'s':''} to unlock arrangement suggestions.`;
  }
}

document.querySelectorAll('.arrange-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>arrangeBouquet(btn.dataset.style));
});

function arrangeBouquet(style){
  const areaW = flowerArea.clientWidth, areaH = flowerArea.clientHeight;
  const centerX = areaW/2 - 55;
  const mains = Array.from(flowerArea.querySelectorAll('.flower[data-role="main"]'));
  const sides = Array.from(flowerArea.querySelectorAll('.flower[data-role="side"]'));

  function place(el, x, y, rot, scale){
    el.style.left = Math.max(10, Math.min(areaW-120, x)) + 'px';
    el.style.top = Math.max(10, Math.min(areaH-220, y)) + 'px';
    el.dataset.rot = rot.toFixed(1);
    el.dataset.scale = scale.toFixed(2);
    applyTransform(el);
  }

  if(style === 'round'){
    const n = mains.length;
    mains.forEach((el,i)=>{
      const off = i - (n-1)/2;
      place(el, centerX + off*30, areaH*0.24 + Math.abs(off)*10, off*5, 1.28);
    });
    const sN = sides.length;
    sides.forEach((el,i)=>{
      const angle = -100 + (i/(sN-1||1))*200;
      const rad = angle*Math.PI/180;
      place(el, centerX + Math.sin(rad)*118, areaH*0.40 + Math.cos(rad)*-34 + 46, angle*0.55, 0.72);
    });
  }

  if(style === 'fan'){
    const n = mains.length;
    mains.forEach((el,i)=>{
      const off = i - (n-1)/2;
      place(el, centerX + off*44, areaH*0.24 + Math.abs(off)*4, off*4, 1.22);
    });
    const sN = sides.length;
    sides.forEach((el,i)=>{
      const off = i - (sN-1)/2;
      const angle = off*14;
      place(el, centerX + off*36, areaH*0.42 + Math.abs(off)*3, angle, 0.76);
    });
  }

  if(style === 'cascade'){
    if(mains[0]) place(mains[0], centerX, areaH*0.18, 0, 1.35);
    mains.slice(1).forEach((el,i)=>{
      const side = i%2===0 ? -1 : 1;
      const tier = Math.floor(i/2)+1;
      place(el, centerX + side*(26+tier*10), areaH*0.24 + tier*20, side*10, 1.15);
    });
    sides.forEach((el,i)=>{
      const side = i%2===0 ? -1 : 1;
      const tier = Math.floor(i/2)+1;
      place(el, centerX + side*(70+tier*16), areaH*0.32 + tier*34, side*(28+tier*4), 0.7 - tier*0.03);
    });
  }

  deselectAll();
}

/* ---------------- main / side mode ---------------- */
let addMode = 'main';
let sideTurn = -1; // alternates left/right for side blooms

const modeHints = {
  main: 'Main blooms are big &amp; centered. Side blooms are smaller and fan out.',
  side: 'Side blooms tuck in smaller and angle outward, left and right.'
};

document.querySelectorAll('.mode-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    addMode = btn.dataset.mode;
    document.getElementById('modeHint').innerHTML = modeHints[addMode];
  });
});

/* ---------------- selection ---------------- */
const activePanel = document.getElementById('activeFlowerPanel');
const sideRot = document.getElementById('sideRot');
const sideScale = document.getElementById('sideScale');
let selectedFlower = null;

function deselectAll(except=null){
  document.querySelectorAll('.flower').forEach(f=>{
    if(f !== except) f.classList.remove('selected');
  });
  if(!except){
    selectedFlower = null;
    activePanel.classList.remove('visible');
  }
}

stage.addEventListener('click', (e)=>{
  if(e.target === stage || e.target === flowerArea){
    deselectAll();
  }
});

function applyTransform(el){
  const rot = el.dataset.rot || 0;
  const scale = el.dataset.scale || 1;
  el.style.transform = `rotate(${rot}deg) scale(${scale})`;
}

function selectFlower(el){
  selectedFlower = el;
  deselectAll(el);
  el.classList.add('selected');
  activePanel.classList.add('visible');
  sideRot.value = el.dataset.rot || 0;
  sideScale.value = el.dataset.scale || 1;
}

sideRot.addEventListener('input', ()=>{
  if(!selectedFlower) return;
  selectedFlower.dataset.rot = sideRot.value;
  applyTransform(selectedFlower);
});

sideScale.addEventListener('input', ()=>{
  if(!selectedFlower) return;
  selectedFlower.dataset.scale = sideScale.value;
  applyTransform(selectedFlower);
});

/* ---------------- flowers ---------------- */
function addFlower(typeKey){
  const type = FLOWER_TYPES[typeKey];
  const el = document.createElement('div');
  el.className = 'flower';
  el.dataset.role = addMode;

  const areaW = flowerArea.clientWidth, areaH = flowerArea.clientHeight;
  let rot, scale, x, y;

  if(addMode === 'main'){
    // big, upright, close to center
    rot = Math.floor(Math.random()*14 - 7);
    scale = 1.2 + Math.random()*0.15;
    x = areaW/2 - 55 + (Math.random()*44 - 22);
    y = areaH*0.26 + (Math.random()*24 - 12);
  } else {
    // smaller, angled outward, alternating left/right
    sideTurn *= -1;
    const side = sideTurn;
    rot = side * (22 + Math.random()*16);
    scale = 0.68 + Math.random()*0.12;
    x = areaW/2 - 55 + side * (60 + Math.random()*46);
    y = areaH*0.34 + (Math.random()*50 - 10);
  }

  el.innerHTML = `
    <div class="remove-x" title="Delete flower">✕</div>
    ${type.build()}
  `;

  el.dataset.rot = rot.toFixed(1);
  el.dataset.scale = scale.toFixed(2);
  applyTransform(el);

  if(addMode === 'main') mainCount++; else sideCount++;
  updateProgress();

  el.querySelector('.remove-x').addEventListener('click', (e)=>{
    e.stopPropagation();
    if(selectedFlower === el) deselectAll();
    if(el.dataset.role === 'main') mainCount = Math.max(0, mainCount-1);
    else sideCount = Math.max(0, sideCount-1);
    updateProgress();
    el.remove();
    checkEmpty();
  });

  el.style.left = Math.max(10, Math.min(areaW-120, x)) + 'px';
  el.style.top = Math.max(10, Math.min(areaH-220, y)) + 'px';

  // side blooms tuck behind whatever is already there; main blooms come forward
  if(addMode === 'side' && flowerArea.firstChild){
    flowerArea.insertBefore(el, flowerArea.firstChild);
  } else {
    flowerArea.appendChild(el);
  }

  makeDraggable(el);
  selectFlower(el);
  checkEmpty();
}

function checkEmpty(){
  emptyNote.style.display = flowerArea.children.length ? 'none' : 'block';
}

function makeDraggable(el){
  let sx=0, sy=0, ox=0, oy=0, dragging=false;

  el.addEventListener('pointerdown', (e)=>{
    if(e.target.classList.contains('remove-x')) return;
    selectFlower(el);
    dragging = true;
    el.setPointerCapture(e.pointerId);
    sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop;
    flowerArea.appendChild(el);
    el.classList.add('selected');
  });

  el.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    el.style.left = (ox+dx) + 'px';
    el.style.top = (oy+dy) + 'px';
  });

  function stop(e){
    dragging = false;
    try{ el.releasePointerCapture(e.pointerId); }catch(err){}
  }
  el.addEventListener('pointerup', stop);
  el.addEventListener('pointercancel', stop);
}

/* ---------------- letter ---------------- */
const letterInput = document.getElementById('letterInput');
const signInput = document.getElementById('signInput');
const letterText = document.getElementById('letterText');
const letterSign = document.getElementById('letterSign');

function syncLetter(){
  letterText.textContent = letterInput.value.trim() || 'Write something kind...';
  letterSign.textContent = signInput.value.trim() ? '— ' + signInput.value.trim() : '';
}
letterInput.addEventListener('input', syncLetter);
signInput.addEventListener('input', syncLetter);

/* ---------------- clear ---------------- */
document.getElementById('clearBtn').addEventListener('click', ()=>{
  flowerArea.innerHTML = '';
  mainCount = 0;
  sideCount = 0;
  updateProgress();
  deselectAll();
  checkEmpty();
});

/* ---------------- save as image ---------------- */
document.getElementById('saveBtn').addEventListener('click', saveBouquet);

function saveBouquet(){
  deselectAll();
  const rect = stage.getBoundingClientRect();
  const clone = stage.cloneNode(true);
  clone.style.boxShadow = 'none';
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

  const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(s => s.outerHTML)
    .join('');

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${styleTags}
        <div style="width:${rect.width}px;height:${rect.height}px;">${clone.outerHTML}</div>
      </div>
    </foreignObject>
  </svg>`;

  const blob = new Blob([svgString], {type:'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'my-bouquet.svg';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

checkEmpty();
syncLetter();
updateProgress();