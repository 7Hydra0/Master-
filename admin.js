// admin.js
let currentUser = null;
const loginSec = document.querySelector('#login');
const appSec = document.querySelector('#app');
const logoutBtn = document.querySelector('#logout');

async function checkSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    showApp();
  } else {
    showLogin();
  }
}

function showApp() {
  loginSec.hidden = true;
  appSec.hidden = false;
  logoutBtn.hidden = false;
  loadRequests();
  loadNotices();
}

function showLogin() {
  loginSec.hidden = false;
  appSec.hidden = true;
  logoutBtn.hidden = true;
}

document.querySelector('#login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const msg = document.querySelector('#login-msg');
  
  msg.textContent = 'Entrando...';
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  
  if (error) {
    msg.textContent = 'E-mail ou senha incorretos.';
  } else {
    msg.textContent = '';
    checkSession();
  }
});

logoutBtn?.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  checkSession();
});

async function loadRequests() {
  const list = document.querySelector('#requests');
  const sTotal = document.querySelector('#s-total');
  const sNew = document.querySelector('#s-new');
  
  const { data: rows, error } = await supabaseClient
    .from('solicitacoes')
    .select('*')
    .order('criado_em', { ascending: false });

  if (error) { console.error(error); return; }

  if (sTotal) sTotal.textContent = rows.length;
  if (sNew) sNew.textContent = rows.filter(r => !r.status || r.status === 'novo').length;

  list.innerHTML = rows.length
    ? rows.map(r => `
      <div class="item">
        <b>${r.nome}</b>
        <small>${r.tipo} · ${new Date(r.criado_em).toLocaleString('pt-BR')}</small>
        <div>${r.observacao || 'Sem observações'}</div>
        <div class="row">
            <button onclick="window.deleteRequest(${r.id})" class="danger" style="padding:5px 10px;font-size:10px">Excluir</button>
        </div>
      </div>`).join('')
    : '<p style="font-size:12px;color:#788391">Nenhuma solicitação registrada.</p>';
}

window.deleteRequest = async (id) => {
    if(!confirm('Excluir esta solicitação?')) return;
    await supabaseClient.from('solicitacoes').delete().eq('id', id);
    loadRequests();
}

document.querySelector('#request-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  await supabaseClient.from('solicitacoes').insert([{
    nome: d.get('name'),
    tipo: d.get('type'),
    observacao: d.get('note'),
    origem: 'admin'
  }]);
  e.target.reset();
  loadRequests();
});

async function loadNotices() {
    const list = document.querySelector('#notices-admin');
    const { data } = await supabaseClient.from('comunicados').select('*').order('criado_em', {ascending:false});
    if(!data || !list) return;
    list.innerHTML = data.map(n => `<div class="item"><b>${n.titulo}</b><div>${n.corpo}</div></div>`).join('');
}

document.querySelector('#notice-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  await supabaseClient.from('comunicados').insert([{ titulo: d.get('titulo'), corpo: d.get('corpo') }]);
  e.target.reset();
  loadNotices();
});

checkSession();
