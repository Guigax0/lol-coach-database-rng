"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../utils/supabaseClient";

interface StrategyArticle {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export default function StrategiePage() {
  const [articles, setArticles] = useState<StrategyArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // States pour la lecture
  const [readingArticle, setReadingArticle] = useState<StrategyArticle | null>(null);

  // States pour l'éditeur
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("strategy_articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setArticles(data);
    setLoading(false);
  };

  const openEditor = (article?: StrategyArticle) => {
    if (article) {
      setEditId(article.id);
      setEditTitle(article.title);
      setEditContent(article.content);
      setEditImageUrl(article.image_url || "");
    } else {
      setEditId(null);
      setEditTitle("");
      setEditContent("");
      setEditImageUrl("");
    }
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
  };

  const saveArticle = async () => {
    if (!editTitle.trim()) {
      alert("Le titre est obligatoire.");
      return;
    }

    const payload = {
      title: editTitle,
      content: editContent,
      image_url: editImageUrl.trim() ? editImageUrl.trim() : null,
    };

    if (editId) {
      // Update
      await supabase.from("strategy_articles").update(payload).eq("id", editId);
    } else {
      // Insert
      await supabase.from("strategy_articles").insert([payload]);
    }

    closeEditor();
    fetchArticles();
  };

  const deleteArticle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Voulez-vous vraiment supprimer ce guide ?")) {
      await supabase.from("strategy_articles").delete().eq("id", id);
      fetchArticles();
    }
  };

  const DEFAULT_IMAGE = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg"; // Belle image tactique par défaut

  return (
    <div className="page-wrapper anim-fade-up">
      <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--lol-gold)', textTransform: 'uppercase', letterSpacing: '4px' }}>RNG DATA</span>
          <h1 style={{ fontSize: '3.5rem', marginTop: '12px', marginBottom: '24px' }}>Stratégie d'Équipe</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Base de connaissances tactiques, plans de jeu et théorie.
          </p>
          <div style={{ marginTop: '32px' }}>
            <button onClick={() => openEditor()} className="btn-hex" style={{ fontSize: '1rem', padding: '16px 40px' }}>
              + NOUVEAU GUIDE
            </button>
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Chargement des données RNG...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {articles.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                Aucun guide stratégique pour le moment. Créez-en un !
              </div>
            ) : (
              articles.map(article => {
                const bgImage = article.image_url || DEFAULT_IMAGE;
                
                return (
                  <div 
                    key={article.id} 
                    className="glass-panel"
                    onClick={() => setReadingArticle(article)}
                    style={{ 
                      position: 'relative',
                      display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer',
                      transition: 'all 0.3s ease', border: '1px solid var(--border-color-dim)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--lol-gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color-dim)'; }}
                  >
                    <div style={{ height: '200px', width: '100%', position: 'relative', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center 20%' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))' }} />
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); openEditor(article); }}
                        style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        ÉDITER
                      </button>
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6))' }}>
                      <h3 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--font-orbitron)', color: 'white', textTransform: 'uppercase' }}>
                        {article.title}
                      </h3>
                      
                      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: 'var(--lol-gold)' }}>■</span> RNG DATA
                        </span>
                        <button 
                          onClick={(e) => deleteArticle(article.id, e)}
                          style={{ background: 'none', border: 'none', color: '#ff4e50', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' }}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* --- MODALE D'ÉDITION --- */}
        {isEditing && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
            {/* Header de l'éditeur */}
            <div style={{ padding: '20px 40px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
                <input 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="TITRE DE L'ARTICLE"
                  className="font-orbitron"
                  style={{ background: 'transparent', border: 'none', color: 'var(--lol-gold)', fontSize: '2rem', outline: 'none', width: '50%' }}
                />
                <input 
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  placeholder="URL d'image (Optionnel)"
                  style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '4px', flex: 1, fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginLeft: '24px' }}>
                <button onClick={closeEditor} style={{ padding: '10px 24px', background: 'transparent', color: 'white', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}>ANNULER</button>
                <button onClick={saveArticle} style={{ padding: '10px 32px', background: 'var(--lol-gold)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>SAUVEGARDER</button>
              </div>
            </div>

            {/* Split Screen Éditeur / Aperçu */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Zone de texte Markdown */}
              <div style={{ flex: 1, borderRight: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px 20px', background: '#111', color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Éditeur Markdown</div>
                <textarea 
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Écrivez votre contenu ici en Markdown...&#10;&#10;# Titre Principal&#10;## Sous-titre&#10;- Liste à puce&#10;**Texte en gras**"
                  style={{ flex: 1, background: '#050505', color: '#e0e0e0', padding: '40px', border: 'none', resize: 'none', outline: 'none', fontFamily: 'monospace', fontSize: '1.1rem', lineHeight: '1.8' }}
                />
              </div>

              {/* Aperçu Markdown */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
                <div style={{ padding: '12px 20px', background: '#111', color: 'var(--lol-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Aperçu en direct</div>
                <div style={{ flex: 1, padding: '40px', overflowY: 'auto', color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1.1rem' }} className="markdown-preview">
                  {editContent ? <ReactMarkdown>{editContent}</ReactMarkdown> : <span style={{ color: '#555' }}>Aperçu de votre texte...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODALE DE LECTURE --- */}
        {readingArticle && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, overflowY: 'auto' }}>
            <button onClick={() => setReadingArticle(null)} style={{ position: 'fixed', top: '24px', right: '40px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.5rem', cursor: 'pointer', zIndex: 1001, width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            
            {/* Header de l'article */}
            <div style={{ height: '400px', width: '100%', position: 'relative', backgroundImage: `url(${readingArticle.image_url || DEFAULT_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center 20%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 100%)' }} />
              <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, textAlign: 'center' }}>
                <span style={{ background: 'var(--lol-gold)', color: 'black', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', borderRadius: '4px', marginBottom: '16px', display: 'inline-block' }}>STRATÉGIE RNG</span>
                <h1 className="font-orbitron" style={{ fontSize: '4rem', color: 'white', margin: 0, textShadow: '0 5px 20px rgba(0,0,0,1)' }}>{readingArticle.title}</h1>
              </div>
            </div>

            {/* Contenu de l'article */}
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 120px 20px', color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: '1.9' }} className="markdown-preview">
              <ReactMarkdown>{readingArticle.content}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>
      
      {/* Styles globaux pour le rendu Markdown (injectés ici pour la portabilité) */}
      <style jsx global>{`
        .markdown-preview h1 { color: white; font-family: var(--font-orbitron); font-size: 2.5rem; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; }
        .markdown-preview h2 { color: var(--lol-gold); font-family: var(--font-orbitron); font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem; }
        .markdown-preview h3 { color: white; font-size: 1.4rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .markdown-preview p { margin-bottom: 1.5rem; }
        .markdown-preview ul { margin-bottom: 1.5rem; padding-left: 2rem; list-style-type: square; color: var(--text-muted); }
        .markdown-preview li { margin-bottom: 0.5rem; }
        .markdown-preview strong { color: white; }
        .markdown-preview blockquote { border-left: 4px solid var(--lol-gold); padding-left: 1rem; margin-left: 0; color: var(--text-muted); font-style: italic; background: rgba(255,255,255,0.02); padding: 1rem; }
        .markdown-preview code { background: #222; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; color: #0AC8B9; }
      `}</style>
    </div>
  );
}
