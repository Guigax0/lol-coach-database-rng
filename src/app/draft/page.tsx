"use client";

import DraftTierlist from "@/components/DraftTierlist";

export default function DraftPage() {
  return (
    <div className="page-wrapper anim-fade-up">
      <header style={{ marginBottom: '48px' }}>
        <p className="font-orbitron" style={{ letterSpacing: '0.5em', marginBottom: '1rem', color: 'var(--lol-gold)' }}>
          DRAFTER TOOL
        </p>
        <h1>Simulation &amp; Création de Compos</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>
          Construisez vos compositions et sauvegardez-les dans le Roster.
        </p>
      </header>
      
      <DraftTierlist />
    </div>
  );
}
