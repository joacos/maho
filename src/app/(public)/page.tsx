import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EnfoqueFilosofia from "@/components/EnfoqueFilosofia";
import {
  Heart,
  Calendar,
  ArrowRight,
  BookOpen,
  Star,
  Award,
  ShieldCheck,
  Sparkles,
  Brain,
  Hand,
  SmilePlus,
  MapPin,
  Eye,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  TreePine,
} from "lucide-react";

// Mock de posts en caso de que la base de datos no esté conectada aún
const MOCK_POSTS = [
  {
    id: "mock-1",
    title: "5 Actividades en el Bosque para Estimular la Creatividad Infantil",
    slug: "5-actividades-bosque-estimular-creatividad",
    excerpt: "Juegos sensoriales y dinámicas de exploración en la naturaleza que potencian la imaginación, la curiosidad innata y la resolución creativa de problemas en la infancia.",
    coverImage: "/images/forest_path_sunlight_1782780147174.png",
    publishedAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Cómo la Naturaleza Mejora la Concentración y Regula las Emociones",
    slug: "naturaleza-concentracion-regulacion-emociones",
    excerpt: "Los beneficios cognitivos y emocionales comprobados por la neurociencia al exponer a los niños a entornos verdes: aumento de la atención y reducción de la fatiga mental.",
    coverImage: "/images/forest_kids_learning_1782780125618.png",
    publishedAt: new Date(),
  },
  {
    id: "mock-3",
    title: "Aprender Jugando al Aire Libre: La Ciencia del Desarrollo Integral",
    slug: "aprender-jugando-aire-libre-desarrollo-integral",
    excerpt: "Exploramos por qué la pedagogía vivencial en contacto directo con la naturaleza es clave para un neurodesarrollo saludable y la estimulación de los siete sentidos.",
    coverImage: "/images/forest_kids_group_1782780136450.png",
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
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-28 md:pb-36 bg-gradient-to-br from-surface via-surface to-surface-muted border-b border-border/20">
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
                <span>Enfoque Clínico Integral Cualitativo</span>
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-dark tracking-tight leading-tight">
                Psicopedagogía en{" "}
                <span className="text-primary-light underline decoration-accent decoration-3 underline-offset-6">
                  Movimiento
                </span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                Acompaño procesos de aprendizaje y desarrollo neurocognitivo desde una mirada integral, integrando estrategias psicopedagógicas, estimulación sensorial y movimiento consciente para potenciar el bienestar y la autonomía de cada persona.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
                <Link
                  href="/agendar"
                  className="inline-flex justify-center items-center gap-2.5 px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-bold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar una Sesión</span>
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-full bg-surface-muted hover:bg-border/60 text-primary font-sans font-bold text-base border border-border/80 transition-all w-full sm:w-auto"
                >
                  <span>Ver Servicios</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Right — Professional card */}
            <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none pt-4 lg:pt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/20 to-accent/30 rounded-3xl -rotate-3 scale-[1.02]" />
              <div className="relative bg-surface rounded-3xl shadow-xl border border-border/30 flex flex-col items-center text-center gap-6 p-8 sm:p-10 z-10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-primary-dark">
                    Marjorie Cayún
                  </h3>
                  <p className="font-sans text-xs text-primary-light font-medium mt-1">
                    Psicopedagogía en Movimiento
                  </p>
                </div>
                <p className="font-sans text-sm text-muted leading-relaxed italic">
                  &ldquo;Cada movimiento es una oportunidad para aprender, crecer y creer en uno mismo.&rdquo;
                </p>
                <div className="flex gap-1.5 text-accent shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="font-sans text-xs text-muted/80 tracking-wider uppercase font-semibold leading-relaxed">
                  DISCIPLINA QUE TRANSFORMA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MI ENFOQUE INTEGRA */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
              Mi enfoque integra:
            </h2>
            <p className="font-sans text-base text-muted">
              Pilares fundamentales para potenciar el aprendizaje y desarrollo desde el movimiento consciente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-3xl bg-surface border border-border/60 hover:border-primary-light/50 shadow-sm hover:shadow-md transition-all p-8 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-primary-dark mb-4 leading-tight">Estimulación Neurocognitiva</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Fortalezco funciones ejecutivas como la atención, memoria de trabajo, flexibilidad cognitiva y el razonamiento mediante planes de intervención basados en la evidencia y la plasticidad neuronal.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl bg-surface border border-border/60 hover:border-primary-light/50 shadow-sm hover:shadow-md transition-all p-8 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-primary-dark mb-4 leading-tight">Integración Sensorial</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Promuevo el procesamiento adecuado de los estímulos del entorno, facilitando una mejor respuesta adaptativa, autorregulación y organización neurofisiológica a través de experiencias táctiles, visuales y propioceptivas.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl bg-surface border border-border/60 hover:border-primary-light/50 shadow-sm hover:shadow-md transition-all p-8 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-light/10 text-primary-light flex items-center justify-center shrink-0">
                <Hand className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-primary-dark mb-4 leading-tight">Desarrollo Psicomotor</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Potencio la conciencia corporal, coordinación bilateral y equilibrio mediante dinámicas de movimiento consciente, ejercicios marciales y técnicas de malabarismo adaptados, transformando el movimiento en aprendizaje.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-3xl bg-surface border border-border/60 hover:border-primary-light/50 shadow-sm hover:shadow-md transition-all p-8 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-primary-dark mb-4 leading-tight">Intervención Psicopedagógica</h3>
                <ul className="font-sans text-sm text-muted leading-relaxed list-disc list-outside pl-4 space-y-1">
                  <li>Orientación y acompañamiento</li>
                  <li>Diseño de programas neurocognitivos</li>
                  <li>Mediación para el aprendizaje significativo</li>
                  <li>Abordaje integral y sensorial</li>
                  <li>Fortalecimiento de la lectoescritura</li>
                  <li>Acompañamiento a la diversidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MI ENFOQUE Y FILOSOFÍA — Portfolio-style pills + circular photos (Interactive) */}
      <section className="py-16 md:py-24 bg-surface-muted border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnfoqueFilosofia />
        </div>
      </section>

      {/* 4. QUÉ OFREZCO */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
              ¿Qué ofrezco?
            </h2>
            <p className="font-sans text-base text-muted">
              Distintas modalidades para acompañar a niños y niñas en su desarrollo integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 p-6 rounded-3xl bg-surface-muted border border-border/60">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <p className="font-sans font-medium text-primary-dark leading-snug">
                Clases de movimiento y actividades psicomotoras con enfoque formativo y valórico.
              </p>
            </div>
            
            <div className="flex items-center gap-4 p-6 rounded-3xl bg-surface-muted border border-border/60">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <p className="font-sans font-medium text-primary-dark leading-snug">
                Intervenciones psicomotoras individuales y grupales.
              </p>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-3xl bg-surface-muted border border-border/60">
              <div className="w-12 h-12 rounded-full bg-primary-light/10 text-primary-light flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <p className="font-sans font-medium text-primary-dark leading-snug">
                Estrategias psicopedagógicas para potenciar el aprendizaje desde el movimiento.
              </p>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-3xl bg-surface-muted border border-border/60">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <SmilePlus className="w-6 h-6" />
              </div>
              <p className="font-sans font-medium text-primary-dark leading-snug">
                Acompañamiento respetuoso que considera las necesidades de cada niño/a.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC FEED NOVEDADES */}
      <section className="py-16 md:py-24 bg-surface-muted border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16 gap-4">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
                Novedades, Consejos y Próximos Talleres
              </h2>
              <p className="font-sans text-base text-muted">
                Artículos sobre aprendizaje en la naturaleza, guías de estimulación integral y registros fotográficos de nuestras actividades en los bosques de Valdivia.
              </p>
            </div>
            <Link
              href="/novedades"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface hover:bg-border/60 text-primary font-sans font-bold text-sm border border-border/80 transition-all shrink-0"
            >
              <span>Ver Todo el Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border/40 hover:border-primary/20 hover:shadow-md transition-all"
              >
                {/* Image wrapper */}
                <div className="aspect-video w-full overflow-hidden relative bg-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage || "/images/forest_path_sunlight_1782780147174.png"}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface hover:bg-border/60 text-primary font-sans font-bold text-sm border border-border/80 transition-all w-full justify-center"
            >
              <span>Ver Todo el Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER FINAL */}
      <section className="py-12 md:py-20 bg-primary-dark text-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-primary-light blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 relative">
          <TreePine className="w-12 h-12 text-primary-light" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
            ¿Listos para aprender en el bosque?
          </h2>
          <p className="font-sans text-base text-surface/85 max-w-xl leading-relaxed">
            Reserva una experiencia de aprendizaje y crecimiento al aire libre para tus hijos hoy mismo. Elige el taller y el horario ideal.
          </p>
          <Link
            href="/agendar"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-primary-light hover:bg-primary text-primary-dark hover:text-surface font-sans font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 mt-2 w-full sm:w-auto"
          >
            <Calendar className="w-5 h-5" />
            <span>Reservar una Experiencia</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
