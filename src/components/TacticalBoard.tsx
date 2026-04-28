"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function TacticalBoard({ 
  onAddRef, mode, champions, paths, onUpdate 
}: { 
  onAddRef: (fn: any) => void, 
  mode: 'drag' | 'pen' | 'arrow' | 'ward',
  champions: any[],
  paths: any[],
  onUpdate: (data: { champions?: any[], paths?: any[] }) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempElement, setTempElement] = useState<any>(null);

  const championsRef = useRef(champions);
  const pathsRef = useRef(paths);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => { championsRef.current = champions; }, [champions]);
  useEffect(() => { pathsRef.current = paths; }, [paths]);
  useEffect(() => { onUpdateRef.current = onUpdate; }, [onUpdate]);

  useEffect(() => {
    onAddRef((newChamp: any) => {
      onUpdateRef.current({ 
        champions: [...championsRef.current, { ...newChamp, x: 500, y: 500 }] 
      });
    });
  }, [onAddRef]);

  const getCoords = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const svg = containerRef.current.querySelector('svg');
    if (!svg) return { x: 0, y: 0 };
    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getCoords(e);
    if (mode === 'pen') {
      onUpdateRef.current({ paths: [...pathsRef.current, { type: 'pen', points: [{ x, y }], color: 'var(--lol-gold)' }] });
      setIsDrawing(true);
    } else if (mode === 'arrow') {
      setTempElement({ type: 'arrow', start: { x, y }, end: { x, y } });
      setIsDrawing(true);
    } else if (mode === 'ward') {
      onUpdateRef.current({ paths: [...pathsRef.current, { type: 'ward', x, y, r: 150 }] });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getCoords(e);
    if (mode === 'drag' && draggingId) {
      onUpdateRef.current({
        champions: championsRef.current.map(c => c.id === draggingId ? { ...c, x, y } : c)
      });
    } else if (isDrawing) {
      if (mode === 'pen') {
        const currentPaths = pathsRef.current;
        const last = currentPaths[currentPaths.length - 1];
        if (!last) return;
        const updated = { ...last, points: [...last.points, { x, y }] };
        onUpdateRef.current({ paths: [...currentPaths.slice(0, -1), updated] });
      } else if (mode === 'arrow') {
        setTempElement((prev: any) => prev ? { ...prev, end: { x, y } } : null);
      }
    }
  };

  const stopAction = () => {
    if (isDrawing && mode === 'arrow' && tempElement) {
      onUpdateRef.current({ paths: [...pathsRef.current, tempElement] });
    }
    setDraggingId(null);
    setIsDrawing(false);
    setTempElement(null);
  };

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopAction}
      onMouseLeave={stopAction}
      style={{ 
        width: '100%', 
        height: '100%', 
        background: '#010A13',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      <div style={{ 
        width: '1000px', 
        height: '1000px', 
        position: 'relative',
        backgroundColor: '#050A10',
        backgroundImage: 'url(/images/bg-map.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
      }}>
        <svg viewBox="0 0 1000 1000" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--lol-gold)" />
            </marker>
            <filter id="glow-gold">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-blue">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* STRUCTURES PRÉCISES */}
          <g strokeWidth="2" opacity="0.6">
            <g stroke="var(--hextech-blue)" fill="rgba(10,200,185,0.2)">
              <rect x="110" y="870" width="20" height="20" rx="2" />
              <circle cx="120" cy="450" r="8" /> {/* T1 Top */}
              <circle cx="450" cy="550" r="8" /> {/* T1 Mid */}
              <circle cx="650" cy="875" r="8" /> {/* T1 Bot */}
            </g>
            <g stroke="var(--noxus-red)" fill="rgba(200,0,0,0.2)">
              <rect x="870" y="110" width="20" height="20" rx="2" />
              <circle cx="350" cy="115" r="8" /> {/* T1 Top */}
              <circle cx="550" cy="450" r="8" /> {/* T1 Mid */}
              <circle cx="875" cy="550" r="8" /> {/* T1 Bot */}
            </g>
          </g>

          {/* WARDS */}
          {paths.filter(p => p.type === 'ward').map((p, i) => (
            <circle key={`ward-${i}`} cx={p.x} cy={p.y} r={p.r} fill="rgba(10,200,185,0.1)" stroke="var(--hextech-blue)" strokeWidth="1.5" strokeDasharray="8,4" filter="url(#glow-blue)" />
          ))}

          {/* DRAWING (Glow Enabled) */}
          {paths.map((p, i) => (
            <g key={`path-${i}`}>
              {p.type === 'pen' && <polyline points={p.points.map((pt: any) => `${pt.x},${pt.y}`).join(' ')} fill="none" stroke="var(--lol-gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow-gold)" />}
              {p.type === 'arrow' && <line x1={p.start.x} y1={p.start.y} x2={p.end.x} y2={p.end.y} stroke="var(--lol-gold)" strokeWidth="4" markerEnd="url(#arrowhead)" filter="url(#glow-gold)" />}
            </g>
          ))}

          {tempElement && tempElement.type === 'arrow' && (
            <line x1={tempElement.start.x} y1={tempElement.start.y} x2={tempElement.end.x} y2={tempElement.end.y} stroke="var(--lol-gold)" strokeWidth="3" opacity="0.6" strokeDasharray="8,4" />
          )}

          {/* CHAMPIONS (High Visibility) */}
          {champions.map((c) => (
            <g key={c.id} onMouseDown={(e) => { if (mode === 'drag') { e.stopPropagation(); setDraggingId(c.id); } }} style={{ cursor: mode === 'drag' ? 'grab' : 'default' }}>
              <circle cx={c.x} cy={c.y} r="26" fill="rgba(1, 10, 19, 0.6)" stroke={c.team === 'blue' ? 'var(--hextech-blue)' : 'var(--noxus-red)'} strokeWidth="3" />
              <image href={c.image} x={c.x - 20} y={c.y - 20} width="40" height="40" clipPath="circle(50%)" />
              <text x={c.x} y={c.y + 42} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="font-orbitron" style={{ pointerEvents: 'none', textShadow: '0 0 10px black' }}>
                {c.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: '16px', right: '16px', color: 'white', fontSize: '0.65rem', fontFamily: 'var(--font-orbitron)', letterSpacing: '2px', textShadow: '0 0 5px black', opacity: 0.8 }}>
        RNG TACTICAL — S16 COMMAND
      </div>

      {/* MODE INDICATOR */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(1, 10, 19, 0.8)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '4px', border: '1px solid var(--lol-gold)', fontSize: '0.65rem', color: 'var(--lol-gold)', letterSpacing: '2px', fontFamily: 'var(--font-orbitron)', boxShadow: '0 0 15px rgba(200, 170, 110, 0.3)' }}>
          {mode === 'drag' ? '🖐️ NAVIGATION' : mode === 'pen' ? '✏️ TRACÉ TACTIQUE' : mode === 'arrow' ? '↗️ VECTEUR D\'ENGAGE' : '👁️ CHAMP DE VISION'}
        </div>
      </div>
    </div>
  );
}
