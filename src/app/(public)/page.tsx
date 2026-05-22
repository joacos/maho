import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Heart, Calendar, ArrowRight, BookOpen, Star, Award, ShieldCheck, Sparkles } from "lucide-react";

// Mock de posts en caso de que la base de datos no esté conectada aún
const MOCK_POSTS = [
  {
    id: "mock-1",
    title: "Cómo Fomentar el Hábito de la Lectura en Niños en Edad Escolar",
    slug: "como-fomentar-el-habito-de-la-lectura",
    excerpt: "La lectura no debe ser una obligación. Te presentamos 5 consejos prácticos basados en psicopedagogía para hacer que tus hijos amen los libros desde pequeños.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Técnicas de Concentración y Manejo del Estrés en Época de Exámenes",
    slug: "tecnicas-de-concentracion-y-manejo-de-estres",
    excerpt: "Descubre cómo organizar tus sesiones de estudio y aplicar técnicas eficaces para calmar la ansiedad antes de las evaluaciones importantes.",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(),
  },
  {
    id: "mock-3",
    title: "El Rol de la Psicopedagogía en la Estimulación Cognitiva Infantil",
    slug: "rol-psicopedagogia-estimulacion-cognitiva-infantil",
    excerpt: "Explora cómo la psicopedagogía interviene de manera temprana para potenciar el neurodesarrollo infantil, abriendo canales de aprendizaje flexibles y divertidos.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(),
  },
];

async function getLatestPosts() {
  try {
    // Intentar buscar los últimos 3 posts publicados desde la base de datos
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    return posts.length > 0 ? posts : MOCK_POSTS;
  } catch (error) {
    console.warn("Base de datos no conectada para obtener posts del home, usando mocks.");
    return MOCK_POSTS;
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <div className="flex flex-col w-full min-h-screen antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 bg-gradient-to-br from-surface via-surface to-surface-muted border-b border-border/20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-primary-light/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-semibold text-xs uppercase tracking-wider w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Especialista en Aprendizaje Valdivia</span>
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-dark tracking-tight leading-tight">
                Psicopedagogía Clínica y Acompañamiento <span className="text-primary underline decoration-accent decoration-3 underline-offset-6">Cognitivo</span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                Potenciamos el aprendizaje, estimulamos las funciones cognitivas y 
                diseñamos estrategias personalizadas para cada etapa del desarrollo en niños, 
                adolescentes y adultos en Valdivia. Descubre el placer de aprender sin frustración.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/agendar"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-bold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar una Sesión</span>
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-surface-muted hover:bg-border/60 text-primary font-sans font-bold text-base border border-border/80 transition-all"
                >
                  <span>Ver Servicios</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Right */}
            <div className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/20 to-accent/30 rounded-3xl -rotate-3 scale-102" />
              <div className="absolute inset-0 bg-surface rounded-3xl shadow-xl overflow-hidden border border-border/30 flex items-center justify-center p-8">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary-light/10 flex items-center justify-center text-primary">
                    <Heart className="w-10 h-10 fill-current" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-primary-dark">
                    Valeria Mahon
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    "Creo firmemente que todos los niños pueden aprender y alcanzar su máximo 
                    potencial cuando se les apoya con las metodologías correctas, amor y contención emocional."
                  </p>
                  <div className="flex gap-1.5 text-accent">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-sans text-xs text-muted/80 tracking-wider uppercase font-semibold">
                    PSICOPEDAGOGA CLINICA &bull; VALDIVIA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICIOS DESTACADOS */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
              Nuestros Servicios Destacados
            </h2>
            <p className="font-sans text-base text-muted">
              Ofrecemos soluciones integrales y personalizadas para abordar los desafíos 
              de aprendizaje y potenciar el neurodesarrollo infantil y juvenil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-surface-muted rounded-2xl p-8 border border-border/40 hover:border-primary/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-xs">
                  01
                </div>
                <h3 className="font-display font-bold text-xl text-primary-dark group-hover:text-primary transition-colors">
                  Acompañamiento Cognitivo
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Sesiones individuales enfocadas en potenciar la memoria, atención, 
                  funciones ejecutivas y resolución de problemas adaptado al ritmo de cada alumno.
                </p>
              </div>
              <Link
                href="/servicios/acompanamiento-cognitivo-individual"
                className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-primary mt-6 group-hover:underline"
              >
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group bg-surface-muted rounded-2xl p-8 border border-border/40 hover:border-primary/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-xs">
                  02
                </div>
                <h3 className="font-display font-bold text-xl text-primary-dark group-hover:text-primary transition-colors">
                  Talleres de Estimulación
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Actividades grupales lúdicas diseñadas especialmente para niños pequeños. 
                  Potenciamos el lenguaje, motricidad fina, autonomía y sociabilización.
                </p>
              </div>
              <Link
                href="/servicios/taller-estimulacion-temprana"
                className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-primary mt-6 group-hover:underline"
              >
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group bg-surface-muted rounded-2xl p-8 border border-border/40 hover:border-primary/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-xs">
                  03
                </div>
                <h3 className="font-display font-bold text-xl text-primary-dark group-hover:text-primary transition-colors">
                  Métodos de Estudio
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Talleres prácticos para que estudiantes de educación básica y media aprendan 
                  a organizarse, resumir de forma efectiva y manejar la ansiedad ante exámenes.
                </p>
              </div>
              <Link
                href="/servicios/taller-tecnicas-de-estudio"
                className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-primary mt-6 group-hover:underline"
              >
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METODOLOGÍA / CONFIANZA */}
      <section className="py-24 bg-surface-muted border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Metodología Left */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight leading-tight">
                Una Metodología Integradora Centrada en la Confianza
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                Nuestras sesiones combinan el diagnóstico preciso de necesidades de aprendizaje 
                con la contención y estimulación emocional necesaria. El aprendizaje es más duradero 
                cuando se realiza en un espacio de total seguridad.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-lg text-primary-dark">
                      Atención Personalizada y Flexible
                    </h4>
                    <p className="font-sans text-sm text-muted">
                      Adaptamos cada sesión según el estado de ánimo, estilo de aprendizaje y necesidades del paciente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-lg text-primary-dark">
                      Enfoque Basado en el Logro Positivo
                    </h4>
                    <p className="font-sans text-sm text-muted">
                      Fomentamos la mentalidad de crecimiento, haciendo que el alumno asocie el esfuerzo con el placer de resolver desafíos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metodología Right (Testimonios) */}
            <div className="bg-surface rounded-2xl p-8 border border-border/30 shadow-md">
              <span className="font-sans text-xs tracking-wider text-accent uppercase font-bold">
                Testimonios Reales
              </span>
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-3 pb-6 border-b border-border/40">
                  <p className="font-sans text-sm text-muted italic">
                    "Increíble el cambio en nuestro hijo de 7 años. No solo mejoró en matemáticas y lectura, 
                    sino que ahora se siente seguro al ir a clases. Valeria tiene una empatía maravillosa."
                  </p>
                  <span className="font-display font-semibold text-sm text-primary-dark">
                    - Marcela Gómez, Madre de Ignacio
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-sm text-muted italic">
                    "El taller de técnicas de estudio le ayudó muchísimo a mi hija de 14 años a ordenar sus tiempos y 
                    prepararse para las pruebas de manera autónoma. ¡Totalmente recomendado!"
                  </p>
                  <span className="font-display font-semibold text-sm text-primary-dark">
                    - Andrés Carrasco, Padre de Sofía
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC FEED NOVEDADES */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16 gap-4">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
                Novedades, Consejos y Próximos Talleres
              </h2>
              <p className="font-sans text-base text-muted">
                Artículos informativos, guías de psicopedagogía y registros fotográficos de nuestras actividades en Valdivia.
              </p>
            </div>
            <Link
              href="/novedades"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-muted hover:bg-border/60 text-primary font-sans font-bold text-sm border border-border/80 transition-all shrink-0"
            >
              <span>Ver Todo el Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-surface-muted rounded-2xl overflow-hidden border border-border/40 hover:border-primary/20 hover:shadow-md transition-all"
              >
                {/* Image wrapper */}
                <div className="aspect-video w-full overflow-hidden relative bg-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-3.5 p-6 flex-grow justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-xs text-accent font-semibold uppercase tracking-wider">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("es-CL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }) : "Novedades"}
                    </span>
                    <h3 className="font-display font-bold text-lg text-primary-dark line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-muted line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/novedades/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-primary mt-4 group-hover:underline"
                  >
                    <span>Leer más</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="sm:hidden flex justify-center mt-10">
            <Link
              href="/novedades"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-muted hover:bg-border/60 text-primary font-sans font-bold text-sm border border-border/80 transition-all w-full justify-center"
            >
              <span>Ver Todo el Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER FINAL */}
      <section className="py-20 bg-primary-dark text-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-primary-light blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 relative">
          <Heart className="w-12 h-12 fill-primary-light text-primary-light" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
            ¿Preparado para potenciar el aprendizaje?
          </h2>
          <p className="font-sans text-base text-surface/85 max-w-xl leading-relaxed">
            Reserva una cita hoy mismo a través de nuestro sistema interactivo. Elige el servicio, 
            el día y la hora que mejor te acomode en pocos pasos.
          </p>
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-light hover:bg-primary text-primary-dark hover:text-surface font-sans font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 mt-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Agendar una Sesión en Línea</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
