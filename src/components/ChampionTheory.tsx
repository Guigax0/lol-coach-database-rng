"use client";

import { useEffect, useState } from "react";
import { CHAMPION_KNOWLEDGE_BASE } from "../utils/championData";
import { supabase } from "../utils/supabaseClient";

interface Champion {
  id: string;
  name: string;
  title: string;
  image: string;
  splash: string;
}

export default function ChampionTheory() {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<'All' | 'All-in' | 'Poke' | 'Hypercarry'>('All');
  
  // Custom user tags per champion
  const [userTags, setUserTags] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Champions from Riot
      const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await vRes.json();
      const v = versions[0];

      const cRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/fr_FR/champion.json`);
      const cData = await cRes.json();
      const champs = Object.values(cData.data).map((c: any) => ({
        id: c.id,
        name: c.name,
        title: c.title,
        image: `https://ddragon.leagueoflegends.com/cdn/${v}/img/champion/${c.image.full}`,
        splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c.id}_0.jpg`
      }));

      setAllChampions(champs);
      
      // 2. Fetch tags from Supabase
      const { data: tagsData } = await supabase.from('champion_tags').select('*');
      
      const loadedTags: Record<string, string[]> = {};
      // Initialize with base data
      champs.forEach(c => {
        loadedTags[c.id] = CHAMPION_KNOWLEDGE_BASE[c.id]?.tags || [];
      });
      
      // Override with DB data
      if (tagsData) {
        tagsData.forEach(row => {
          loadedTags[row.champion_id] = row.tags;
        });
      }

      setUserTags(loadedTags);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChampSelect = (champ: Champion) => {
    setSelectedChamp(champ);
  };

  const toggleTag = async (champId: string, tag: 'All-in' | 'Poke' | 'Hypercarry') => {
    const currentTags = userTags[champId] || [];
    const newTags = currentTags.includes(tag) 
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    // Optimistic update
    setUserTags(prev => ({ ...prev, [champId]: newTags }));
    
    // Supabase update
    await supabase.from('champion_tags').upsert({ champion_id: champId, tags: newTags });
  };

  // Filtrage combiné (Texte + Catégorie Stratégique)
  const filteredChampions = allChampions.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const tags = userTags[c.id] || [];
    const matchesFilter = activeFilter === 'All' || tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  const getTagStyle = (tag: string, isActive: boolean) => {
    let color = 'var(--lol-gold)';
    let bg = 'rgba(200, 170, 110, 0.1)';
    if (tag === 'All-in') { color = '#ff4e50'; bg = 'rgba(255, 78, 80, 0.1)'; }
    if (tag === 'Poke') { color = '#0AC8B9'; bg = 'rgba(10, 200, 185, 0.1)'; }
    
    if (isActive) {
      return {
        background: bg,
        color: color,
        border: `2px solid ${color}`,
        boxShadow: `0 0 15px ${bg}, inset 0 0 10px ${bg}`,
        transform: 'scale(1.05)'
      };
    }
    return {
      background: 'rgba(0,0,0,0.5)',
      color: 'var(--text-muted)',
      border: '2px solid rgba(255,255,255,0.1)',
      transform: 'scale(1)'
    };
  };

  const renderGallery = () => (
    <div className="anim-fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 className="font-orbitron" style={{ fontSize: '1.2rem', color: 'var(--lol-gold)', margin: 0 }}>BASE DE DONNÉES CHAMPIONS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{filteredChampions.length} champions correspondent à vos critères</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <input 
              placeholder="Rechercher un champion..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '12px 20px', paddingLeft: '40px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '4px', fontSize: '0.9rem', width: '300px' }}
            />
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['All', 'All-in', 'Poke', 'Hypercarry'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f as any)}
            style={{
              padding: '8px 24px', borderRadius: '4px', border: '1px solid var(--glass-border)', cursor: 'pointer',
              background: activeFilter === f ? 'var(--lol-gold)' : 'rgba(255,255,255,0.05)',
              color: activeFilter === f ? 'black' : 'white',
              fontFamily: 'var(--font-orbitron)', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
          >
            {f === 'All' ? 'TOUS LES RÔLES' : f}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
        gap: '12px',
        animation: 'fadeInUp 0.8s ease'
      }}>
        {filteredChampions.map((c, i) => (
          <div 
            key={c.id} 
            className="champion-grid-item"
            onClick={() => handleChampSelect(c)}
            style={{ animationDelay: `${i * 0.02}s` }}
          >
            <img src={c.image} style={{ width: '100%', display: 'block' }} />
            {/* Affichage visuel rapide des tags sur la carte */}
            <div style={{ position: 'absolute', top: '4px', right: '4px', display: 'flex', gap: '4px' }}>
              {(userTags[c.id] || []).map(tag => {
                let color = 'var(--lol-gold)';
                if (tag === 'All-in') color = '#ff4e50';
                if (tag === 'Poke') color = '#0AC8B9';
                return <span key={tag} style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }}></span>;
              })}
            </div>
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              padding: '8px 4px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '85vh' }}>
      {renderGallery()}

      {/* OVERLAY MODAL POUR L'OPTION A */}
      {selectedChamp && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', 
          zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }} onClick={() => setSelectedChamp(null)}>
          
          <div className="glass-panel anim-fade-up" style={{ 
            width: '90%', maxWidth: '800px', padding: 0, overflow: 'hidden',
            position: 'relative', border: '1px solid var(--lol-gold-border)' 
          }} onClick={e => e.stopPropagation()}>
            
            {/* BACKGROUND SPLASH ART */}
            <div style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
              backgroundImage: `url(${selectedChamp.splash})`,
              backgroundSize: 'cover', backgroundPosition: 'center 20%',
              filter: 'blur(2px) brightness(0.4)',
            }} />
            <div style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 100%)'
            }} />

            <button onClick={() => setSelectedChamp(null)} style={{ 
              position: 'absolute', top: '16px', right: '24px', background: 'none', border: 'none', 
              color: 'var(--text-light)', fontSize: '2rem', cursor: 'pointer', zIndex: 10 
            }}>×</button>

            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src={selectedChamp.image} style={{ width: '100px', height: '100px', borderRadius: '4px', border: '2px solid var(--lol-gold)', marginBottom: '16px', boxShadow: '0 0 20px rgba(200,170,110,0.2)' }} />
              <h2 className="font-orbitron" style={{ fontSize: '3rem', margin: 0, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{selectedChamp.name.toUpperCase()}</h2>
              <p style={{ color: 'var(--lol-gold)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', marginTop: '8px', marginBottom: '40px' }}>
                Classification Tactique
              </p>

              <div style={{ display: 'flex', gap: '24px', width: '100%', justifyContent: 'center' }}>
                {['All-in', 'Poke', 'Hypercarry'].map((tag) => {
                  const isActive = (userTags[selectedChamp.id] || []).includes(tag);
                  return (
                    <button 
                      key={tag}
                      onClick={() => toggleTag(selectedChamp.id, tag as any)}
                      style={{
                        padding: '24px', flex: 1, maxWidth: '200px', borderRadius: '8px',
                        cursor: 'pointer', transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-orbitron)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                        ...getTagStyle(tag, isActive)
                      }}
                    >
                      <div style={{ 
                        width: '20px', height: '20px', borderRadius: '50%', 
                        background: isActive ? 'currentColor' : 'transparent',
                        border: '2px solid currentColor',
                        boxShadow: isActive ? '0 0 10px currentColor' : 'none',
                        transition: 'all 0.3s ease'
                      }}></div>
                      {tag}
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '40px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Cliquez sur les catégories pour les assigner. Sauvegarde automatique.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
