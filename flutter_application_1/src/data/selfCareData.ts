// Contenido de las herramientas de autocuidado de Florecer

export const AFFIRMATIONS: string[] = [
  'Merezco un amor que no me haga dudar de mi valor.',
  'Hoy elijo mi paz antes de cualquier respuesta.',
  'Mi valor no disminuye por la incapacidad de alguien de verlo.',
  'Puedo extrañar a alguien y aun así elegir lo que es mejor para mí.',
  'Cada día que me respeto es un día de victoria.',
  'No necesito prisa. Mi corazón se está reorganizando en su momento justo.',
  'Estoy completa, incluso cuando siento que estoy en pedazos.',
  'Lo que es para mí encuentra el camino hacia mí sin que tenga que rogar.',
  'Me permito florecer, incluso después del invierno.',
  'Mi historia no termina aquí. Este es solo un nuevo capítulo.',
  'Elijo actuar con dignidad, no con desesperación.',
  'Soy suficiente exactamente como soy.',
  'Hoy cuido de mí como cuidaría de quien amo.',
  'La claridad llega cuando dejo de perseguir respuestas.',
  'Suelto lo que no puedo controlar y abrazo lo que depende de mí.',
  'Mi brillo no depende de la presencia de nadie.',
  'Soy la persona más importante de mi propia vida.',
  'Ser amable conmigo misma también es un acto de valentía.',
  'Confío en la mujer en la que me estoy convirtiendo.',
  'Está bien no estar bien. Está bien recomenzar tantas veces como sea necesario.',
  'El amor propio es la base de cualquier amor que vaya a vivir.',
  'Respiro, me calmo, me elijo.',
  'No soy lo que me pasó. Soy lo que elijo hacer a partir de esto.',
  'Mi paz vale más que cualquier mensaje sin responder.',
  'Estoy aprendiendo a ser mi propio lugar seguro.',
  'Florezco a mi ritmo, y mi ritmo es perfecto.',
  'Hoy me enorgullezco de cada pequeño paso que di.',
  'Dejo ir con amor y abro espacio para lo nuevo.',
];

export interface SelfCareHabit {
  id: string;
  label: string;
  emoji: string;
}

export const SELF_CARE_HABITS: SelfCareHabit[] = [
  { id: 'agua', label: 'Bebí agua', emoji: '💧' },
  { id: 'sono', label: 'Dormí bien', emoji: '😴' },
  { id: 'movimento', label: 'Moví el cuerpo', emoji: '🧘‍♀️' },
  { id: 'sem-checar', label: 'No revisé su perfil', emoji: '📵' },
  { id: 'gentileza', label: 'Fui amable conmigo', emoji: '💗' },
  { id: 'amiga', label: 'Hablé con alguien querido', emoji: '👯‍♀️' },
];

export const NO_CONTACT_MILESTONES = [1, 3, 7, 14, 21, 30, 60, 90];

export const getMilestoneMessage = (days: number): string => {
  if (days === 0) return 'Hoy es el primer día. Ya comenzaste y eso es enorme.';
  if (days < 3) return 'Los primeros días son los más difíciles. Lo estás haciendo muy bien.';
  if (days < 7) return 'Tu cuerpo ya se está acostumbrando a no depender de su respuesta.';
  if (days < 14) return 'Una semana entera eligiéndote. ¡Qué orgullo!';
  if (days < 21) return 'Tu mente está más clara. Ya respiras de forma diferente.';
  if (days < 30) return '¡Tres semanas! Estás creando un nuevo hábito: tú.';
  if (days < 60) return 'Un mes de fuerza y dignidad. Eres inspiración.';
  return 'Has florecido. Tu paz ahora es tu hogar.';
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
    title: 'Semilla Plantada',
    description: 'Inició la jornada en Florecer y dio el primer paso por sí misma.',
    icon: '🌱',
    color: '#E8F5ED',
  },
  {
    id: 'badge-respiro',
    title: 'Mente Serena',
    description: 'Completó un ciclo de respiración guiada para calmar el corazón.',
    icon: '🫁',
    color: '#FFE4EE',
  },
  {
    id: 'badge-carta',
    title: 'Pétalos al Viento',
    description: 'Escribió y soltó una carta que no necesitaba ser enviada.',
    icon: '✉️',
    color: '#FFF6E6',
  },
  {
    id: 'badge-habitos',
    title: 'Florecer Completo',
    description: 'Cumplió los 6 microhábitos de autocuidado en un solo día.',
    icon: '🌸',
    color: '#FFE1EC',
  },
  {
    id: 'badge-3dias',
    title: 'Soberanía Inicial',
    description: 'Completó 3 días consecutivos eligiéndose sin contacto.',
    icon: '🔥',
    color: '#FDECEC',
  },
  {
    id: 'badge-7dias',
    title: 'Mujer Magnética',
    description: 'Una semana entera preservando su dignidad y valor.',
    icon: '👑',
    color: '#FFF0F5',
  },
  {
    id: 'badge-guardia',
    title: 'Guardiana de la Paz',
    description: 'Guardó 3 o más afirmaciones de fuerza en su corazón.',
    icon: '✨',
    color: '#FCF6EA',
  },
];
