import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Clock, Calendar, Heart, Share2, CalendarDays } from "lucide-react";

export const dynamicParams = true;
export const revalidate = 0;

const MOCK_POSTS = [
  {
    id: "post-1",
    title: "Cómo Fomentar el Hábito de la Lectura en Niños en Edad Escolar",
    slug: "como-fomentar-el-habito-de-la-lectura",
    excerpt: "La lectura no debe ser una obligación. Te presentamos 5 consejos prácticos basados en psicopedagogía para hacer que tus hijos amen los libros desde pequeños.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    authorName: "Maho Cayun",
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

Recuerda que cada niño tiene su propio ritmo de aprendizaje. El objetivo no es que leer rápido, sino que disfruten y comprendan lo que leen. ¡Empieza hoy mismo con un pequeño paso!`,
  },
  {
    id: "post-2",
    title: "Técnicas de Concentración y Manejo del Estrés en Época de Exámenes",
    slug: "tecnicas-de-concentracion-y-manejo-de-estres",
    excerpt: "Descubre cómo organizar tus sesiones de estudio y aplicar técnicas eficaces para calmar la ansiedad antes de las evaluaciones importantes.",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    authorName: "Maho Cayun",
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
  },
  {
    id: "post-3",
    title: "El Rol de la Psicopedagogía en la Estimulación Cognitiva Infantil",
    slug: "rol-psicopedagogia-estimulacion-cognitiva-infantil",
    excerpt: "Explora cómo la psicopedagogía interviene de manera temprana para potenciar el neurodesarrollo infantil, abriendo canales de aprendizaje flexibles y divertidos.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    authorName: "Maho Cayun",
    content: `Cuando escuchamos la palabra **'Psicopedagogía'**, usualmente la asociamos de inmediato con colegios, malas notas o dificultades específicas como la dislexia. Sin embargo, la disciplina tiene un campo de acción mucho más amplio, preventivo y enriquecedor: **la estimulación cognitiva infantil**.

La estimulación cognitiva consiste en un conjunto de actividades y juegos dirigidos a mejorar o mantener las capacidades cerebrales de los niños. Durante los primeros años de vida, el cerebro infantil tiene una plasticidad asombrosa; cada juego, cada interacción y cada desafío crea nuevas conexiones neuronales.

### ¿Qué áreas trabajamos en las sesiones psicopedagógicas?

En nuestra consulta en Valdivia, diseñamos actividades lúdicas personalizadas para potenciar las siguientes funciones clave:

1. **Funciones Ejecutivas:** Consideradas el 'director de orquesta' del cerebro. Incluyen la planificación, la flexibilidad cognitiva, el autocontrol y la toma de decisiones. Un niño que entrena sus funciones ejecutivas será capaz de organizarse mejor, regular sus emociones ante la frustración y resolver problemas cotidianos con creatividad.
2. **Atención y Concentración:** Clave para cualquier proceso de aprendizaje. A través de juegos de búsqueda visual, rompecabezas complejos y secuencias rítmicas, ayudamos a los niños a focalizar su atención de manera selectiva y sostenida.
3. **Memoria de Trabajo:** Es la capacidad de retener y manipular información a corto plazo (como recordar las instrucciones de un juego mientras se ejecuta).
4. **Pensamiento Lógico y Lenguaje:** Estimulamos la categorización, la resolución de acertijos, la comprensión lectora y la expresión verbal rica.

### ¿Por qué hacerlo de forma temprana y preventiva?

No es necesario esperar a que un niño tenga bajas calificaciones o muestre frustración extrema en la escuela para acudir a un especialista. La estimulación cognitiva temprana actúa como un andamiaje que fortalece los cimientos del aprendizaje formal futuro. 

Al presentar desafíos acordes a su edad en un ambiente de apoyo, contención y juego, los niños asocian el esfuerzo cognitivo con el placer del logro, desarrollando una **mentalidad de crecimiento** que los acompañará toda la vida.

Si tienes dudas sobre cómo potenciar las habilidades de tus hijos, te invito a agendar una sesión de conversación para conversar y diseñar juntos la mejor ruta para su desarrollo.`,
  },
];

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({ select: { slug: true } });
    return posts.map((p) => ({ slug: p.slug }));
  } catch (error) {
    return MOCK_POSTS.map((p) => ({ slug: p.slug }));
  }
}

async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (post) return post;
  } catch (error) {
    console.warn("Base de datos no conectada para obtener post, usando mocks.");
  }
  return MOCK_POSTS.find((p) => p.slug === slug);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetalleNovedadPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Convertir texto plano a HTML simple para simular renderizado enriquecido
  const formattedContent = post.content
    .split("\n\n")
    .map((paragraph, idx) => {
      if (paragraph.startsWith("###")) {
        return `<h3 key="${idx}" class="font-display font-bold text-xl text-primary-dark mt-8 mb-4">${paragraph.replace("###", "").trim()}</h3>`;
      }
      if (paragraph.startsWith("-") || paragraph.startsWith("1.")) {
        const items = paragraph.split("\n").map(item => `<li class="ml-4 list-disc mb-2">${item.replace(/^- |^\d+\. /, "").trim()}</li>`).join("");
        return `<ul key="${idx}" class="font-sans text-sm text-muted leading-relaxed my-4">${items}</ul>`;
      }
      // Reemplazar negritas **
      const boldFormatted = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-primary-dark'>$1</strong>");
      return `<p key="${idx}" class="font-sans text-sm text-muted leading-relaxed mb-5">${boldFormatted}</p>`;
    })
    .join("");

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-surface to-surface-muted min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/novedades"
          className="inline-flex items-center gap-2 text-sm font-sans font-bold text-muted hover:text-primary mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a Novedades</span>
        </Link>

        <article className="bg-surface rounded-3xl overflow-hidden border border-border/40 shadow-md">
          {/* Cover image */}
          <div className="aspect-video w-full relative bg-border/50 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex flex-wrap gap-4 items-center text-xs font-sans font-semibold text-accent uppercase tracking-wider mb-5">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("es-CL", {
                day: "numeric",
                month: "long",
                year: "numeric"
              }) : "Novedades"}</span>
              <span className="text-border">&bull;</span>
              <span>Por {post.authorName || "Maho Cayun"}</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Content body */}
            <div
              className="prose max-w-none text-muted"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />

            {/* CTA Box at bottom of article */}
            <div className="mt-12 p-8 rounded-2xl bg-surface-muted border border-border/40 flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <h4 className="font-display font-bold text-lg text-primary-dark">
                  ¿Te resultó útil este artículo?
                </h4>
                <p className="font-sans text-xs text-muted leading-relaxed max-w-md">
                  En nuestra consulta apoyamos de forma práctica a familias a potenciar el 
                  aprendizaje y el desarrollo cognitivo. Agenda una hora de conversación.
                </p>
              </div>

              <Link
                href="/agendar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-bold text-sm shadow-md transition-all shrink-0 hover:-translate-y-0.5"
              >
                <CalendarDays className="w-4.5 h-4.5" />
                <span>Reservar Sesión</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
