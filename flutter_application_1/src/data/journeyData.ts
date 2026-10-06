import { JourneyDay } from '../types';

export const JOURNEY_DAYS: JourneyDay[] = [
  // FASE 1: ESTABILIZAR (Dias 1-7)
  {
    dayNumber: 1,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'O que aconteceu de fato',
    objective: 'Separar acontecimentos observáveis das interpretações que aparecem após o término.',
    durationMinutes: 4,
    bodyText: `Quando uma relação muda, é comum que fatos e significados se misturem. "Ele não respondeu desde ontem" é um fato observável. "Ele não respondeu porque já não se importa comigo" é uma interpretação.

A interpretação pode até parecer convincente, mas você ainda não tem acesso direto à intenção de outra pessoa. Quando tratamos uma hipótese como certeza absoluta, ela começa a ditar comportamentos impulsivos: mandar outra mensagem, apagar conversas, bloquear, desbloquear ou vasculhar redes sociais.

Hoje, não precisamos decidir o futuro da relação. O primeiro passo é apenas organizar o que realmente sabemos. Pense na última interação: o que uma câmera de vídeo registraria? Quem falou? O que foi dito com exatidão? Houve silêncio? Guarde apenas o que pode ser comprovado.`,
    example: 'Fato: Ele disse que precisava de alguns dias e não enviou mensagens desde então.\nInterpretação: Ele já me esqueceu e não se importa mais.',
    exercise: 'Complete mentalmente ou no seu caderno:\n1. O que aconteceu foi...\n2. O significado que minha mente deu foi...\n3. O que eu ainda não posso provar é...',
    action: 'Registre um acontecimento recente na Linha do Tempo usando apenas fatos observáveis na primeira frase.',
    reflectionPrompt: 'Qual interpretação ou medo está exercendo mais pressão nas minhas decisões hoje?',
    recommendedTool: 'Fato ou interpretação?',
  },
  {
    dayNumber: 2,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'A vontade de mandar mensagem',
    objective: 'Reconhecer o impulso como uma resposta de alívio temporário, e não como uma decisão madura.',
    durationMinutes: 4,
    bodyText: `A urgência de mandar mensagem raramente surge de um pensamento racional e planejado. Quase sempre, ela vem de um pico de angústia: o silêncio dói, a incerteza parece insuportável e seu cérebro busca um alívio imediato para saber se a outra pessoa ainda existe para você.

Mandar uma mensagem no impulso pode acalmar a ansiedade por dez minutos, mas logo em seguida gera um novo ciclo de agonia: "Por que ele visualizou e não respondeu?", "Será que fui boba?".

A vontade de falar não é uma ordem de execução. Você pode sentir saudade, vontade e dor sem precisar transformar isso em um envio no WhatsApp agora.`,
    example: 'Você sente uma pontada no peito às 22h e digita: "Podemos conversar rápido?". Ao enviar, a angústia não some; ela se multiplica enquanto espera os dois risquinhos ficarem azuis.',
    exercise: 'Quando o impulso vier, faça uma pausa de 90 segundos. Respire fundo três vezes e beba um copo de água antes de abrir o aplicativo de mensagens.',
    action: 'Abra a ferramenta "Quero falar com ele agora" para descarregar o que sente sem enviar.',
    reflectionPrompt: 'Se eu enviar essa mensagem agora, estou buscando resolver algo ou apenas aliviar minha angústia momentânea?',
    recommendedTool: 'Quero falar com ele agora',
  },
  {
    dayNumber: 3,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'O telefone não pode decidir seu dia',
    objective: 'Reduzir a checagem automática e recuperar o controle da sua atenção.',
    durationMinutes: 3,
    bodyText: `Checar o status online, olhar a foto de perfil, ver se o story foi visualizado. Esse comportamento é compreensível: seu cérebro está tentando monitorar uma ameaça de perda. 

No entanto, nenhuma dessas pequenas pistas virtuais responde à pergunta fundamental: se essa relação tem futuro com respeito e reciprocidade. 

Cada checagem alimenta o ciclo de ansiedade. Ao decidir conscientemente deixar o telefone em outro cômodo durante uma refeição ou durante um banho, você começa a retomar o comando do seu próprio espaço.`,
    example: 'Atualizar a tela a cada 5 minutos esperando uma notificação que não chega, transformando sua manhã em uma vigília exaustiva.',
    exercise: 'Escolha um bloco de 1 hora no dia de hoje para colocar o celular no silencioso e fora do seu campo de visão.',
    action: 'Defina limites digitais simples para a noite de hoje: não dormir com o celular ao lado do travesseiro.',
    reflectionPrompt: 'Quanto do meu dia hoje foi consumido esperando por um sinal da outra pessoa?',
    recommendedTool: 'Checklist: Limites Digitais',
  },
  {
    dayNumber: 4,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'O que você espera receber',
    objective: 'Identificar a expectativa oculta por trás de qualquer tentativa de contato.',
    durationMinutes: 5,
    bodyText: `Geralmente dizemos a nós mesmas: "Vou mandar só um 'oi' casual para saber se ele está bem". Mas, no fundo, a expectativa é muito maior: esperamos que ele responda dizendo que se arrependeu, que não para de pensar em nós e que quer voltar correndo.

Quando a resposta vem curta ou seca ("Tudo bem por aqui, e você?"), o impacto emocional é devastador.

Antes de pensar no que falar, é indispensável encarar a resposta que você está secretamente encomendando. Se você não está preparada para uma resposta fria ou para o silêncio, então o contato hoje é um risco alto demais para a sua estabilidade.`,
    example: 'Enviar uma foto de uma lembrança antiga esperando uma declaração apaixonada, e receber apenas um emoji de joinha.',
    exercise: "Pergunte-se: 'Se eu receber apenas ok ou se ele demorar 24 horas para responder, como ficarei?'. Se a resposta for desespero, espere.",
    action: 'Faça o teste na ferramenta "Devo mandar mensagem?" para avaliar sua prontidão.',
    reflectionPrompt: 'Estou preparada para lidar com qualquer resposta, inclusive com a ausência de resposta?',
    recommendedTool: 'Devo mandar mensagem?',
  },
  {
    dayNumber: 5,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Escrever sem enviar',
    objective: 'Criar espaço emocional e verbalizar sentimentos com total liberdade e zero risco.',
    durationMinutes: 4,
    bodyText: `Colocar os pensamentos no papel ou em um bloco de notas privado é uma das práticas mais terapêuticas que existem. Quando os sentimentos ficam apenas na cabeça, eles parecem um redemoinho gigante. Ao escrever, você dá contorno, peso e clareza ao que sente.

O segredo é escrever sem nenhum filtro: raiva, saudade, frustração, amor, mágoa. E ter a certeza inabalável de que aquilo NÃO será enviado.

Essa escrita cria um amortecedor entre a sua emoção e a sua ação. Você atende à necessidade de desabafar sem se expor e sem gerar ruído desnecessário com a outra pessoa.`,
    example: 'Escrever duas páginas de desabafo no seu diário privado e, uma hora depois, perceber que a vontade desesperada de mandar aquilo já diminuiu 80%.',
    exercise: 'Abra seu diário privado no app e responda: "Se eu pudesse dizer qualquer coisa sem consequências agora, o que eu diria?".',
    action: 'Escreva um registro no seu Diário Privado hoje.',
    reflectionPrompt: 'O que eu gostaria que ele entendesse que, talvez, ele ainda não tenha capacidade de compreender?',
    recommendedTool: 'Meu Diário',
  },
  {
    dayNumber: 6,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Sua rotina ainda existe',
    objective: 'Reconectar-se com uma ação pequena do cotidiano que devolve a sensação de chão.',
    durationMinutes: 4,
    bodyText: `No término, temos a impressão de que a nossa vida parou, enquanto o mundo continua girando. É normal perder o apetite, a vontade de se cuidar ou o foco no trabalho.

Você não precisa fingir que está tudo ótimo e nem tentar resolver a sua vida inteira hoje. A cura não vem de um grande salto heroico, mas da soma de pequenos gestos de dignidade cotidiana: uma caminhada curta, um copo d'água bem tomado, uma refeição feita com carinho, arrumar a própria cama.

Cada vez que você cuida de si mesma, você envia um sinal para o seu sistema nervoso: "Eu continuo aqui por mim".`,
    example: 'Mesmo sem vontade de sair, preparar um café da manhã gostoso e saborear sem mexer no celular durante 15 minutos.',
    exercise: 'Escolha uma única tarefa simples do seu dia que você estava adiando e cumpra-a nas próximas horas com calma.',
    action: 'Registre no check-in como você está cuidando da sua rotina hoje.',
    reflectionPrompt: 'Qual pequena coisa posso fazer por mim mesma hoje que nada tem a ver com meu ex?',
    recommendedTool: 'Check-in Diário',
  },
  {
    dayNumber: 7,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Revisão da primeira semana',
    objective: 'Reconhecer seus avanços, observar padrões de gatilho e fechar a fase de estabilização.',
    durationMinutes: 5,
    bodyText: `Parabéns por completar seus primeiros 7 passos. Você sobreviveu aos dias em que a tempestade emocional costuma ser mais intensa.

Olhe para trás com gentileza: você conteve impulsos, separou fatos de fantasias mentais e começou a dar espaço para si mesma. Não foi fácil, e você não precisa ter sido perfeita.

Agora começamos uma nova etapa. Saímos da urgência e entramos na fase de reposicionamento: é hora de olhar para a reciprocidade, para os limites e para a sua autonomia de longo prazo.`,
    example: 'Perceber que, embora ainda doa, você já não se sente tão desesperada para mandar mensagem quanto no primeiro dia.',
    exercise: 'Revise suas anotações no diário ou na linha do tempo e note um momento em que você conseguiu respirar antes de agir.',
    action: 'Comemore internamente ter chegado ao fim da Fase 1 e prepare-se para reposicionar sua postura.',
    reflectionPrompt: 'O que foi mais desafiador nesta semana e qual força descobri em mim que eu não lembrava que tinha?',
    recommendedTool: 'Minha Linha do Tempo',
  },

  // FASE 2: REPOSICIONAR (Dias 8-14)
  {
    dayNumber: 8,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Sua vida não precisa ficar em espera',
    objective: 'Retomar projetos e prioridades pessoais sem aguardar uma definição do outro.',
    durationMinutes: 4,
    bodyText: `Ficar "em espera" é paralisar decisões importantes na esperança de que uma mensagem ou atitude dele mude o rumo da sua vida. Você adia planos de viagem, cursos, encontros com amigas ou novas metas de trabalho porque "e se ele me procurar no fim de semana?".

Viver em compasso de espera entrega o volante da sua vida para outra pessoa. 

Você não precisa tomar decisões definitivas sobre o término hoje, mas precisa continuar vivendo o seu presente com intensidade e respeito por você.`,
    example: 'Recusar convites de amigos no sábado à noite na esperança secreta de que o ex apareça com uma mensagem de última hora.',
    exercise: 'Marque um compromisso ou atividade prazerosa para os próximos dias e mantenha-o, aconteça o que acontecer no telefone.',
    action: 'Abra a Biblioteca e leia o artigo "Voltar para a rotina".',
    reflectionPrompt: 'O que eu deixei em segundo plano nas últimas semanas que posso resgatar hoje?',
    recommendedTool: 'Biblioteca de Leituras',
  },
  {
    dayNumber: 9,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Fato ou interpretação nos pequenos sinais',
    objective: 'Aprender a não decifrar curtidas, stories e indiretas como declarações de intenção.',
    durationMinutes: 5,
    bodyText: `Ele postou uma música triste? Visualizou seu story em 2 minutos? Curtiu uma foto antiga?

No pós-término, qualquer movimento virtual parece um código secreto pronto para ser decifrado. Nós passamos horas analisando detalhes minúsculos para tentar descobrir o que ele está sentindo.

A verdade libertadora é: se uma pessoa quer construir algo maduro com você, ela fala com palavras claras e tem atitudes coerentes. Curtidas em redes sociais não são propostas de reconciliação. Não gaste sua energia tentando adivinhar intenções não declaradas.`,
    example: 'Ele curtir uma foto sua não significa "quero voltar". Significa apenas: ele tocou duas vezes na tela do celular.',
    exercise: 'Identifique a última "pista" que você tentou decifrar e anote apenas o fato concreto observável.',
    action: 'Use a ferramenta "Fato ou interpretação?" para analisar o cenário "Ele curtiu meu story".',
    reflectionPrompt: 'Estou procurando pistas porque quero esperança ou porque estou com medo de encarar a realidade?',
    recommendedTool: 'Fato ou interpretação?',
  },
  {
    dayNumber: 10,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Reciprocidade observável',
    objective: 'Avaliar a relação a partir das atitudes reais de ambas as partes, e não apenas do seu esforço.',
    durationMinutes: 5,
    bodyText: `Relacionamentos saudáveis são construídos em uma via de mão dupla. Muitas mulheres carregam a relação nas costas: são elas que puxam assunto, perguntam como o dia foi, perdoam ausências e tentam fazer a conversa render.

Reciprocidade observável é simples: há iniciativa dele na mesma medida? Ele demonstra curiosidade genuína pela sua vida? Ele cumpre o que combina?

Se todo o esforço de manter o vínculo vem unicamente de você, o que existe não é uma conexão a dois; é uma perseguição unilateral.`,
    example: 'Você manda textos longos e atenciosos; ele responde três horas depois com monossílabos ou respostas vagas.',
    exercise: 'Faça uma lista mental das últimas 3 conversas: quem iniciou? Quem fez perguntas? Quem manteve o interesse?',
    action: 'Leia o artigo "Reciprocidade no pós-término" na Biblioteca.',
    reflectionPrompt: 'Eu estou apaixonada pela pessoa real ou pela versão que eu fico tentando resgatar com meu próprio esforço?',
    recommendedTool: 'Biblioteca: Reciprocidade',
  },
  {
    dayNumber: 11,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Quando ele aparece e desaparece',
    objective: 'Compreender o contato intermitente e como ele alimenta a dependência emocional.',
    durationMinutes: 5,
    bodyText: `O contato intermitente é aquele padrão em que a pessoa surge cheia de carinho ou saudade, conversa por um dia, e depois desaparece no ar por uma semana.

Esse ritmo é um dos mais viciantes para o cérebro humano, pois funciona como uma máquina de caça-níqueis: a imprevisibilidade da recompensa mantém você hipervigilante e presa na esperança.

A consistência vale mais do que a intensidade esporádica. Quem realmente deseja estar na sua vida constrói presença, e não apenas aparições fantasmas quando bate o tédio.`,
    example: 'Ele manda mensagem carinhosa à 1h da manhã de domingo e passa a semana inteira sem responder nada.',
    exercise: 'Da próxima vez que ele aparecer do nada, não responda no impulso dos primeiros 5 minutos. Dê espaço para você respirar.',
    action: 'Consulte os modelos de mensagem para "Contato intermitente" no Laboratório de Mensagens.',
    reflectionPrompt: 'Por que eu aceito migalhas de atenção de alguém que não tem coragem de se comprometer?',
    recommendedTool: 'Laboratório de Mensagens',
  },
  {
    dayNumber: 12,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Limites digitais que protegem',
    objective: 'Estabelecer fronteiras digitais para estancar o sangramento emocional.',
    durationMinutes: 4,
    bodyText: `Colocar limites não é um ato de vingança nem um joguinho de desinteresse para "fazer ciúme". Colocar limites é um ato de autoproteção e cuidado com a sua saúde mental.

Se silenciar stories, desativar notificações, arquivar a conversa ou até restringir o perfil for o que você precisa para conseguir dormir em paz, faça isso sem culpa. 

Você não deve satisfação a ninguém sobre o que é necessário para cuidar do seu coração e manter a sua sanidade.`,
    example: 'Arquivar a conversa no WhatsApp para que o nome dele não fique visível toda vez que você abrir o app.',
    exercise: 'Escolha uma ação de proteção digital agora: silenciar o perfil dele nas redes ou arquivar o contato.',
    action: 'Marque no checklist de Limites Digitais o que você implementou hoje.',
    reflectionPrompt: 'O que ainda me impede de colocar uma barreira que me proteja?',
    recommendedTool: 'Checklist: Limites Digitais',
  },
  {
    dayNumber: 13,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Saudade não é decisão',
    objective: 'Diferenciar o sentimento legítimo da necessidade de mudar de atitude.',
    durationMinutes: 4,
    bodyText: `Sentir saudade é absolutamente natural. Você conviveu, compartilhou intimidades, riu e construiu histórias com essa pessoa. É esperado que o seu corpo e sua mente sintam a falta dessa presença.

No entanto, sentir saudade não significa que o relacionamento funcionava bem. Nem significa que vocês devem reatar.

Sentir falta da rotina de casal é diferente de querer aceitar de volta os problemas, as faltas de respeito ou a falta de compromisso que causaram o término. Abrace a saudade com carinho, mas mantenha seus pés firmes na realidade.`,
    example: 'Sentir saudade do abraço dele não apaga o fato de que vocês brigavam dia sim, dia não por falta de confiança.',
    exercise: 'Escreva: "Eu sinto saudade de... mas eu me lembro de que...". Deixe os dois sentimentos coexistirem.',
    action: 'Ouça o áudio reflexivo "Quando bate saudade à noite" na Biblioteca.',
    reflectionPrompt: 'Estou com saudade dele de verdade ou da sensação de estar acompanhada e segura?',
    recommendedTool: 'Áudio: Quando bate saudade',
  },
  {
    dayNumber: 14,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Revisão: o que mudou em você',
    objective: 'Comemorar o ponto médio da jornada e consolidar sua nova postura diante das situações.',
    durationMinutes: 5,
    bodyText: `Chegamos à metade do caminho! Há 14 dias você podia estar se sentindo completamente perdida e sem rumo. Hoje, você já possui ferramentas, repertório e lucidez para lidar com as situações.

Você já consegue ver a diferença entre reagir cegamente e responder com intenção. 

Nas próximas duas semanas, vamos focar em como tomar decisões conscientes se houver aproximação ou se você optar por abrir uma conversa de fechamento ou recomeço.`,
    example: 'Perceber que quando o telefone toca, seu coração não dispara mais da mesma forma desesperada de antes.',
    exercise: 'Faça um balanço de 3 atitudes que você teve nos últimos 14 dias das quais se orgulha.',
    action: 'Registre no seu Diário uma carta para você mesma celebrando sua evolução.',
    reflectionPrompt: 'Como a minha autoestima e minha postura mudaram desde o dia em que comecei este plano?',
    recommendedTool: 'Meu Diário',
  },

  // FASE 3: CONTATO COM INTENÇÃO (Dias 15-21)
  {
    dayNumber: 15,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Devo mandar mensagem?',
    objective: 'Passar por um crivo claro de intencionalidade antes de iniciar qualquer comunicação.',
    durationMinutes: 4,
    bodyText: `A pergunta "devo mandar mensagem?" nunca deve ser respondida no calor do momento. Ela depende do seu propósito real.

Existem três motivos legítimos para mandar mensagem:
1. Um assunto prático inadiável (ex: pertences, documentos, pets).
2. Um pedido sincero de desculpas por algo específico que você reconheceu, sem cobrar retorno.
3. Um convite maduro para conversar, sabendo exatamente o que quer dizer e preparada para uma recusa.

Qualquer mensagem enviada apenas para testar se ele responde ou para amenizar a solidão trará mais confusão do que clareza.`,
    example: 'Em vez de "Podemos conversar?", uma mensagem com propósito diz: "Preciso pegar minha chave reserva. Qual horário fica bom para você amanhã?".',
    exercise: 'Responda com honestidade: "Qual é o objetivo específico dessa mensagem em uma única frase?".',
    action: 'Abra a ferramenta "Devo mandar mensagem?" e siga o roteiro de decisão.',
    reflectionPrompt: 'Se ele não responder a essa mensagem, eu terei paz com a minha decisão de tê-la enviado?',
    recommendedTool: 'Devo mandar mensagem?',
  },
  {
    dayNumber: 16,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Uma mensagem com propósito',
    objective: 'Escrever de forma elegante, clara, concisa e sem joguinhos emocionais.',
    durationMinutes: 4,
    bodyText: `Mensagens longas, cheias de justificativas, cobranças ou declarações dramáticas costumam sobrecarregar quem recebe e expor quem envia.

A comunicação madura é breve, clara e respeitosa. Ela diz o que precisa ser dito sem agressividade e sem implorar por migalhas.

Quando você se comunica com clareza, você demonstra respeito por si mesma e dá ao outro a oportunidade de responder com o mesmo nível de maturidade.`,
    example: 'Evite desabafos de 10 parágrafos no WhatsApp. Prefira 2 frases objetivas e pontuais.',
    exercise: 'Escreva o rascunho de uma mensagem e corte 50% das palavras que não acrescentam valor prático.',
    action: 'Use o Laboratório de Mensagens para preparar e salvar seu rascunho com tranquilidade.',
    reflectionPrompt: 'O meu tom de voz nessa mensagem reflete a mulher segura e digna que eu desejo ser?',
    recommendedTool: 'Laboratório de Mensagens',
  },
  {
    dayNumber: 17,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Se ele me procurar',
    objective: 'Responder a um contato dele sem pressa e sem criar um filme de cinema na cabeça.',
    durationMinutes: 4,
    bodyText: `A notificação subiu: é ele. O coração bate rápido e a mão treme.

A primeira regra de ouro: você NÃO é obrigada a responder em 30 segundos. Respire. Beba água. Espere o choque passar.

Um "Oi, sumida" ou "Tudo bem?" é apenas uma sondagem casual. Não projete aí um pedido de casamento nem uma declaração de amor eterno. Responda com a mesma energia com que foi procurada: educada, calma e sem excesso de entusiasmo.`,
    example: 'Ele pergunta: "E aí, como estão as coisas?". Responder: "Tudo bem por aqui, e você?" mantém a elegância sem entregar o jogo todo.',
    exercise: 'Pratique esperar pelo menos 30 a 60 minutos antes de abrir a mensagem de um ex se ela não for uma emergência real.',
    action: 'Consulte o guia "Ele me chamou" no módulo de Apoio antes de responder.',
    reflectionPrompt: 'Eu estou respondendo com calma ou deixando a euforia tomar as rédeas da minha resposta?',
    recommendedTool: 'Ele me chamou',
  },
  {
    dayNumber: 18,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Resposta fria ou monossilábica',
    objective: 'Aprender a acolher o distanciamento do outro sem entrar em desespero ou cobrança.',
    durationMinutes: 4,
    bodyText: `Você enviou uma mensagem educada e ele respondeu de forma seca: "Beleza", "Depois vejo", ou demorou 18 horas para responder.

A tentação nessas horas é enviar: "Nossa, por que você está tão grosso?", "Aconteceu algo?".

Não faça isso. Uma resposta fria é uma resposta completa: ela comunica que o outro não tem disponibilidade ou interesse em aprofundar o contato neste momento. Aceite essa informação sem insistir. Deixe a conversa morrer ali com classe.`,
    example: 'Ele responde: "Valeu". Você apenas curte a mensagem ou responde "De nada" e encerra sem prolongar.',
    exercise: 'Respire fundo e repita para si mesma: "O desinteresse ou a frieza do outro não diminuem o meu valor".',
    action: 'Consulte o modelo editorial "Resposta fria" no Laboratório de Mensagens.',
    reflectionPrompt: 'Por que eu tento forçar calor em alguém que está escolhendo ser frio comigo?',
    recommendedTool: 'Laboratório de Mensagens',
  },
  {
    dayNumber: 19,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Silêncio após a mensagem',
    objective: 'Lidar com o não-retorno sem enviar mensagens consecutivas e sem se culpar.',
    durationMinutes: 5,
    bodyText: `O silêncio é a resposta mais difícil de digerir, mas também uma das mais reveladoras.

Quando enviamos uma mensagem e não recebemos retorno, a mente entra em parafuso criando desculpas: "Será que ele não viu?", "Será que perdeu o celular?". 

Na imensa maioria das vezes, a pessoa viu sim. Mandar uma segunda mensagem ("???" ou "Você viu?") só aumenta o desconforto e enfraquece a sua dignidade. O silêncio já disse tudo o que você precisava ouvir. Deixe ele soar.`,
    example: 'Não mande "Esquece" ou "Você nem responde, né?" depois de 5 horas sem resposta. Mantenha o silêncio.',
    exercise: 'Prometa a si mesma não enviar nenhuma mensagem adicional pelas próximas 48 horas se não houver resposta.',
    action: 'Leia o artigo "Como lidar com o silêncio depois de uma mensagem" na Biblioteca.',
    reflectionPrompt: 'O que o silêncio dele me diz sobre a prioridade que eu ocupo na vida dele hoje?',
    recommendedTool: 'Biblioteca de Leituras',
  },
  {
    dayNumber: 20,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Preparar uma conversa importante',
    objective: 'Organizar tópicos, limites e clareza mental antes de uma conversa presencial ou por telefone.',
    durationMinutes: 5,
    bodyText: `Se vocês marcaram de conversar sobre o que aconteceu ou sobre os termos do afastamento, vá com uma pauta clara em mente.

Conversas difíceis descarrilam quando nos perdemos no calor da discussão ou em cobranças do passado ("Você sempre fazia aquilo...").

Foque em três pontos: o que você sente, o que é inegociável para você e o que você propõe para o futuro imediato. Esteja disposta a ouvir sem interromper, mas firme para sustentar seus limites.`,
    example: 'Ir para a conversa sabendo exatamente: "Eu não quero voltar se não houver um compromisso com terapia ou diálogo".',
    exercise: 'Anote em 3 tópicos simples o que você não abre mão de esclarecer nessa conversa.',
    action: 'Consulte o Checklist "Antes de conversar" na Biblioteca.',
    reflectionPrompt: 'Qual é a conclusão que eu espero tirar desse encontro para a minha própria paz?',
    recommendedTool: 'Checklist: Antes de conversar',
  },
  {
    dayNumber: 21,
    phase: '03. Contato com intenção',
    phaseKey: 'contact',
    title: 'Revisão: contato e intenção',
    objective: 'Analisar as interações recentes e preparar a transição para a fase final de avaliação.',
    durationMinutes: 4,
    bodyText: `Você completou três semanas inteiras de reflexão, disciplina e autocuidado.

Agora você sabe que toda interação precisa ter propósito, que o silêncio também fala e que a sua dignidade vem antes da urgência de receber afeto.

Na última semana do plano, vamos tratar da pergunta definitiva: vale a pena uma reconciliação se a porta se abrir? E como seguir em frente com leveza se a resposta for não?`,
    example: 'Olhar para as conversas recentes e ver que você não se rebaixou em nenhuma delas.',
    exercise: 'Atualize sua Linha do Tempo com as interações mais marcantes dos últimos 7 dias.',
    action: 'Marque o Dia 21 como concluído e celebre 75% da jornada percorrida.',
    reflectionPrompt: 'Se ele me procurasse hoje querendo voltar, o que eu responderia de bate-pronto?',
    recommendedTool: 'Minha Linha do Tempo',
  },

  // FASE 4: RECIPROCIDADE E DECISÃO (Dias 22-28)
  {
    dayNumber: 22,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Interesse genuíno ou educação?',
    objective: 'Diferenciar simpatia superficial de um comprometimento real com a relação.',
    durationMinutes: 4,
    bodyText: `Muitas vezes confundimos boa educação com desejo de reconciliação. A pessoa pode ser simpática, responder com emojis fofos e até desejar um bom dia, mas sem nenhum movimento concreto para estar junto ou resolver pendências.

Simpatia não é compromisso. Educação não é amor.

Observe as atitudes que custam esforço: a pessoa se desloca para te ver? Ela assume compromissos e cumpre? Ela fala do futuro com você incluída? Olhe para os fatos práticos, não para os agrados virtuais.`,
    example: 'Ele responde todos os seus stories com carinho, mas quando você sugere um café, ele "está muito ocupado essa semana".',
    exercise: 'Analise as últimas duas semanas: quais foram os atos de compromisso reais que ele teve em relação a você?',
    action: 'Leia o artigo "Reciprocidade e Consistência" na Biblioteca.',
    reflectionPrompt: 'Eu estou supervalorizando pequenas gentilezas porque estou com fome de afeto?',
    recommendedTool: 'Biblioteca de Leituras',
  },
  {
    dayNumber: 23,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Palavras versus comportamento',
    objective: 'Analisar a consistência entre o que é prometido e o que é efetivamente vivido.',
    durationMinutes: 5,
    bodyText: `Promessas no pós-término são muito fáceis de fazer: "Eu vou mudar", "Eu percebi meus erros", "Com você é diferente".

No entanto, palavras sem mudança comportamental consistente são apenas ilusões momentâneas para aliviar a culpa.

Uma mudança real não se comprova em um discurso apaixonado na sexta-feira à noite. Ela se comprova ao longo de semanas e meses de respeito, escuta e atitudes diferentes. Dê tempo ao tempo e observe o comportamento.`,
    example: 'Ele diz que quer ser mais presente, mas some no primeiro fim de semana seguinte com os amigos.',
    exercise: 'Coloque em duas colunas: "O que ele prometeu" versus "O que ele realmente fez nas últimas 3 semanas".',
    action: 'Registre no Diário suas observações sobre a coerência dele.',
    reflectionPrompt: 'As atitudes dele combinam com as palavras que saem da boca dele?',
    recommendedTool: 'Meu Diário',
  },
  {
    dayNumber: 24,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Antes de se reencontrar',
    objective: 'Preparar a mente e o coração para um encontro presencial sem desmoronar seus avanços.',
    durationMinutes: 5,
    bodyText: `Vocês combinaram de se encontrar. É normal sentir borboletas no estômago, ansiedade e até vontade de caprichar na roupa.

Mas lembre-se: um reencontro não é um teste onde você precisa provar seu valor para ser escolhida de novo. É uma oportunidade para VOCÊ avaliar se essa pessoa ainda cabe na mulher que você está se tornando.

Escolha um lugar público e neutro, defina um horário limite para terminar o encontro e vá sem a obrigação de beijar, transar ou decidir nada naquela mesma noite.`,
    example: 'Combinar um café de 1 hora às 16h em vez de um jantar regado a vinho até as 2h da manhã na casa dele.',
    exercise: 'Defina seu limite principal para o encontro: "Hoje eu não vou para a casa dele, aconteça o que acontecer".',
    action: 'Consulte o checklist "Antes de se encontrar" na Biblioteca.',
    reflectionPrompt: 'O que eu preciso observar nele para saber se esse encontro foi saudável para mim?',
    recommendedTool: 'Checklist: Antes de se encontrar',
  },
  {
    dayNumber: 25,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Depois do reencontro',
    objective: 'Registrar sensações corporais e fatos observados logo após o encontro, antes que a mente idealize.',
    durationMinutes: 4,
    bodyText: `Depois do encontro, a mente tende a distorcer as coisas: pinçamos os momentos de carinho e esquecemos os momentos de frieza ou desconforto.

Logo após o encontro, antes de dormir, tire 10 minutos para registrar a verdade nua e crua. 

Como você se sentiu no seu corpo? Houve tensão? Ele te olhou nos olhos? As conversas fluíram ou pareciam forçadas? Ele perguntou sobre você ou só falou de si mesmo? Registre os fatos enquanto eles estão frescos na memória.`,
    example: 'Anotar: "Nós nos beijamos, mas quando toquei no assunto de compromisso, ele mudou de assunto e ficou tenso".',
    exercise: 'Preencha as notas do diário com a impressão real do encontro sem floreios românticos.',
    action: 'Adicione o evento "Encontro presencial" na sua Linha do Tempo com como você se sentiu.',
    reflectionPrompt: 'Eu saí desse encontro me sentindo valorizada e em paz ou confusa e ansiosa?',
    recommendedTool: 'Minha Linha do Tempo',
  },
  {
    dayNumber: 26,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Se ele quiser voltar',
    objective: 'Avaliar uma proposta de reconciliação com calma, critérios claros e sem impulsividade.',
    durationMinutes: 5,
    bodyText: `Ouvir "eu quero voltar" pode parecer a realização do maior desejo do seu coração. No entanto, voltar sem critérios é a receita perfeita para viver o mesmo término daqui a 3 meses.

Uma reconciliação verdadeira não é o retorno ao passado; é a construção de uma NOVA relação, com novas bases.

O que causou o término? Aquele problema foi superado ou continua exatamente igual? Vocês conseguem conversar abertamente sobre limites? Se a única coisa que mudou foi a saudade temporária, voltar trará as mesmas dores de antes.`,
    example: 'Não responder "sim!" de imediato. Responder: "Eu fico feliz que você tenha pensado sobre nós. Vamos conversar com calma sobre o que precisa ser diferente para nós dois".',
    exercise: 'Use o checklist "Antes de recomeçar" para analisar os 7 critérios indispensáveis de um retorno maduro.',
    action: 'Abra a ferramenta de apoio "Antes de recomeçar" e responda às perguntas reflexivas.',
    reflectionPrompt: 'O que precisaria mudar radicalmente para que essa relação fosse segura e saudável para mim?',
    recommendedTool: 'Checklist: Antes de recomeçar',
  },
  {
    dayNumber: 27,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Quando não há reciprocidade',
    objective: 'Acolher a realidade do encerramento com dignidade e respeito por si mesma.',
    durationMinutes: 5,
    bodyText: `Talvez você tenha observado os fatos e concluído que, infelizmente, não há reciprocidade. A outra pessoa fez a escolha dela de seguir outro caminho, ou não tem maturidade e vontade para construir algo com você.

Essa conclusão dói, mas ela traz uma libertação imensa. Não há mais pelo que esperar, não há mais pistas para decifrar, não há mais joguinhos.

A não-reciprocidade dele não é um atestado de defeito em você. É apenas a constatação de que os caminhos se desencontraram. Ao soltar quem não quer ficar, você abre espaço para a sua própria vida florescer.`,
    example: 'Dizer a si mesma: "Eu amei, eu tentei com maturidade, mas agora é hora de honrar a mim mesma e soltar".',
    exercise: 'Escreva uma mensagem de despedida simbólica no seu Diário (para nunca enviar) fechando esse ciclo.',
    action: 'Leia o artigo "Quando seguir em frente passa a ser uma possibilidade" na Biblioteca.',
    reflectionPrompt: 'O que eu ganho de volta quando paro de implorar pelo amor de quem não me valoriza?',
    recommendedTool: 'Biblioteca de Leituras',
  },
  {
    dayNumber: 28,
    phase: '04. Reciprocidade e decisão',
    phaseKey: 'reciprocity',
    title: 'Seu próximo ciclo: clareza e autonomia',
    objective: 'Celebrar a conclusão do plano de 28 dias e assumir as rédeas do seu próprio destino.',
    durationMinutes: 5,
    bodyText: `Você completou o seu plano de 28 dias de pós-término no Florecer!

Olhe para onde você estava no Dia 1 e olhe para a mulher que você é agora: mais consciente, mais firme, com domínio dos seus pensamentos e muito mais conectada com o que merece.

Seja decidindo tentar um recomeço consciente e sem ingenuidade, seja decidindo seguir em frente e virar a página, você agora tem algo que ninguém pode te tirar: CLAREZA. 

Você não precisa mais agir no desespero. Você aprendeu a respirar, a separar fatos de medos e a escolher a si mesma.`,
    example: 'Sentir uma paz no peito e saber que o seu futuro é luminoso e pertence exclusivamente a você.',
    exercise: 'Revise todas as suas conquistas nas estatísticas da aba "Você" e leia suas primeiras anotações.',
    action: 'Marque o 28º dia como concluído e continue usando o Florecer sempre que precisar de um ponto de apoio.',
    reflectionPrompt: 'Qual é a maior lição que levarei comigo dessa jornada de volta para mim mesma?',
    recommendedTool: 'Aba Você: Estatísticas',
  },
];
