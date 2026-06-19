// --- SISTEMA DE REDE NEURAL (PLEXUS 3D) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
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
        this.z = Math.random() * 2 + 0.5; // Profundidade 3D
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
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

// Criar partículas
for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
}

// Rastrear mouse para interação
let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
    mouse.x = null; mouse.y = null;
});

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Conectar partículas próximas (Efeito Plexus)
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(26, 58, 255, ${1 - dist/100})`;
                ctx.lineWidth = 0.6;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        // Conexão com o mouse (Campo magnético)
        if (mouse.x != null) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 - dist/150})`;
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
// --- FIM DA REDE NEURAL ---

// (Mantenha o restante do seu código JavaScript intacto abaixo desta linha, como o IntersectionObserver, Menu, Form, etc.)

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
