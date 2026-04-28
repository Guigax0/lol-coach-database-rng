"use client";

import React from 'react';

interface StrategicRadarProps {
  poke: number; // 0 to 100
  allIn: number; // 0 to 100
  hypercarry: number; // 0 to 100
  size?: number;
}

export default function StrategicRadar({ poke, allIn, hypercarry, size = 150 }: StrategicRadarProps) {
  const center = 50;
  const maxRadius = 40;

  // Calcul des coordonnées des points (Triangle équilatéral)
  // Sommet 1 (Poke) : Haut
  const getPokePoint = (val: number) => {
    const r = (val / 100) * maxRadius;
    return { x: center, y: center - r };
  };

  // Sommet 2 (All-in) : Bas gauche (150°)
  const getAllInPoint = (val: number) => {
    const r = (val / 100) * maxRadius;
    const angle = (150 * Math.PI) / 180;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  // Sommet 3 (Hypercarry) : Bas droite (30°)
  const getHypercarryPoint = (val: number) => {
    const r = (val / 100) * maxRadius;
    const angle = (30 * Math.PI) / 180;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const p = getPokePoint(poke);
  const a = getAllInPoint(allIn);
  const h = getHypercarryPoint(hypercarry);

  const bgPoints = `${getPokePoint(100).x},${getPokePoint(100).y} ${getAllInPoint(100).x},${getAllInPoint(100).y} ${getHypercarryPoint(100).x},${getHypercarryPoint(100).y}`;
  const dataPoints = `${p.x},${p.y} ${a.x},${a.y} ${h.x},${h.y}`;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Background Triangle */}
        <polygon 
          points={bgPoints} 
          fill="rgba(255, 255, 255, 0.03)" 
          stroke="rgba(255, 255, 255, 0.1)" 
          strokeWidth="0.5"
        />
        
        {/* Axis Lines */}
        <line x1={center} y1={center} x2={getPokePoint(100).x} y2={getPokePoint(100).y} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.2" />
        <line x1={center} y1={center} x2={getAllInPoint(100).x} y2={getAllInPoint(100).y} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.2" />
        <line x1={center} y1={center} x2={getHypercarryPoint(100).x} y2={getHypercarryPoint(100).y} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.2" />

        {/* Data Area */}
        <polygon 
          points={dataPoints} 
          fill="rgba(200, 170, 110, 0.3)" 
          stroke="var(--lol-gold)" 
          strokeWidth="1.5"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* Vertices Labels */}
        <text x={getPokePoint(115).x} y={getPokePoint(115).y} fontSize="6" fill="#0AC8B9" textAnchor="middle" fontWeight="bold" fontFamily="var(--font-orbitron)">POKE</text>
        <text x={getAllInPoint(120).x} y={getAllInPoint(120).y} fontSize="6" fill="#ff4e50" textAnchor="middle" fontWeight="bold" fontFamily="var(--font-orbitron)">ALL-IN</text>
        <text x={getHypercarryPoint(120).x} y={getHypercarryPoint(120).y} fontSize="6" fill="var(--lol-gold)" textAnchor="middle" fontWeight="bold" fontFamily="var(--font-orbitron)">H-CARRY</text>
      </svg>
    </div>
  );
}
