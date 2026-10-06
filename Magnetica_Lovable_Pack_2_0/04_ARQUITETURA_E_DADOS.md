# MAGNÉTICA 2.0 — ARQUITETURA E DADOS
Data: 02/10/2026

# 1. STACK

Frontend:
- React
- TypeScript
- Vite/scaffold do Lovable
- Tailwind
- shadcn/ui quando disponível
- Lucide

Backend:
- Supabase Auth
- Postgres
- Row Level Security
- Storage
- Edge Functions quando necessário

Hospedagem:
- Lovable/Vercel conforme projeto
- Supabase como backend único

Não misturar Supabase e outro banco para o mesmo domínio de dados.

---

# 2. MÓDULOS

src/
- app/
- components/
- features/
  - auth/
  - onboarding/
  - journey/
  - today/
  - support/
  - messages/
  - timeline/
  - journal/
  - library/
  - ai/
  - billing/
  - admin/
- services/
- lib/
- hooks/
- types/
- styles/

Separar regra de domínio da interface.

---

# 3. SERVIÇOS DE DOMÍNIO

## PersonalizationService
Entrada: onboarding.
Saída: fase inicial, dia recomendado, ferramentas.

## JourneyService
Programas, dias, matrícula, conclusão idempotente.

## TodayService
Compor Home a partir de jornada + último evento + check-in.

## ContactDecisionService
Executar "Devo mandar mensagem?" sem IA obrigatória.

## TimelineService
CRUD de eventos privados.

## MessageDraftService
Salvar/copiar/versionar rascunhos.

## LibraryService
Busca, filtros e favoritos.

## EntitlementService
Acesso base e Plus.

## AiAssistService
Somente servidor, autenticação e Plus.

---

# 4. PERSONALIZAÇÃO DETERMINÍSTICA

Pseudo-regra:

if safety_flag:
  phase = safety
elif elapsed_time == "<7d" and main_difficulty in ["send_message","fear"]:
  phase = stabilize
elif contact_pattern in ["none","intermittent"] and elapsed_time in ["1-2w","2-4w"]:
  phase = reposition
elif last_interaction in ["he_contacted","warm","asked_to_meet"]:
  phase = contact
elif desired_outcome == "rebuild" and contact_pattern != "none":
  phase = reciprocity
else:
  phase = stabilize

Salvar:
- rule_version
- selected_phase
- explanation

Não depender de LLM.

---

# 5. HOME ADAPTATIVA

Inputs:
- current enrollment
- first incomplete day
- latest timeline event
- today checkin
- safety flag

Prioridade de cards:

1. safety
2. evento novo "he_contacted"
3. draft aguardando revisão
4. missão diária
5. check-in
6. recomendação de biblioteca

---

# 6. IDEMPOTÊNCIA

Concluir lição:
unique(enrollment_id, journey_day_id)

Check-in:
unique(user_id, local_date)

Entitlement por evento:
unique(provider, external_event_id)

Webhook:
salvar external_event_id antes de processar.

---

# 7. PRIVACIDADE

Tabelas privadas:
- journal_entries
- message_drafts
- timeline_events
- ai_conversations

Regra:
auth.uid() = user_id

Support:
sem select nessas tabelas.

Admin:
não usar service role no browser.

---

# 8. IA

Endpoint:
POST /functions/v1/ai-assist

Validar:
- auth;
- entitlement Plus;
- input;
- rate limit;
- quota;
- idempotency key.

Contexto:
- modo escolhido;
- texto explicitamente enviado;
- resumo de relacionamento somente se usuária consentiu.

Não incluir diário automaticamente.

Fallback:
biblioteca e templates.

---

# 9. PAGAMENTOS

Criar Adapter:
BillingProvider

Métodos:
- createCheckout
- handleWebhook
- getCustomerPortal
- reconcileSubscription

Entitlements:
base
plus

Nunca confiar em:
- price do client;
- success=true;
- metadata editável pelo usuário.

---

# 10. ADMIN

RBAC:
owner
editor
support

Owner:
roles + billing + conteúdo.

Editor:
conteúdo.

Support:
perfil mínimo e status de acesso.

Auditar:
- concessão manual;
- revogação;
- mudança de role;
- publicação.

---

# 11. ROTAS

/app/hoje
/app/jornada
/app/jornada/:day
/app/apoio
/app/apoio/devo-mandar
/app/apoio/quero-falar-agora
/app/apoio/ele-me-chamou
/app/apoio/mensagens
/app/apoio/fato-ou-interpretacao
/app/apoio/preparar-conversa
/app/biblioteca
/app/biblioteca/:slug
/app/voce
/app/voce/diario
/app/voce/linha-do-tempo
/app/voce/favoritos
/app/voce/conta
/onboarding
/admin/*

---

# 12. TIPOS PRINCIPAIS

RelationshipContext:
- situation
- breakupInitiator
- elapsedTime
- contactPattern
- lastInteraction
- mainDifficulty
- desiredOutcome
- safetyFlag
- ruleVersion

TimelineEvent:
- id
- userId
- occurredAt
- type
- description
- feeling
- interpretation

MessageDraft:
- id
- userId
- category
- body
- status
- sourceTemplateId
- createdAt
- updatedAt

---

# 13. CACHE/OFFLINE

PWA:
cachear apenas shell e conteúdo público/editorial permitido.

Não cachear offline:
- diário;
- mensagens;
- chat IA;
- respostas autenticadas sensíveis.

---

# 14. TESTES MÍNIMOS

- onboarding retoma;
- regra retorna fase;
- duas abas não duplicam conclusão;
- refresh preserva progresso;
- user A não lê user B;
- support não lê diário;
- timeline CRUD;
- draft CRUD;
- copy não altera status para sent;
- check-in usa data local;
- conteúdo draft não aparece;
- entitlement bloqueia Plus;
- falha de rede preserva formulário;
- 360px;
- teclado;
- reduced motion.

---

# 15. OBSERVABILIDADE

Logar:
- erros técnicos;
- função;
- request id;
- user id hash/UUID interno quando necessário.

Não logar:
- texto íntimo;
- corpo de diário;
- mensagem completa;
- prompt privado da IA.

---

# 16. CONFIGURAÇÕES EXTERNAS

Supabase:
- URL
- anon key
- service role apenas servidor
- redirects Auth
- SMTP

IA:
- provider key
- model
- quota
- budget

Billing:
- provider
- webhook secret
- product ids

Analytics:
- provider
- somente eventos permitidos
