"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  published: boolean;
  publishedAt?: string;
  authorName?: string;
}

export default function BlogAdminSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    authorName: "Marjorie Cayún",
    published: true,
    content: "",
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Error al cargar posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : generateSlug(title),
    }));
  };

  const handleStartNew = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      coverImage: "",
      authorName: "Marjorie Cayún",
      published: true,
      content: "",
    });
    setIsEditing(true);
    setMessage(null);
  };

  const handleStartEdit = (post: Post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      coverImage: post.coverImage || "",
      authorName: post.authorName || "Marjorie Cayún",
      published: post.published,
      content: post.content || "",
    });
    setIsEditing(true);
    setMessage(null);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          ...formData,
        }),
      });

      if (res.ok) {
        setMessage({
          text: editingId ? "¡Artículo actualizado con éxito!" : "¡Artículo creado con éxito!",
          type: "success",
        });
        setIsEditing(false);
        fetchPosts();
      } else {
        const err = await res.json();
        setMessage({ text: err.message || "Error al guardar el artículo.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error de comunicación con el servidor.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar el artículo "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ text: "Artículo eliminado.", type: "success" });
        fetchPosts();
      } else {
        setMessage({ text: "Error al eliminar artículo.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error de conexión.", type: "error" });
    }
  };

  const togglePublished = async (post: Post) => {
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-sans font-bold text-xs uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Gestión de Contenido</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-800">
            Administración del Blog de Novedades
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-1">
            Crea, edita y gestiona las publicaciones y artículos del sitio web.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleStartNew}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-sans font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nuevo Artículo</span>
          </button>
        )}
      </div>

      {/* Message Feedback */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 font-sans text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Editor View */}
      {isEditing ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-2 font-sans font-semibold text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Lista</span>
            </button>
            <h3 className="font-display font-bold text-lg text-slate-800">
              {editingId ? "Editar Artículo" : "Nuevo Artículo"}
            </h3>
          </div>

          <form onSubmit={handleSavePost} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Título del Artículo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Ej. Estrategias de concentración para niños"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Slug (URL Amigable) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="estrategias-concentracion-ninos"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                  URL Imagen de Portada
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                  />
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nombre del Autor
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                Resumen / Extracto *
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve introducción que aparecerá en las tarjetas del blog..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contenido del Artículo *
              </label>
              <textarea
                rows={10}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Escribe el contenido completo del post..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary"
              />
              <label htmlFor="published" className="font-sans text-sm font-semibold text-slate-700 cursor-pointer">
                Publicar inmediatamente en el blog público
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-sans font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-sans font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <span>{editingId ? "Actualizar Artículo" : "Publicar Artículo"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
          {/* Search bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar artículo por título..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-sm font-sans"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="font-sans text-sm">Cargando artículos...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-3">
              <FileText className="w-10 h-10 text-slate-300" />
              <p className="font-sans text-sm text-slate-500 font-medium">
                No se encontraron artículos.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-3">Artículo</th>
                    <th className="pb-3 px-3">Autor</th>
                    <th className="pb-3 px-3">Estado</th>
                    <th className="pb-3 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            {post.coverImage ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <FileText className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 line-clamp-1">
                              {post.title}
                            </span>
                            <span className="text-xs text-slate-400 font-mono block">
                              /{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-3 text-slate-600 text-xs font-medium">
                        {post.authorName || "Marjorie Cayún"}
                      </td>

                      <td className="py-4 px-3">
                        <button
                          type="button"
                          onClick={() => togglePublished(post)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                            post.published
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                          }`}
                        >
                          {post.published ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Publicado</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Borrador</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(post)}
                            className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                            title="Editar artículo"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id, post.title)}
                            className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Eliminar artículo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
