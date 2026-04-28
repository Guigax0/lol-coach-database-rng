"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPlayerSpecialty } from "../utils/strategicHelpers";

export default function Home() {
  const [titulaires, setTitulaires] = useState<any[]>([]);

  useEffect(() => {
    const savedTeam = localStorage.getItem("rngTeam");
    if (savedTeam) {
      const team = JSON.parse(savedTeam);
      setTitulaires(team.filter((m: any) => m.status === 'Titulaire'));
    }
  }, []);

  return (
    <div className="page-wrapper anim-fade-up">
      <div className="home-bg-container"></div>
      
      <header style={{ marginBottom: '64px', borderLeft: '4px solid var(--lol-gold)', paddingLeft: '24px' }}>
        <p className="font-orbitron" style={{ letterSpacing: '0.8em', color: 'var(--lol-gold)', fontSize: '0.8rem', marginBottom: '12px' }}>
          COMMAND CENTER
        </p>
        <h1 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '-1px' }}>
          TEAM <span style={{ color: 'var(--lol-gold)' }}>RNG</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>Gestion de roster et ressources stratégiques de haut niveau.</p>
      </header>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        
        {/* MAIN ROSTER SECTION */}
        <div style={{ flex: 3 }}>
          <h2 className="font-orbitron" style={{ fontSize: '1rem', color: 'var(--lol-gold)', marginBottom: '32px', letterSpacing: '3px' }}>
            TITULAIRES ACTIFS
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {titulaires.length > 0 ? titulaires.map((m) => {
              const specialty = getPlayerSpecialty(m.championPool);
              
              return (
                <div key={m.id} className="glass-panel" style={{ 
                  padding: '24px 32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '32px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderLeft: `4px solid ${specialty.color}`,
                  transition: 'transform 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <img 
                    src={`/images/roles/${m.role.toLowerCase()}.png`} 
                    style={{ width: '40px', height: '40px', filter: specialty.color === 'white' ? 'brightness(1)' : `drop-shadow(0 0 10px ${specialty.color})` }} 
                  />
                  
                  <div style={{ flex: 1 }}>
                    <div className="font-orbitron" style={{ fontSize: '1.4rem', color: 'white', marginBottom: '4px' }}>{m.pseudo}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: specialty.color, letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {specialty.label}
                      </span>
                      <span style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{m.role}</span>
                    </div>
                  </div>


                </div>
              );
            }) : (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Aucun titulaire n'est actuellement défini dans le Roster.
              </div>
            )}
          </div>
          
          <Link href="/roster" className="btn-hex" style={{ marginTop: '40px', padding: '12px 32px', fontSize: '0.8rem' }}>
            ACCÉDER AU ROSTER COMPLET
          </Link>
        </div>

        {/* SIDEBAR RESOURCES */}
        <div style={{ flex: 1, position: 'sticky', top: '40px' }}>
          <h2 className="font-orbitron" style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '3px' }}>
            ACCÈS RAPIDE
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/theorycraft" className="glass-panel" style={{ 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(200, 170, 110, 0.1) 0%, transparent 100%)',
              border: '1px solid rgba(200, 170, 110, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textDecoration: 'none'
            }}>
              <span className="font-orbitron" style={{ color: 'var(--lol-gold)', fontSize: '0.9rem' }}>DATABASE CHAMPIONS</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Analyses tactiques et DNA</span>
            </Link>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '10px 0' }}></div>

            <a href="https://op.gg/fr" target="_blank" className="resource-link">
              <span>OP.GG</span>
              <span style={{ opacity: 0.3 }}>↗</span>
            </a>
            <a href="https://lolalytics.com/" target="_blank" className="resource-link">
              <span>LOLALYTICS</span>
              <span style={{ opacity: 0.3 }}>↗</span>
            </a>
            <a href="https://map.riftkit.net/" target="_blank" className="resource-link">
              <span>RIFTKIT</span>
              <span style={{ opacity: 0.3 }}>↗</span>
            </a>
          </div>

          <style jsx>{`
            .resource-link {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px;
              background: rgba(255,255,255,0.02);
              border: 1px solid rgba(255,255,255,0.05);
              border-radius: 4px;
              color: white;
              text-decoration: none;
              font-size: 0.8rem;
              transition: all 0.3s ease;
            }
            .resource-link:hover {
              background: rgba(255,255,255,0.05);
              border-color: rgba(255,255,255,0.2);
              transform: translateX(5px);
            }
          `}</style>
        </div>

      </div>
    </div>
  );
}
