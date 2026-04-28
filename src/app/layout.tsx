"use client";

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/roster", label: "Roster" },
  { href: "/compositions", label: "Compositions" },
  { href: "/draft", label: "Drafter tool" },
  { href: "/strategie", label: "Stratégie" },
  { href: "/theorycraft", label: "Database" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="fr">
      <head>
        <title>RNG | Management Dashboard</title>
        <meta name="description" content="Plateforme de gestion et stratégie pour l'équipe RNG" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <div className="app-layout">
          <aside className="sidebar">
            <div className="sidebar-title" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <img src="/images/rng_logo_bg.png" alt="RNG Logo" style={{ width: '180px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.2))' }} />
            </div>
            <nav className="sidebar-nav">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${pathname === href ? 'active' : ''}`}
                >
                  {label}
                </Link>
              ))}
              <a href="https://discord.gg/MHn9GC95A" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ marginTop: '24px', color: 'var(--hextech-blue)' }}>
                Rejoindre le Discord ↗
              </a>
            </nav>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
