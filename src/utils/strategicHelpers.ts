import { CHAMPION_KNOWLEDGE_BASE } from "./championData";

export interface DNA {
  poke: number;
  allIn: number;
  hypercarry: number;
}

/**
 * Calcule le profil ADN d'une liste de champions.
 * Les scores sont normalisés entre 0 et 100.
 */
export function calculateCompDNA(championIds: string[]): DNA {
  const result = { poke: 0, allIn: 0, hypercarry: 0 };
  if (championIds.length === 0) return result;

  championIds.forEach(id => {
    const analysis = CHAMPION_KNOWLEDGE_BASE[id];
    if (!analysis) return;

    if (analysis.tags.includes('Poke')) result.poke += 1;
    if (analysis.tags.includes('All-in')) result.allIn += 1;
    if (analysis.tags.includes('Hypercarry')) result.hypercarry += 1;
  });

  // Normalisation (max possible = nombre de champions)
  const max = championIds.length;
  return {
    poke: Math.round((result.poke / max) * 100),
    allIn: Math.round((result.allIn / max) * 100),
    hypercarry: Math.round((result.hypercarry / max) * 100)
  };
}

/**
 * Détermine la spécialité d'un joueur basée sur ses pools S et A.
 * S compte pour 2, A compte pour 1.
 */
export function getPlayerSpecialty(championPool: { S: string[], A: string[] }): { label: string, color: string } {
  const result = { poke: 0, allIn: 0, hypercarry: 0 };
  
  const processList = (list: string[], weight: number) => {
    list.forEach(id => {
      const analysis = CHAMPION_KNOWLEDGE_BASE[id];
      if (!analysis) return;
      if (analysis.tags.includes('Poke')) result.poke += weight;
      if (analysis.tags.includes('All-in')) result.allIn += weight;
      if (analysis.tags.includes('Hypercarry')) result.hypercarry += weight;
    });
  };

  processList(championPool.S, 2);
  processList(championPool.A, 1);

  const total = result.poke + result.allIn + result.hypercarry;
  if (total === 0) return { label: "PROFIL À DÉFINIR", color: "var(--text-muted)" };

  const pPerc = result.poke / total;
  const aPerc = result.allIn / total;
  const hPerc = result.hypercarry / total;

  // Seuil de 45% pour être considéré comme spécialiste
  if (pPerc > 0.45) return { label: "SPÉCIALISTE POKE", color: "#0AC8B9" };
  if (aPerc > 0.45) return { label: "SPÉCIALISTE ALL-IN", color: "#ff4e50" };
  if (hPerc > 0.45) return { label: "SPÉCIALISTE HYPERCARRY", color: "var(--lol-gold)" };

  return { label: "PROFIL POLYVALENT", color: "white" };
}

/**
 * Retourne le vecteur dominant d'une composition pour le style visuel.
 */
export function getDominantVector(dna: DNA): { label: string, color: string } {
  const { poke, allIn, hypercarry } = dna;
  const max = Math.max(poke, allIn, hypercarry);

  if (max === 0) return { label: "NEUTRE", color: "rgba(255,255,255,0.2)" };
  if (max === allIn) return { label: "ALL-IN", color: "#ff4e50" };
  if (max === poke) return { label: "POKE", color: "#0AC8B9" };
  if (max === hypercarry) return { label: "HYPERCARRY", color: "var(--lol-gold)" };

  return { label: "MIXTE", color: "white" };
}

