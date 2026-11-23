const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{const sel=document.querySelector('[name="subject"]');if(sel){const v=a.dataset.service;[...sel.options].forEach(o=>{if(o.text===v)sel.value=v;});}}));
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#form-feedback').textContent='Formulário demonstrativo: antes de publicar, conecte este formulário a um e-mail oficial ou serviço de recebimento. Nenhum dado foi enviado.';});
