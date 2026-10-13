import { JourneyDay } from '../types';

export const JOURNEY_DAYS: JourneyDay[] = [
  // FASE 1: ESTABILIZAR (Días 1-7)
  {
    dayNumber: 1,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Lo que sucedió de hecho',
    objective: 'Separar los acontecimientos observables de las interpretaciones que surgen tras la ruptura.',
    durationMinutes: 4,
    bodyText: `Cuando una relación cambia, es común que los hechos y los significados se mezclen. "Él no respondió desde ayer" es un hecho observable. "Él no respondió porque ya no le importo" es una interpretación.

La interpretación puede parecer convincente, pero aún no tienes acceso directo a la intención de otra persona. Cuando tratamos una hipótesis como una certeza absoluta, empieza a dictar conductas impulsivas: mandar otro mensaje, borrar conversaciones, bloquear, desbloquear o revisar redes sociales.

Hoy no necesitamos decidir el futuro de la relación. El primer paso es solo organizar lo que realmente sabemos. Piensa en la última interacción: ¿qué registraría una cámara de video? ¿Quién habló? ¿Qué se dijo con exactitud? ¿Hubo silencio? Quédate solo con lo que se puede comprobar.`,
    example: 'Hecho: Dijo que necesitaba unos días y no ha enviado mensajes desde entonces.\nInterpretación: Ya me olvidó y ya no le importo.',
    exercise: 'Completa mentalmente o en tu libreta:\n1. Lo que sucedió fue...\n2. El significado que mi mente le dio fue...\n3. Lo que aún no puedo demostrar es...',
    action: 'Registra un acontecimiento reciente en la Línea de Tiempo usando solo hechos observables en la primera frase.',
    reflectionPrompt: '¿Qué interpretación o miedo está ejerciendo más presión sobre mis decisiones hoy?',
    recommendedTool: '¿Hecho o interpretación?',
  },
  {
    dayNumber: 2,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'El impulso de mandar mensaje',
    objective: 'Reconocer el impulso como una respuesta de alivio temporal, y no como una decisión madura.',
    durationMinutes: 4,
    bodyText: `La urgencia de enviar un mensaje rara vez proviene de un pensamiento racional y planificado. Casi siempre nace de un pico de angustia: el silencio duele, la incertidumbre parece insoportable y tu cerebro busca un alivio inmediato para saber si la otra persona aún existe para ti.

Enviar un mensaje por impulso puede calmar la ansiedad durante diez minutos, pero de inmediato genera un nuevo ciclo de angustia: "¿Por qué lo vio y no respondió?", "¿Habré sido tonta?".

El deseo de hablar no es una orden de ejecución. Puedes sentir nostalgia, ganas y dolor sin tener que convertir eso en un mensaje de WhatsApp ahora.`,
    example: 'Sientes una opresión en el pecho a las 22:00 y escribes: "¿Podemos hablar rápido?". Al enviarlo, la angustia no desaparece; se multiplica mientras esperas que las dos tildes se pongan azules.',
    exercise: 'Cuando llegue el impulso, haz una pausa de 90 segundos. Respira hondo tres veces y bebe un vaso de agua antes de abrir la aplicación de mensajes.',
    action: 'Abre la herramienta "Quiero hablar con él ahora" para desahogar lo que sientes sin enviar nada.',
    reflectionPrompt: 'Si envío este mensaje ahora, ¿estoy buscando resolver algo o solo aliviar mi angustia momentánea?',
    recommendedTool: 'Quiero hablar con él ahora',
  },
  {
    dayNumber: 3,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'El teléfono no puede decidir tu día',
    objective: 'Reducir la revisión automática y recuperar el control de tu atención.',
    durationMinutes: 3,
    bodyText: `Revisar la última conexión, mirar la foto de perfil, ver si miró la historia. Este comportamiento es comprensible: tu cerebro está intentando monitorear una amenaza de pérdida.

Sin embargo, ninguna de estas pequeñas pistas virtuales responde a la pregunta fundamental: si esta relación tiene futuro con respeto y reciprocidad.

Cada revisión alimenta el ciclo de ansiedad. Al decidir conscientemente dejar el teléfono en otra habitación durante una comida o mientras te bañas, comienzas a recuperar el control de tu propio espacio.`,
    example: 'Actualizar la pantalla cada 5 minutos esperando una notificación que no llega, convirtiendo tu mañana en una vigilia agotadora.',
    exercise: 'Elige un bloque de 1 hora hoy para poner el celular en silencio y fuera de tu campo visual.',
    action: 'Define límites digitales simples para esta noche: no dormir con el celular junto a la almohada.',
    reflectionPrompt: '¿Cuánto de mi día de hoy se consumió esperando una señal de la otra persona?',
    recommendedTool: 'Checklist: Límites Digitales',
  },
  {
    dayNumber: 4,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Lo que esperas recibir',
    objective: 'Identificar la expectativa oculta detrás de cualquier intento de contacto.',
    durationMinutes: 5,
    bodyText: `Solemos decirnos: "Solo voy a mandar un 'hola' casual para saber si está bien". Pero, en el fondo, la expectativa es mucho mayor: esperamos que responda diciendo que se arrepintió, que no deja de pensar en nosotras y que quiere volver de inmediato.

Cuando la respuesta es breve o fría ("Todo bien por aquí, ¿y tú?"), el impacto emocional es devastador.

Antes de pensar en qué decir, es indispensable encarar la respuesta que estás pidiendo en secreto. Si no estás preparada para una respuesta fría o para el silencio, el contacto hoy es un riesgo demasiado alto para tu estabilidad.`,
    example: 'Enviar una foto de un recuerdo antiguo esperando una declaración apasionada y recibir solo un emoji con el pulgar arriba.',
    exercise: "Pregúntate: 'Si recibo solo un ok o si tarda 24 horas en responder, ¿cómo me sentiré?'. Si la respuesta es desesperación, espera.",
    action: 'Haz el test en la herramienta "¿Debo enviar mensaje?" para evaluar tu disposición.',
    reflectionPrompt: '¿Estoy preparada para lidiar con cualquier respuesta, incluida la ausencia de respuesta?',
    recommendedTool: '¿Debo enviar mensaje?',
  },
  {
    dayNumber: 5,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Escribir sin enviar',
    objective: 'Crear espacio emocional y verbalizar sentimientos con total libertad y cero riesgo.',
    durationMinutes: 4,
    bodyText: `Poner los pensamientos en papel o en un bloc de notas privado es una de las prácticas más terapéuticas que existen. Cuando los sentimientos se quedan solo en la cabeza, parecen un torbellino gigante. Al escribir, les das contorno, peso y claridad.

El secreto es escribir sin ningún filtro: rabia, nostalgia, frustración, amor, dolor. Y tener la certeza inquebrantable de que eso NO se enviará.

Esta escritura crea un colchón entre tu emoción y tu acción. Atiendes la necesidad de desahogarte sin exponerte y sin generar ruido innecesario con la otra persona.`,
    example: 'Escribir dos páginas de desahogo en tu diario privado y, una hora después, notar que las ganas desesperadas de mandarlo disminuyeron un 80%.',
    exercise: 'Abre tu diario privado en la app y responde: "Si pudiera decir cualquier cosa sin consecuencias ahora, ¿qué diría?".',
    action: 'Escribe una entrada en tu Diario Privado hoy.',
    reflectionPrompt: '¿Qué me gustaría que él entendiera que, tal vez, aún no tiene la capacidad de comprender?',
    recommendedTool: 'Mi Diario',
  },
  {
    dayNumber: 6,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Tu rutina aún existe',
    objective: 'Reconectar con una acción pequeña de lo cotidiano que devuelva la sensación de estabilidad.',
    durationMinutes: 4,
    bodyText: `En una ruptura tenemos la impresión de que nuestra vida se detuvo, mientras el mundo sigue girando. Es normal perder el apetito, las ganas de arreglarse o la concentración en el trabajo.

No necesitas fingir que todo está perfecto ni intentar resolver toda tu vida hoy. La sanación no proviene de un gran salto heroico, sino de la suma de pequeños gestos de dignidad diaria: una caminata corta, un vaso de agua tomado con calma, una comida preparada con cariño, tender tu cama.

Cada vez que cuidas de ti misma, le envías una señal a tu sistema nervioso: "Sigo aquí para mí".`,
    example: 'Incluso sin ganas de salir, preparar un desayuno rico y disfrutarlo sin tocar el celular durante 15 minutos.',
    exercise: 'Elige una sola tarea simple de tu día que hayas estado posponiendo y cúmplela en las próximas horas con tranquilidad.',
    action: 'Registra en el check-in cómo estás cuidando tu rutina hoy.',
    reflectionPrompt: '¿Qué pequeña cosa puedo hacer por mí misma hoy que no tenga nada que ver con mi ex?',
    recommendedTool: 'Check-in Diario',
  },
  {
    dayNumber: 7,
    phase: '01. Estabilizar',
    phaseKey: 'stabilize',
    title: 'Revisión de la primera semana',
    objective: 'Reconocer tus avances, observar detonantes y cerrar la fase de estabilización.',
    durationMinutes: 5,
    bodyText: `¡Felicitaciones por completar tus primeros 7 pasos! Has sobrevivido a los días en que la tormenta emocional suele ser más intensa.

Mira hacia atrás con amabilidad: contuviste impulsos, separaste hechos de fantasías mentales y empezaste a darte espacio. No fue fácil, y no tenías que haber sido perfecta.

Ahora comenzamos una nueva etapa. Salimos de la urgencia y entramos en la fase de reposicionamiento: es momento de mirar la reciprocidad, los límites y tu autonomía a largo plazo.`,
    example: 'Notar que, aunque todavía duele, ya no te sientes tan desesperada por mandar mensaje como en el primer día.',
    exercise: 'Revisa tus notas en el diario o en la línea de tiempo y recuerda un momento en que lograste respirar antes de actuar.',
    action: 'Celebra internamente haber llegado al final de la Fase 1 y prepárate para reposicionar tu postura.',
    reflectionPrompt: '¿Qué fue lo más desafiante de esta semana y qué fortaleza descubrí en mí que no recordaba tener?',
    recommendedTool: 'Mi Línea de Tiempo',
  },

  // FASE 2: REPOSICIONAR (Días 8-14)
  {
    dayNumber: 8,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Tu vida no tiene que quedarse en pausa',
    objective: 'Retomar proyectos y prioridades personales sin esperar una definición del otro.',
    durationMinutes: 4,
    bodyText: `Quedarse "en pausa" es paralizar decisiones importantes con la esperanza de que un mensaje o actitud de él cambie el rumbo de tu vida. Pospones viajes, cursos, salidas con amigas o metas de trabajo pensando "¿y si me busca el fin de semana?".

Vivir en espera le entrega el volante de tu vida a otra persona.

No necesitas tomar decisiones definitivas sobre la ruptura hoy, pero sí necesitas seguir viviendo tu presente con intensidad y respeto hacia ti misma.`,
    example: 'Rechazar invitaciones de amigos el sábado por la noche con la esperanza secreta de que aparezca con un mensaje de última hora.',
    exercise: 'Agenda un compromiso o actividad agradable para los próximos días y mantenlo, pase lo que pase en el teléfono.',
    action: 'Abre la Biblioteca y lee el artículo "Volver a tu rutina".',
    reflectionPrompt: '¿Qué dejé en segundo plano en las últimas semanas que puedo rescatar hoy?',
    recommendedTool: 'Biblioteca de Lecturas',
  },
  {
    dayNumber: 9,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Hecho o interpretación en las pequeñas señales',
    objective: 'Aprender a no descifrar likes, historias e indirectas como declaraciones de intención.',
    durationMinutes: 5,
    bodyText: `¿Publicó una canción triste? ¿Vio tu historia en 2 minutos? ¿Le dio like a una foto antigua?

Tras la ruptura, cualquier movimiento virtual parece un código secreto listo para ser descifrado. Pasamos horas analizando detalles minúsculos para adivinar qué siente.

La verdad liberadora es: si una persona quiere construir algo maduro contigo, habla con palabras claras y tiene actitudes coherentes. Los likes en redes sociales no son propuestas de reconciliación. No gastes tu energía tratando de adivinar intenciones que no han sido declaradas.`,
    example: 'Que le dé like a una foto tuya no significa "quiero volver". Significa únicamente: tocó dos veces la pantalla del teléfono.',
    exercise: 'Identifica la última "pista" que intentaste descifrar y anota solo el hecho concreto observable.',
    action: 'Usa la herramienta "¿Hecho o interpretación?" para analizar el escenario "Él le dio like a mi historia".',
    reflectionPrompt: '¿Estoy buscando pistas porque quiero esperanza o porque tengo miedo de encarar la realidad?',
    recommendedTool: '¿Hecho o interpretación?',
  },
  {
    dayNumber: 10,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Reciprocidad observable',
    objective: 'Evaluar la relación a partir de actitudes reales de ambas partes, y no solo de tu esfuerzo.',
    durationMinutes: 5,
    bodyText: `Las relaciones sanas se construyen en una calle de doble sentido. Muchas mujeres cargan la relación sobre sus hombros: son quienes inician la conversación, preguntan cómo estuvo el día, perdonan ausencias e intentan sostener el vínculo.

La reciprocidad observable es simple: ¿hay iniciativa de su parte en la misma medida? ¿Demuestra curiosidad genuina por tu vida? ¿Cumple lo que acuerda?

Si todo el esfuerzo de mantener el lazo viene únicamente de ti, lo que existe no es una conexión de dos; es una persecución unilateral.`,
    example: 'Tú envías mensajes largos y atentos; él responde tres horas después con monosílabos o evasivas.',
    exercise: 'Haz una lista mental de las últimas 3 conversaciones: ¿quién inició? ¿Quién preguntó? ¿Quién mantuvo el interés?',
    action: 'Lee el artículo "Reciprocidad en el post-ruptura" en la Biblioteca.',
    reflectionPrompt: '¿Estoy enamorada de la persona real o de la versión que intento rescatar con mi propio esfuerzo?',
    recommendedTool: 'Biblioteca: Reciprocidad',
  },
  {
    dayNumber: 11,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Cuando él aparece y desaparece',
    objective: 'Comprender el contacto intermitente y cómo alimenta la dependencia emocional.',
    durationMinutes: 5,
    bodyText: `El contacto intermitente es ese patrón en el que la persona aparece llena de cariño o nostalgia, conversa por un día y luego se esfuma durante una semana.

Este ritmo es uno de los más adictivos para el cerebro humano, pues funciona como una máquina tragamonedas: la imprevisibilidad de la recompensa te mantiene hipervigilante y atrapada en la esperanza.

La consistencia vale más que la intensidad esporádica. Quien realmente desea estar en tu vida construye presencia, no solo apariciones fantasma cuando el aburrimiento aprieta.`,
    example: 'Envía un mensaje cariñoso a la 1:00 de la madrugada del domingo y pasa toda la semana sin responder nada.',
    exercise: 'La próxima vez que aparezca de la nada, no respondas en el impulso de los primeros 5 minutos. Date espacio para respirar.',
    action: 'Consulta los modelos de mensaje para "Contacto intermitente" en el Laboratorio de Mensajes.',
    reflectionPrompt: '¿Por qué acepto migajas de atención de alguien que no tiene la valentía de comprometerse?',
    recommendedTool: 'Laboratorio de Mensajes',
  },
  {
    dayNumber: 12,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Límites digitales que protegen',
    objective: 'Establecer fronteras digitales para detener el desgaste emocional.',
    durationMinutes: 4,
    bodyText: `Poner límites no es un acto de venganza ni un juego de desinterés para "dar celos". Poner límites es un acto de autoprotección y cuidado hacia tu salud mental.

Si silenciar historias, desactivar notificaciones, archivar la conversación o incluso restringir el perfil es lo que necesitas para dormir en paz, hazlo sin culpa.

No le debes explicaciones a nadie sobre lo que necesitas para cuidar tu corazón y mantener tu serenidad.`,
    example: 'Archivar la conversación en WhatsApp para que su nombre no esté visible cada vez que abras la aplicación.',
    exercise: 'Elige una acción de protección digital ahora: silenciar su perfil en redes o archivar su contacto.',
    action: 'Marca en el checklist de Límites Digitales lo que implementaste hoy.',
    reflectionPrompt: '¿Qué me impide aún poner una barrera que me proteja?',
    recommendedTool: 'Checklist: Límites Digitales',
  },
  {
    dayNumber: 13,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Extrañar no es decidir',
    objective: 'Diferenciar el sentimiento legítimo de la necesidad de cambiar de actitud.',
    durationMinutes: 4,
    bodyText: `Extrañar es absolutamente natural. Conviviste, compartiste intimidades, reíste y construiste historias con esa persona. Es de esperar que tu cuerpo y tu mente sientan la falta de su presencia.

Sin embargo, extrañar no significa que la relación funcionaba bien. Ni significa que deban volver.

Echar de menos la rutina de pareja es muy diferente a querer aceptar de vuelta los problemas, las faltas de respeto o la falta de compromiso que causaron el final. Abraza la nostalgia con ternura, pero mantén tus pies firmes en la realidad.`,
    example: 'Extrañar sus abrazos no borra el hecho de que discutían un día sí y otro también por falta de confianza.',
    exercise: 'Escribe: "Extraño a... pero recuerdo que...". Deja que ambos sentimientos coexistan.',
    action: 'Escucha el audio reflexivo "Cuando da nostalgia por la noche" en la Biblioteca.',
    reflectionPrompt: '¿Lo extraño a él de verdad o extraño la sensación de estar acompañada y segura?',
    recommendedTool: 'Audio: Cuando da nostalgia',
  },
  {
    dayNumber: 14,
    phase: '02. Reposicionar',
    phaseKey: 'reposition',
    title: 'Revisión: lo que cambió en ti',
    objective: 'Celebrar el punto medio del plan y consolidar tu nueva postura ante las situaciones.',
    durationMinutes: 5,
    bodyText: `¡Llegamos a la mitad del camino! Hace 14 días podías sentirte completamente perdida y sin rumbo. Hoy ya cuentas con herramientas, repertorio y lucidez para gestionar las situaciones.

Ya logras ver la diferencia entre reaccionar a ciegas y responder con intención.

En las próximas dos semanas, nos enfocaremos en cómo tomar decisiones conscientes si hay acercamientos o si decides abrir una conversación de cierre o de recomenzar.`,
    example: 'Notar que cuando suena el teléfono, tu corazón ya no se acelera con la misma desesperación de antes.',
    exercise: 'Haz un balance de 3 actitudes que tuviste en los últimos 14 días de las que te sientas orgullosa.',
    action: 'Registra en tu Diario una carta para ti misma celebrando tu evolución.',
    reflectionPrompt: '¿Cómo cambiaron mi autoestima y mi postura desde el día en que comencé este plan?',
    recommendedTool: 'Mi Diario',
  },

  // FASE 3: CONTACTO CON INTENCIÓN (Días 15-21)
  {
    dayNumber: 15,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: '¿Debo mandar mensaje?',
    objective: 'Pasar por un filtro claro de intencionalidad antes de iniciar cualquier comunicación.',
    durationMinutes: 4,
    bodyText: `La pregunta "¿debo mandar mensaje?" jamás debe responderse en caliente. Depende de tu verdadero propósito.

Existen tres motivos legítimos para mandar mensaje:
1. Un asunto práctico inaplazable (ej: pertenencias, documentos, mascotas).
2. Una disculpa sincera por algo específico que reconociste, sin exigir respuesta.
3. Una invitación madura a hablar, sabiendo exactamente qué quieres decir y preparada para una negativa.

Cualquier mensaje enviado solo para ver si responde o para calmar la soledad traerá más confusión que claridad.`,
    example: 'En lugar de "¿Podemos hablar?", un mensaje con propósito dice: "Necesito recoger mi llave de repuesto. ¿Qué horario te queda bien mañana?".',
    exercise: 'Responde con honestidad: "¿Cuál es el objetivo específico de este mensaje en una sola frase?".',
    action: 'Abre la herramienta "¿Debo enviar mensaje?" y sigue la guía de decisión.',
    reflectionPrompt: 'Si él no responde a este mensaje, ¿estaré en paz con mi decisión de haberlo enviado?',
    recommendedTool: '¿Debo enviar mensaje?',
  },
  {
    dayNumber: 16,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: 'Un mensaje con propósito',
    objective: 'Escribir de manera elegante, clara, concisa y sin manipulaciones emocionales.',
    durationMinutes: 4,
    bodyText: `Los mensajes largos, llenos de justificaciones, reproches o declaraciones dramáticas suelen sobrecargar a quien los recibe y exponer a quien los envía.

La comunicación madura es breve, clara y respetuosa. Dice lo que necesita decirse sin agresividad y sin pedir migajas.

Cuando te comunicas con claridad, demuestras respeto por ti misma y le das al otro la oportunidad de responder con el mismo nivel de madurez.`,
    example: 'Evita desahogos de 10 párrafos en WhatsApp. Prefiere 2 frases objetivas y puntuales.',
    exercise: 'Escribe el borrador de un mensaje y elimina el 50% de las palabras que no aporten valor práctico.',
    action: 'Usa el Laboratorio de Mensajes para preparar y guardar tu borrador con tranquilidad.',
    reflectionPrompt: '¿Mi tono de voz en este mensaje refleja a la mujer segura y digna que deseo ser?',
    recommendedTool: 'Laboratorio de Mensajes',
  },
  {
    dayNumber: 17,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: 'Si él me busca',
    objective: 'Responder a un contacto suyo sin prisa y sin crear una película en la cabeza.',
    durationMinutes: 4,
    bodyText: `Apareció la notificación: es él. El corazón late rápido y la mano tiembla.

La primera regla de oro: NO estás obligada a responder en 30 segundos. Respira. Bebe agua. Espera a que pase el impacto inicial.

Un "¿Cómo estás?" o "Hola, perdida" es solo un sondeo casual. No proyectes ahí una propuesta de matrimonio ni una declaración de amor eterno. Responde con la misma energía con la que te buscaron: educada, tranquila y sin exceso de entusiasmo.`,
    example: 'Él pregunta: "¿Qué tal, cómo va todo?". Responder: "Todo bien por aquí, ¿y tú?" mantiene la elegancia sin entregar todas las cartas.',
    exercise: 'Practica esperar al menos de 30 a 60 minutos antes de abrir el mensaje de tu ex si no es una emergencia real.',
    action: 'Consulta la guía "Él me buscó" en el módulo de Apoyo antes de responder.',
    reflectionPrompt: '¿Estoy respondiendo con calma o dejando que la euforia tome las riendas de mi respuesta?',
    recommendedTool: 'Él me buscó',
  },
  {
    dayNumber: 18,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: 'Respuesta fría o monosilábica',
    objective: 'Aprender a acoger el distanciamiento del otro sin entrar en desesperación ni reproches.',
    durationMinutes: 4,
    bodyText: `Enviaste un mensaje educado y él respondió de forma seca: "Bien", "Luego veo", o tardó 18 horas en contestar.

La tentación en estos momentos es enviar: "Vaya, ¿por qué estás tan cortante?", "¿Pasó algo?".

No lo hagas. Una respuesta fría es una respuesta completa: comunica que la otra persona no tiene disponibilidad o interés en profundizar el contacto en este momento. Acepta esa información sin insistir. Deja que la conversación termine ahí con clase.`,
    example: 'Él responde: "Gracias". Tú simplemente le das me gusta al mensaje o respondes "De nada" y cierras sin alargar.',
    exercise: 'Respira hondo y repítete: "El desinterés o la frialdad del otro no disminuyen mi valor".',
    action: 'Consulta el modelo "Respuesta tras mensaje frío" en el Laboratorio de Mensajes.',
    reflectionPrompt: '¿Por qué intento forzar calidez en alguien que elige ser frío conmigo?',
    recommendedTool: 'Laboratorio de Mensajes',
  },
  {
    dayNumber: 19,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: 'Silencio tras el mensaje',
    objective: 'Gestionar la falta de respuesta sin enviar mensajes consecutivos y sin culparte.',
    durationMinutes: 5,
    bodyText: `El silencio es la respuesta más difícil de asimilar, pero también una de las más reveladoras.

Cuando enviamos un mensaje y no recibimos respuesta, la mente entra en pánico creando excusas: "¿Será que no lo vio?", "¿Habrá perdido el teléfono?".

En la inmensa mayoría de los casos, la persona sí lo vio. Enviar un segundo mensaje ("¿¿??" o "¿Viste esto?") solo aumenta la incomodidad y debilita tu dignidad. El silencio ya dijo todo lo que necesitabas escuchar. Deja que hable.`,
    example: 'No mandes "Olvídalo" ni "Ni respondes, ¿verdad?" tras 5 horas sin respuesta. Mantén el silencio.',
    exercise: 'Prométete no enviar ningún mensaje adicional en las próximas 48 horas si no hay respuesta.',
    action: 'Lee el artículo "Cómo gestionar el silencio tras un mensaje" en la Biblioteca.',
    reflectionPrompt: '¿Qué me dice su silencio sobre la prioridad que ocupo en su vida hoy?',
    recommendedTool: 'Biblioteca de Lecturas',
  },
  {
    dayNumber: 20,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: 'Preparar una conversación importante',
    objective: 'Organizar temas, límites y claridad mental antes de una conversación presencial o telefónica.',
    durationMinutes: 5,
    bodyText: `Si acordaron hablar sobre lo que pasó o sobre los términos de la distancia, ve con una agenda clara en mente.

Las conversaciones difíciles se descarrilan cuando nos perdemos en el calor de la discusión o en reproches del pasado ("Tú siempre hacías aquello...").

Enfócate en tres puntos: lo que sientes, lo que es innegociable para ti y lo que propones para el futuro inmediato. Mantén la disposición de escuchar sin interrumpir, pero con firmeza para sostener tus límites.`,
    example: 'Ir a la conversación sabiendo exactamente: "No quiero volver si no hay un compromiso con terapia o diálogo abierto".',
    exercise: 'Anota en 3 puntos simples lo que no estás dispuesta a dejar de aclarar en esa conversación.',
    action: 'Consulta el Checklist "Antes de conversar" en la Biblioteca.',
    reflectionPrompt: '¿Cuál es la conclusión que espero obtener de este encuentro para mi propia paz?',
    recommendedTool: 'Checklist: Antes de conversar',
  },
  {
    dayNumber: 21,
    phase: '03. Contacto con intención',
    phaseKey: 'contact',
    title: 'Revisión: contacto e intención',
    objective: 'Analizar las interacciones recientes y preparar la transición hacia la fase final de evaluación.',
    durationMinutes: 4,
    bodyText: `Has completado tres semanas enteras de reflexión, disciplina y autocuidado.

Ahora sabes que toda interacción debe tener propósito, que el silencio también habla y que tu dignidad está antes que la urgencia de recibir afecto.

En la última semana del plan, abordaremos la pregunta definitiva: ¿vale la pena una reconciliación si se abre la puerta? ¿Y cómo seguir adelante con serenidad si la respuesta es no?`,
    example: 'Mirar las conversaciones recientes y ver que no te rebajaste en ninguna de ellas.',
    exercise: 'Actualiza tu Línea de Tiempo con las interacciones más significativas de los últimos 7 días.',
    action: 'Marca el Día 21 como concluido y celebra el 75% del camino recorrido.',
    reflectionPrompt: 'Si me buscara hoy queriendo volver, ¿qué respondería de inmediato?',
    recommendedTool: 'Mi Línea de Tiempo',
  },

  // FASE 4: RECIPROCIDAD Y DECISIÓN (Días 22-28)
  {
    dayNumber: 22,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: '¿Interés genuino o educación?',
    objective: 'Diferenciar la simpatía superficial de un compromiso real con la relación.',
    durationMinutes: 4,
    bodyText: `Muchas veces confundimos la buena educación con el deseo de reconciliación. La persona puede ser simpática, responder con emojis amables e incluso desear los buenos días, pero sin ningún movimiento concreto para estar juntos o resolver diferencias.

La simpatía no es compromiso. La cortesía no es amor.

Observa las actitudes que conllevan esfuerzo: ¿la persona se traslada para verte? ¿Asume compromisos y los cumple? ¿Habla del futuro incluyéndote? Mira los hechos prácticos, no las atenciones virtuales.`,
    example: 'Responde todas tus historias con cariño, pero cuando sugieres un café, "está muy ocupado esta semana".',
    exercise: 'Analiza las últimas dos semanas: ¿cuáles fueron los actos de compromiso reales que tuvo hacia ti?',
    action: 'Lee el artículo "Contacto intermitente y consistencia" en la Biblioteca.',
    reflectionPrompt: '¿Estoy sobrevalorando pequeñas atenciones porque tengo hambre de afecto?',
    recommendedTool: 'Biblioteca de Lecturas',
  },
  {
    dayNumber: 23,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: 'Palabras frente a comportamiento',
    objective: 'Analizar la consistencia entre lo prometido y lo que efectivamente se vive.',
    durationMinutes: 5,
    bodyText: `Las promesas tras la ruptura son muy fáciles de hacer: "Voy a cambiar", "Me di cuenta de mis errores", "Contigo es diferente".

Sin embargo, las palabras sin un cambio conductual constante son solo ilusiones momentáneas para aliviar la culpa.

Un cambio real no se comprueba en un discurso apasionado un viernes por la noche. Se comprueba a lo largo de semanas y meses de respeto, escucha y actitudes diferentes. Dale tiempo al tiempo y observa la conducta.`,
    example: 'Dice que quiere estar más presente, pero desaparece el primer fin de semana con sus amigos.',
    exercise: 'Anota en dos columnas: "Lo que prometió" frente a "Lo que realmente hizo en las últimas 3 semanas".',
    action: 'Registra en el Diario tus observaciones sobre su coherencia.',
    reflectionPrompt: '¿Sus actitudes coinciden con las palabras que salen de su boca?',
    recommendedTool: 'Mi Diario',
  },
  {
    dayNumber: 24,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: 'Antes de reencontrarse',
    objective: 'Preparar la mente y el corazón para un encuentro presencial sin derrumbar tus avances.',
    durationMinutes: 5,
    bodyText: `Acordaron verse. Es normal sentir nervios en el estómago, ansiedad e incluso ganas de esmerarte con la ropa.

Pero recuerda: un reencuentro no es una prueba donde tengas que demostrar tu valor para ser elegida de nuevo. Es una oportunidad para que TÚ evalúes si esa persona aún tiene cabida en la mujer en la que te estás convirtiendo.

Elige un lugar público y neutro, define un horario límite para terminar el encuentro y ve sin la obligación de besar, intimar o decidir nada esa misma noche.`,
    example: 'Coordinar un café de 1 hora a las 16:00 en lugar de una cena con vino hasta las 2:00 de la madrugada en su casa.',
    exercise: 'Define tu límite principal para el encuentro: "Hoy no iré a su casa, pase lo que pase".',
    action: 'Consulta el checklist "Antes de un reencuentro presencial" en la Biblioteca.',
    reflectionPrompt: '¿Qué necesito observar en él para saber si este encuentro fue sano para mí?',
    recommendedTool: 'Checklist: Antes de encontrarse',
  },
  {
    dayNumber: 25,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: 'Después del reencuentro',
    objective: 'Registrar sensaciones corporales y hechos observados tras el encuentro, antes de que la mente idealice.',
    durationMinutes: 4,
    bodyText: `Después del encuentro, la mente suele distorsionar las cosas: rescatamos los momentos de cariño y olvidamos los de frialdad o incomodidad.

Justo después de verte con él, antes de dormir, tómate 10 minutos para registrar la verdad cruda y real.

¿Cómo te sentiste en tu cuerpo? ¿Hubo tensión? ¿Te miró a los ojos? ¿Las conversaciones fluyeron o parecieron forzadas? ¿Preguntó por ti o solo habló de sí mismo? Registra los hechos mientras están frescos en la memoria.`,
    example: 'Anotar: "Nos besamos, pero cuando toqué el tema de compromiso, cambió de tema y se puso tenso".',
    exercise: 'Llena las notas del diario con la impresión real del encuentro sin adornos románticos.',
    action: 'Agrega el evento "Encuentro presencial" en tu Línea de Tiempo con cómo te sentiste.',
    reflectionPrompt: '¿Salí de este encuentro sintiéndome valorada y en paz o confundida y ansiosa?',
    recommendedTool: 'Mi Línea de Tiempo',
  },
  {
    dayNumber: 26,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: 'Si él quiere volver',
    objective: 'Evaluar una propuesta de reconciliación con calma, criterios claros y sin impulsividad.',
    durationMinutes: 5,
    bodyText: `Escuchar "quiero volver" puede sentirse como el mayor deseo de tu corazón hecho realidad. Sin embargo, volver sin criterios es la receta perfecta para vivir la misma ruptura dentro de 3 meses.

Una reconciliación verdadera no es regresar al pasado; es la construcción de una NUEVA relación, con nuevas bases.

¿Qué causó la ruptura? ¿Ese problema fue superado o sigue exactamente igual? ¿Logran hablar abiertamente sobre límites? Si lo único que cambió fue la nostalgia temporal, volver traerá los mismos dolores de antes.`,
    example: 'No responder "¡sí!" de inmediato. Responder: "Me alegra que hayas pensado en nosotros. Hablemos con calma sobre lo que necesita ser diferente para los dos".',
    exercise: 'Usa el checklist "Antes de recomenzar" para analizar los 7 criterios indispensables de un regreso maduro.',
    action: 'Abre la herramienta de apoyo "Antes de recomenzar" y responde las preguntas reflexivas.',
    reflectionPrompt: '¿Qué tendría que cambiar radicalmente para que esta relación fuera segura y sana para mí?',
    recommendedTool: 'Checklist: Antes de recomenzar',
  },
  {
    dayNumber: 27,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: 'Cuando no hay reciprocidad',
    objective: 'Acoger la realidad del cierre con dignidad y respeto por ti misma.',
    durationMinutes: 5,
    bodyText: `Tal vez observaste los hechos y concluiste que, lamentablemente, no hay reciprocidad. La otra persona tomó su decisión de seguir otro camino, o no tiene la madurez ni el deseo de construir algo contigo.

Esa conclusión duele, pero trae una liberación inmensa. Ya no hay por qué esperar, no hay más pistas que descifrar, no hay más juegos.

Su falta de reciprocidad no es una prueba de que haya algo mal en ti. Es solo la constatación de que los caminos se separaron. Al soltar a quien no quiere quedarse, abres espacio para que tu propia vida florezca.`,
    example: 'Decirte a ti misma: "Amé, lo intenté con madurez, pero ahora es momento de honrarme a mí misma y soltar".',
    exercise: 'Escribe un mensaje de despedida simbólica en tu Diario (para nunca enviar) cerrando este ciclo.',
    action: 'Lee el artículo "Cuando seguir adelante se convierte en una posibilidad" en la Biblioteca.',
    reflectionPrompt: '¿Qué recupero cuando dejo de rogar por el amor de quien no me valora?',
    recommendedTool: 'Biblioteca de Lecturas',
  },
  {
    dayNumber: 28,
    phase: '04. Reciprocidad y decisión',
    phaseKey: 'reciprocity',
    title: 'Tu próximo ciclo: claridad y autonomía',
    objective: 'Celebrar la conclusión del plan de 28 días y tomar las riendas de tu propio destino.',
    durationMinutes: 5,
    bodyText: `¡Has completado tu plan de 28 días de post-ruptura en Florecer!

Mira dónde estabas en el Día 1 y mira a la mujer que eres ahora: más consciente, más firme, con dominio de tus pensamientos y mucho más conectada con lo que mereces.

Ya sea decidiendo intentar recomenzar de forma consciente y sin ingenuidad, o decidiendo seguir adelante y pasar la página, ahora tienes algo que nadie te puede quitar: CLARIDAD.

Ya no necesitas actuar desde la desesperación. Aprendiste a respirar, a separar hechos de miedos y a elegirte a ti misma.`,
    example: 'Sentir una paz en el pecho y saber que tu futuro es luminoso y te pertenece exclusivamente a ti.',
    exercise: 'Revisa todos tus logros en las estadísticas de la pestaña "Tú" y lee tus primeras anotaciones.',
    action: 'Marca el día 28 como concluido y continúa usando Florecer siempre que necesites un punto de apoyo.',
    reflectionPrompt: '¿Cuál es la mayor lección que me llevo de este camino de regreso a mí misma?',
    recommendedTool: 'Pestaña Tú: Estadísticas',
  },
];
