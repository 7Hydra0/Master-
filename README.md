# Conselho Master — portal institucional

Site estático (HTML, CSS e JavaScript) com Supabase: formulário de contato, painel administrativo com login e comunicados.

## Arquivos
- `index.html`: portal público (estrutura, serviços, comunicados, perguntas frequentes e contato)
- `carta.html`: carta institucional completa
- `privacidade.html`: política de privacidade (modelo, veja "Antes de publicar")
- `admin.html`, `admin.js`, `admin.css`: painel administrativo com login
- `style.css`, `script.js`, `logo.js`, `favicon.svg`: estilos, interações e ícone
- `config.js`: URL e chave anon do seu projeto Supabase
- `db.js`: inicializa o cliente Supabase
- `supabase/schema.sql` e `supabase/02_comunicados.sql`: tabelas e regras de acesso (RLS)
- `_headers`: cabeçalhos de segurança (Netlify)
- `master-logo.gif`: logo oficial. Deixe na mesma pasta do `index.html`; se não carregar, o site mostra o monograma "M".

## Configurar o Supabase
1. Crie um projeto em supabase.com.
2. No SQL Editor, execute `supabase/schema.sql` e depois `supabase/02_comunicados.sql` (cada um uma única vez).
3. Authentication > Providers > Email: desative "Allow new users to sign up".
4. Authentication > Users > Add user: crie o seu usuário administrador (senha forte).
5. No SQL Editor, libere esse usuário como admin:
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'SEU@EMAIL.COM';
   ```
6. Project Settings > API: copie a "Project URL" e a chave "anon public" para o `config.js`. Nunca use a chave `service_role` no site.
7. Teste: envie o formulário em `index.html`, entre em `admin.html` e confira a solicitação.

## Publicar
Netlify: Add new site > Deploy manually (arraste a pasta) ou conecte o repositório do GitHub. Envie todos os arquivos, inclusive `config.js`, `db.js`, `admin.js` e `_headers`.

## Como funciona
- Formulário do site: grava na tabela `solicitacoes` (origem "site").
- Painel: login por e-mail e senha; lista, muda o status, registra e exclui solicitações; publica comunicados que aparecem no site.
- Visitantes só conseguem inserir solicitações e ler comunicados publicados. Somente usuários da tabela `admins` leem, alteram ou excluem o resto.

## Segurança
- A chave anon é pública por design; a proteção real são as regras RLS dos arquivos SQL.
- O formulário tem campo isca, intervalo de 30 s e validação no banco. Para proteção forte contra spam, use Cloudflare Turnstile com uma Edge Function.
- O `_headers` inclui CSP. Se usar domínio próprio no Supabase, ajuste o `connect-src`.

## Antes de publicar
- `privacidade.html` é um modelo: preencha os campos em amarelo (e-mail do responsável e prazo de guarda) e revise o texto com um profissional.
- Os serviços são exemplos: confirme serviços, preços e condições.
- A carta é um texto-base: confirme a versão oficial.
