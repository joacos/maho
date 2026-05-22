import { PrismaClient, ServiceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando el proceso de Seeding...");

  // 1. Limpieza de datos existentes
  console.log("Limpiando tablas...");
  await prisma.postTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.availabilityException.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.service.deleteMany();
  await prisma.leadInteraction.deleteMany();
  await prisma.lead.deleteMany();

  // 2. Crear Servicios
  console.log("Creando servicios...");
  const servicioAcomp = await prisma.service.create({
    data: {
      slug: "acompanamiento-cognitivo-individual",
      name: "Acompañamiento Cognitivo Individual",
      description:
        "Sesión personalizada enfocada en potenciar habilidades cognitivas, funciones ejecutivas, memoria y procesos de aprendizaje en niños, adolescentes y adultos.",
      type: ServiceType.INDIVIDUAL,
      duration: 60,
      price: 35000.0,
      isActive: true,
    },
  });

  const servicioEval = await prisma.service.create({
    data: {
      slug: "evaluacion-psicopedagogica-completa",
      name: "Evaluación Psicopedagógica Completa",
      description:
        "Evaluación diagnóstica integral para identificar dificultades de aprendizaje, estilo cognitivo, y áreas fuertes para trazar un plan de apoyo adaptado.",
      type: ServiceType.INDIVIDUAL,
      duration: 90,
      price: 45000.0,
      isActive: true,
    },
  });

  const servicioTallerEstim = await prisma.service.create({
    data: {
      slug: "taller-estimulacion-temprana",
      name: "Taller de Estimulación Temprana",
      description:
        "Sesiones grupales lúdicas diseñadas para potenciar el desarrollo integral (motor, social y cognitivo) en niños pequeños de 3 a 5 años.",
      type: ServiceType.WORKSHOP,
      duration: 90,
      price: 15000.0,
      isActive: true,
    },
  });

  const servicioTallerTecnicas = await prisma.service.create({
    data: {
      slug: "taller-tecnicas-de-estudio",
      name: "Taller de Técnicas de Estudio y Concentración",
      description:
        "Taller práctico para estudiantes de educación básica y media, donde aprenderán a organizar su tiempo, hacer resúmenes efectivos y mejorar su foco.",
      type: ServiceType.WORKSHOP,
      duration: 120,
      price: 20000.0,
      isActive: true,
    },
  });

  console.log("Servicios creados con éxito.");

  // 3. Crear Disponibilidad Horaria Semanal (Lunes a Viernes de 09:00 a 18:00)
  console.log("Creando disponibilidad base semanal...");
  const diasSemana = [1, 2, 3, 4, 5]; // 1=Lunes, ..., 5=Viernes
  const bloquesHorarios = [
    { start: "09:00", end: "13:00" },
    { start: "14:00", end: "18:00" },
  ];

  for (const day of diasSemana) {
    for (const bloque of bloquesHorarios) {
      await prisma.availability.create({
        data: {
          dayOfWeek: day,
          startTime: bloque.start,
          endTime: bloque.end,
          isActive: true,
        },
      });
    }
  }
  console.log("Disponibilidad base creada con éxito.");

  // 4. Crear Talleres (Workshops) en fechas específicas
  console.log("Creando talleres específicos...");
  const hoy = new Date();
  
  // Taller 1: Próxima semana
  const fechaTaller1 = new Date(hoy);
  fechaTaller1.setDate(hoy.getDate() + 7);
  fechaTaller1.setHours(10, 0, 0, 0);

  const fechaFinTaller1 = new Date(fechaTaller1);
  fechaFinTaller1.setMinutes(fechaTaller1.getMinutes() + 90);

  await prisma.workshop.create({
    data: {
      serviceId: servicioTallerEstim.id,
      title: "Estimulación Temprana - Grupo A",
      description: "Taller grupal para potenciar el lenguaje, motricidad y cognición social a través del juego.",
      date: fechaTaller1,
      startTime: fechaTaller1,
      endTime: fechaFinTaller1,
      maxCapacity: 8,
      currentBookings: 2, // Ya tiene 2 reservas simuladas
      isActive: true,
    },
  });

  // Taller 2: En 2 semanas
  const fechaTaller2 = new Date(hoy);
  fechaTaller2.setDate(hoy.getDate() + 14);
  fechaTaller2.setHours(15, 0, 0, 0);

  const fechaFinTaller2 = new Date(fechaTaller2);
  fechaFinTaller2.setMinutes(fechaTaller2.getMinutes() + 120);

  await prisma.workshop.create({
    data: {
      serviceId: servicioTallerTecnicas.id,
      title: "Técnicas de Estudio para Jóvenes",
      description: "Aprende métodos visuales, mapas mentales y técnicas Pomodoro para rendir al máximo.",
      date: fechaTaller2,
      startTime: fechaTaller2,
      endTime: fechaFinTaller2,
      maxCapacity: 12,
      currentBookings: 5, // Ya tiene 5 reservas simuladas
      isActive: true,
    },
  });
  console.log("Talleres específicos creados con éxito.");

  // 5. Crear Publicaciones del Blog (Novedades)
  console.log("Creando posts para el blog...");
  
  const tagAprendizaje = await prisma.tag.create({
    data: { name: "Aprendizaje", slug: "aprendizaje" },
  });
  const tagEstimulacion = await prisma.tag.create({
    data: { name: "Estimulación", slug: "estimulacion" },
  });
  const tagEstudio = await prisma.tag.create({
    data: { name: "Técnicas de Estudio", slug: "tecnicas-de-estudio" },
  });

  const post1 = await prisma.post.create({
    data: {
      title: "Cómo Fomentar el Hábito de la Lectura en Niños en Edad Escolar",
      slug: "como-fomentar-el-habito-de-la-lectura",
      excerpt: "La lectura no debe ser una obligación. Te presentamos 5 consejos prácticos basados en psicopedagogía para hacer que tus hijos amen los libros desde pequeños.",
      content: `La lectura es una de las herramientas más poderosas para el desarrollo cognitivo y emocional de los niños. Sin embargo, en la era de las pantallas, lograr que un niño tome un libro por iniciativa propia puede parecer una tarea titánica. 

Como psicopedagoga, constantemente recibo padres preocupados porque sus hijos 'odian leer'. Mi primera respuesta siempre es la misma: **la lectura no debe imponerse, debe contagiarse**.

Aquí te presento 5 estrategias dinámicas para fomentar este hábito tan valioso:

### 1. Predica con el ejemplo
Los niños aprenden imitando. Si te ven leer libros, revistas o el diario con entusiasmo, naturalizarán la lectura como una actividad placentera y cotidiana en el hogar.

### 2. Crea un rincón de lectura acogedor
No necesitas mucho espacio: un par de cojines cómodos en el suelo, buena luz y una repisa baja donde los libros estén al alcance de sus manos y con la portada a la vista (no el lomo) harán la diferencia.

### 3. Deja que ellos elijan
Es vital que el niño decida qué quiere leer. No importa si prefiere cómics, libros con imágenes, historias de dinosaurios o cuentos cortos. La autonomía en la elección genera motivación intrínseca.

### 4. Lean juntos (sin importar la edad)
Compartir un momento de lectura antes de dormir crea un vínculo afectivo fuerte con los libros. Puedes hacer voces de personajes, hacerles preguntas sobre qué creen que pasará después y comentar la historia.

### 5. Asocia la lectura con experiencias reales
Si leen un libro sobre animales marinos, planeen una visita virtual o real a un acuario. Si leen sobre astronomía, salgan a mirar las estrellas. Conectar la teoría con la experiencia hace que el aprendizaje cobre sentido.

Recuerda que cada niño tiene su propio ritmo de aprendizaje. El objetivo no es que lean rápido, sino que disfruten y comprendan lo que leen. ¡Empieza hoy mismo con un pequeño paso!`,
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      published: true,
      publishedAt: new Date(hoy.getTime() - 1000 * 60 * 60 * 24 * 10), // Hace 10 días
      authorName: "Valeria Mahon",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Técnicas de Concentración y Manejo del Estrés en Época de Exámenes",
      slug: "tecnicas-de-concentracion-y-manejo-de-estres",
      excerpt: "Descubre cómo organizar tus sesiones de estudio y aplicar técnicas eficaces para calmar la ansiedad antes de las evaluaciones importantes.",
      content: `La época de exámenes suele ser sinónimo de altos niveles de estrés, procrastinación y cansancio extremo para muchos estudiantes. Muchas veces, el problema no es la falta de estudio, sino **cómo** se estudia y cómo se maneja la presión emocional.

Para estudiar de forma inteligente y mantener la calma, es fundamental aplicar técnicas basadas en cómo nuestro cerebro procesa y retiene la información.

### La Técnica Pomodoro: Foco sin agotamiento
El cerebro humano no está diseñado para mantener una atención sostenida durante horas sin descanso. La técnica Pomodoro propone intervalos estructurados:
1. Estudia con foco absoluto durante **25 minutos** (sin celular, sin distracciones).
2. Descansa **5 minutos** (párate, estírate, toma agua).
3. Repite este ciclo 4 veces.
4. Toma un descanso largo de **20 a 30 minutos**.
Esto mantiene al cerebro fresco y previene la fatiga mental.

### Métodos de Estudio Activo
Olvídate de leer y releer el mismo texto pasivamente. Eso genera una 'ilusión de competencia' (creer que sabes porque te suena familiar). Prueba el estudio activo:
- **Técnica de Feynman:** Explica el tema que estás estudiando con tus propias palabras, de la manera más sencilla posible, como si se lo enseñaras a un niño de 8 años. Esto revela tus vacíos de conocimiento inmediatamente.
- **Tarjetas de estudio (Flashcards):** Perfectas para memorizar conceptos clave, fórmulas o vocabulario mediante la recuperación activa.

### Manejo de la Ansiedad y el Estrés
El estrés eleva el cortisol, una hormona que bloquea el hipocampo (el área del cerebro encargada de la memoria). Por eso ocurren los famosos 'quedarse en blanco'.
- **Respiración 4-7-8:** Antes de empezar a estudiar o justo al recibir la prueba, inhala en 4 segundos, retén el aire durante 7 segundos y exhala lentamente en 8 segundos. Repite esto 4 veces para desactivar el sistema nervioso simpático (de alerta) y encender el parasimpático (de calma).
- **Duerme bien:** El cerebro consolida el aprendizaje y limpia toxinas durante el sueño profundo. Dormir menos de 6 horas antes de un examen reduce drásticamente el rendimiento cognitivo.

Aplicar estos hábitos de estudio no solo mejorará tus calificaciones, sino que transformará el aprendizaje en una experiencia mucho más gratificante y saludable.`,
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
      published: true,
      publishedAt: new Date(hoy.getTime() - 1000 * 60 * 60 * 24 * 5), // Hace 5 días
      authorName: "Valeria Mahon",
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "El Rol de la Psicopedagogía en la Estimulación Cognitiva Infantil",
      slug: "rol-psicopedagogia-estimulacion-cognitiva-infantil",
      excerpt: "Explora cómo la psicopedagogía interviene de manera temprana para potenciar el neurodesarrollo infantil, abriendo canales de aprendizaje flexibles y divertidos.",
      content: `Cuando escuchamos la palabra **'Psicopedagogía'**, usualmente la asociamos de inmediato con colegios, malas notas o dificultades específicas como la dislexia. Sin embargo, la disciplina tiene un campo de acción mucho más amplio, preventivo y enriquecedor: **la estimulación cognitiva infantil**.

La estimulación cognitiva consiste en un conjunto de actividades y juegos dirigidos a mejorar o mantener las capacidades cerebrales de los niños. Durante los primeros años de vida, el cerebro infantil tiene una plasticidad asombrosa; cada juego, cada interacción y cada desafío crea nuevas conexiones neuronales.

### ¿Qué áreas trabajamos en las sesiones psicopedagógicas?

En nuestra consulta en Valdivia, diseñamos actividades lúdicas personalizadas para potenciar las siguientes funciones clave:

1. **Funciones Ejecutivas:** Consideradas el 'director de orquesta' del cerebro. Incluyen la planificación, la flexibilidad cognitiva, el autocontrol y la toma de decisiones. Un niño que entrena sus funciones ejecutivas será capaz de organizarse mejor, regular sus emociones ante la frustración y resolver problemas cotidianos con creatividad.
2. **Atención y Concentración:** Clave para cualquier proceso de aprendizaje. A través de juegos de búsqueda visual, rompecabezas complejos y secuencias rítmicas, ayudamos a los niños a focalizar su atención de manera selectiva y sostenida.
3. **Memoria de Trabajo:** Es la capacidad de retener y manipular información a corto plazo (como recordar las instrucciones de un juego mientras se ejecuta).
4. **Pensamiento Lógico y Lenguaje:** Estimulamos la categorización, la resolución de acertijos, la comprensión lectora y la expresión verbal rica.

### ¿Por qué hacerlo de forma temprana y preventiva?

No es necesario esperar a que un niño tenga bajas calificaciones o muestre frustración extrema en la escuela para acudir a un especialista. La estimulación cognitiva temprana acts como un andamiaje que fortalece los cimientos del aprendizaje formal futuro. 

Al presentar desafíos acordes a su edad en un ambiente de apoyo, contención y juego, los niños asocian el esfuerzo cognitivo con el placer del logro, desarrollando una **mentalidad de crecimiento** que los acompañará toda la vida.

Si tienes dudas sobre cómo potenciar las habilidades de tus hijos, te invito a agendar una sesión de conversación para conversar y diseñar juntos la mejor ruta para su desarrollo.`,
      coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      published: true,
      publishedAt: new Date(hoy.getTime() - 1000 * 60 * 60 * 24 * 1), // Hace 1 día
      authorName: "Valeria Mahon",
    },
  });

  // Conectar etiquetas a publicaciones
  await prisma.postTag.create({
    data: { postId: post1.id, tagId: tagAprendizaje.id },
  });
  await prisma.postTag.create({
    data: { postId: post1.id, tagId: tagEstimulacion.id },
  });

  await prisma.postTag.create({
    data: { postId: post2.id, tagId: tagAprendizaje.id },
  });
  await prisma.postTag.create({
    data: { postId: post2.id, tagId: tagEstudio.id },
  });

  await prisma.postTag.create({
    data: { postId: post3.id, tagId: tagEstimulacion.id },
  });
  await prisma.postTag.create({
    data: { postId: post3.id, tagId: tagAprendizaje.id },
  });

  // 6. Crear Leads de ejemplo en el CRM
  console.log("Creando leads simulados...");
  await prisma.lead.create({
    data: {
      name: "María José Pardo",
      email: "mariajose.pardo@example.com",
      phone: "+56987654321",
      source: "WEBSITE",
      status: "NEW",
      origin: "formulario_contacto",
      notes: "Consulta sobre talleres de estimulación temprana para su hijo de 4 años.",
      createdAt: new Date(hoy.getTime() - 1000 * 60 * 60 * 48), // Hace 2 días
    },
  });

  const leadIncompleto = await prisma.lead.create({
    data: {
      name: "Juan Ignacio Silva",
      email: "juani.silva@example.com",
      phone: "+56976543210",
      source: "WEBSITE",
      status: "NEW",
      origin: "agendamiento_incompleto",
      notes: "Inició agendamiento para Acompañamiento Cognitivo pero abandonó en el paso de confirmación.",
      createdAt: new Date(hoy.getTime() - 1000 * 60 * 120), // Hace 2 horas
    },
  });

  await prisma.leadInteraction.create({
    data: {
      leadId: leadIncompleto.id,
      type: "note",
      content: "Lead registrado automáticamente al ingresar datos de contacto en el flujo de reserva.",
    },
  });

  console.log("Seeding completado con éxito! 🌱");
}

main()
  .catch((e) => {
    console.error("Error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
