"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { getDominantVector, calculateCompDNA } from "../../utils/strategicHelpers";

export default function CompositionsPage() {
  const [savedDrafts, setSavedDrafts] = useState<any[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<any | null>(null);
  const [allChampions, setAllChampions] = useState<any[]>([]);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Champions
      const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await vRes.json();
      const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/fr_FR/champion.json`);
      const data = await res.json();
      const champs = Object.values(data.data).map((c: any) => ({
        id: c.id,
        name: c.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/img/champion/${c.image.full}`,
        splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c.id}_0.jpg`,
        loading: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${c.id}_0.jpg`
      }));
      setAllChampions(champs);

      // 2. Fetch Compositions from Supabase
      const { data: draftsData } = await supabase
        .from('strategic_compositions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (draftsData) {
        setSavedDrafts(draftsData);
        if (draftsData.length > 0) {
          setSelectedDraft(draftsData[0]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const updateDraft = async (id: string, updates: any) => {
    // Optimistic update
    setSavedDrafts(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    if (selectedDraft?.id === id) {
      setSelectedDraft({ ...selectedDraft, ...updates });
    }
    
    // Supabase update
    await supabase.from('strategic_compositions').update(updates).eq('id', id);
  };

  const deleteDraft = async (draftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(!confirm("Voulez-vous vraiment supprimer cette composition ?")) return;
    
    setSavedDrafts(prev => {
      const updated = prev.filter(d => d.id !== draftId);
      if (selectedDraft?.id === draftId) {
        setSelectedDraft(updated.length > 0 ? updated[0] : null);
      }
      return updated;
    });

    await supabase.from('strategic_compositions').delete().eq('id', draftId);
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Chargement des stratégies RNG...</div>;

  return (
    <div className="page-wrapper anim-fade-up compositions-container" style={{ display: 'flex', height: '100vh', overflow: 'hidden', margin: '-60px', padding: '60px' }}>
      
      {/* SIDEBAR GAUCHE - LISTE DES DRAFTS */}
      <div style={{ 
        width: '350px', 
        borderRight: '1px solid var(--glass-border)', 
        display: 'flex', flexDirection: 'column', 
        paddingRight: '32px',
        overflowY: 'auto'
      }}>
        <h2 className="font-orbitron" style={{ color: 'var(--lol-gold)', fontSize: '1.2rem', marginBottom: '32px', letterSpacing: '2px' }}>
          COMPOSITIONS
        </h2>

        <div className="side-list-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {savedDrafts.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Aucune composition sauvegardée. Utilisez le Drafter Tool.</div>
          ) : savedDrafts.map((draft) => {
            const isSelected = selectedDraft?.id === draft.id;
            
            // Logique de tag : Manuel d'abord, sinon automatique
            const TAG_CONFIG: any = {
              'allin': { label: 'ALL-IN', color: '#ff4e50' },
              'poke': { label: 'POKE', color: '#00d2ff' },
              'hypercarry': { label: 'HYPERCARRY', color: '#f9d423' }
            };
            
            let displayTag = { label: 'NON CLASSÉ', color: '#888' };
            if (draft.manual_tag && TAG_CONFIG[draft.manual_tag]) {
              displayTag = TAG_CONFIG[draft.manual_tag];
            } else {
              const allIds = draft.tiers.flatMap((t: any) => t.champions);
              const dna = calculateCompDNA(allIds);
              const vector = getDominantVector(dna);
              displayTag = vector;
            }

            return (
              <div 
                key={draft.id}
                onClick={() => setSelectedDraft(draft)}
                className="glass-panel"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  border: isSelected ? `1px solid ${displayTag.color}` : '1px solid transparent',
                  borderLeft: `4px solid ${displayTag.color}`,
                  background: isSelected ? `linear-gradient(90deg, ${displayTag.color}22, transparent)` : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s ease',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <div>
                  <div className="font-orbitron" style={{ color: 'white', fontSize: '1rem', marginBottom: '4px' }}>{draft.name}</div>
                  <div style={{ fontSize: '0.65rem', color: displayTag.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{displayTag.label}</div>
                </div>
                <button 
                  onClick={(e) => deleteDraft(draft.id, e)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
                  title="Supprimer"
                >×</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* PANNEAU DROIT - MASTER VIEW */}
      <div className="master-view-mobile" style={{ flex: 1, paddingLeft: '40px', display: 'flex', flexDirection: 'column' }}>
        {selectedDraft ? (
          <>
            <div style={{ marginBottom: '40px' }}>
              <input 
                className="font-orbitron"
                value={selectedDraft.name}
                onChange={(e) => {
                  updateDraft(selectedDraft.id, { name: e.target.value });
                }}
                style={{ 
                  fontSize: '3.5rem', 
                  background: 'none', 
                  border: 'none', 
                  borderBottom: '1px solid transparent',
                  color: 'white',
                  width: '100%',
                  textTransform: 'uppercase',
                  outline: 'none',
                  padding: '0',
                  margin: '0 0 8px 0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderBottom = '1px solid var(--lol-gold)'}
                onBlur={(e) => e.target.style.borderBottom = '1px solid transparent'}
              />
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {[
                  { id: 'allin', label: 'ALL-IN', color: '#ff4e50' },
                  { id: 'poke', label: 'POKE', color: '#00d2ff' },
                  { id: 'hypercarry', label: 'HYPERCARRY', color: '#f9d423' },
                ].map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      updateDraft(selectedDraft.id, { manual_tag: tag.id });
                    }}
                    style={{
                      padding: '6px 16px',
                      background: selectedDraft.manual_tag === tag.id ? tag.color : 'transparent',
                      border: `1px solid ${tag.color}`,
                      color: selectedDraft.manual_tag === tag.id ? '#000' : tag.color,
                      fontSize: '0.65rem',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-orbitron)',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* LES 5 PILIERS (ROLES) - TAILLE RÉDUITE POUR NETTETÉ */}
            <div className="horizontal-scroll-container" style={{ 
              display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flex: 1,
              overflowX: 'auto', paddingBottom: '20px'
            }}>
              {selectedDraft.tiers.map((tier: any) => {
                const mainChampId = tier.champions[0];
                const mainChamp = allChampions.find(c => c.id === mainChampId);
                const hasSubstitutes = tier.champions.length > 1;

                return (
                  <div key={tier.id} style={{ 
                    width: '220px',
                    height: '600px', 
                    position: 'relative', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    border: `1px solid ${tier.color}55`,
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                  }}>
                    {/* BACKGROUND IMAGE (LOADING SPLICE - LOW RES BUT BETTER FRAMING) */}
                    {mainChamp ? (
                      <div style={{ 
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
                        backgroundImage: `url(${mainChamp.loading})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transition: 'transform 0.5s ease',
                      }} className="pillar-bg" />
                    ) : (
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, background: '#111' }} />
                    )}

                    {/* GRADIENT OVERLAY */}
                    <div style={{ 
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)' 
                    }} />

                    {/* CONTENT BTOOM */}
                    <div style={{ padding: '24px', zIndex: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <img src={`/images/roles/${tier.name.toLowerCase()}.png`} style={{ width: '20px', height: '20px', filter: `drop-shadow(0 0 5px ${tier.color})` }} />
                        <span style={{ color: tier.color, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>{tier.name}</span>
                      </div>
                      <div className="font-orbitron" style={{ fontSize: '1.6rem', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
                        {mainChamp ? mainChamp.name : "VIDE"}
                      </div>

                      {/* STACK DES SUBSTITUTS */}
                      {hasSubstitutes && (
                        <div style={{ marginTop: '24px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '30px', letterSpacing: '1px' }}>SUBSTITUTIONS</div>
                          
                          <div 
                            onMouseEnter={() => setHoveredTier(`${selectedDraft.id}-${tier.id}`)}
                            onMouseLeave={() => setHoveredTier(null)}
                            style={{ 
                              position: 'relative', 
                              display: 'flex', 
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer'
                            }}
                          >
                            {tier.champions.slice(1).map((cid: string, i: number) => {
                              const subChamp = allChampions.find(c => c.id === cid);
                              if (!subChamp) return null;
                              
                              const isHovered = hoveredTier === `${selectedDraft.id}-${tier.id}`;
                              // Animation verticale : monte de 45px par index si survolé, sinon pile serrée (4px)
                              const bottomOffset = isHovered ? (i + 1) * 45 : i * 4;
                              const leftOffset = isHovered ? 0 : i * 2; // Léger décalage pour l'effet d'épaisseur

                              return (
                                <div key={cid} style={{ 
                                  position: 'absolute',
                                  bottom: `${bottomOffset}px`,
                                  left: `${leftOffset}px`,
                                  zIndex: 10 - i,
                                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                }}>
                                  <img 
                                    src={subChamp.image} 
                                    title={`Substitut: ${subChamp.name}`}
                                    style={{ 
                                      width: '40px', height: '40px', 
                                      borderRadius: '4px', 
                                      border: `1px solid ${isHovered ? tier.color : '#555'}`,
                                      objectFit: 'cover',
                                      boxShadow: '0 5px 15px rgba(0,0,0,0.8)',
                                      filter: isHovered ? 'none' : 'brightness(0.6) grayscale(30%)'
                                    }} 
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <style jsx>{`
                      .pillar-bg { transform: scale(1); }
                      div:hover > .pillar-bg { transform: scale(1.05); }
                    `}</style>
                  </div>
                );
              })}
            </div>

            {/* COACH PLAYBOOK (NOTES TACTIQUES) */}
            <div style={{ marginTop: '40px', flexShrink: 0, borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <h3 className="font-orbitron" style={{ color: 'var(--lol-gold)', fontSize: '0.8rem', letterSpacing: '3px', margin: 0 }}>NOTES</h3>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, var(--glass-border), transparent)' }}></div>
              </div>
              <textarea 
                value={selectedDraft.notes || ""}
                onChange={(e) => {
                  updateDraft(selectedDraft.id, { notes: e.target.value });
                }}
                placeholder="Écrivez vos consignes stratégiques ici (ex: Priorité Drake, Phase de Lane, Teamfights...)"
                style={{
                  width: '100%',
                  height: '120px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                  padding: '20px',
                  color: 'var(--text-light)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  outline: 'none',
                  resize: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--lol-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
              />
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>SAUVEGARDE AUTOMATIQUE</span>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Sélectionnez une composition dans la liste pour l'afficher.
          </div>
        )}
      </div>

    </div>
  );
}
