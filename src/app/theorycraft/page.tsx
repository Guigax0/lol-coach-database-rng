"use client";

import ChampionTheory from "@/components/ChampionTheory";

export default function TheorycraftPage() {
  return (
    <div className="page-wrapper anim-fade-up">
      <header style={{ marginBottom: '48px' }}>
        <p className="font-orbitron" style={{ letterSpacing: '0.5em', marginBottom: '1rem', color: 'var(--lol-gold)' }}>
          DATABASE
        </p>
        <h1>Champions & Analyse Stratégique</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Explorez les archetypes, vecteurs et courbes de puissance de chaque champion.</p>
      </header>
      
      <div className="glass-panel" style={{ padding: '32px' }}>
        <ChampionTheory />
      </div>
    </div>
  );
}
