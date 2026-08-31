import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit,
  Trash2,
  Check,
  Search,
  Eye,
  Settings,
  Image as ImageIcon,
  Video as VideoIcon,
  Globe,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link as LinkIcon,
  Sparkles,
  CheckSquare,
  Square,
  ArrowUp,
  ArrowDown,
  Upload,
  Type,
  FileText,
  Layers,
  HelpCircle,
  ExternalLink,
  LogOut,
  Lock,
  EyeOff,
  Mail,
  XCircle,
  Shield,
} from "lucide-react";
import {
  isBlogAdminAuthenticated,
  getBlogAdminSession,
  loginBlogAdmin,
  logoutBlogAdmin,
  type BlogAdminSession,
} from "@/lib/blog-auth";
import { useBlogs, type BlogPost, type ContentBlock, type BlogFaq } from "@/lib/blog-store";
import { cn } from "@/lib/utils";

interface BlogAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlogAdmin({ isOpen, onClose }: BlogAdminProps) {
  const {
    blogs,
    categories,
    addBlog,
    updateBlog,
    deleteBlog,
    toggleFeatured,
    addCategory,
    deleteCategory,
  } = useBlogs();

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => isBlogAdminAuthenticated());
  const [adminSession, setAdminSession] = useState<BlogAdminSession | null>(() => getBlogAdminSession());
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = loginBlogAdmin(loginEmail, loginPassword);
    if (res.success && res.session) {
      setIsLoggedIn(true);
      setAdminSession(res.session);
    } else {
      setLoginError(res.error || "Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    logoutBlogAdmin();
    setIsLoggedIn(false);
    setAdminSession(null);
    setLoginEmail("");
    setLoginPassword("");
  };

  const [activeTab, setActiveTab] = useState<"list" | "editor" | "categories">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [editorSubTab, setEditorSubTab] = useState<"blocks" | "ckeditor" | "faqs" | "preview" | "seo">("blocks");
  const [newCatInput, setNewCatInput] = useState("");

  // Blog Editor Form State
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    title: "",
    slug: "",
    category: "Tech Hiring",
    excerpt: "",
    content: "",
    contentBlocks: [],
    faqs: [],
    featuredImage: "",
    author: {
      name: "Subhram Nayak",
      role: "Head of Placement",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    },
    readTime: "5 min read",
    publishDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    isFeatured: true,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogImage: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form for creating new post
  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: categories[0] || "Tech Hiring",
      excerpt: "",
      content: "",
      contentBlocks: [],
      faqs: [],
      featuredImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
      author: {
        name: "Subhram Nayak",
        role: "Head of Placement",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      },
      readTime: "4 min read",
      publishDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      isFeatured: true,
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        canonicalUrl: "",
        ogImage: "",
      },
    });
    setActiveTab("editor");
    setEditorSubTab("blocks");
  };

  // Populate form for editing existing post
  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      contentBlocks: blog.contentBlocks ? [...blog.contentBlocks] : [],
      faqs: blog.faqs ? [...blog.faqs] : [],
      featuredImage: blog.featuredImage,
      author: { ...blog.author },
      readTime: blog.readTime,
      publishDate: blog.publishDate,
      isFeatured: blog.isFeatured,
      seo: { ...blog.seo },
    });
    setActiveTab("editor");
    setEditorSubTab("blocks");
  };

  // Auto-generate slug & meta title when title changes
  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: slugified,
      seo: {
        ...prev.seo,
        metaTitle: prev.seo.metaTitle || `${val} | Venus Consultancy`,
        canonicalUrl: prev.seo.canonicalUrl || `https://venus-hiring.vercel.app/`,
      },
    }));
  };

  // DYNAMIC BLOCK BUILDER ACTIONS
  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      headingLevel: type === "heading" ? "h2" : undefined,
      text: type === "heading" ? "New Heading Title" : type === "paragraph" ? "Enter section description..." : type === "quote" ? "Enter quote or takeaway..." : "",
      mediaUrl: "",
      mediaType: "url",
    };

    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...(prev.contentBlocks || []), newBlock],
    }));
  };

  const updateBlock = (id: string, updated: Partial<ContentBlock>) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: (prev.contentBlocks || []).map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  };

  const deleteBlock = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: (prev.contentBlocks || []).filter((b) => b.id !== id),
    }));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const blocks = [...(formData.contentBlocks || [])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const temp = blocks[index];
    blocks[index] = blocks[targetIndex];
    blocks[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, contentBlocks: blocks }));
  };

  // ARTICLE-SPECIFIC FAQ ACTIONS
  const addBlogFaq = () => {
    const newFaq: BlogFaq = {
      id: `faq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      q: "Enter Question...",
      a: "Enter Answer description...",
    };
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), newFaq],
    }));
  };

  const updateBlogFaq = (id: string, updated: Partial<BlogFaq>) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };

  const deleteBlogFaq = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((f) => f.id !== id),
    }));
  };

  const moveBlogFaq = (index: number, direction: "up" | "down") => {
    const list = [...(formData.faqs || [])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, faqs: list }));
  };

  // File Upload Handlers (Converts local files to base64 Data URLs for local persistence)
  const handleFileUpload = (blockId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateBlock(blockId, { mediaUrl: e.target.result as string, mediaType: "upload" });
      }
    };
    reader.readAsDataURL(file);
  };

  // Compile Dynamic Blocks into HTML content for rendering and saving
  const compileBlocksToHtml = (): string => {
    if (!formData.contentBlocks || formData.contentBlocks.length === 0) {
      return formData.content;
    }

    const htmlParts = formData.contentBlocks.map((b) => {
      switch (b.type) {
        case "heading":
          return `<${b.headingLevel || "h2"}>${b.text || ""}</${b.headingLevel || "h2"}>`;
        case "paragraph":
          return `<p>${(b.text || "").replace(/\n/g, "<br/>")}</p>`;
        case "quote":
          return `<blockquote>"${b.text || ""}"</blockquote>`;
        case "image":
          if (!b.mediaUrl) return "";
          return `
            <figure class="my-6">
              <img src="${b.mediaUrl}" alt="${b.caption || "Blog Image"}" class="w-full rounded-2xl border border-border max-h-[480px] object-cover" />
              ${b.caption ? `<figcaption class="mt-2 text-center text-xs text-muted-foreground">${b.caption}</figcaption>` : ""}
            </figure>
          `;
        case "video":
          if (!b.mediaUrl) return "";
          if (b.mediaUrl.includes("youtube.com") || b.mediaUrl.includes("youtu.be")) {
            let embedUrl = b.mediaUrl;
            if (b.mediaUrl.includes("watch?v=")) {
              embedUrl = b.mediaUrl.replace("watch?v=", "embed/");
            } else if (b.mediaUrl.includes("youtu.be/")) {
              embedUrl = b.mediaUrl.replace("youtu.be/", "youtube.com/embed/");
            }
            return `
              <div class="my-6 aspect-video overflow-hidden rounded-2xl border border-border">
                <iframe src="${embedUrl}" title="Video player" class="w-full h-full" allowfullscreen></iframe>
              </div>
            `;
          }
          return `
            <div class="my-6 overflow-hidden rounded-2xl border border-border">
              <video src="${b.mediaUrl}" controls class="w-full max-h-[480px] bg-black"></video>
              ${b.caption ? `<p class="mt-2 text-center text-xs text-muted-foreground">${b.caption}</p>` : ""}
            </div>
          `;
        default:
          return "";
      }
    });

    return htmlParts.join("\n");
  };

  // CKEditor Rich Text Formatting Helper
  const insertCkFormatting = (tagStart: string, tagEnd: string = "") => {
    const content = formData.content;
    const newContent = content + `\n${tagStart}Your text here${tagEnd}\n`;
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  // Save Blog Post Handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!formData.faqs || formData.faqs.length === 0) {
      if (
        !confirm(
          "SEO Recommendation: Every blog article should have between 2 to 10 Frequently Asked Questions for Google FAQPage schema indexing. Do you want to publish without FAQs?"
        )
      ) {
        setEditorSubTab("faqs");
        return;
      }
    }

    const compiledHtml = compileBlocksToHtml();

    const postPayload = {
      ...formData,
      content: compiledHtml || formData.content,
    };

    if (editingId) {
      updateBlog(editingId, postPayload);
    } else {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        ...postPayload,
      };
      addBlog(newPost);
    }

    setActiveTab("list");
  };

  if (!isOpen) return null;

  // LOGIN PROTECTION CHECK FOR BLOG ADMIN
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-md space-y-6 rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-2xl text-left">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-soft border border-brand/20">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
              Blog Admin Login
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enter your credentials to access the Blog Content Management System.
            </p>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-bold text-destructive">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all mt-2"
            >
              <Lock className="h-4 w-4" /> Access Blog Admin Panel
            </button>
          </form>

          <div className="border-t border-border/60 pt-4 text-center">
            <p className="text-[11px] text-muted-foreground font-mono">
              Protected Area • Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === "all" || b.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-[2.25rem] border border-border bg-background shadow-2xl overflow-hidden text-foreground">
        {/* Top Navbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Blog Admin & Content Control Center
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage Articles, Media Blocks, Article FAQs, Categories, and SEO
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "list"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-background border border-border text-foreground hover:bg-accent"
              )}
            >
              All Articles ({blogs.length})
            </button>
            <button
              type="button"
              onClick={handleCreateNew}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "editor" && !editingId
                  ? "bg-brand text-white shadow-brand"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              )}
            >
              <Plus className="h-4 w-4" /> Add New Post
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "categories"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-background border border-border text-foreground hover:bg-accent"
              )}
            >
              Categories ({categories.length})
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive hover:text-white transition-all shadow-soft ml-1"
              title="Logout from Blog Admin"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:bg-brand hover:text-white transition-colors ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: ARTICLES LIST VIEW */}
          {activeTab === "list" && (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Category:</span>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-brand focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid gap-4">
                {filteredBlogs.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
                    No articles found matching your query.
                  </div>
                ) : (
                  filteredBlogs.map((b) => {
                    const targetUrl = `/blog/${b.slug || b.id}`;

                    return (
                      <div
                        key={b.id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 hover:border-brand/40 transition-all shadow-sm"
                      >
                        {/* Image & Title Link */}
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Click to view article on original site"
                          className="flex items-center gap-4 min-w-0 flex-1 group/link cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={b.featuredImage}
                            alt={b.title}
                            className="h-16 w-24 shrink-0 rounded-xl object-cover border border-border group-hover/link:scale-105 transition-transform"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="rounded-full bg-brand/10 border border-brand/30 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase">
                                {b.category}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {b.publishDate} &bull; {b.readTime}
                              </span>
                              {b.faqs && b.faqs.length > 0 && (
                                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                  {b.faqs.length} FAQs
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-sm text-foreground truncate max-w-md group-hover/link:text-brand transition-colors flex items-center gap-1.5">
                              {b.title}
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {b.excerpt}
                            </p>
                          </div>
                        </a>

                        {/* Featured Checkbox & Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-xl border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand hover:text-white transition-all shadow-sm"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> View Article
                          </a>

                          <button
                            type="button"
                            onClick={() => toggleFeatured(b.id)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold border transition-all",
                              b.isFeatured
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-border bg-background text-muted-foreground hover:border-brand"
                            )}
                          >
                            {b.isFeatured ? (
                              <CheckSquare className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                            Featured
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(b)}
                            className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold hover:border-brand hover:text-brand transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" /> Edit
                          </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${b.title}"?`)) {
                              deleteBlog(b.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BLOG EDITOR VIEW */}
          {activeTab === "editor" && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Sub-Nav Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditorSubTab("blocks")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorSubTab === "blocks"
                        ? "bg-brand text-white shadow-brand"
                        : "bg-card border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    <Layers className="h-3.5 w-3.5" /> Content Block Builder
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditorSubTab("faqs")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorSubTab === "faqs"
                        ? "bg-amber-500 text-white shadow-md"
                        : "bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white"
                    )}
                  >
                    <HelpCircle className="h-3.5 w-3.5" /> Article FAQs ({formData.faqs?.length || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorSubTab("preview")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorSubTab === "preview"
                        ? "bg-brand text-white shadow-brand"
                        : "bg-card border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    <Eye className="h-3.5 w-3.5" /> Live Preview Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorSubTab("seo")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorSubTab === "seo"
                        ? "bg-brand text-white shadow-brand"
                        : "bg-card border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    <Globe className="h-3.5 w-3.5" /> SEO Settings & Snippet
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))
                      }
                      className="rounded border-border text-brand focus:ring-brand h-4 w-4"
                    />
                    Feature on Homepage Slider
                  </label>

                  <button
                    type="submit"
                    className="rounded-xl bg-brand px-6 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                  >
                    {editingId ? "Update Article" : "Publish Article"}
                  </button>
                </div>
              </div>

              {/* ARTICLE BASIC METADATA */}
              <div className="grid gap-4 sm:grid-cols-12 rounded-2xl border border-border bg-card p-4">
                <div className="sm:col-span-8 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Article Title *
                      </label>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          title="Bold Title Tag"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, title: `<strong>${prev.title}</strong>` }))
                          }
                          className="rounded px-1.5 py-0.5 text-[10px] font-bold border border-border bg-background hover:bg-accent text-foreground"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          title="Italic Title Tag"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, title: `<em>${prev.title}</em>` }))
                          }
                          className="rounded px-1.5 py-0.5 text-[10px] italic font-bold border border-border bg-background hover:bg-accent text-foreground"
                        >
                          I
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2026 Canadian Tech Hiring Trends"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm font-bold text-foreground focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Short Excerpt / Subtitle
                      </label>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          title="Bold Excerpt"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, excerpt: `<strong>${prev.excerpt}</strong>` }))
                          }
                          className="rounded px-1.5 py-0.5 text-[10px] font-bold border border-border bg-background hover:bg-accent text-foreground"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          title="Italic Excerpt"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, excerpt: `<em>${prev.excerpt}</em>` }))
                          }
                          className="rounded px-1.5 py-0.5 text-[10px] italic font-bold border border-border bg-background hover:bg-accent text-foreground"
                        >
                          I
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Brief 1-2 sentence summary..."
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-2 text-xs text-foreground focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-brand focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Featured Cover Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.featuredImage}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SUB-TAB 1: DYNAMIC CONTENT BLOCK BUILDER & RICH CONTENT EDITOR */}
              {editorSubTab === "blocks" && (
                <div className="space-y-6">
                  {/* MAIN ARTICLE RICH HTML CONTENT EDITOR */}
                  <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand">
                        Main Article HTML Body & Content
                      </label>
                      <span className="text-[11px] text-muted-foreground font-semibold">
                        Formatting Toolbar: Headings, Lists, Links, Quotes & Code
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 rounded-t-xl border border-border bg-background p-2 border-b-0">
                      <button
                        type="button"
                        title="Heading 2"
                        onClick={() => insertCkFormatting("<h2>", "</h2>")}
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground text-xs font-bold flex items-center gap-1"
                      >
                        <Heading2 className="h-4 w-4" /> H2
                      </button>
                      <button
                        type="button"
                        title="Heading 3"
                        onClick={() => insertCkFormatting("<h3>", "</h3>")}
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground text-xs font-bold flex items-center gap-1"
                      >
                        <Heading3 className="h-4 w-4" /> H3
                      </button>
                      <div className="h-4 w-px bg-border my-auto mx-1" />
                      <button
                        type="button"
                        title="Bold"
                        onClick={() => insertCkFormatting("<strong>", "</strong>")}
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Italic"
                        onClick={() => insertCkFormatting("<em>", "</em>")}
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-px bg-border my-auto mx-1" />
                      <button
                        type="button"
                        title="Bullet List"
                        onClick={() =>
                          insertCkFormatting("<ul>\n  <li>", "</li>\n  <li>Item 2</li>\n</ul>")
                        }
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Numbered List"
                        onClick={() =>
                          insertCkFormatting("<ol>\n  <li>", "</li>\n  <li>Step 2</li>\n</ol>")
                        }
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <ListOrdered className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Blockquote"
                        onClick={() => insertCkFormatting("<blockquote>", "</blockquote>")}
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <Quote className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Insert Code"
                        onClick={() => insertCkFormatting("<code>", "</code>")}
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <Code className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Insert Link"
                        onClick={() =>
                          insertCkFormatting('<a href="https://www.venushiring.ca">', "</a>")
                        }
                        className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <textarea
                      rows={12}
                      placeholder="Write article HTML content..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, content: e.target.value }))
                      }
                      className="w-full rounded-b-xl border border-border bg-background p-4 text-xs font-mono text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none"
                    />
                  </div>

                  {/* Add Field Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4">
                    <span className="text-xs font-bold text-brand uppercase tracking-wider">
                      Add Custom Content Fields:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addBlock("heading")}
                        className="inline-flex items-center gap-1 rounded-xl bg-card border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors shadow-sm"
                      >
                        <Type className="h-3.5 w-3.5 text-brand" /> + Heading Field
                      </button>
                      <button
                        type="button"
                        onClick={() => addBlock("paragraph")}
                        className="inline-flex items-center gap-1 rounded-xl bg-card border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors shadow-sm"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-500" /> + Description Field
                      </button>
                      <button
                        type="button"
                        onClick={() => addBlock("image")}
                        className="inline-flex items-center gap-1 rounded-xl bg-card border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors shadow-sm"
                      >
                        <ImageIcon className="h-3.5 w-3.5 text-emerald-500" /> + Image (URL / Upload)
                      </button>
                      <button
                        type="button"
                        onClick={() => addBlock("video")}
                        className="inline-flex items-center gap-1 rounded-xl bg-card border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors shadow-sm"
                      >
                        <VideoIcon className="h-3.5 w-3.5 text-purple-500" /> + Video (URL / Upload)
                      </button>
                      <button
                        type="button"
                        onClick={() => addBlock("quote")}
                        className="inline-flex items-center gap-1 rounded-xl bg-card border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors shadow-sm"
                      >
                        <Quote className="h-3.5 w-3.5 text-amber-500" /> + Quote / Callout
                      </button>
                    </div>
                  </div>

                  {/* Rendered Block List */}
                  {(!formData.contentBlocks || formData.contentBlocks.length === 0) ? (
                    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center space-y-3">
                      <Layers className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-xs font-semibold text-muted-foreground">
                        No custom fields added yet. Click the buttons above to add Headings, Descriptions, Images, or Videos!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.contentBlocks.map((block, idx) => (
                        <div
                          key={block.id}
                          className="group relative rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3 transition-all hover:border-brand/50"
                        >
                          {/* Block Header & Reorder/Delete Actions */}
                          <div className="flex items-center justify-between border-b border-border/60 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-brand text-[11px] font-bold">
                                #{idx + 1}
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {block.type} Field
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                title="Move Up"
                                disabled={idx === 0}
                                onClick={() => moveBlock(idx, "up")}
                                className="rounded-lg p-1 hover:bg-accent text-muted-foreground disabled:opacity-30"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Move Down"
                                disabled={idx === (formData.contentBlocks?.length || 0) - 1}
                                onClick={() => moveBlock(idx, "down")}
                                className="rounded-lg p-1 hover:bg-accent text-muted-foreground disabled:opacity-30"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Delete Field"
                                onClick={() => deleteBlock(block.id)}
                                className="rounded-lg p-1 text-rose-500 hover:bg-rose-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* FIELD TYPE: HEADING */}
                          {block.type === "heading" && (
                            <div className="flex items-center gap-3">
                              <select
                                value={block.headingLevel || "h2"}
                                onChange={(e) =>
                                  updateBlock(block.id, {
                                    headingLevel: e.target.value as "h2" | "h3",
                                  })
                                }
                                className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-brand focus:border-brand focus:outline-none shrink-0"
                              >
                                <option value="h2">H2 Heading</option>
                                <option value="h3">H3 Subheading</option>
                              </select>
                              <input
                                type="text"
                                placeholder="Enter Heading Text..."
                                value={block.text || ""}
                                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm font-bold text-foreground focus:border-brand focus:outline-none"
                              />
                            </div>
                          )}

                          {/* FIELD TYPE: PARAGRAPH / DESCRIPTION */}
                          {block.type === "paragraph" && (
                            <div>
                              <textarea
                                rows={3}
                                placeholder="Enter article description paragraph..."
                                value={block.text || ""}
                                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-foreground focus:border-brand focus:outline-none resize-y"
                              />
                            </div>
                          )}

                          {/* FIELD TYPE: QUOTE */}
                          {block.type === "quote" && (
                            <div>
                              <input
                                type="text"
                                placeholder="Enter executive quote or highlighted callout..."
                                value={block.text || ""}
                                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                                className="w-full rounded-xl border border-amber-500/40 bg-amber-500/5 px-4 py-2.5 text-xs font-medium italic text-foreground focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                          )}

                          {/* FIELD TYPE: IMAGE (URL OR FILE UPLOAD) */}
                          {block.type === "image" && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="flex rounded-xl border border-border bg-background p-0.5 text-xs font-semibold">
                                  <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { mediaType: "url" })}
                                    className={cn(
                                      "rounded-lg px-3 py-1 transition-all",
                                      block.mediaType !== "upload"
                                        ? "bg-brand text-white"
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    Image URL
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { mediaType: "upload" })}
                                    className={cn(
                                      "rounded-lg px-3 py-1 transition-all",
                                      block.mediaType === "upload"
                                        ? "bg-brand text-white"
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    Upload File
                                  </button>
                                </div>

                                {block.mediaType === "upload" ? (
                                  <label className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-brand/50 bg-brand/5 px-4 py-2 text-xs font-bold text-brand cursor-pointer hover:bg-brand/10 transition-colors">
                                    <Upload className="h-4 w-4" /> Choose Image File from Device
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                          handleFileUpload(block.id, e.target.files[0]);
                                        }
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                ) : (
                                  <input
                                    type="url"
                                    placeholder="Paste Image URL (https://...)"
                                    value={block.mediaUrl || ""}
                                    onChange={(e) =>
                                      updateBlock(block.id, { mediaUrl: e.target.value })
                                    }
                                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs focus:border-brand focus:outline-none"
                                  />
                                )}
                              </div>

                              <input
                                type="text"
                                placeholder="Optional image caption..."
                                value={block.caption || ""}
                                onChange={(e) =>
                                  updateBlock(block.id, { caption: e.target.value })
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground focus:border-brand focus:outline-none"
                              />

                              {block.mediaUrl && (
                                <div className="mt-2 overflow-hidden rounded-xl border border-border max-h-48">
                                  <img
                                    src={block.mediaUrl}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* FIELD TYPE: VIDEO (URL OR FILE UPLOAD) */}
                          {block.type === "video" && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="flex rounded-xl border border-border bg-background p-0.5 text-xs font-semibold">
                                  <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { mediaType: "url" })}
                                    className={cn(
                                      "rounded-lg px-3 py-1 transition-all",
                                      block.mediaType !== "upload"
                                        ? "bg-purple-600 text-white"
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    Video URL
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { mediaType: "upload" })}
                                    className={cn(
                                      "rounded-lg px-3 py-1 transition-all",
                                      block.mediaType === "upload"
                                        ? "bg-purple-600 text-white"
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    Upload Video
                                  </button>
                                </div>

                                {block.mediaType === "upload" ? (
                                  <label className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-purple-500/50 bg-purple-500/5 px-4 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 cursor-pointer hover:bg-purple-500/10 transition-colors">
                                    <Upload className="h-4 w-4" /> Choose Video File from Device
                                    <input
                                      type="file"
                                      accept="video/*"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                          handleFileUpload(block.id, e.target.files[0]);
                                        }
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                ) : (
                                  <input
                                    type="url"
                                    placeholder="Paste Video URL (YouTube, Vimeo, MP4 link)"
                                    value={block.mediaUrl || ""}
                                    onChange={(e) =>
                                      updateBlock(block.id, { mediaUrl: e.target.value })
                                    }
                                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs focus:border-brand focus:outline-none"
                                  />
                                )}
                              </div>

                              <input
                                type="text"
                                placeholder="Optional video caption..."
                                value={block.caption || ""}
                                onChange={(e) =>
                                  updateBlock(block.id, { caption: e.target.value })
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground focus:border-brand focus:outline-none"
                              />

                              {block.mediaUrl && (
                                <div className="mt-2 overflow-hidden rounded-xl border border-border aspect-video bg-black max-h-48 flex items-center justify-center">
                                  {block.mediaUrl.includes("youtube.com") || block.mediaUrl.includes("youtu.be") ? (
                                    <iframe
                                      src={
                                        block.mediaUrl.includes("watch?v=")
                                          ? block.mediaUrl.replace("watch?v=", "embed/")
                                          : block.mediaUrl.replace("youtu.be/", "youtube.com/embed/")
                                      }
                                      title="Video preview"
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    <video src={block.mediaUrl} controls className="w-full h-full" />
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}



              {/* SUB-TAB 3: ARTICLE-SPECIFIC FAQS BUILDER */}
              {editorSubTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Article Specific FAQs:
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Add custom Questions & Answers for this specific blog post.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addBlogFaq}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-all"
                    >
                      <Plus className="h-4 w-4" /> Add FAQ Question to Article
                    </button>
                  </div>

                  {(!formData.faqs || formData.faqs.length === 0) ? (
                    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center space-y-2">
                      <HelpCircle className="h-8 w-8 text-amber-500 mx-auto" />
                      <p className="text-xs font-semibold text-muted-foreground">
                        No custom FAQs added to this article yet. Click the button above to add questions!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.faqs.map((faq, idx) => (
                        <div
                          key={faq.id}
                          className="group relative rounded-2xl border border-border bg-card p-4 space-y-3 shadow-sm hover:border-amber-500/40 transition-all"
                        >
                          <div className="flex items-center justify-between border-b border-border/60 pb-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                              FAQ #{idx + 1}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                title="Move Up"
                                disabled={idx === 0}
                                onClick={() => moveBlogFaq(idx, "up")}
                                className="rounded-lg p-1 hover:bg-accent text-muted-foreground disabled:opacity-30"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Move Down"
                                disabled={idx === (formData.faqs?.length || 0) - 1}
                                onClick={() => moveBlogFaq(idx, "down")}
                                className="rounded-lg p-1 hover:bg-accent text-muted-foreground disabled:opacity-30"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Delete FAQ"
                                onClick={() => deleteBlogFaq(faq.id)}
                                className="rounded-lg p-1 text-rose-500 hover:bg-rose-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                Question *
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Question..."
                                value={faq.q}
                                onChange={(e) =>
                                  updateBlogFaq(faq.id, { q: e.target.value })
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                Answer Description *
                              </label>
                              <textarea
                                rows={3}
                                placeholder="Enter detailed answer..."
                                value={faq.a}
                                onChange={(e) =>
                                  updateBlogFaq(faq.id, { a: e.target.value })
                                }
                                className="w-full rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-foreground focus:border-amber-500 focus:outline-none resize-y"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 4: LIVE PREVIEW BOX */}
              {editorSubTab === "preview" && (
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Real-time Article Preview Box
                    </span>
                    <span className="text-xs text-muted-foreground">{formData.readTime}</span>
                  </div>

                  <div className="space-y-4">
                    <span className="rounded-full bg-brand/10 border border-brand/30 px-3 py-1 text-xs font-bold text-brand uppercase">
                      {formData.category}
                    </span>
                    <h1 className="font-display text-3xl font-bold text-foreground">
                      {formData.title || "Untitled Article"}
                    </h1>
                    <p className="text-base text-muted-foreground font-medium">
                      {formData.excerpt}
                    </p>

                    {formData.featuredImage && (
                      <img
                        src={formData.featuredImage}
                        alt={formData.title}
                        className="my-6 max-h-[360px] w-full rounded-2xl object-cover border border-border"
                      />
                    )}

                    <div
                      className="prose prose-slate dark:prose-invert max-w-none prose-h2:text-2xl prose-p:leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: compileBlocksToHtml() || formData.content,
                      }}
                    />

                    {formData.faqs && formData.faqs.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-border space-y-3">
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-amber-500" /> Article FAQs ({formData.faqs.length})
                        </h4>
                        {formData.faqs.map((f) => (
                          <div key={f.id} className="rounded-xl border border-border p-3 bg-background/50 space-y-1">
                            <p className="text-xs font-bold text-foreground">{f.q}</p>
                            <p className="text-xs text-muted-foreground">{f.a}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: SEO SETTINGS & SNIPPET PREVIEW */}
              {editorSubTab === "seo" && (
                <div className="space-y-6">
                  {/* Google Search Snippet Preview Box */}
                  <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Google Search Snippet Preview
                    </span>
                    <div className="rounded-xl border border-border/60 bg-background p-4 space-y-1">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono truncate">
                        {formData.seo.canonicalUrl || `https://www.venushiring.ca/blog/${formData.slug}`}
                      </p>
                      <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        {formData.seo.metaTitle || formData.title || "Article Title"}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {formData.seo.metaDescription || formData.excerpt || "Article meta description..."}
                      </p>
                    </div>
                  </div>

                  {/* SEO Form Inputs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          SEO Meta Title
                        </label>
                        <span className="text-[10px] text-muted-foreground">
                          {formData.seo.metaTitle.length}/60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Primary title tag for search engines..."
                        value={formData.seo.metaTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, metaTitle: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Keywords / Tags
                        </label>
                        <span className="text-[10px] text-muted-foreground">Comma separated</span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Canadian Tech Hiring, Executive Search"
                        value={formData.seo.keywords}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, keywords: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          SEO Meta Description
                        </label>
                        <span className="text-[10px] text-muted-foreground">
                          {formData.seo.metaDescription.length}/160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Search engine meta description snippet..."
                        value={formData.seo.metaDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, metaDescription: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              {/* Add New Category Input */}
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <input
                  type="text"
                  placeholder="Enter new category name..."
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCatInput.trim()) {
                      addCategory(newCatInput);
                      setNewCatInput("");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                >
                  <Plus className="h-4 w-4" /> Add Category
                </button>
              </div>

              {/* Categories List */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                  <div
                    key={c}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card p-4"
                  >
                    <span className="font-bold text-xs text-foreground">{c}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete category "${c}"?`)) {
                          deleteCategory(c);
                        }
                      }}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
