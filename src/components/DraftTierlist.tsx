"use client";

import { useEffect, useState, useMemo } from "react";
import StrategicRadar from "./StrategicRadar";
import { calculateCompDNA } from "../utils/strategicHelpers";
import { supabase } from "../utils/supabaseClient";

interface Champion {
  id: string;
  name: string;
  image: string;
}

interface TierRow {
  id: string;
  name: string;
  color: string;
  champions: string[];
}

const DEFAULT_TIERS: TierRow[] = [
  { id: 't1', name: 'TOP', color: '#ff4e50', champions: [] },
  { id: 't2', name: 'JUNGLE', color: '#2ecc71', champions: [] },
  { id: 't3', name: 'MID', color: '#3498db', champions: [] },
  { id: 't4', name: 'ADC', color: '#C8AA6E', champions: [] },
  { id: 't5', name: 'SUPPORT', color: '#9b59b6', champions: [] }
];

export default function DraftTierlist() {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [tiers, setTiers] = useState<TierRow[]>(DEFAULT_TIERS);
  const [compName, setCompName] = useState("COMPOSITION ALPHA");
  const [search, setSearch] = useState("");
  const [draggedChamp, setDraggedChamp] = useState<{ id: string, sourceTierId?: string, sourceIndex?: number } | null>(null);

  // Calcul du DNA de la composition (Mémoïsé)
  const compDNA = useMemo(() => {
    const allIds = tiers.flatMap(t => t.champions);
    return calculateCompDNA(allIds);
  }, [tiers]);

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

    const saved = localStorage.getItem("rng_draft_tierlist");
    if (saved) setTiers(JSON.parse(saved));
  }, []);

  const saveTiers = (newTiers: TierRow[]) => {
    setTiers(newTiers);
    localStorage.setItem("rng_draft_tierlist", JSON.stringify(newTiers));
  };

  const addTier = () => {
    const newTier: TierRow = { id: Date.now().toString(), name: 'NEW', color: '#444', champions: [] };
    saveTiers([...tiers, newTier]);
  };

  const removeTier = (id: string) => saveTiers(tiers.filter(t => t.id !== id));
  const resetTiers = () => {
    if (confirm("Réinitialiser les rôles et les couleurs par défaut ?")) {
      saveTiers(DEFAULT_TIERS);
    }
  };

  const updateTier = (id: string, updates: Partial<TierRow>) => saveTiers(tiers.map(t => t.id === id ? { ...t, ...updates } : t));
  const moveTier = (idx: number, dir: 'up' | 'down') => {
    const newTiers = [...tiers];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= newTiers.length) return;
    [newTiers[idx], newTiers[target]] = [newTiers[target], newTiers[idx]];
    saveTiers(newTiers);
  };

  const handleDragStart = (champId: string, sourceTierId?: string, sourceIndex?: number) => {
    setDraggedChamp({ id: champId, sourceTierId, sourceIndex });
  };

  const handleDrop = (targetTierId: string) => {
    if (!draggedChamp) return;
    const newTiers = [...tiers];
    if (draggedChamp.sourceTierId) {
      const sourceTier = newTiers.find(t => t.id === draggedChamp.sourceTierId);
      if (sourceTier && draggedChamp.sourceIndex !== undefined) sourceTier.champions.splice(draggedChamp.sourceIndex, 1);
    }
    const targetTier = newTiers.find(t => t.id === targetTierId);
    if (targetTier) targetTier.champions.push(draggedChamp.id);
    saveTiers(newTiers);
    setDraggedChamp(null);
  };

  const exportToRoster = async () => {
    const newDraft = { name: compName, tiers: tiers };
    const { error } = await supabase.from('strategic_compositions').insert(newDraft);
    
    if (error) {
      alert("Erreur lors de la sauvegarde : " + error.message);
    } else {
      alert(`Draft "${compName}" sauvegardée sur le Cloud RNG !`);
      window.dispatchEvent(new Event('rng_draft_updated'));
    }
  };

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <input 
              value={compName}
              onChange={(e) => setCompName(e.target.value)}
              className="font-orbitron"
              style={{ 
                background: 'transparent', border: 'none', borderBottom: '2px solid var(--lol-gold)', 
                color: 'white', fontSize: '1.8rem', padding: '8px 0', width: '100%', outline: 'none'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-hex" onClick={addTier} style={{ fontSize: '0.7rem' }}>+ AJOUTER RÔLE</button>
            <button className="btn-hex" onClick={resetTiers} style={{ fontSize: '0.7rem', opacity: 0.6 }}>RÉINITIALISER</button>
            <button className="btn-hex" onClick={exportToRoster} style={{ fontSize: '0.7rem', borderColor: 'var(--noxus-red)', color: 'var(--noxus-red)' }}>SAUVEGARDER COMPO</button>
          </div>
        </div>

        {/* ANALYSEUR RADAR */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '24px', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ textAlign: 'right' }}>
            <h3 className="font-orbitron" style={{ fontSize: '0.8rem', color: 'var(--lol-gold)', margin: 0 }}>ADN STRATÉGIQUE</h3>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>ANALYSE EN TEMPS RÉEL</p>
          </div>
          <StrategicRadar {...compDNA} size={100} />
        </div>
      </div>

      <div className="draft-container" style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(0,0,0,0.5)', padding: '4px', borderRadius: '4px' }}>
        {tiers.map((tier, idx) => (
          <div key={tier.id} className="draft-tier-row" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(tier.id)} style={{ display: 'flex', minHeight: '80px', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="draft-label" style={{ width: '120px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: tier.color, padding: '10px' }}>
              <input value={tier.name} onChange={(e) => updateTier(tier.id, { name: e.target.value })} style={{ background: 'none', border: 'none', color: '#000', textAlign: 'center', width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }} />
              <input type="color" value={tier.color} onChange={(e) => updateTier(tier.id, { color: e.target.value })} style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', opacity: 0, cursor: 'pointer' }} />
            </div>
            <div style={{ flex: 1, padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {tier.champions.map((cid, ci) => {
                const c = allChampions.find(ch => ch.id === cid);
                return c ? <img key={`${cid}-${ci}`} src={c.image} draggable onDragStart={() => handleDragStart(cid, tier.id, ci)} onClick={() => {
                  const nt = [...tiers]; nt[idx].champions.splice(ci, 1); saveTiers(nt);
                }} style={{ width: '50px', height: '50px', borderRadius: '4px', cursor: 'grab', border: '1px solid rgba(255,255,255,0.1)' }} /> : null;
              })}
            </div>
            <div style={{ width: '80px', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ flex: 1, display: 'flex' }}>
                <button onClick={() => moveTier(idx, 'up')} style={{ flex: 1, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', cursor: 'pointer' }}>▲</button>
                <button onClick={() => moveTier(idx, 'down')} style={{ flex: 1, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', cursor: 'pointer' }}>▼</button>
              </div>
              <button onClick={() => removeTier(tier.id)} style={{ padding: '8px', background: 'none', border: 'none', color: '#ff4e50', cursor: 'pointer', fontSize: '0.8rem' }}>SUPPR.</button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--lol-gold)', fontSize: '0.9rem', letterSpacing: '2px' }}>BANQUE DE CHAMPIONS</h3>
          <input placeholder="Filtrer..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: '8px 16px', background: '#000', border: '1px solid #333', color: 'white', borderRadius: '4px', width: '250px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px', maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
          {allChampions.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
            <div key={c.id} draggable onDragStart={() => handleDragStart(c.id)} style={{ cursor: 'grab', textAlign: 'center' }}>
              <img src={c.image} style={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
