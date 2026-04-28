"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPlayerSpecialty, calculateCompDNA, getDominantVector } from "../utils/strategicHelpers";

interface Champion {
  id: string;
  name: string;
  image: string;
}

interface Member {
  id: string;
  pseudo: string;
  role: string;
  status: 'Titulaire' | 'Remplaçant';
  opgg: string;
  championPool: { S: string[]; A: string[]; B: string[]; };
}

const ROLE_LIST = ["Top", "Jungle", "Mid", "ADC", "Support"];
const STATUS_LIST = ["Titulaire", "Remplaçant"] as const;
const TIERS_POOL = ["S", "A", "B"] as const;

const DEFAULT_MEMBERS: Member[] = [
  { id: '1', pseudo: 'JOUEUR 1', role: 'Top', status: 'Titulaire', opgg: '', championPool: { S: [], A: [], B: [] } },
  { id: '2', pseudo: 'JOUEUR 2', role: 'Jungle', status: 'Titulaire', opgg: '', championPool: { S: [], A: [], B: [] } },
  { id: '3', pseudo: 'JOUEUR 3', role: 'Mid', status: 'Titulaire', opgg: '', championPool: { S: [], A: [], B: [] } },
  { id: '4', pseudo: 'JOUEUR 4', role: 'ADC', status: 'Titulaire', opgg: '', championPool: { S: [], A: [], B: [] } },
  { id: '5', pseudo: 'JOUEUR 5', role: 'Support', status: 'Titulaire', opgg: '', championPool: { S: [], A: [], B: [] } },
];

export default function TeamManager() {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [showPickerFor, setShowPickerFor] = useState<{ memberId: string; tier: "S" | "A" | "B" } | null>(null);
  const [search, setSearch] = useState("");
  const [savedDrafts, setSavedDrafts] = useState<any[]>([]);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChamps() {
      const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await vRes.json();
      const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/fr_FR/champion.json`);
      const data = await res.json();
      const champs = Object.values(data.data).map((c: any) => ({
        id: c.id,
        name: c.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/img/champion/${c.image.full}`
      }));
      

      
      setAllChampions(champs);
    }
    fetchChamps();

    const saved = localStorage.getItem("rngTeam");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: s'assurer que status existe
      const migrated = parsed.map((m: any) => ({
        ...m,
        status: m.status || (m.role === 'Remplaçant' ? 'Remplaçant' : 'Titulaire'),
        role: m.role === 'Remplaçant' ? 'Top' : m.role
      }));
      setMembers(migrated);
    } else {
      setMembers(DEFAULT_MEMBERS);
      localStorage.setItem("rngTeam", JSON.stringify(DEFAULT_MEMBERS));
    }

    const loadExport = () => {
      const savedExports = localStorage.getItem("rng_saved_drafts");
      if (savedExports) {
        const parsed = JSON.parse(savedExports);
        if (Array.isArray(parsed)) setSavedDrafts(parsed);
      }
    };
    loadExport();
    window.addEventListener('rng_draft_updated', loadExport);
    return () => window.removeEventListener('rng_draft_updated', loadExport);
  }, []);

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers(prev => {
      const newMembers = prev.map(m => m.id === id ? { ...m, ...updates } : m);
      localStorage.setItem("rngTeam", JSON.stringify(newMembers));
      return newMembers;
    });
  };

  const addMember = () => {
    const newMember: Member = {
      id: Date.now().toString(),
      pseudo: 'NOUVEAU JOUEUR',
      role: 'Top',
      status: 'Remplaçant',
      opgg: '',
      championPool: { S: [], A: [], B: [] }
    };
    const updated = [...members, newMember];
    setMembers(updated);
    localStorage.setItem("rngTeam", JSON.stringify(updated));
  };

  const removeMember = (id: string) => {
    setMembers(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem("rngTeam", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleChampionInPool = (memberId: string, tier: "S" | "A" | "B", champId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;
    const newPool = { ...member.championPool };
    newPool.S = newPool.S.filter(id => id !== champId);
    newPool.A = newPool.A.filter(id => id !== champId);
    newPool.B = newPool.B.filter(id => id !== champId);
    if (!member.championPool[tier].includes(champId)) {
      newPool[tier] = [...newPool[tier], champId];
    }
    updateMember(memberId, { championPool: newPool });
  };

  const deleteDraft = (draftId: string) => {
    const updated = savedDrafts.filter(d => d.id !== draftId);
    setSavedDrafts(updated);
    localStorage.setItem("rng_saved_drafts", JSON.stringify(updated));
  };

  // Logique de tri : Titulaires d'abord, puis Remplaçants. Puis par rôle.
  const sortedMembers = [...members].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'Titulaire' ? -1 : 1;
    return ROLE_LIST.indexOf(a.role) - ROLE_LIST.indexOf(b.role);
  });

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 className="font-orbitron" style={{ color: 'var(--lol-gold)', margin: 0, fontSize: '1.2rem' }}>ROSTER OFFICIEL</h2>
          <button onClick={addMember} className="btn-hex" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>+ AJOUTER UN MEMBRE</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '24px' }}>
          {sortedMembers.map(member => {
            const spec = getPlayerSpecialty(member.championPool);
            
            return (
              <div key={member.id} className="glass-panel" style={{ 
                padding: '24px', 
                borderTop: member.status === 'Titulaire' ? '4px solid var(--lol-gold)' : '4px solid #444',
                opacity: member.status === 'Titulaire' ? 1 : 0.8,
                transition: 'all 0.3s ease'
              }}>
                {/* HEADER JOUEUR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', position: 'relative' }}>
                    <img src={`/images/roles/${member.role.toLowerCase()}.png`} style={{ width: '40px', height: '40px', filter: member.status === 'Titulaire' ? 'brightness(1.5)' : 'brightness(0.8) grayscale(0.5)' }} title={member.role} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <input 
                        value={member.pseudo} 
                        onChange={(e) => updateMember(member.id, { pseudo: e.target.value })} 
                        className="font-orbitron"
                        style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.4rem', fontWeight: 'bold', width: '200px', outline: 'none' }} 
                      />
                      <span style={{ 
                        fontSize: '0.6rem', fontWeight: 'bold', padding: '4px 10px', borderRadius: '4px', 
                        background: 'rgba(255,255,255,0.05)', color: spec.color, border: `1px solid ${spec.color}`,
                        textTransform: 'uppercase'
                      }}>
                        {spec.label}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <select 
                        value={member.status} 
                        onChange={(e) => updateMember(member.id, { status: e.target.value as any })} 
                        style={{ background: member.status === 'Titulaire' ? 'rgba(200, 170, 110, 0.1)' : 'rgba(255,255,255,0.05)', border: 'none', color: member.status === 'Titulaire' ? 'var(--lol-gold)' : 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', cursor: 'pointer', outline: 'none', padding: '2px 8px', borderRadius: '2px', fontWeight: 'bold' }}
                      >
                        {STATUS_LIST.map(s => <option key={s} value={s} style={{ background: '#000' }}>{s.toUpperCase()}</option>)}
                      </select>
                      <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                      <select 
                        value={member.role} 
                        onChange={(e) => updateMember(member.id, { role: e.target.value })} 
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', cursor: 'pointer', outline: 'none' }}
                      >
                        {ROLE_LIST.map(r => <option key={r} value={r} style={{ background: '#000' }}>{r.toUpperCase()}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <button onClick={() => removeMember(member.id)} style={{ background: 'none', border: 'none', color: '#ff4e50', cursor: 'pointer', fontSize: '0.7rem', opacity: 0.5 }}>SUPPR.</button>
                </div>

                {/* CHAMPION POOLS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {TIERS_POOL.map(tier => (
                    <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '4px', borderLeft: `3px solid ${tier === 'S' ? '#ff4e50' : tier === 'A' ? 'var(--lol-gold)' : '#0AC8B9'}` }}>
                      <span style={{ fontWeight: 'bold', color: tier === 'S' ? '#ff4e50' : tier === 'A' ? 'var(--lol-gold)' : '#0AC8B9', width: '15px' }}>{tier}</span>
                      <div style={{ flex: 1, display: 'flex', gap: '8px', flexWrap: 'wrap', minHeight: '32px', alignItems: 'center' }}>
                        {member.championPool[tier].map(cid => {
                          const c = allChampions.find(ch => ch.id === cid);
                          return c ? (
                            <img 
                              key={cid} 
                              src={c.image} 
                              onClick={() => toggleChampionInPool(member.id, tier, cid)}
                              style={{ 
                                width: '32px', height: '32px', borderRadius: '3px', 
                                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                transition: 'transform 0.2s'
                              }} 
                              className="champion-icon-hover"
                              title={`Cliquer pour retirer ${c.name}`} 
                            />
                          ) : null;
                        })}
                      </div>
                      <button 
                        onClick={() => setShowPickerFor(showPickerFor?.memberId === member.id && showPickerFor?.tier === tier ? null : { memberId: member.id, tier })} 
                        style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                      >
                        +
                      </button>
                    </div>
                  ))}

                  {/* CHAMPION PICKER */}
                  {showPickerFor?.memberId === member.id && (
                    <div className="glass-panel anim-fade-up" style={{ padding: '16px', marginTop: '8px', background: 'rgba(0,0,0,0.8)', zIndex: 10 }}>
                      <input 
                        placeholder="Rechercher..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: 'white', marginBottom: '12px', outline: 'none' }} 
                      />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '180px', overflowY: 'auto', padding: '4px' }}>
                        {allChampions.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                          <img 
                            key={c.id} 
                            src={c.image} 
                            onClick={() => toggleChampionInPool(member.id, showPickerFor.tier, c.id)} 
                            style={{ 
                              width: '36px', height: '36px', cursor: 'pointer', 
                              border: member.championPool[showPickerFor.tier].includes(c.id) ? '2px solid var(--lol-gold)' : '1px solid transparent', 
                              opacity: member.championPool[showPickerFor.tier].includes(c.id) ? 1 : 0.4,
                              borderRadius: '2px',
                              transition: 'all 0.2s'
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* OP.GG / NOTES */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>OP.GG</span>
                    <input 
                      placeholder="Lien profil op.gg..." 
                      value={member.opgg} 
                      onChange={(e) => updateMember(member.id, { opgg: e.target.value })} 
                      style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: 'none', borderBottom: '1px solid #333', color: 'white', padding: '6px 0', fontSize: '0.8rem', outline: 'none' }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIEN VERS COMPOSITIONS */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link href="/compositions" className="btn-hex" style={{ padding: '16px 40px', fontSize: '1rem', background: 'rgba(210, 125, 45, 0.1)' }}>
          VOIR LES COMPOSITIONS STRATÉGIQUES
        </Link>
      </div>
    </div>
  );
}
