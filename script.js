const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = '☰';
  });
});

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('[data-service]').forEach(a => {
  a.addEventListener('click', () => {
    const sel = document.querySelector('[name="subject"]');
    if (!sel) return;
    const v = a.dataset.service;
    [...sel.options].forEach(o => { if (o.text === v) sel.value = v; });
  });
});

document.querySelector('#contact-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const feedback = document.querySelector('#form-feedback');
  const formData = new FormData(e.target);

  if (formData.get('website')) return; 

  btn.disabled = true;
  btn.textContent = 'Enviando...';
  feedback.textContent = '';
  feedback.classList.remove('error');

  try {
    const { error } = await supabaseClient
      .from('solicitacoes')
      .insert([{
        nome: formData.get('name'),
        tipo: formData.get('subject'),
        observacao: formData.get('message'),
        email: formData.get('email')
      }]);

    if (error) throw error;

    feedback.textContent = 'Solicitação enviada com sucesso!';
    e.target.reset();
  } catch (err) {
    console.error(err);
    feedback.textContent = 'Ocorreu um erro. Tente novamente.';
    feedback.classList.add('error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar solicitação';
  }
});
