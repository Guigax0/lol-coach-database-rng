"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import composData from "@/data/compos.json";



const COURSES = [
  { id: 'comp-all-in', title: "Composition All-in", category: "Compos & Draft", level: "Avancé", time: "30 min", isPremium: false, image: "/images/compo_all_in.png", badge: "Stratégie", type: 'compo', compoId: 'all-in' },
  { id: 'comp-poke', title: "Composition Poke", category: "Compos & Draft", level: "Avancé", time: "25 min", isPremium: false, image: "/images/compo_poke.png", badge: "Stratégie", type: 'compo', compoId: 'poke' },
  { id: 'comp-scaling', title: "Composition Hypercarry", category: "Compos & Draft", level: "Avancé", time: "35 min", isPremium: false, image: "/images/compo_hypercarry.png", badge: "Stratégie", type: 'compo', compoId: 'hypercarry' },

];

import ChampionTheory from "@/components/ChampionTheory";

export default function StrategiePage() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedCompo, setSelectedCompo] = useState<any>(null);
  const [activeSubtype, setActiveSubtype] = useState<any>(null);
  const [showBuilds, setShowBuilds] = useState(false);
  const [ddVersion, setDdVersion] = useState("14.7.1");

  useEffect(() => {
    async function getVersion() {
      const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await res.json();
      setDdVersion(versions[0]);
    }
    getVersion();
  }, []);


  const handleCardClick = (course: any) => {
    if (course.isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    if (course.type === 'compo') {
      const data = (composData as any).find((c: any) => c.id === course.compoId);
      setSelectedCompo(data);
      setActiveSubtype(null);
    } else if (course.type === 'link') {
      window.location.href = course.href;
    } else if (course.type === 'tool') {
      setShowBuilds(true);
    } else {
      alert(`Ouverture du cours : ${course.title}`);
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



        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {COURSES.map(course => (
            <div 
              key={course.id} 
              className="glass-panel"
              onClick={() => handleCardClick(course)}
              style={{ 
                position: 'relative',
                display: 'flex', 
                flexDirection: 'column', 
                overflow: 'hidden', 
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                border: '1px solid var(--border-color-dim)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--lol-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color-dim)'; }}
            >
              <div style={{ height: '180px', width: '100%', backgroundColor: '#1A1A1A', position: 'relative', backgroundImage: course.image ? `url(${course.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
                
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'var(--lol-gold)', color: '#000', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {course.badge}
                  </span>
                </div>

                {course.isPremium && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--lol-gold-border)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1rem' }}>🔒</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--lol-gold)', fontWeight: 'bold', textTransform: 'uppercase' }}>Premium</span>
                  </div>
                )}
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {course.category}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', fontFamily: 'var(--font-playfair)', color: course.isPremium ? 'white' : '#e0e0e0' }}>
                  {course.title}
                </h3>
                
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: 'var(--lol-gold)' }}>■</span> {course.level}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⏱️ {course.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Modals */}

        {/* 1. Modale Compo Detail (Skill-Capped Style) */}
        {selectedCompo && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5,5,5,0.98)', zIndex: 1000, display: 'flex' }}>
            {/* Sidebar Modules (Lessons) */}
            <div style={{ width: '350px', background: 'rgba(0,0,0,0.5)', borderRight: '1px solid var(--border-color-dim)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-color-dim)' }}>
                <button onClick={() => setSelectedCompo(null)} style={{ color: 'var(--lol-gold)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← RETOUR À L'ACADÉMIE
                </button>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-orbitron)', color: 'white' }}>{selectedCompo.name}</h2>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>{selectedCompo.subtypes.length} MODULES DISPONIBLES</div>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <div 
                  onClick={() => setActiveSubtype(null)}
                  style={{ 
                    padding: '20px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: activeSubtype === null ? 'rgba(200, 170, 110, 0.1)' : 'transparent',
                    borderLeft: activeSubtype === null ? '4px solid var(--lol-gold)' : '4px solid transparent'
                  }}
                >
                  <div style={{ fontSize: '0.65rem', color: 'var(--lol-gold)', marginBottom: '4px' }}>INTRODUCTION</div>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>Philosophie & Win Condition</div>
                </div>

                {selectedCompo.subtypes.map((sub: any, i: number) => (
                  <div 
                    key={i}
                    onClick={() => setActiveSubtype(sub)}
                    style={{ 
                      padding: '20px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: activeSubtype === sub ? 'rgba(200, 170, 110, 0.1)' : 'transparent',
                      borderLeft: activeSubtype === sub ? '4px solid var(--lol-gold)' : '4px solid transparent'
                    }}
                  >
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

                    <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                      <section>
                        <h3 style={{ color: 'var(--lol-gold)', fontSize: '0.9rem', marginBottom: '16px', textTransform: 'uppercase' }}>Points Forts</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {selectedCompo.strengths.map((s: any, i: number) => <li key={i} style={{ color: 'var(--text-muted)' }}>✓ {s}</li>)}
                        </ul>
                      </section>
                      <section>
                        <h3 style={{ color: '#ff4e50', fontSize: '0.9rem', marginBottom: '16px', textTransform: 'uppercase' }}>Points Faibles</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {selectedCompo.weaknesses.map((s: any, i: number) => <li key={i} style={{ color: 'var(--text-muted)' }}>⚠ {s}</li>)}
                        </ul>
                      </section>
                    </div>
                  </div>
                ) : (
                  <div className="anim-fade-up">
                    <span style={{ color: 'var(--lol-gold)', letterSpacing: '4px' }}>DÉCLINAISON</span>
                    <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-orbitron)', marginTop: '16px', marginBottom: '24px' }}>{activeSubtype.name}</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '48px', lineHeight: '1.6' }}>{activeSubtype.description}</p>
                    
                    <h3 style={{ color: 'var(--lol-gold)', fontSize: '0.9rem', marginBottom: '24px', textTransform: 'uppercase' }}>Équipe Type (Exemple)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '64px' }}>
                      {activeSubtype.example_team.map((e: any, i: number) => (
                        <div key={i} className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--lol-gold)', marginBottom: '12px' }}>{e.role}</div>
                          <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${e.champion}.png`} 
                            style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', marginBottom: '12px' }}
                          />
                          <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{e.champion}</div>
                        </div>
                      ))}
                    </div>

                    <h3 style={{ color: 'var(--lol-gold)', fontSize: '0.9rem', marginBottom: '24px', textTransform: 'uppercase' }}>Conseils Tactiques</h3>
                    <div className="glass-panel" style={{ padding: '32px', lineHeight: '1.8', color: 'var(--text-light)' }}>
                      {selectedCompo.strategy}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Modale Builds Tool */}
        {showBuilds && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.98)', zIndex: 1000, padding: '40px' }}>
            <button onClick={() => setShowBuilds(false)} style={{ position: 'fixed', top: '24px', right: '40px', background: 'none', border: 'none', color: 'var(--lol-gold)', fontSize: '2rem', cursor: 'pointer', zIndex: 1001 }}>×</button>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <ChampionTheory />
            </div>
          </div>
        )}

        {/* Premium Modal */}
        {showPremiumModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowPremiumModal(false)}>
            <div className="glass-panel anim-fade-up" style={{ width: '100%', maxWidth: '500px', padding: '40px', textAlign: 'center', position: 'relative', border: '1px solid var(--lol-gold-border)' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowPremiumModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔒</div>
              <h2 style={{ color: 'var(--lol-gold)', fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-orbitron)' }}>Contenu Réservé</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Ce cours stratégique fait partie de la bibliothèque Premium. Connectez-vous avec un compte Joueur RNG ou mettez à niveau votre accès pour débloquer ces connaissances.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button className="btn-hex" style={{ padding: '12px 32px' }} onClick={() => setShowPremiumModal(false)}>CONNEXION</button>
                <button className="btn-hex" style={{ padding: '12px 32px', background: 'transparent', color: 'var(--text-muted)', borderColor: 'var(--border-color-dim)' }} onClick={() => setShowPremiumModal(false)}>RETOUR</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
