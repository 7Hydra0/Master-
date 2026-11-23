const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '✕' : '☰';
});

// Fecha o menu ao clicar em um link (mobile)
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = '☰';
  });
});

// Ano no footer
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Pré-seleciona o assunto ao clicar em "Solicitar informações"
document.querySelectorAll('[data-service]').forEach(a => {
  a.addEventListener('click', () => {
    const sel = document.querySelector('[name="subject"]');
    if (!sel) return;
    const v = a.dataset.service;
    [...sel.options].forEach(o => { if (o.text === v) sel.value = v; });
  });
});

// Formulário de contato (demonstração)
document.querySelector('#contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('#form-feedback').textContent =
    'Formulário demonstrativo: antes de publicar, conecte este formulário a um e-mail oficial ou serviço de recebimento. Nenhum dado foi enviado.';
});
