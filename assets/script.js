const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d', { alpha: false }); 
let width, height;
let particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);
initCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; 
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 0.5;
    }
    update() {
        this.x += this.vx / this.z;
        this.y += this.vy / this.z;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.8 / this.z})`; 
        ctx.fill();
    }
}

const particleCount = window.innerWidth < 768 ? 35 : 65;
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

let mouse = { x: -1000, y: -1000 };

// --- EVENTOS PARA PC (MOUSE) ---
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// --- EVENTOS PARA CELULAR (DEDO/TOUCH) ---
window.addEventListener('touchstart', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});
window.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});
window.addEventListener('touchend', () => {
    // Quando soltar o dedo, a conexão magnética desaparece
    mouse.x = -1000;
    mouse.y = -1000;
});
function animateCanvas() {
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            
            if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    // O Fade suave voltou!
                    ctx.strokeStyle = `rgba(26, 58, 255, ${0.6 - (dist / 200)})`; 
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        let dxMouse = particles[i].x - mouse.x;
        let dyMouse = particles[i].y - mouse.y;
        if (Math.abs(dxMouse) < 150 && Math.abs(dyMouse) < 150) {
            let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            if (distMouse < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 - (distMouse / 180)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      e.target.querySelectorAll&&e.target.querySelectorAll('.skill-fill').forEach(bar=>{
        bar.style.width=bar.dataset.width;
      });
    }
  });
},{threshold:0.15});

document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));

document.querySelectorAll('.sobre-inner').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav.style.background=window.scrollY>50?'rgba(10,10,15,0.97)':'rgba(10,10,15,0.85)';
});

const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
hamburger.addEventListener('click',()=>{
  const open=mobileMenu.style.display==='flex';
  mobileMenu.style.display=open?'none':'flex';
});
function closeMobile(){mobileMenu.style.display='none'}

document.querySelectorAll('.project-card,.service-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-0.5;
    const y=(e.clientY-rect.top)/rect.height-0.5;
    card.style.transform=`translateY(-6px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
  });
});

document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  const nome=document.getElementById('nome').value;
  const empresa=document.getElementById('empresa').value;
  const whatsapp=document.getElementById('whatsapp').value;
  const email=document.getElementById('email').value;
  const servico=document.getElementById('servico').value;
  const projeto=document.getElementById('projeto').value;
  
  let msg=`Olá! Vim pelo site Engelke Systems e gostaria de solicitar um orçamento.%0A%0A`;
  msg+=`*Nome:* ${nome}%0A`;
  if(empresa) msg+=`*Empresa:* ${empresa}%0A`;
  if(whatsapp) msg+=`*WhatsApp:* ${whatsapp}%0A`;
  if(email) msg+=`*E-mail:* ${email}%0A`;
  if(servico) msg+=`*Serviço:* ${servico}%0A`;
  if(projeto) msg+=`%0A*Descrição do projeto:*%0A${encodeURIComponent(projeto)}`;
  
  window.open(`https://wa.me/5521972894449?text=${msg}`,'_blank');
});

setTimeout(()=>{
  document.querySelectorAll('.skill-fill').forEach(bar=>{
    const parentVisible=bar.closest('.visible');
    if(parentVisible) bar.style.width=bar.dataset.width;
  });
},500);
