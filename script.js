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
    <path d="M70,158 C68,130 72,110 70,92" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <path d="M70,125 C55,120 44,128 40,142 C56,144 66,136 70,125 Z" fill="${GREEN}" stroke="${INK}" stroke-width="2"/>
  `;
}

function petalRing(cx, cy, n, dist, rx, ry, fill, extraRotate){
  let out = '';
  for(let i=0;i<n;i++){
    const angle = (360/n)*i + (extraRotate||0);
    const rad = angle*Math.PI/180;
    const px = cx + dist*Math.cos(rad);
    const py = cy + dist*Math.sin(rad);
    out += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${INK}" stroke-width="1.6" transform="rotate(${(angle+90).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  return out;
}

function buildRose(){
  const cx=70, cy=62;
  let circles = '';
  const layers = [
    {r:32, fill:'#C81E3E', off:0},
    {r:25, fill:'#E4344F', off:8},
    {r:18, fill:'#C81E3E', off:0},
    {r:11, fill:'#E4344F', off:5},
  ];
  layers.forEach((l,i)=>{
    const a = i*47;
    const ox = cx + l.off*Math.cos(a*Math.PI/180);
    const oy = cy + l.off*Math.sin(a*Math.PI/180)*0.6;
    circles += `<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="${l.r}" fill="${l.fill}" stroke="${INK}" stroke-width="2"/>`;
  });
  circles += `<circle cx="${cx}" cy="${cy}" r="6" fill="#8f1030" stroke="${INK}" stroke-width="1.6"/>`;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${circles}</svg>`;
}

function buildTulip(){
  const body = `
    <path d="M42,80 C36,42 52,18 70,24 C88,18 104,42 98,80
              C90,64 80,70 70,58 C60,70 50,64 42,80 Z"
          fill="#FF6FA5" stroke="${INK}" stroke-width="2.4"/>
    <path d="M70,58 C60,70 50,64 42,80" fill="none" stroke="#E14E86" stroke-width="1.6"/>
    <path d="M70,58 C80,70 90,64 98,80" fill="none" stroke="#E14E86" stroke-width="1.6"/>
  `;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${body}</svg>`;
}

function buildSunflower(){
  const cx=70, cy=62;
  let petals = petalRing(cx,cy,12,34,15,7,'#FFC93C',0);
  let dots = '';
  for(let i=0;i<10;i++){
    const a = i*36*Math.PI/180;
    const r = 6+ (i%3)*3;
    dots += `<circle cx="${(cx+r*Math.cos(a)).toFixed(1)}" cy="${(cy+r*Math.sin(a)).toFixed(1)}" r="1.4" fill="#5b3818"/>`;
  }
  const center = `<circle cx="${cx}" cy="${cy}" r="19" fill="#7A4B21" stroke="${INK}" stroke-width="2.2"/>${dots}`;
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${petals}${center}</svg>`;
}

function buildDaisy(){
  const cx=70, cy=62;
  let petals = petalRing(cx,cy,10,36,17,6,'#FFFDF0',0);
  const center = `<circle cx="${cx}" cy="${cy}" r="14" fill="#FFD93C" stroke="${INK}" stroke-width="2"/>`;
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
    dots += `<circle cx="${(cx+ox).toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" stroke="${INK}" stroke-width="1.4"/>`;
  }
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">${stemAndLeaf()}${dots}</svg>`;
}

const flowerArea = document.getElementById('flowerArea');
const wrapperShape = document.getElementById('wrapperShape');
const bouquetWrapper = document.getElementById('bouquetWrapper');
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
  {name: 'Warm Yellow', color: '#ffea85'},
  {name: 'Blush Pink', color: '#ffd1dc'},
  {name: 'Mint Green', color: '#baffc9'},
  {name: 'Baby Blue', color: '#bae1ff'},
  {name: 'Lavender', color: '#e8c5ff'}
];

const wrapRow = document.getElementById('wrapRow');
const colorRow = document.getElementById('colorRow');
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

PASTEL_COLORS.forEach((c,i)=>{
  const sw = document.createElement('div');
  sw.className = 'color-swatch' + (i===0?' active':'');
  sw.style.background = c.color;
  sw.title = c.name;
  sw.addEventListener('click', ()=>{
    document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));
    sw.classList.add('active');
    wrapperShape.style.fill = c.color;
    bouquetWrapper.style.color = c.color;
  });
  colorRow.appendChild(sw);
});

const activePanel = document.getElementById('activeFlowerPanel');
const sideRot = document.getElementById('sideRot');
const sideScale = document.getElementById('sideScale');
let selectedFlower = null;

function deselectAll(except=null){
  document.querySelectorAll('.flower').forEach(f=>{
    if(f !== except) f.classList.remove('selected');
  });
  if(!except) {
    selectedFlower = null;
    activePanel.classList.remove('visible');
  }
}

stage.addEventListener('click', (e)=>{
  if(e.target === stage || e.target === flowerArea || e.target.id === 'bouquetWrapper' || e.target.tagName === 'svg' || e.target.tagName === 'path'){
    deselectAll();
  }
});

function selectFlower(el, rot, scale) {
  selectedFlower = el;
  deselectAll(el);
  el.classList.add('selected');
  activePanel.classList.add('visible');
  sideRot.value = rot;
  sideScale.value = scale;
}

function addFlower(typeKey){
  const type = FLOWER_TYPES[typeKey];
  const el = document.createElement('div');
  el.className = 'flower';

  let currentRot = Math.floor(Math.random()*24 - 12);
  let currentScale = 1;

  el.innerHTML = `
    <div class="remove-x" title="Delete flower">✕</div>
    ${type.build()}
  `;

  function updateTransform(){
    el.style.transform = `rotate(${currentRot}deg) scale(${currentScale})`;
  }
  updateTransform();

  el.querySelector('.remove-x').addEventListener('click', (e)=>{
    e.stopPropagation();
    if(selectedFlower === el) deselectAll();
    el.remove();
    checkEmpty();
  });

  el.addEventListener('pointerdown', (e)=>{
    selectFlower(el, currentRot, currentScale);
    flowerArea.appendChild(el);
  });

  const areaW = flowerArea.clientWidth, areaH = flowerArea.clientHeight;
  const x = areaW/2 - 55 + (Math.random()*100-50);
  const y = areaH*0.35 + (Math.random()*60-30);
  el.style.left = Math.max(10, Math.min(areaW-120, x)) + 'px';
  el.style.top = Math.max(10, Math.min(areaH-220, y)) + 'px';

  flowerArea.appendChild(el);
  makeDraggable(el);
  selectFlower(el, currentRot, currentScale);
  checkEmpty();

  sideRot.oninput = function() {
    if(selectedFlower === el) {
      currentRot = this.value;
      updateTransform();
    }
  };
  sideScale.oninput = function() {
    if(selectedFlower === el) {
      currentScale = this.value;
      updateTransform();
    }
  };
}

function checkEmpty(){
  emptyNote.style.display = flowerArea.children.length ? 'none' : 'block';
}

function makeDraggable(el){
  let sx=0, sy=0, ox=0, oy=0, dragging=false;

  el.addEventListener('pointerdown', (e)=>{
    if(e.target.classList.contains('remove-x')) return;
    dragging = true;
    el.setPointerCapture(e.pointerId);
    sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop;
    flowerArea.appendChild(el);
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

document.getElementById('clearBtn').addEventListener('click', ()=>{
  flowerArea.innerHTML = '';
  deselectAll();
  checkEmpty();
});

document.getElementById('saveBtn').addEventListener('click', saveBouquet);

async function saveBouquet(){
  deselectAll();
  const rect = stage.getBoundingClientRect();
  const clone = stage.cloneNode(true);
  clone.style.boxShadow = 'none';

  const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(s=>s.outerHTML).join('');

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${styleTags}
        <div style="width:${rect.width}px;height:${rect.height}px;">${clone.innerHTML}</div>
      </div>
    </foreignObject>
  </svg>`;

  const blob = new Blob([svgString], {type:'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = ()=>{
    const canvas = document.createElement('canvas');
    const scale = 2;
    canvas.width = rect.width*scale;
    canvas.height = rect.height*scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = '#f6f3ec';
    ctx.fillRect(0,0,rect.width,rect.height);
    ctx.drawImage(img, 0, 0, rect.width, rect.height);
    URL.revokeObjectURL(url);
    canvas.toBlob((pngBlob)=>{
      const link = document.createElement('a');
      link.download = 'my-bouquet.png';
      link.href = URL.createObjectURL(pngBlob);
      link.click();
    });
  };
  img.onerror = ()=>{
    alert("Couldn't save the image in this preview — try downloading the files and running locally.");
  };
  img.src = url;
}

checkEmpty();
syncLetter();