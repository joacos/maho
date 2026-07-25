import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, BookOpen, Clock, Heart } from "lucide-react";

const MOCK_POSTS = [
  {
    id: "post-1",
    title: "Cómo Fomentar el Hábito de la Lectura en Niños en Edad Escolar",
    slug: "como-fomentar-el-habito-de-la-lectura",
    excerpt: "La lectura no debe ser una obligación. Te presentamos 5 consejos prácticos basados en psicopedagogía para hacer que tus hijos amen los libros desde pequeños.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // Hace 10 días
    authorName: "Maho Cayun",
  },
  {
    id: "post-2",
    title: "Técnicas de Concentración y Manejo del Estrés en Época de Exámenes",
    slug: "tecnicas-de-concentracion-y-manejo-de-estres",
    excerpt: "Descubre cómo organizar tus sesiones de estudio y aplicar técnicas eficaces para calmar la ansiedad antes de las evaluaciones importantes.",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // Hace 5 días
    authorName: "Maho Cayun",
  },
  {
    id: "post-3",
    title: "El Rol de la Psicopedagogía en la Estimulación Cognitiva Infantil",
    slug: "rol-psicopedagogia-estimulacion-cognitiva-infantil",
    excerpt: "Explora cómo la psicopedagogía interviene de manera temprana para potenciar el neurodesarrollo infantil, abriendo canales de aprendizaje flexibles y divertidos.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // Hace 1 día
    authorName: "Maho Cayun",
  },
];

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return posts.length > 0 ? posts : MOCK_POSTS;
  } catch (error) {
    console.warn("Base de datos no conectada para obtener novedades, usando mocks.");
    return MOCK_POSTS;
  }
}

export default async function NovedadesPage() {
  const posts = await getPosts();

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-surface to-surface-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-primary-dark tracking-tight">
            Blog de Novedades y Consejos
          </h1>
          <p className="font-sans text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Recursos prácticos, reflexiones psicopedagógicas e información útil 
            para acompañar el aprendizaje de tus hijos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border/40 hover:border-primary/20 hover:shadow-md transition-all"
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

                <div className="flex items-center justify-between pt-6 border-t border-border/20 mt-4">
                  <span className="font-sans text-xs text-muted/80 font-medium">
                    Por {post.authorName || "Maho Cayun"}
                  </span>
                  
                  <Link
                    href={`/novedades/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-primary group-hover:underline"
                  >
                    <span>Leer más</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
