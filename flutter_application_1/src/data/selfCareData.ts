// Conteúdo das ferramentas de autocuidado do Florecer

export const AFFIRMATIONS: string[] = [
  'Eu mereço um amor que não me faça duvidar do meu valor.',
  'Hoje eu escolho a minha paz antes de qualquer resposta.',
  'O meu valor não diminui pela incapacidade de alguém de enxergá-lo.',
  'Eu posso sentir saudade e ainda assim escolher o que é melhor para mim.',
  'Cada dia que eu me respeito é um dia de vitória.',
  'Não preciso de pressa. Meu coração está se reorganizando no tempo certo.',
  'Eu sou inteira, mesmo quando me sinto em pedaços.',
  'O que é meu encontra o caminho até mim sem que eu precise implorar.',
  'Eu me permito florescer, mesmo depois do inverno.',
  'Minha história não termina aqui. Este é só um novo capítulo.',
  'Eu escolho agir com dignidade, não com desespero.',
  'Sou suficiente exatamente como sou.',
  'Hoje eu cuido de mim como eu cuidaria de quem eu amo.',
  'A clareza chega quando eu paro de correr atrás de respostas.',
  'Eu solto o que não posso controlar e abraço o que depende de mim.',
  'Meu brilho não depende da presença de ninguém.',
  'Eu sou a pessoa mais importante da minha própria vida.',
  'Ser gentil comigo mesma também é um ato de coragem.',
  'Eu confio na mulher que estou me tornando.',
  'Tudo bem não estar bem. Tudo bem recomeçar quantas vezes for preciso.',
  'O amor-próprio é a base de qualquer amor que eu venha a viver.',
  'Eu respiro, eu me acalmo, eu me escolho.',
  'Não sou o que aconteceu comigo. Sou o que escolho fazer a partir disso.',
  'Minha paz vale mais do que qualquer mensagem não respondida.',
  'Estou aprendendo a ser o meu próprio lugar seguro.',
  'Eu floresço no meu ritmo, e o meu ritmo é perfeito.',
  'Hoje eu me orgulho de cada pequeno passo que dei.',
  'Eu deixo ir com amor e abro espaço para o novo.',
];

export interface SelfCareHabit {
  id: string;
  label: string;
  emoji: string;
}

export const SELF_CARE_HABITS: SelfCareHabit[] = [
  { id: 'agua', label: 'Bebi água', emoji: '💧' },
  { id: 'sono', label: 'Dormi bem', emoji: '😴' },
  { id: 'movimento', label: 'Mexi o corpo', emoji: '🧘‍♀️' },
  { id: 'sem-checar', label: 'Não chequei o perfil dele', emoji: '📵' },
  { id: 'gentileza', label: 'Fui gentil comigo', emoji: '💗' },
  { id: 'amiga', label: 'Falei com alguém querido', emoji: '👯‍♀️' },
];

export const NO_CONTACT_MILESTONES = [1, 3, 7, 14, 21, 30, 60, 90];

export const getMilestoneMessage = (days: number): string => {
  if (days === 0) return 'Hoje é o primeiro dia. Você já começou e isso é enorme.';
  if (days < 3) return 'Os primeiros dias são os mais difíceis. Você está indo muito bem.';
  if (days < 7) return 'Seu corpo já está se acostumando a não depender da resposta dele.';
  if (days < 14) return 'Uma semana inteira se escolhendo. Que orgulho!';
  if (days < 21) return 'Sua mente está mais clara. Você já respira diferente.';
  if (days < 30) return 'Três semanas! Você está criando um novo hábito: você.';
  if (days < 60) return 'Um mês de força e dignidade. Você é inspiração.';
  return 'Você floresceu. Sua paz agora é sua casa.';
};

export interface SelfCareBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const SELF_CARE_BADGES: SelfCareBadge[] = [
  {
    id: 'badge-inicio',
    title: 'Semente Plantada',
    description: 'Iniciou a jornada no Florecer e deu o primeiro passo por si mesma.',
    icon: '🌱',
    color: '#E8F5ED',
  },
  {
    id: 'badge-respiro',
    title: 'Mente Serena',
    description: 'Completou um ciclo de respiração guiada para acalmar o coração.',
    icon: '🫁',
    color: '#FFE4EE',
  },
  {
    id: 'badge-carta',
    title: 'Pétalas ao Vento',
    description: 'Escreveu e soltou uma carta que não precisava ser enviada.',
    icon: '✉️',
    color: '#FFF6E6',
  },
  {
    id: 'badge-habitos',
    title: 'Florescer Completo',
    description: 'Cumpriu todos os 6 micro-hábitos de autocuidado em um único dia.',
    icon: '🌸',
    color: '#FFE1EC',
  },
  {
    id: 'badge-3dias',
    title: 'Soberania Inicial',
    description: 'Completou 3 dias consecutivos se escolhendo sem contato.',
    icon: '🔥',
    color: '#FDECEC',
  },
  {
    id: 'badge-7dias',
    title: 'Mulher Magnética',
    description: 'Uma semana inteira preservando sua dignidade e valor.',
    icon: '👑',
    color: '#FFF0F5',
  },
  {
    id: 'badge-guardia',
    title: 'Guardiã da Paz',
    description: 'Guardou 3 ou mais afirmações de força no seu coração.',
    icon: '✨',
    color: '#FCF6EA',
  },
];
