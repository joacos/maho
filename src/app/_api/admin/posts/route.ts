import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface MockPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  publishedAt: string | null;
  authorName: string;
}

const MOCK_POSTS: MockPost[] = [
  {
    id: "post-1",
    title: "Cómo Fomentar el Hábito de la Lectura en Niños en Edad Escolar",
    slug: "como-fomentar-el-habito-de-la-lectura",
    content: "La lectura no debe ser una obligación. Te presentamos 5 consejos prácticos basados en psicopedagogía para hacer que tus hijos amen los libros desde pequeños...",
    excerpt: "La lectura no debe ser una obligación. Te presentamos 5 consejos prácticos basados en psicopedagogía para hacer que tus hijos amen los libros desde pequeños.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    published: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    authorName: "Marjorie Cayún",
  },
  {
    id: "post-2",
    title: "Técnicas de Concentración y Manejo del Estrés en Época de Exámenes",
    slug: "tecnicas-de-concentracion-y-manejo-de-estres",
    content: "Descubre cómo organizar tus sesiones de estudio y aplicar técnicas eficaces para calmar la ansiedad antes de las evaluaciones importantes...",
    excerpt: "Descubre cómo organizar tus sesiones de estudio y aplicar técnicas eficaces para calmar la ansiedad antes de las evaluaciones importantes.",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    published: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    authorName: "Marjorie Cayún",
  },
  {
    id: "post-3",
    title: "El Rol de la Psicopedagogía en la Estimulación Cognitiva Infantil",
    slug: "rol-psicopedagogia-estimulacion-cognitiva-infantil",
    content: "Explora cómo la psicopedagogía interviene de manera temprana para potenciar el neurodesarrollo infantil, abriendo canales de aprendizaje flexibles y divertidos...",
    excerpt: "Explora cómo la psicopedagogía interviene de manera temprana para potenciar el neurodesarrollo infantil, abriendo canales de aprendizaje flexibles y divertidos.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    published: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    authorName: "Marjorie Cayún",
  },
];

// Memory store for mock mode when DB is unavailable
let memoryPosts: MockPost[] = [...MOCK_POSTS];

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (posts.length > 0) {
      return NextResponse.json({ posts, source: "db" });
    }
  } catch (err) {
    console.warn("Base de datos inaccesible en GET /api/admin/posts, utilizando estado en memoria.");
  }

  return NextResponse.json({ posts: memoryPosts, source: "mock" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, slug, content, excerpt, coverImage, published, authorName } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { message: "El título y el slug son requeridos." },
        { status: 400 }
      );
    }

    const postData = {
      title,
      slug,
      content: content || "",
      excerpt: excerpt || title,
      coverImage: coverImage || "",
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
      authorName: authorName || "Marjorie Cayún",
    };

    try {
      if (id && !id.startsWith("post-")) {
        const updated = await prisma.post.update({
          where: { id },
          data: postData,
        });
        return NextResponse.json({ success: true, post: updated });
      } else {
        const created = await prisma.post.create({
          data: postData,
        });
        return NextResponse.json({ success: true, post: created });
      }
    } catch (dbErr) {
      console.warn("DB Fallback en POST /api/admin/posts");
      // Memory fallback
      const existingIdx = memoryPosts.findIndex((p) => p.id === id || p.slug === slug);
      const newPost = {
        id: id || `post-${Date.now()}`,
        ...postData,
        publishedAt: postData.publishedAt ? postData.publishedAt.toISOString() : null,
      };

      if (existingIdx >= 0) {
        memoryPosts[existingIdx] = newPost;
      } else {
        memoryPosts.unshift(newPost);
      }

      return NextResponse.json({ success: true, post: newPost, source: "mock" });
    }
  } catch (error) {
    console.error("Error en POST /api/admin/posts:", error);
    return NextResponse.json(
      { message: "Error interno procesando el artículo." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID no proporcionado." }, { status: 400 });
    }

    try {
      if (!id.startsWith("post-")) {
        await prisma.post.delete({ where: { id } });
      }
    } catch (dbErr) {
      console.warn("DB Fallback en DELETE /api/admin/posts");
    }

    memoryPosts = memoryPosts.filter((p) => p.id !== id);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar post." }, { status: 500 });
  }
}
