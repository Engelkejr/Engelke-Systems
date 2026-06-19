(function(){
  const container=document.getElementById('particles');
  for(let i=0;i<25;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=Math.random()*3+1;
    const left=Math.random()*100;
    const duration=Math.random()*20+15;
    const delay=Math.random()*20;
    const drift=(Math.random()-0.5)*200+'px';
    p.style.cssText=`
      width:${size}px;height:${size}px;
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
      --drift:${drift};
    `;
    container.appendChild(p);
  }
})();

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
  
  let msg=`Ola! Vim pelo site Engelke Systems e gostaria de solicitar um orcamento.%0A%0A`;
  msg+=`*Nome:* ${nome}%0A`;
  if(empresa) msg+=`*Empresa:* ${empresa}%0A`;
  if(whatsapp) msg+=`*WhatsApp:* ${whatsapp}%0A`;
  if(email) msg+=`*E-mail:* ${email}%0A`;
  if(servico) msg+=`*Servico:* ${servico}%0A`;
  if(projeto) msg+=`%0A*Descricao do projeto:*%0A${encodeURIComponent(projeto)}`;
  
  window.open(`https://wa.me/5521972894449?text=${msg}`,'_blank');
});

setTimeout(()=>{
  document.querySelectorAll('.skill-fill').forEach(bar=>{
    const parentVisible=bar.closest('.visible');
    if(parentVisible) bar.style.width=bar.dataset.width;
  });
},500);
