import TeamManager from "@/components/TeamManager";

export const metadata = {
  title: "Équipe | TEAM RNG",
};

export default function TeamPage() {
  return (
    <div className="page-wrapper anim-fade-up">
      <p className="font-orbitron" style={{ letterSpacing: '0.5em', marginBottom: '1rem', color: 'var(--lol-gold)' }}>
        GESTION DU ROSTER
      </p>
      <h1 style={{ marginBottom: '48px' }}>Membres & Joueurs</h1>
      
      <TeamManager />
    </div>
  );
}
