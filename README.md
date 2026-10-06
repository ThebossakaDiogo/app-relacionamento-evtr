# Florecer — Aplicativo PWA

Aplicativo PWA mobile-first desenvolvido para guiar o processo pós-término com base na metodologia de clareza ("Clareza para o próximo passo").

---

## 🌸 Funcionalidades Principais

- **Mapa do Momento (Diagnóstico Inicial Inteligente)**:
  - 8 perguntas determinísticas que classificam o momento da usuária em 4 fases: *Estabilizar*, *Reposicionar*, *Contato com Intenção* e *Reciprocidade*.
- **Jornada de 28 Dias Estruturada**:
  - Lições curtas de 3 a 5 minutos divididas em 4 fases progressivas.
  - Leitor imersivo com controle de conclusão, reflexão diária e navegação fluida.
- **Apoio Rápido ("SOS Emocional")**:
  - *Calma Imediata (Áudios & Respiração)*: Guias guiados de 2 a 5 minutos.
  - *Laboratório de Mensagens*: 24 modelos prontos de mensagens categorizados (com opção de copiar e salvar em rascunhos).
  - *O Que Significa*: 12 cenários práticos explicados com postura recomendada.
- **Biblioteca & Checklists**:
  - 12 artigos fundamentais sobre dinâmica relacional.
  - 8 áudios com transcrição completa para leitura ou escuta.
  - 10 checklists acionáveis ("Antes de Enviar Mensagem", "Checklist do Encontro", etc.).
- **Área Pessoal ("Você")**:
  - Diário confidencial com prompts guiados.
  - Linha do tempo de acontecimentos para registro de fatos.
  - Rascunhos de mensagens salvos.
  - Exportação completa de backup em formato JSON.
- **Animação de Confirmação de E-mail / Compra**:
  - Validação visual com anel pulsante, barra de progresso, chuva de confetes 60fps no Canvas e emissão do Passaporte VIP com código de licença digital.
- **Persistência Dupla em Cookies (365 Dias)**:
  - Todo o progresso, check-ins, respostas e diários são sincronizados com cookies de longa duração para garantir que nenhum dado seja perdido no celular.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Ícones**: Lucide React
- **Design System**: Tokens HSL baseados no design system oficial da metodologia Magnética 2.0 (Cormorant Garamond + Manrope)
- **Persistência**: LocalStorage + Cookies com redundância automática

---

## 🚀 Como Executar Localmente

```bash
# Entrar na pasta da aplicação
cd flutter_application_1

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento (acessível no PC e no celular via rede Wi-Fi)
npm run dev -- --host
```

Acesse no navegador:
- **Computador:** `http://localhost:5173`
- **Celular (mesmo Wi-Fi):** `http://<SEU-IP-LOCAL>:5173`

---

## 📂 Estrutura do Repositório

```
app-florecer/
├── Magnetica_Lovable_Pack_2_0/   # PRDs, especificações e protótipos originais
├── flutter_application_1/        # Código-fonte da aplicação React/Vite
│   ├── src/
│   │   ├── data/                 # Lições (28 dias), mensagens, cenários e biblioteca
│   │   ├── features/             # Onboarding, Hoje, Jornada, Apoio, Biblioteca, Você
│   │   ├── components/           # AppShell, Modais, Toasts, Confirmação de Compra
│   │   ├── services/             # StorageService e CookieHelper
│   │   └── styles/               # Tokens de cor, tipografia e design system
│   ├── public/                   # Manifest PWA e ícones
│   └── package.json
└── README.md
```
