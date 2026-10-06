# MAGNÉTICA 2.0 — PROMPTS PARA LOVABLE
Data: 02/10/2026

# PROJECT KNOWLEDGE

Produto: Magnética 2.0, infoapp mobile-first de pós-término para mulheres adultas. O produto deve responder "qual é meu próximo passo?" e não ser um curso genérico. Fonte de verdade: PRD > DESIGN > CONTEÚDO > ARQUITETURA > PROTÓTIPO.

Visual: editorial feminino contemporâneo. Marfim #F7F3EF, vinho #66384A, texto #2E2529. Títulos Cormorant Garamond; corpo Manrope. Uma ação principal por tela. Sem aparência de dashboard corporativo.

Backend: Supabase próprio com Auth, Postgres, RLS, Storage e Edge Functions quando necessário. Não simular integrações. Diário, rascunhos, timeline e IA são privados. Não enviar textos íntimos para analytics.

Personalização: determinística no MVP. Não inventar diagnóstico, score ou chance de reconciliação. Não prometer controle do parceiro. Sem manipulação, ciúme, perseguição, triangulação ou "gatilhos psicológicos".

---

# PROMPT 0 — INICIAL

Construa o Magnética 2.0 seguindo os arquivos anexados. Antes de editar, sintetize a arquitetura, liste rotas, componentes, entidades e configurações externas ausentes.

Não reduza o produto a uma landing page.

Implemente primeiro a experiência visual mobile-first com:
- AppShell;
- Hoje;
- Jornada;
- Apoio;
- Biblioteca;
- Você;
- onboarding;
- leitor de lição;
- diário;
- timeline;
- laboratório de mensagens;
- Devo mandar mensagem?;
- Ele me chamou;
- Fato ou interpretação?.

Use fixtures claramente marcadas apenas nesta fase. Não finja autenticação, cobrança ou IA reais.

Preserve uma ação principal por tela, acessibilidade, safe-area, 360px e desktop.

No fim, reporte:
1. telas criadas;
2. componentes;
3. estados;
4. fixtures;
5. pendências.

---

# FASE 1 — DESIGN E NAVEGAÇÃO

Use 02_DESIGN_MAGNETICA_2.json fielmente.

Criar componentes reutilizáveis:
- AppShell
- BottomNav
- SidebarNav
- MissionHero
- PhaseBadge
- CheckInCard
- EventQuickPicker
- SupportToolCard
- DecisionResult
- MessageEditor
- TimelineEventCard
- LessonReader
- LibraryCard
- EmptyState
- ErrorState
- LoadingState
- ConfirmDialog
- SafetyNotice

Não usar imagens genéricas de casal. Priorizar tipografia e formas vetoriais.

---

# FASE 2 — SUPABASE, AUTH E RLS

Use 05_DATABASE_STARTER.sql como ponto de partida, mas revise migrations.

Implementar:
- cadastro;
- login;
- verificação de email;
- recuperação;
- sessão;
- logout;
- perfil;
- RLS;
- isolamento entre duas contas.

Não usar service role no frontend.

Testar chamadas diretas ao Supabase para confirmar isolamento.

---

# FASE 3 — ONBOARDING E PERSONALIZAÇÃO

Implementar as 8 perguntas do Mapa do Momento.

Requisitos:
- salvar cada resposta;
- permitir retomada;
- gerar relationship_context;
- selecionar fase com regra determinística;
- armazenar rule_version;
- mostrar explicação do resultado;
- safety_flag desvia para fluxo seguro.

Não usar IA para decidir o resultado.

---

# FASE 4 — JORNADA E HOME

Criar programa de 28 dias.

Seed inicial baseado em 03_CONTEUDO_INICIAL_MAGNETICA_2.md.

Implementar:
- matrícula ativa única;
- conclusão idempotente;
- primeiro dia incompleto;
- progresso;
- fases;
- Home adaptativa;
- evento rápido;
- check-in por data local.

Não bloquear dias artificialmente. Recomendar, não proibir navegação.

---

# FASE 5 — FERRAMENTAS DE APOIO

Implementar:

## Quero falar com ele agora
Fluxo curto + salvar texto sem enviar.

## Devo mandar mensagem?
Árvore editorial determinística.

## Ele me chamou
Tipo de contato + objetivo + resposta editorial.

## Encontre as palavras
24 modelos editáveis, salvar e copiar.

## Fato ou interpretação?
Entrada livre + campos estruturados. No MVP, usar UI guiada e regras editoriais; não fingir IA.

## Preparar conversa
Checklist + pauta editável.

Nenhuma ferramenta envia mensagem externa.

---

# FASE 6 — DIÁRIO, TIMELINE E BIBLIOTECA

Diário:
- privado;
- prompts;
- salvar explícito;
- aviso de alterações;
- editar/excluir.

Timeline:
- CRUD;
- data local;
- tipo;
- descrição;
- sentimento;
- interpretação.

Biblioteca:
- busca;
- filtros;
- favoritos;
- leitura;
- áudio com transcrição;
- estados de conteúdo.

Não publicar áudio inexistente como áudio real.

---

# FASE 7 — ADMIN CMS

Criar /admin.

Roles:
owner
editor
support

CMS:
- journeys;
- days;
- templates;
- library;
- status draft/review/published;
- versionamento;
- validação.

Support não vê diário, drafts, timeline privada nem chat.

Owner concede acesso manual com justificativa e audit log.

---

# FASE 8 — BILLING

Antes de implementar, pedir somente:
- provedor;
- produtos;
- preço;
- moeda;
- política comercial.

Criar adapter.

Webhook assinado, idempotente e server-side.

Entitlements:
base
plus

Tratar:
- compra;
- renovação;
- cancelamento;
- reembolso;
- chargeback;
- expiração;
- reconciliação.

Não liberar acesso por URL de sucesso.

---

# FASE 9 — IA PLUS

Implementar somente quando houver chave e decisão de provedor.

Endpoint autenticado.

Validar Plus e quota.

Modos:
- analisar situação;
- preparar mensagem;
- preparar conversa;
- revisar interação.

Não anexar diário automaticamente.

Histórico opt-in.

Sem chave:
recurso desativado com explicação real.

Fallback:
templates e biblioteca.

---

# FASE 10 — PWA E QA

Implementar:
- manifest;
- ícones;
- standalone detection;
- install prompt quando suportado;
- shell offline restrito.

Não cachear:
- diário;
- drafts;
- chat;
- respostas privadas.

Testar:
- 360px;
- desktop;
- teclado;
- leitor de tela básico;
- zoom;
- reduced motion;
- auth;
- RLS;
- refresh;
- duas abas;
- falha de rede;
- build;
- typecheck.

Remover fixtures.

---

# PROMPT DE AUDITORIA

Compare a implementação com o PRD requisito por requisito.

Classifique:
P0 = segurança, dados, cobrança, acesso.
P1 = fluxo essencial.
P2 = polimento.

Para cada falha:
- requisito;
- arquivo/rota;
- comportamento observado;
- correção.

Corrija P0/P1 antes de sugerir lançamento.

Separe:
- testado de verdade;
- inferido;
- pendente de configuração.

Não use fixture como prova de integração.
