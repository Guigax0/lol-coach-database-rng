"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Champion {
  id: string;
  name: string;
  image: string;
}

interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface Build {
  id: string;
  name: string;
  starting: string[];
  core: string[];
  situational: string[];
  runes: {
    primaryTree: number | null;
    keystone: number | null;
    primaryMinors: number[];
    secondaryTree: number | null;
    secondaryMinors: number[];
    shards: number[];
  };
  matchups: {
    good: string[];
    bad: string[];
  };
  notes: string;
}

export default function ChampionDatabase() {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [allRunes, setAllRunes] = useState<any[]>([]);
  const [ddVersion, setDdVersion] = useState("");
  
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'build' | 'runes' | 'matchups'>('build');

  const [championBuilds, setChampionBuilds] = useState<Build[]>([]);
  const [activeBuildIndex, setActiveBuildIndex] = useState(0);

  const [showPicker, setShowPicker] = useState<string | null>(null);
  const [pickerSearch, setPickerSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await vRes.json();
      const v = versions[0];
      setDdVersion(v);

      const [cRes, iRes, rRes] = await Promise.all([
        fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/fr_FR/champion.json`),
        fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/fr_FR/item.json`),
        fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/fr_FR/runesReforged.json`)
      ]);

      const cData = await cRes.json();
      const iData = await iRes.json();
      const rData = await rRes.json();

      setAllChampions(Object.values(cData.data).map((c: any) => ({
        id: c.id,
        name: c.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${v}/img/champion/${c.image.full}`
      })));

      setAllItems(Object.entries(iData.data).map(([id, item]: [string, any]) => ({
        id,
        name: item.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${v}/img/item/${id}.png`,
        description: item.description
      })));

      setAllRunes(rData);
    }
    fetchData();
  }, []);

  const createDefaultBuild = (name = "Build Par Défaut") => ({
    id: Date.now().toString(),
    name,
    starting: [], core: [], situational: [],
    runes: { primaryTree: null, keystone: null, primaryMinors: [], secondaryTree: null, secondaryMinors: [], shards: [] },
    matchups: { good: [], bad: [] },
    notes: ""
  });

  const handleChampSelect = (champ: Champion) => {
    setSelectedChamp(champ);
    const saved = localStorage.getItem(`rng_multi_builds_${champ.id}`);
    if (saved) {
      const builds = JSON.parse(saved);
      setChampionBuilds(builds);
      setActiveBuildIndex(0);
    } else {
      setChampionBuilds([createDefaultBuild()]);
      setActiveBuildIndex(0);
    }
  };

  const addNewBuild = () => {
    const name = prompt("Nom du nouveau build (ex: Bruiser, Lethality, Jungle...)");
    if (name) {
      const newBuild = createDefaultBuild(name);
      setChampionBuilds([...championBuilds, newBuild]);
      setActiveBuildIndex(championBuilds.length);
    }
  };

  const deleteBuild = (index: number) => {
    if (championBuilds.length <= 1) return;
    if (confirm("Supprimer ce build ?")) {
      const newBuilds = championBuilds.filter((_, i) => i !== index);
      setChampionBuilds(newBuilds);
      setActiveBuildIndex(0);
    }
  };

  const saveAll = () => {
    if (!selectedChamp) return;
    localStorage.setItem(`rng_multi_builds_${selectedChamp.id}`, JSON.stringify(championBuilds));
    alert("Tous les builds de ce champion ont été sauvegardés !");
  };

  const updateActiveBuild = (newData: Partial<Build>) => {
    setChampionBuilds(prev => {
      const copy = [...prev];
      copy[activeBuildIndex] = { ...copy[activeBuildIndex], ...newData };
      return copy;
    });
  };

  const toggleSelection = (id: string, category: string) => {
    const build = championBuilds[activeBuildIndex];
    if (category.startsWith('matchups_')) {
      const type = category.split('_')[1] as 'good' | 'bad';
      const list = [...build.matchups[type]];
      const newList = list.includes(id) ? list.filter(i => i !== id) : [...list, id];
      updateActiveBuild({ matchups: { ...build.matchups, [type]: newList } });
    } else {
      const list = [...(build as any)[category]];
      const newList = list.includes(id) ? list.filter(i => i !== id) : [...list, id];
      updateActiveBuild({ [category]: newList });
    }
  };

  const activeBuild = championBuilds[activeBuildIndex];

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '20px 40px', borderBottom: '1px solid var(--border-color-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/theorie" style={{ color: 'var(--lol-gold)', textDecoration: 'none', fontSize: '0.9rem' }}>← ACADÉMIE</Link>
          <h1 className="font-orbitron" style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>CHAMPIONS & DATA PRO</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-hex" onClick={saveAll} style={{ padding: '8px 24px' }}>SAUVEGARDER CHAMPION</button>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{ width: '300px', borderRight: '1px solid var(--border-color-dim)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ padding: '20px' }}>
            <input 
              placeholder="Rechercher champion..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 20px' }}>
            {allChampions.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
              <div 
                key={c.id}
                onClick={() => handleChampSelect(c)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', cursor: 'pointer', borderRadius: '4px',
                  background: selectedChamp?.id === c.id ? 'rgba(200, 170, 110, 0.1)' : 'transparent',
                  borderLeft: selectedChamp?.id === c.id ? '3px solid var(--lol-gold)' : '3px solid transparent',
                  marginBottom: '2px'
                }}
              >
                <img src={c.image} style={{ width: '32px', height: '32px', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.9rem', color: selectedChamp?.id === c.id ? 'white' : 'var(--text-muted)' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
          {!selectedChamp || !activeBuild ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📊</div>
              <h3>Sélectionnez un champion pour commencer l'analyse théorique</h3>
              <p>Gérez plusieurs builds par champion pour chaque rôle ou style de jeu.</p>
            </div>
          ) : (
            <div className="anim-fade-up">
              {/* Profile Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
                <img src={selectedChamp.image} style={{ width: '120px', height: '120px', borderRadius: '8px', border: '3px solid var(--lol-gold)' }} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-orbitron)' }}>{selectedChamp.name}</h2>
                  
                  {/* Build Selector Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--lol-gold)', fontWeight: 'bold' }}>BUILDS :</span>
                    {championBuilds.map((build, i) => (
                      <div key={build.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button 
                          onClick={() => setActiveBuildIndex(i)}
                          style={{ 
                            background: activeBuildIndex === i ? 'var(--lol-gold)' : 'rgba(255,255,255,0.1)',
                            color: activeBuildIndex === i ? '#000' : 'white',
                            border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold'
                          }}
                        >
                          {build.name}
                        </button>
                        {championBuilds.length > 1 && activeBuildIndex === i && (
                          <button onClick={() => deleteBuild(i)} style={{ color: '#ff4e50', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>×</button>
                        )}
                      </div>
                    ))}
                    <button onClick={addNewBuild} style={{ background: 'rgba(0,128,0,0.2)', border: '1px solid green', color: 'green', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>+ NOUVEAU</button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                <button onClick={() => setActiveTab('build')} style={{ background: 'none', border: 'none', color: activeTab === 'build' ? 'var(--lol-gold)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>OBJETS</button>
                <button onClick={() => setActiveTab('runes')} style={{ background: 'none', border: 'none', color: activeTab === 'runes' ? 'var(--lol-gold)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>RUNES</button>
                <button onClick={() => setActiveTab('matchups')} style={{ background: 'none', border: 'none', color: activeTab === 'matchups' ? 'var(--lol-gold)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>MATCHUPS</button>
              </div>

              {/* Tab: Build */}
              {activeTab === 'build' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {['starting', 'core', 'situational'].map(cat => (
                      <div key={cat}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <h3 style={{ fontSize: '0.9rem', color: 'var(--lol-gold)', textTransform: 'uppercase' }}>{cat === 'starting' ? 'Départ' : cat === 'core' ? 'Core Items' : 'Situationnels'}</h3>
                          <button onClick={() => setShowPicker(cat)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>+ AJOUTER</button>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', minHeight: '60px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {(activeBuild as any)[cat].map((id: string) => (
                            <div key={id} style={{ position: 'relative' }}>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${id}.png`} style={{ width: '48px', height: '48px', borderRadius: '4px' }} title={allItems.find(i => i.id === id)?.name} />
                              <button onClick={() => toggleSelection(id, cat)} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff4e50', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer' }}>×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--lol-gold)', textTransform: 'uppercase', marginBottom: '16px' }}>Notes Stratégiques ({activeBuild.name})</h3>
                    <textarea 
                      value={activeBuild.notes}
                      onChange={(e) => updateActiveBuild({ notes: e.target.value })}
                      style={{ width: '100%', height: '360px', background: 'rgba(0,0,0,0.4)', border: '1px solid #333', color: 'white', padding: '20px', borderRadius: '4px', lineHeight: '1.6' }}
                      placeholder="Décrivez les pics de puissance, les combos d'objets, ou les adaptations spécifiques..."
                    />
                  </div>
                </div>
              )}

              {/* Tab: Runes */}
              {activeTab === 'runes' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  <div className="glass-panel" style={{ padding: '32px', background: 'rgba(0,0,0,0.3)' }}>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--lol-gold)', marginBottom: '24px', letterSpacing: '2px' }}>ARBRE PRINCIPAL</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                      {allRunes.map(tree => (
                        <img 
                          key={tree.id}
                          src={`https://ddragon.leagueoflegends.com/cdn/img/${tree.icon}`}
                          onClick={() => updateActiveBuild({ runes: { ...activeBuild.runes, primaryTree: tree.id, keystone: null, primaryMinors: [] } })}
                          style={{ 
                            width: '40px', height: '40px', cursor: 'pointer', 
                            filter: activeBuild.runes.primaryTree === tree.id ? 'none' : 'grayscale(1) brightness(0.5)',
                            border: activeBuild.runes.primaryTree === tree.id ? '2px solid var(--lol-gold)' : 'none',
                            borderRadius: '50%', padding: '4px'
                          }}
                          title={tree.name}
                        />
                      ))}
                    </div>

                    {activeBuild.runes.primaryTree && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {allRunes.find(t => t.id === activeBuild.runes.primaryTree)?.slots[0].runes.map((r: any) => (
                            <img 
                              key={r.id}
                              src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`}
                              onClick={() => updateActiveBuild({ runes: { ...activeBuild.runes, keystone: r.id } })}
                              style={{ 
                                width: '48px', height: '48px', cursor: 'pointer',
                                filter: activeBuild.runes.keystone === r.id ? 'none' : 'grayscale(1) brightness(0.5)',
                                border: activeBuild.runes.keystone === r.id ? '2px solid var(--lol-gold)' : 'none',
                                borderRadius: '50%'
                              }}
                              title={r.name}
                            />
                          ))}
                        </div>
                        {[1, 2, 3].map(slotIdx => (
                          <div key={slotIdx} style={{ display: 'flex', gap: '12px' }}>
                            {allRunes.find(t => t.id === activeBuild.runes.primaryTree)?.slots[slotIdx].runes.map((r: any) => (
                              <img 
                                key={r.id}
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`}
                                onClick={() => {
                                  const newMinors = [...activeBuild.runes.primaryMinors].filter(id => {
                                    const slotRunes = allRunes.find(t => t.id === activeBuild.runes.primaryTree)?.slots[slotIdx].runes.map((sr: any) => sr.id);
                                    return !slotRunes.includes(id);
                                  });
                                  updateActiveBuild({ runes: { ...activeBuild.runes, primaryMinors: [...newMinors, r.id] } });
                                }}
                                style={{ 
                                  width: '32px', height: '32px', cursor: 'pointer',
                                  filter: activeBuild.runes.primaryMinors.includes(r.id) ? 'none' : 'grayscale(1) brightness(0.5)',
                                  border: activeBuild.runes.primaryMinors.includes(r.id) ? '2px solid var(--lol-gold)' : 'none',
                                  borderRadius: '50%'
                                }}
                                title={r.name}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-panel" style={{ padding: '32px' }}>
                      <h3 style={{ fontSize: '0.8rem', color: 'var(--lol-gold)', marginBottom: '24px', letterSpacing: '2px' }}>ARBRE SECONDAIRE</h3>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        {allRunes.filter(t => t.id !== activeBuild.runes.primaryTree).map(tree => (
                          <img 
                            key={tree.id}
                            src={`https://ddragon.leagueoflegends.com/cdn/img/${tree.icon}`}
                            onClick={() => updateActiveBuild({ runes: { ...activeBuild.runes, secondaryTree: tree.id, secondaryMinors: [] } })}
                            style={{ 
                              width: '32px', height: '32px', cursor: 'pointer', 
                              filter: activeBuild.runes.secondaryTree === tree.id ? 'none' : 'grayscale(1) brightness(0.5)',
                              border: activeBuild.runes.secondaryTree === tree.id ? '2px solid var(--lol-gold)' : 'none',
                              borderRadius: '50%', padding: '4px'
                            }}
                            title={tree.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Matchups */}
              {activeTab === 'matchups' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  <div>
                    <h3 style={{ color: '#0AC8B9', fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase' }}>Favorable Contre</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '16px' }}>
                       {activeBuild.matchups.good.map((id: string) => {
                         const c = allChampions.find(ch => ch.id === id);
                         return c ? (
                           <div key={id} style={{ position: 'relative' }}>
                             <img src={c.image} style={{ width: '100%', borderRadius: '4px', border: '1px solid #0AC8B9' }} />
                             <button onClick={() => toggleSelection(id, 'matchups_good')} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff4e50', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>×</button>
                           </div>
                         ) : null;
                       })}
                       <button onClick={() => setShowPicker('matchups_good')} style={{ border: '2px dashed #333', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', fontSize: '1.5rem', height: '80px', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: '#ff4e50', fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase' }}>Difficile Contre</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '16px' }}>
                       {activeBuild.matchups.bad.map((id: string) => {
                         const c = allChampions.find(ch => ch.id === id);
                         return c ? (
                           <div key={id} style={{ position: 'relative' }}>
                             <img src={c.image} style={{ width: '100%', borderRadius: '4px', border: '1px solid #ff4e50' }} />
                             <button onClick={() => toggleSelection(id, 'matchups_bad')} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff4e50', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>×</button>
                           </div>
                         ) : null;
                       })}
                       <button onClick={() => setShowPicker('matchups_bad')} style={{ border: '2px dashed #333', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', fontSize: '1.5rem', height: '80px', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Global Picker Modal */}
      {showPicker && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '1000px', height: '80vh', display: 'flex', flexDirection: 'column', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--lol-gold)' }}>
                {showPicker.startsWith('matchups') ? 'SÉLECTIONNER UN CHAMPION' : 'SÉLECTIONNER UN OBJET'}
              </h3>
              <button onClick={() => setShowPicker(null)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            <input 
              placeholder="Rechercher..." 
              value={pickerSearch}
              onChange={(e) => setPickerSearch(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: 'white', marginBottom: '20px' }}
            />
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
              {showPicker.startsWith('matchups') ? (
                allChampions.filter(c => c.name.toLowerCase().includes(pickerSearch.toLowerCase())).map(c => (
                  <div key={c.id} onClick={() => toggleSelection(c.id, showPicker)} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}>
                    <img src={c.image} style={{ width: '48px', height: '48px', borderRadius: '4px', marginBottom: '8px' }} />
                    <div style={{ fontSize: '0.7rem' }}>{c.name}</div>
                  </div>
                ))
              ) : (
                allItems.filter(i => i.name.toLowerCase().includes(pickerSearch.toLowerCase())).map(item => (
                  <div key={item.id} onClick={() => toggleSelection(item.id, showPicker)} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}>
                    <img src={item.image} style={{ width: '48px', height: '48px', borderRadius: '4px', marginBottom: '8px' }} />
                    <div style={{ fontSize: '0.7rem' }}>{item.name}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
