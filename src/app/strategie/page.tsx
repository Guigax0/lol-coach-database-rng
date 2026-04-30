"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import composData from "../../data/compos.json";

// Articles originaux (Restauration)
const COURSES = [
  { id: 'comp-all-in', title: "Composition All-in", category: "Compos & Draft", image: "/images/compo_all_in.png", badge: "Stratégie", type: 'compo', compoId: 'all-in' },
  { id: 'comp-poke', title: "Composition Poke", category: "Compos & Draft", image: "/images/compo_poke.png", badge: "Stratégie", type: 'compo', compoId: 'poke' },
  { id: 'comp-scaling', title: "Composition Hypercarry", category: "Compos & Draft", image: "/images/compo_hypercarry.png", badge: "Stratégie", type: 'compo', compoId: 'hypercarry' },
];

export default function StrategiePage() {
  const [selectedCompo, setSelectedCompo] = useState<any>(null);
  const [activeSubtype, setActiveSubtype] = useState<any>(null);
  const [ddVersion, setDdVersion] = useState("14.7.1");

  // State pour les commentaires
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    async function getVersion() {
      const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await res.json();
      setDdVersion(versions[0]);
    }
    getVersion();
  }, []);

  // Charger les commentaires quand un article est sélectionné
  useEffect(() => {
    if (selectedCompo) {
      fetchComments(selectedCompo.id);
    }
  }, [selectedCompo]);

  const fetchComments = async (articleId: string) => {
    setLoadingComments(true);
    const { data } = await supabase
      .from('strategy_comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });
    
    if (data) setComments(data);
    setLoadingComments(false);
  };

  const postComment = async () => {
    if (!newCommentName || !newCommentText) return alert("Veuillez remplir votre nom et votre question.");
    
    const { error } = await supabase.from('strategy_comments').insert([
      { article_id: selectedCompo.id, player_name: newCommentName, content: newCommentText }
    ]);

    if (!error) {
      setNewCommentText("");
      fetchComments(selectedCompo.id);
    }
  };

  const handleCardClick = (course: any) => {
    if (course.type === 'compo') {
      const data = (composData as any).find((c: any) => c.id === course.compoId);
      setSelectedCompo(data);
      setActiveSubtype(null);
    }
  };

  return (
    <div className="page-wrapper anim-fade-up">
      <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--lol-gold)', textTransform: 'uppercase', letterSpacing: '4px' }}>RNG DATA</span>
          <h1 style={{ fontSize: '3.5rem', marginTop: '12px', marginBottom: '24px' }}>Stratégie d'Équipe</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Accédez à toutes les données stratégiques nécessaires : compositions types, plans de jeu et conditions de victoire.
          </p>
        </header>

        {/* Liste des articles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {COURSES.map(course => (
            <div 
              key={course.id} 
              className="glass-panel"
              onClick={() => handleCardClick(course)}
              style={{ 
                position: 'relative',
                display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer',
                transition: 'all 0.3s ease', border: '1px solid var(--border-color-dim)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--lol-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color-dim)'; }}
            >
              <div style={{ height: '180px', width: '100%', backgroundColor: '#1A1A1A', position: 'relative', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'var(--lol-gold)', color: '#000', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {course.badge}
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {course.category}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', fontFamily: 'var(--font-orbitron)', color: 'white' }}>
                  {course.title}
                </h3>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: 'var(--lol-gold)' }}>■</span> RNG THEORY
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modale de Lecture (Compos) */}
        {selectedCompo && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5,5,5,0.98)', zIndex: 1000, display: 'flex' }}>
            {/* Sidebar */}
            <div style={{ width: '350px', background: 'rgba(0,0,0,0.5)', borderRight: '1px solid var(--border-color-dim)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-color-dim)' }}>
                <button onClick={() => setSelectedCompo(null)} style={{ color: 'var(--lol-gold)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← RETOUR
                </button>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-orbitron)', color: 'white' }}>{selectedCompo.name}</h2>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <div onClick={() => setActiveSubtype(null)} style={{ padding: '20px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', background: activeSubtype === null ? 'rgba(200, 170, 110, 0.1)' : 'transparent', borderLeft: activeSubtype === null ? '4px solid var(--lol-gold)' : '4px solid transparent' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--lol-gold)', marginBottom: '4px' }}>INTRODUCTION</div>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>Philosophie & Win Condition</div>
                </div>
                {selectedCompo.subtypes.map((sub: any, i: number) => (
                  <div key={i} onClick={() => setActiveSubtype(sub)} style={{ padding: '20px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', background: activeSubtype === sub ? 'rgba(200, 170, 110, 0.1)' : 'transparent', borderLeft: activeSubtype === sub ? '4px solid var(--lol-gold)' : '4px solid transparent' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>MODULE {i + 1}</div>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>{sub.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '64px' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {!activeSubtype ? (
                  <div className="anim-fade-up">
                    <span style={{ color: 'var(--lol-gold)', letterSpacing: '4px' }}>INTRODUCTION</span>
                    <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-orbitron)', marginTop: '16px', marginBottom: '40px' }}>Comprendre la {selectedCompo.name}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                      <section>
                        <h3 style={{ color: 'var(--lol-gold)', fontSize: '0.9rem', marginBottom: '16px', textTransform: 'uppercase' }}>Vision d'ensemble</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-light)' }}>{selectedCompo.philosophy}</p>
                      </section>
                      <section>
                        <h3 style={{ color: 'var(--lol-gold)', fontSize: '0.9rem', marginBottom: '16px', textTransform: 'uppercase' }}>Condition de Victoire</h3>
                        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #0AC8B9' }}>
                          <p style={{ fontSize: '1.1rem', color: 'white', lineHeight: '1.6' }}>{selectedCompo.win_condition}</p>
                        </div>
                      </section>
                    </div>
                  </div>
                ) : (
                  <div className="anim-fade-up">
                    <span style={{ color: 'var(--lol-gold)', letterSpacing: '4px' }}>DÉCLINAISON</span>
                    <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-orbitron)', marginTop: '16px', marginBottom: '24px' }}>{activeSubtype.name}</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '48px', lineHeight: '1.6' }}>{activeSubtype.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '64px' }}>
                      {activeSubtype.example_team.map((e: any, i: number) => (
                        <div key={i} className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--lol-gold)', marginBottom: '12px' }}>{e.role}</div>
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${e.champion}.png`} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', marginBottom: '12px' }} />
                          <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{e.champion}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- SECTION COMMENTAIRES --- */}
                <div style={{ marginTop: '100px', borderTop: '1px solid var(--border-color-dim)', paddingTop: '64px' }}>
                  <h3 className="font-orbitron" style={{ color: 'var(--lol-gold)', fontSize: '1.2rem', marginBottom: '32px' }}>QUESTIONS & DISCUSSIONS</h3>
                  
                  {/* Formulaire */}
                  <div className="glass-panel" style={{ padding: '32px', marginBottom: '48px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', marginBottom: '20px' }}>
                      <input 
                        placeholder="Votre Nom"
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #333', color: 'white', padding: '12px', borderRadius: '4px' }}
                      />
                      <textarea 
                        placeholder="Une question tactique ? Une remarque sur cette compo ?"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #333', color: 'white', padding: '12px', borderRadius: '4px', height: '80px', resize: 'none' }}
                      />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <button onClick={postComment} className="btn-hex" style={{ padding: '10px 30px' }}>ENVOYER MA QUESTION</button>
                    </div>
                  </div>

                  {/* Liste des commentaires */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {loadingComments ? <div style={{ color: 'var(--text-muted)' }}>Chargement des messages...</div> : 
                     comments.length === 0 ? <div style={{ color: 'var(--text-muted)' }}>Aucune question pour le moment. Soyez le premier !</div> :
                     comments.map(c => (
                       <div key={c.id} style={{ display: 'flex', gap: '16px' }}>
                         <div style={{ width: '40px', height: '40px', background: 'var(--lol-gold)', color: 'black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', flexShrink: 0 }}>
                           {c.player_name[0].toUpperCase()}
                         </div>
                         <div style={{ flex: 1 }}>
                           <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', marginBottom: '4px' }}>
                             <span style={{ color: 'white', fontWeight: 'bold' }}>{c.player_name}</span>
                             <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{new Date(c.created_at).toLocaleDateString('fr-FR')}</span>
                           </div>
                           <div style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6' }}>{c.content}</div>
                         </div>
                       </div>
                     ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
