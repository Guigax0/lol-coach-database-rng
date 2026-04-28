export interface DefaultChampAnalysis {
  archetype: string;
  functions: string;
  vectors: string;
  powerCurve: string;
  tags: ('All-in' | 'Poke' | 'Hypercarry')[];
}

export const CHAMPION_KNOWLEDGE_BASE: Record<string, DefaultChampAnalysis> = {
  "Aatrox": {
    archetype: "Combattant (Colosse)",
    functions: "Front-to-back, Drain-tanking, Punisseur de placement",
    vectors: "All-in / Escarmouche",
    powerCurve: "Fort en Lane (niveau 4+), pic massif à 1-2 items. S'essouffle en très late game.",
    tags: ["All-in"]
  },
  "Ahri": {
    archetype: "Mage (Assassin / Hybride)",
    functions: "Pick Potential (Charme), Tempo Dealer, Roaming",
    vectors: "Poke / All-in",
    powerCurve: "Correcte en early, pic massif au niveau 6. Très forte en mid-game pour les rotations.",
    tags: ["Poke", "All-in"]
  },
  "Akali": {
    archetype: "Tueur (Assassin)",
    functions: "Backline Dive, Temporisation (Fumée), Flanking",
    vectors: "All-in / Burst",
    powerCurve: "Faible pré-6, menace majeure dès l'ultime. Snowball extrêmement fort.",
    tags: ["All-in"]
  },
  "Akshan": {
    archetype: "Tireur (Assassin)",
    functions: "Roaming, Revive Mechanic, Lane Bully",
    vectors: "All-in / Roaming",
    powerCurve: "Très fort en début de partie. Doit snowball pour rester utile en late game.",
    tags: ["All-in"]
  },
  "Alistar": {
    archetype: "Tank (Initiateur)",
    functions: "Hard Engage (Combo WQ), Peel, Diving",
    vectors: "All-in",
    powerCurve: "Faible niveau 1, pic massif niveau 2 et 6. Utilité constante en teamfight.",
    tags: ["All-in"]
  },
  "Amumu": {
    archetype: "Tank (Initiateur)",
    functions: "AoE CC (R), Lockdown, Jungler de Teamfight",
    vectors: "All-in",
    powerCurve: "Correct en early, devient une machine à CC en mid/late game.",
    tags: ["All-in"]
  },
  "Anivia": {
    archetype: "Mage de Contrôle",
    functions: "Zone Control (Ult), Wall Blocking, Waveclear",
    vectors: "Poke / Control",
    powerCurve: "Dépendante du niveau 6. Devient un mur infranchissable en late game.",
    tags: ["Poke"]
  },
  "Annie": {
    archetype: "Mage de Choc (Burst)",
    functions: "AoE Burst (Tibbers), Point-and-click CC",
    vectors: "All-in / Pick",
    powerCurve: "Pic massif au niveau 6. Menace de flash-stun permanente en mid game.",
    tags: ["All-in"]
  },
  "Aphelios": {
    archetype: "Tireur (Scaling)",
    functions: "DPS Multi-fonctions, Area Control, Scaling Carry",
    vectors: "Hypercarry / Poke",
    powerCurve: "Faible en early, l'un des plus gros carrys du jeu à 3+ items.",
    tags: ["Hypercarry"]
  },
  "Ashe": {
    archetype: "Tireur (Utilitaire)",
    functions: "Vision Control (E), Long Range Pick (R), Kiting",
    vectors: "Poke / Pick",
    powerCurve: "Forte en lane (range), utilité constante par son ultime.",
    tags: ["Poke"]
  },
  "AurelionSol": {
    archetype: "Mage de Combat (Scaling)",
    functions: "Scaling AoE, Zone Control, Late Game Carry",
    vectors: "Hypercarry",
    powerCurve: "Très faible en early, devient un dieu destructeur de carte en late game.",
    tags: ["Hypercarry"]
  },

  "Azir": {
    archetype: "Mage de Contrôle",
    functions: "Constant DPS (Soldats), Zoning, Playmaker (Shuffle)",
    vectors: "Poke / Hypercarry",
    powerCurve: "Scaling pur. Faible en early, terrifiant à 3+ items.",
    tags: ["Poke", "Hypercarry"]
  },
  "Kaisa": {
    archetype: "Tireur (Assassin)",
    functions: "Adaptative DPS, Backline Dive (R), Burst",
    vectors: "All-in / Hypercarry",
    powerCurve: "Correcte en lane, pic à chaque évolution (Q, W, E).",
    tags: ["All-in", "Hypercarry"]
  },
  "LeeSin": {
    archetype: "Combattant (Plongeur)",
    functions: "Early Pressure, Playmaking (Insec), Duel",
    vectors: "All-in / Early",
    powerCurve: "Dieu de l'early game, décline en utilité pure en late game.",
    tags: ["All-in"]
  },
  "Thresh": {
    archetype: "Contrôleur (Attrapeur)",
    functions: "Pick Potential (Q), Savior (Lantern), Peel",
    vectors: "All-in / Pick",
    powerCurve: "Utilité constante. Menace permanente dès le niveau 1.",
    tags: ["All-in"]
  },
  "Kayn": {
    archetype: "Combattant (Escarmoucheur / Assassin)",
    functions: "Form Transformation, Shadow Assassin (Burst) or Rhaast (Drain-tank)",
    vectors: "All-in",
    powerCurve: "Dépend de la transformation. Très mobile à travers les murs.",
    tags: ["All-in"]
  },
  "Jinx": {
    archetype: "Tireur (Scaling)",
    functions: "Front-to-back DPS, Teamfight Cleanup (Passive), AoE Damage",
    vectors: "Hypercarry",
    powerCurve: "Faible en early, extrêmement dépendante de son support. Monstre absolu à 3 items.",
    tags: ["Hypercarry"]
  },
  "Orianna": {
    archetype: "Mage de Contrôle",
    functions: "Combat Pivot, Zone Control, Utility Buffs",
    vectors: "Poke / All-in",
    powerCurve: "Stable. Forte phase de lane. Son ultime peut gagner un teamfight à n'importe quel moment.",
    tags: ["Poke", "Hypercarry"]
  },
  "KSante": {
    archetype: "Tank (Warden / Combattant)",
    functions: "Isoleur de cible (R), Frontline / Peeling, Tank-Duelliste",
    vectors: "All-in",
    powerCurve: "Fort une fois le premier item fini. Très difficile à tuer en mid game.",
    tags: ["All-in"]
  },
  "Ezreal": {
    archetype: "Tireur (Poke / Mobilité)",
    functions: "Long Range Poke, Safest ADC (E), Tempo Damage",
    vectors: "Poke",
    powerCurve: "Pic massif à 2 items (Manamune + Trinité/Essence Reaver). Fort en mid game.",
    tags: ["Poke"]
  },
  "Nautilus": {
    archetype: "Tank (Initiateur)",
    functions: "Point-and-click CC (R), Lockdown, Hard Engage",
    vectors: "All-in",
    powerCurve: "Dominant en lane par sa menace de all-in. Utilité maximale en mid game.",
    tags: ["All-in"]
  },
  "Yone": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Backline Dive, AoE CC (R), Hybrid DPS",
    vectors: "All-in / Hypercarry",
    powerCurve: "Pic de puissance énorme à 2 items (100% Crit). Très fort en duel et teamfight.",
    tags: ["All-in", "Hypercarry"]
  },
  "Vi": {
    archetype: "Combattant (Plongeur)",
    functions: "Target Lockdown (R), Armor Shred, Diving",
    vectors: "All-in",
    powerCurve: "Forte au niveau 6. Très efficace pour pick des cibles isolées en mid game.",
    tags: ["All-in"]
  },
  "Rakan": {
    archetype: "Contrôleur (Attrapeur / Enchanteur)",
    functions: "High Mobility Engage, Disruption, Peeling",
    vectors: "All-in / Hypercarry",
    powerCurve: "Moyenne en lane, l'un des meilleurs outils d'engage du jeu en mid/late game.",
    tags: ["All-in", "Hypercarry"]
  },
  "Garen": {
    archetype: "Combattant (Colosse)",
    functions: "Backline Menace, Execution (R), Sustain / Tanking",
    vectors: "All-in",
    powerCurve: "Fort en lane (sustain). Très résistant en mid game. S'essouffle face au kiting.",
    tags: ["All-in"]
  },
  "Darius": {
    archetype: "Combattant (Colosse)",
    functions: "Lane Bully, Reset Execution (R), Frontline",
    vectors: "All-in",
    powerCurve: "Dieu de l'early game. Menace de pentakill constante s'il obtient un reset.",
    tags: ["All-in"]
  },
  "DrMundo": {
    archetype: "Combattant (Colosse)",
    functions: "Infinite Regen (R), Anti-CC (Passive), Frontline",
    vectors: "All-in",
    powerCurve: "Monstre de tankiness en late game. Capable de foncer dans le tas sans mourir.",
    tags: ["All-in"]
  },
  "Malphite": {
    archetype: "Tank (Initiateur)",
    functions: "Hard Engage (R), Anti-AD, Frontline",
    vectors: "All-in",
    powerCurve: "Passif pré-6. Devient une menace dès l'ultime. Très fort contre les compos AD.",
    tags: ["All-in"]
  },
  "Fiora": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Split-push, Duelist (True Damage), Side Lane Pressure",
    vectors: "Hypercarry",
    powerCurve: "Scaling constant. Devient un monstre imbattable en duel à 3-4 items.",
    tags: ["Hypercarry"]
  },
  "Camille": {
    archetype: "Combattant (Plongeur)",
    functions: "Precision Duelist, Tactical Engage (E), Isolation (R)",
    vectors: "All-in",
    powerCurve: "Forte après le premier item. Reine du split-push et du pick en mid/late game.",
    tags: ["All-in"]
  },
  "Corki": {
    archetype: "Tireur (Mage / Artillerie)",
    functions: "Mixed Damage, Package Engage (Passive), Long Range Poke (R)",
    vectors: "Poke / Hypercarry",
    powerCurve: "Pic massif en mid/late game avec 2-3 items. Dégâts hybrides difficiles à itemiser contre.",
    tags: ["Poke", "Hypercarry"]
  },
  "Rumble": {
    archetype: "Mage (Bataille / Lane Bully)",
    functions: "AoE Burning (Ult), Lane Dominance, Zone Control",
    vectors: "Poke / All-in",
    powerCurve: "Extrêmement fort en early/mid game. Dégâts de base terrifiants.",
    tags: ["Poke", "All-in"]
  },
  "Gwen": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Tank Shredder, Untargetable Zone (W), Late Game Duelist",
    vectors: "Hypercarry",
    powerCurve: "Scaling pur. Faible au début, devient une menace ingérable à 3 items.",
    tags: ["Hypercarry"]
  },
  "Nasus": {
    archetype: "Combattant (Colosse)",
    functions: "Infinite Scaling, Side Lane Pressure, Tanking",
    vectors: "Hypercarry",
    powerCurve: "Très faible en early. Pic de puissance massif en mid game (400+ stacks).",
    tags: ["Hypercarry"]
  },
  "Kayle": {
    archetype: "Tireur (Scaling / Spécialiste)",
    functions: "Transcendent Carry, AoE DPS, Utility (Ult)",
    vectors: "Hypercarry",
    powerCurve: "Inexistante pré-6. Faible pré-11. Dieu absolu au niveau 16.",
    tags: ["Hypercarry"]
  },
  "Gnar": {
    archetype: "Combattant (Spécialiste)",
    functions: "Form Management (Rage), Teamfight Engage (Mega), Kiting (Mini)",
    vectors: "Poke / All-in",
    powerCurve: "Fort en lane contre les mêlées. Utilité immense en teamfight mid game.",
    tags: ["Poke", "All-in"]
  },
  "Elise": {
    archetype: "Mage (Tueur / Plongeur)",
    functions: "Early Jungle Pressure, Dive Specialist, Pick Potential (E)",
    vectors: "All-in",
    powerCurve: "Reine de l'early game. Doit snowball. Moins efficace en teamfight groupé en late.",
    tags: ["All-in"]
  },
  "Ekko": {
    archetype: "Tueur (Assassin / Mage)",
    functions: "Dive & Reset (R), AoE Stun (W), Burst",
    vectors: "All-in",
    powerCurve: "Fort en mid game. Très mobile. Capable de corriger ses erreurs avec son ultime.",
    tags: ["All-in"]
  },
  "Evelynn": {
    archetype: "Tueur (Assassin)",
    functions: "Invisibility Pressure, Backline Assassination, Execute (R)",
    vectors: "All-in",
    powerCurve: "Menace permanente après le niveau 6. Capable de one-shot n'importe qui sans MR.",
    tags: ["All-in"]
  },
  "FiddleSticks": {
    archetype: "Mage (Choc / Embuscade)",
    functions: "Teamfight Turning Ult (R), Fear Chain, Vision Denial",
    vectors: "All-in",
    powerCurve: "Dépend de son niveau 6. Reine de l'embuscade sous vision.",
    tags: ["All-in"]
  },
  "Hecarim": {
    archetype: "Combattant (Plongeur)",
    functions: "AoE Fear (R), Tempo Ganking, Diving",
    vectors: "All-in",
    powerCurve: "Dépendant de l'accélération et des items. Très fort en mid game pour snowball.",
    tags: ["All-in"]
  },
  "Khazix": {
    archetype: "Tueur (Assassin)",
    functions: "Punisseur d'isolement, Evolution Adaptative, Flanking",
    vectors: "All-in",
    powerCurve: "Snowball dépendant. Très fort en mid game pour punir le mauvais placement.",
    tags: ["All-in"]
  },
  "MasterYi": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Teamfight Cleaner, DPS en mêlée, Untargetable (Q)",
    vectors: "Hypercarry",
    powerCurve: "Scaling pur. Inarrêtable s'il obtient quelques kills tôt.",
    tags: ["Hypercarry"]
  },
  "Olaf": {
    archetype: "Combattant (Colosse)",
    functions: "Backline Diver, CC Immunity (R), Early Game Stomper",
    vectors: "All-in",
    powerCurve: "Monstre d'early game (niveau 1-3). S'essouffle en late game face au burst.",
    tags: ["All-in"]
  },
  "RekSai": {
    archetype: "Combattant (Plongeur)",
    functions: "Early Jungle Tempo, Pathing Imprévisible, Vision par vibrations",
    vectors: "All-in",
    powerCurve: "Dominante en early. Utilité correcte en mid game. Décline en late.",
    tags: ["All-in"]
  },
  "Rengar": {
    archetype: "Tueur (Assassin)",
    functions: "Bush Management, Instant Burst, Vision Pressure (R)",
    vectors: "All-in",
    powerCurve: "Snowball extrêmement dépendant de ses stacks. Terreur du mid game.",
    tags: ["All-in"]
  },
  "Shaco": {
    archetype: "Tueur (Assassin / Spécialiste)",
    functions: "Chaos Management, Invisibility Pressure, Trap Control (Boxes)",
    vectors: "All-in / Poke",
    powerCurve: "Fort en early pour le tilt/gank. Utilité variable selon le build (AD/AP).",
    tags: ["All-in"]
  },
  "Kassadin": {
    archetype: "Tueur (Assassin / Mage)",
    functions: "Anti-Mage, Extreme Mobility (R), Late Game Win Condition",
    vectors: "Hypercarry",
    powerCurve: "Très faible en early. Dieu absolu au niveau 16 (Win Condition).",
    tags: ["Hypercarry"]
  },
  "Katarina": {
    archetype: "Tueur (Assassin)",
    functions: "Reset Management, AoE Burst, Teamfight Cleaner",
    vectors: "All-in",
    powerCurve: "Snowball dépendant. Très forte en mid game pour punir le manque de CC.",
    tags: ["All-in"]
  },
  "LeBlanc": {
    archetype: "Tueur (Assassin / Mage)",
    functions: "Pick Potential, Safe Harass, In-and-out Burst",
    vectors: "Poke / All-in",
    powerCurve: "Reine de l'early/mid game. Mobilité inégalée. S'essouffle en late.",
    tags: ["Poke", "All-in"]
  },
  "Leona": {
    archetype: "Tank (Initiateur / Vanguard)",
    functions: "Hard CC Chain, Point-and-click Stun (Q), Frontline",
    vectors: "All-in",
    powerCurve: "Très forte au niveau 2 et 6. Une des meilleures engage du jeu.",
    tags: ["All-in"]
  },
  "Lux": {
    archetype: "Mage (Artillerie / Choc)",
    functions: "Long Range Pick (Q), AoE Shielding, Zone Control",
    vectors: "Poke",
    powerCurve: "Correcte en lane. Pic de puissance à 2 items. Utilité constante.",
    tags: ["Poke"]
  },
  "Malzahar": {
    archetype: "Mage de Contrôle",
    functions: "Anti-Carry (R), Wave Management, Point-and-click CC",
    vectors: "All-in",
    powerCurve: "Fort après le premier item (Liandry). Toujours utile par son R.",
    tags: ["All-in"]
  },
  "Pantheon": {
    archetype: "Combattant (Plongeur)",
    functions: "Global Threat (R), Point-and-click CC, Lane Bully",
    vectors: "All-in",
    powerCurve: "Monstre d'early game. Très fort en mid game pour les rotations.",
    tags: ["All-in"]
  },
  "Ryze": {
    archetype: "Mage de Combat",
    functions: "Scaling AoE DPS, Macro-Play (R), Waveclear",
    vectors: "Hypercarry",
    powerCurve: "Scaling massif. Besoin de mana et d'items pour briller.",
    tags: ["Hypercarry"]
  },
  "Syndra": {
    archetype: "Mage de Choc (Burst)",
    functions: "Long Range Stun (QE), Single Target Deletion (R), Scaling",
    vectors: "Poke / All-in",
    powerCurve: "Scaling par paliers. Très forte au niveau 9 et 13.",
    tags: ["Poke", "All-in"]
  },
  "Talon": {
    archetype: "Tueur (Assassin)",
    functions: "Parkour Roaming (E), Backline Access, Early Map Pressure",
    vectors: "All-in",
    powerCurve: "Roi du mid game. Mobilité de carte inégalée. S'essouffle en late.",
    tags: ["All-in"]
  },
  "Caitlyn": {
    archetype: "Tireur (Zonage)",
    functions: "Siege Specialist, Trap Management, Range Dominance",
    vectors: "Poke",
    powerCurve: "Forte en early. Creux en mid game. Revient très forte en late (4+ items).",
    tags: ["Poke"]
  },
  "Draven": {
    archetype: "Tireur (Lane Bully)",
    functions: "Snowballing, Early Dominance, High Single Target DPS",
    vectors: "All-in",
    powerCurve: "Dieu de l'early game. S'il ne récupère pas de kills, perd beaucoup de valeur.",
    tags: ["All-in"]
  },
  "Kalista": {
    archetype: "Tireur (Mobilité / Spécialiste)",
    functions: "Objective Securing (E), Support Coordination, Kiting",
    vectors: "All-in",
    powerCurve: "Très forte en early/mid game. Très sensible aux ralentissements.",
    tags: ["All-in"]
  },
  "KogMaw": {
    archetype: "Tireur (Scaling / Artillerie)",
    functions: "Tank Shredder, Long Range Artillery, Scaling Carry",
    vectors: "Hypercarry",
    powerCurve: "Faible en early. Machine à DPS inarrêtable à 2-3 items.",
    tags: ["Hypercarry"]
  },
  "MissFortune": {
    archetype: "Tireur (Burst / Zone)",
    functions: "AoE WomboxCombo (R), Lane Bully, Speed Movement",
    vectors: "All-in",
    powerCurve: "Très forte en lane. Pic de puissance massif en mid game en teamfight.",
    tags: ["All-in"]
  },
  "Sivir": {
    archetype: "Tireur (Utilité / Scaling)",
    functions: "Waveclear Specialist, Team Speed Buff (R), Front-to-back DPS",
    vectors: "Hypercarry",
    powerCurve: "Correcte. Pic massif en late game (Ricochet). Meilleure waveclear du jeu.",
    tags: ["Hypercarry"]
  },
  "Tristana": {
    archetype: "Tireur (Assassin / Siège)",
    functions: "Tower Destroyer, Reset Cleanup (W), Burst DPS",
    vectors: "All-in",
    powerCurve: "Forte en early. Creux en mid game. Devient une hypercarry safe en late.",
    tags: ["All-in"]
  },
  "Twitch": {
    archetype: "Tireur (Assassin)",
    functions: "Stealth Flanking, AoE Burst (R), Teamfight Cleaner",
    vectors: "Hypercarry",
    powerCurve: "Scaling pur. Toujours une menace de comeback grâce à sa furtivité.",
    tags: ["Hypercarry"]
  },
  "Varus": {
    archetype: "Tireur (Artillerie / On-hit)",
    functions: "Long Range Poke, Anti-Engage (R), Tank Shredder",
    vectors: "Poke",
    powerCurve: "Constant. Fort en lane. Très flexible selon le build choisi (Poke/AP/AD).",
    tags: ["Poke"]
  },
  "Bard": {
    archetype: "Contrôleur (Spécialiste)",
    functions: "Macro Playmaker (R), Roaming, Chaos Management",
    vectors: "All-in",
    powerCurve: "Stable. Scaling via sa passive. Impact dépendant de la créativité.",
    tags: ["All-in"]
  },
  "Blitzcrank": {
    archetype: "Contrôleur (Attrapeur)",
    functions: "Instant Pick (Q), Zone Pressure, Early Roaming",
    vectors: "All-in",
    powerCurve: "Menace de niveau 1. Utilité maximale en mid game pour créer des picks.",
    tags: ["All-in"]
  },
  "Braum": {
    archetype: "Tank (Protecteur)",
    functions: "Projectile Blocking (E), Peeling, Passive Stun Management",
    vectors: "All-in",
    powerCurve: "Fort contre les tireurs. Utilité constante pour protéger ses alliés.",
    tags: ["All-in"]
  },
  "Janna": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Disengage Queen, Anti-Dive, Speed Buffing",
    vectors: "Hypercarry",
    powerCurve: "Stable. Très forte contre les compos de dive (Poppy, Leona).",
    tags: ["Hypercarry"]
  },
  "Morgana": {
    archetype: "Contrôleur (Attrapeur / Mage)",
    functions: "Anti-CC Shield (E), Long Duration CC (Q), Zone Disruption",
    vectors: "Poke / All-in",
    powerCurve: "Constante. Toujours utile pour son E. Impact teamfight lié au Zhonya.",
    tags: ["Poke", "All-in"]
  },
  "Pyke": {
    archetype: "Tueur (Assassin / Support)",
    functions: "Gold Generation (R), Roaming Pick, Executioner",
    vectors: "All-in",
    powerCurve: "Dieu de l'early/mid game. Tombe fortement en late game.",
    tags: ["All-in"]
  },
  "Seraphine": {
    archetype: "Mage (Bataille / Enchanteur)",
    functions: "Teamfight AoE CC, Shielding, Long Range Engage (R)",
    vectors: "Hypercarry",
    powerCurve: "Scaling solide. Plus les teamfights sont groupés, plus elle est forte.",
    tags: ["Hypercarry"]
  },
  "Soraka": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Emergency Healer, Global Save (R), Zone Silence (E)",
    vectors: "Hypercarry",
    powerCurve: "Forte en lane. Cauchemar en teamfight si elle n'est pas focus.",
    tags: ["Hypercarry"]
  },
  "Yuumi": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Stat Buffer, Safe Healing, Untargetable Support",
    vectors: "Hypercarry",
    powerCurve: "Faible en early. Devient forte en late attachée à un carry.",
    tags: ["Hypercarry"]
  },
  "Karma": {
    archetype: "Mage (Bataille / Enchanteur)",
    functions: "Lane Bully, Flexible Support, Shield Battery",
    vectors: "Poke / Hypercarry",
    powerCurve: "Monstre d'early (niveau 1-6). Utilité constante en teamfight.",
    tags: ["Poke", "Hypercarry"]
  },
  "Belveth": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Objective Snowballer, Infinite AS, Skirmish Queen",
    vectors: "All-in / Hypercarry",
    powerCurve: "Pic massif en mid game sur le push d'objectifs. Inarrêtable en late.",
    tags: ["All-in", "Hypercarry"]
  },
  "Brand": {
    archetype: "Mage (Bataille)",
    functions: "AoE %HP Burn, Teamfight Exploder, Waveclear",
    vectors: "Poke / All-in",
    powerCurve: "Fort dès ses 3 sorts. Pic massif en teamfight mid game.",
    tags: ["Poke", "All-in"]
  },
  "Briar": {
    archetype: "Combattant (Plongeur)",
    functions: "Berserk Diver, Sustained Duel, Pick Potential (R)",
    vectors: "All-in",
    powerCurve: "Forte après le niveau 6. Très dominante en escarmouches mid game.",
    tags: ["All-in"]
  },
  "Cassiopeia": {
    archetype: "Mage (Bataille)",
    functions: "Sustained DPS, Anti-Mobility (W), Zone Control",
    vectors: "Hypercarry",
    powerCurve: "Scaling pur. Pic massif à 3+ items. Reine du DPS late game.",
    tags: ["Hypercarry"]
  },
  "Chogath": {
    archetype: "Tank (Spécialiste)",
    functions: "Objective Execution (R), Infinite Scaling HP, AoE CC",
    vectors: "All-in",
    powerCurve: "Correct en lane. Devient immensément tanky en mid game.",
    tags: ["All-in"]
  },
  "Diana": {
    archetype: "Combattant (Plongeur)",
    functions: "AoE Engage (R), Backline Burst, Jungle Farmer",
    vectors: "All-in",
    powerCurve: "Forte au niveau 6. Très dominante en mid game. Snowball dépendant.",
    tags: ["All-in"]
  },
  "Fizz": {
    archetype: "Tueur (Assassin)",
    functions: "Safe Evasive, Long Range Pick (R), Burst",
    vectors: "All-in",
    powerCurve: "Faible pré-3. Très fort au niveau 6. Pic massif en mid game.",
    tags: ["All-in"]
  },
  "Galio": {
    archetype: "Tank (Warden / Mage de Choc)",
    functions: "Anti-Mage, Global Roam (R), AoE CC",
    vectors: "All-in",
    powerCurve: "Fort en rotations. Pic massif en mid game. Mur contre les compos AP.",
    tags: ["All-in"]
  },
  "Gangplank": {
    archetype: "Combattant (Spécialiste)",
    functions: "Global Support (R), Barrel Burst, Scaling True Damage",
    vectors: "Poke / Hypercarry",
    powerCurve: "Faible en early. Devient un monstre de one-shot à 3+ items (Crit).",
    tags: ["Poke", "Hypercarry"]
  },
  "Graves": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Jungle Power-farmer, Burst Damage, Tanky Marksman",
    vectors: "Poke / All-in",
    powerCurve: "Fort si en avance d'XP. Pic massif à 2-3 items. Monstre de duel.",
    tags: ["Poke", "All-in"]
  },
  "Illaoi": {
    archetype: "Combattant (Colosse)",
    functions: "Zone Denial (Tentacles), E-Minigame, 1vX Potential",
    vectors: "All-in",
    powerCurve: "Reine du mid game et du splitpush. Difficile à déloger.",
    tags: ["All-in"]
  },
  "Irelia": {
    archetype: "Combattant (Plongeur)",
    functions: "Backline Diver, Reset Mechanics, Skirmish Queen",
    vectors: "All-in / Hypercarry",
    powerCurve: "Pic massif à 1 item (Bork). Reine du mid game.",
    tags: ["All-in", "Hypercarry"]
  },
  "Ivern": {
    archetype: "Contrôleur (Enchanteur / Jungle)",
    functions: "Utility Jungler, Daisy Management, Shielding",
    vectors: "Hypercarry",
    powerCurve: "Fort en early (pathing). Utilité maximale en mid game.",
    tags: ["Hypercarry"]
  },
  "JarvanIV": {
    archetype: "Combattant (Plongeur)",
    functions: "Terrain Creation (R), Hard Engage, Early Ganker",
    vectors: "All-in",
    powerCurve: "Dieu de l'early game. Pic en mid game pour l'initiation.",
    tags: ["All-in"]
  },
  "Jax": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Counter-Strike (E), Split-push, Scaling Duelist",
    vectors: "All-in / Hypercarry",
    powerCurve: "Scaling massif. Menace majeure à 2 items. Monstre de late game.",
    tags: ["All-in", "Hypercarry"]
  },
  "Jhin": {
    archetype: "Tireur (Utilitaire / Choc)",
    functions: "Long Range Execution (R), Pick Potential (W), Utility",
    vectors: "Poke",
    powerCurve: "Très fort en lane et en mid game pour les picks. Moins de DPS constant que d'autres ADC en late.",
    tags: ["Poke"]
  },
  "Jayce": {
    archetype: "Combattant (Spécialiste)",
    functions: "Form Shifter, Shock Blast Poke, Lane Bully",
    vectors: "Poke / All-in",
    powerCurve: "Dominant en lane. Pic massif en mid game pour le poke.",
    tags: ["Poke", "All-in"]
  },
  "Karthus": {
    archetype: "Mage (Bataille)",
    functions: "Global DPS (R), Passive Denial, Power-farming",
    vectors: "Poke / Hypercarry",
    powerCurve: "Scaling pur. Pic massif en late game. Dégâts records.",
    tags: ["Poke", "Hypercarry"]
  },
  "Kennen": {
    archetype: "Mage (Spécialiste / Choc)",
    functions: "AoE Stun (R), Flanking, Lane Bully (Range)",
    vectors: "All-in / Poke",
    powerCurve: "Forte phase de lane. Pic massif au niveau 6. Très dépendant de son ultime.",
    tags: ["All-in", "Poke"]
  },
  "Kindred": {
    archetype: "Tireur (Chasseur / Jungle)",
    functions: "Objective Pressure, Survival Zone (R), Late Game Scaling",
    vectors: "Hypercarry",
    powerCurve: "Scaling via les marques. Très forte en duel mid game. Second ADC en late.",
    tags: ["Hypercarry"]
  },
  "Kled": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Hard Engage (R), Duel prolongé, Diving",
    vectors: "All-in",
    powerCurve: "Monstre d'early game. Très fort pour snowball. Moins efficace en très late.",
    tags: ["All-in"]
  },
  "Lissandra": {
    archetype: "Mage de Choc (Burst / Contrôle)",
    functions: "Anti-Assassin, Point-and-click CC, AoE Lockdown",
    vectors: "All-in",
    powerCurve: "Correcte. Pic massif en teamfight mid game. Utilité infinie en late.",
    tags: ["All-in"]
  },
  "Lucian": {
    archetype: "Tireur (Escarmoucheur)",
    functions: "Burst Combo, High Mobility (E), Lane Bully",
    vectors: "All-in",
    powerCurve: "Très fort en early/mid game. Dominant avec un support (Synergie passive).",
    tags: ["All-in"]
  },
  "Lulu": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Peeling Expert, Point-and-click CC (W), Shield Battery",
    vectors: "Hypercarry",
    powerCurve: "Forte en lane (Harass). Reine de la protection en late game.",
    tags: ["Hypercarry"]
  },
  "Milio": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Cleanse (R), Range Buffer, Healing",
    vectors: "Hypercarry",
    powerCurve: "Scaling utilitaire. Buffs et nettoyage de CC vitaux en late game.",
    tags: ["Hypercarry"]
  },
  "Mordekaiser": {
    archetype: "Combattant (Colosse)",
    functions: "Duel Isolat (R), AoE Drain-damage, Front-to-back",
    vectors: "All-in",
    powerCurve: "Fort après le niveau 6. Difficile à tuer en mid game. Dégâts de zone en late.",
    tags: ["All-in"]
  },
  "Neeko": {
    archetype: "Mage (Choc / Spécialiste)",
    functions: "Surprise AoE CC, Zoning, Trickster (Transformation)",
    vectors: "All-in / Poke",
    powerCurve: "Très forte en early. Pic massif en teamfight. Demande de la créativité.",
    tags: ["All-in", "Poke"]
  },
  "Nidalee": {
    archetype: "Mage / Tueur (Artillerie / Assassin)",
    functions: "Long Range Poke, Early Jungle Pressure, Healing",
    vectors: "Poke / All-in",
    powerCurve: "Reine de l'early game. Pic massif en mid game. Difficile en teamfight late.",
    tags: ["Poke", "All-in"]
  },
  "Nocturne": {
    archetype: "Combattant (Plongeur / Assassin)",
    functions: "Map Vision Pressure (R), Pick Potential, Diving",
    vectors: "All-in",
    powerCurve: "Fort au niveau 6. Pic massif pour les picks en mid game.",
    tags: ["All-in"]
  },
  "Nunu": {
    archetype: "Tank (Vanguard / Soutien)",
    functions: "Objective Control (Q), Ganking (W), AoE Zoning (R)",
    vectors: "All-in",
    powerCurve: "Fort en early (contrôle de carte). Sac de PV protecteur en late.",
    tags: ["All-in"]
  },
  "Ornn": {
    archetype: "Tank (Vanguard / Soutien)",
    functions: "Item Upgrading, Long Range Engage (R), Frontline CC",
    vectors: "All-in / Hypercarry",
    powerCurve: "Scaling passif (Niveaux). Monstre de stats en late game.",
    tags: ["All-in", "Hypercarry"]
  },
  "Poppy": {
    archetype: "Tank (Warden / Protecteur)",
    functions: "Anti-Dash Zone (W), Peeling (R), Wall-stun",
    vectors: "All-in",
    powerCurve: "Forte contre les compos mobiles. Utilité de peel infinie en late.",
    tags: ["All-in"]
  },
  "Qiyana": {
    archetype: "Tueur (Assassin)",
    functions: "Terrain CC (R), Invisibility (Grass), Burst",
    vectors: "All-in",
    powerCurve: "Forte au niveau 6. Reine du mid game. Sensible au placement.",
    tags: ["All-in"]
  },
  "Quinn": {
    archetype: "Tireur (Mobilité / Roamer)",
    functions: "Map Presence, Lane Bully (Top), Pick Potential",
    vectors: "Poke / All-in",
    powerCurve: "Lane bully. Pic massif en mid game pour le splitpush et les picks.",
    tags: ["Poke", "All-in"]
  },
  "Rell": {
    archetype: "Tank (Vanguard / Initiateur)",
    functions: "AoE CC Magnet (R), Armor Shred, Hard Engage",
    vectors: "All-in",
    powerCurve: "Forte en engage. Utilité maximale en teamfight groupé.",
    tags: ["All-in"]
  },
  "Renata": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Anti-AA Ultimate (R), Temporary Save (W), Disruption",
    vectors: "Hypercarry",
    powerCurve: "Scaling utilitaire. Cauchemar pour les compos basées sur l'Auto-Attaque.",
    tags: ["Hypercarry"]
  },
  "Renekton": {
    archetype: "Combattant (Plongeur / Lane Bully)",
    functions: "Early Stomper, Point-and-click CC, Tower Diving",
    vectors: "All-in",
    powerCurve: "Dieu de l'early/mid game. S'essouffle fortement en late game.",
    tags: ["All-in"]
  },
  "Riven": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Mobility Duelist, AoE CC, Burst Damage",
    vectors: "All-in",
    powerCurve: "Snowball dépendant. Très menaçante en mid/late game si en avance.",
    tags: ["All-in"]
  },
  "Sejuani": {
    archetype: "Tank (Vanguard / Initiateur)",
    functions: "Chain CC, Frontline, Early Jungle Pressure",
    vectors: "All-in",
    powerCurve: "Constante. Forte en gank. Utilité de CC inépuisable.",
    tags: ["All-in"]
  },
  "Senna": {
    archetype: "Tireur (Scaling / Enchanteur)",
    functions: "Infinite Scaling (Souls), Safe Harass, Global Protection",
    vectors: "Poke / Hypercarry",
    powerCurve: "Scaling infini. Menace de DPS à très longue distance en late.",
    tags: ["Poke", "Hypercarry"]
  },
  "Sett": {
    archetype: "Combattant (Colosse)",
    functions: "Counter-Burst (W), Frontline Engage (R), Duel",
    vectors: "All-in",
    powerCurve: "Fort en lane. Pic massif en teamfight pour l'initiation.",
    tags: ["All-in"]
  },
  "Shen": {
    archetype: "Tank (Warden / Protecteur)",
    functions: "Global Savior (R), Map Pressure, AA Blocking (W)",
    vectors: "All-in / Hypercarry",
    powerCurve: "Fort en duel early. Utilité mondiale. Protecteur vital en late.",
    tags: ["All-in", "Hypercarry"]
  },
  "Singed": {
    archetype: "Tank (Spécialiste)",
    functions: "Proxy Farm, Chaos Creation, Fling Disruption",
    vectors: "Poke / All-in",
    powerCurve: "Faible au début. Pic massif en mid game (Rylai). Cauchemar de chaos.",
    tags: ["Poke", "All-in"]
  },
  "Sion": {
    archetype: "Tank (Colosse / Spécialiste)",
    functions: "Infinite HP Scaling, Hard Engage (R), Split-push",
    vectors: "All-in",
    powerCurve: "Scaling de PV. Très difficile à tuer en late game.",
    tags: ["All-in"]
  },
  "Skarner": {
    archetype: "Tank (Vanguard / Initiateur)",
    functions: "Target Kidnapping (R), CC Lockdown, Frontline",
    vectors: "All-in",
    powerCurve: "Pic massif au niveau 6. Mur de CC et de tankiness en fin de partie.",
    tags: ["All-in"]
  },
  "Sona": {
    archetype: "Contrôleur (Enchanteur)",
    functions: "Aura Buffer, AoE CC (R), Fountain of Utility",
    vectors: "Hypercarry",
    powerCurve: "Scaling massif. Fontaine utilitaire inarrêtable en late game groupé.",
    tags: ["Hypercarry"]
  },
  "Swain": {
    archetype: "Mage (Bataille)",
    functions: "AoE Life-drain Zone, Disruption, Frontline Mage",
    vectors: "All-in / Poke",
    powerCurve: "Moyen en lane. Pic massif à 2 items. Monstre de teamfight.",
    tags: ["All-in", "Poke"]
  },
  "Sylas": {
    archetype: "Mage (Bataille / Plongeur)",
    functions: "Ultimate Steal, Sustained Magic Duel, Burst",
    vectors: "All-in",
    powerCurve: "Fort au niveau 6 (Flexibilité). Pic massif en mid game escarmouches.",
    tags: ["All-in"]
  },
  "Taliyah": {
    archetype: "Mage (Bataille / Roamer)",
    functions: "Map Control (R), Anti-Dash Zone (E), Zoning",
    vectors: "Poke / All-in",
    powerCurve: "Forte en rotations. Pic de puissance mid game.",
    tags: ["Poke", "All-in"]
  },
  "Taric": {
    archetype: "Tank (Warden / Enchanteur)",
    functions: "Global Invulnerability (R), Peeling, Reset Stun",
    vectors: "All-in / Hypercarry",
    powerCurve: "Scaling utilitaire massif. Très fort contre les compos de dive.",
    tags: ["All-in", "Hypercarry"]
  },
  "Teemo": {
    archetype: "Mage (Spécialiste)",
    functions: "Map Control (Mushrooms), Lane Bully, Psychological Warfare",
    vectors: "Poke",
    powerCurve: "Lane bully contre les mêlées. Pic massif en mid game.",
    tags: ["Poke"]
  },
  "Trundle": {
    archetype: "Combattant (Colosse)",
    functions: "Anti-Tank Ultimate, Split-push, Objective Duel",
    vectors: "All-in",
    powerCurve: "Fort en duel. Pic massif en mid game. Menace de splitpush.",
    tags: ["All-in"]
  },
  "Tryndamere": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Undying Duelist (R), Split-push, Backline Threat",
    vectors: "All-in / Hypercarry",
    powerCurve: "Scaling crit. Très fort en duel. Un cauchemar de splitpush.",
    tags: ["All-in", "Hypercarry"]
  },
  "TwistedFate": {
    archetype: "Mage (Spécialiste / Roamer)",
    functions: "Global Map Pressure (R), Point-and-click Stun, Split-push",
    vectors: "Poke / All-in",
    powerCurve: "Fort en macro. Pic massif en mid game pour le snowball.",
    tags: ["Poke", "All-in"]
  },
  "Udyr": {
    archetype: "Combattant (Colosse / Spécialiste)",
    functions: "Flexible Build (AD/AP), Skirmish Speed, Stun Spam",
    vectors: "All-in",
    powerCurve: "Fort en début/mid game. Très résistant et difficile à kite.",
    tags: ["All-in"]
  },
  "Urgot": {
    archetype: "Combattant (Colosse)",
    functions: "Single Target Execution (R), Frontline DPS, Tanky",
    vectors: "All-in",
    powerCurve: "Pic massif au niveau 9 (W infini). Très résistant en mid/late.",
    tags: ["All-in"]
  },
  "Veigar": {
    archetype: "Mage (Choc / Scaling)",
    functions: "Infinite AP Scaling, Zone Stun (E), Single Target Deletion",
    vectors: "Poke / Hypercarry",
    powerCurve: "Scaling infini. Capable de one-shot n'importe qui en late.",
    tags: ["Poke", "Hypercarry"]
  },
  "Velkoz": {
    archetype: "Mage (Artillerie)",
    functions: "True Damage Burst, Long Range Poke, Waveclear",
    vectors: "Poke",
    powerCurve: "Fort en poke. Pic massif en mid game. Très vulnérable.",
    tags: ["Poke"]
  },
  "Vex": {
    archetype: "Mage (Choc / Burst)",
    functions: "Anti-Dash Passive, Reset Execution (R), Fear Zone",
    vectors: "All-in / Poke",
    powerCurve: "Forte contre la mobilité. Pic massif en mid game.",
    tags: ["All-in", "Poke"]
  },
  "Viktor": {
    archetype: "Mage de Contrôle",
    functions: "Scaling AoE DPS, Waveclear, Zone Disruption",
    vectors: "Poke / Hypercarry",
    powerCurve: "Scaling pur. Monstre de DPS de zone et de contrôle en late.",
    tags: ["Poke", "Hypercarry"]
  },
  "Vladimir": {
    archetype: "Mage (Bataille)",
    functions: "AoE Burst, Infinite Sustain, Untargetable (W)",
    vectors: "All-in / Hypercarry",
    powerCurve: "Scaling massif. Menace de one-shot multicible ingérable en late.",
    tags: ["All-in", "Hypercarry"]
  },
  "Volibear": {
    archetype: "Combattant (Colosse / Plongeur)",
    functions: "Tower Disabling (R), Early Duelist, Frontline",
    vectors: "All-in",
    powerCurve: "Dominant en early/mid game. Menace de frontline massive.",
    tags: ["All-in"]
  },
  "Warwick": {
    archetype: "Combattant (Plongeur)",
    functions: "Skirmish King, Target Trailing, Extreme Sustain",
    vectors: "All-in",
    powerCurve: "Dieu de l'early game et du duel. Moins efficace en teamfight groupé.",
    tags: ["All-in"]
  },
  "MonkeyKing": {
    archetype: "Combattant (Plongeur)",
    functions: "Double AoE CC (R), Stealth Engage, Backline Access",
    vectors: "All-in",
    powerCurve: "Fort au niveau 6. Pic massif en teamfight mid game.",
    tags: ["All-in"]
  },
  "Xerath": {
    archetype: "Mage (Artillerie)",
    functions: "Infinite Range Poke, Sniper Execution (R), Zoning",
    vectors: "Poke",
    powerCurve: "Scaling poke. Menace de finish globale. Fragilité extrême.",
    tags: ["Poke"]
  },
  "Xayah": {
    archetype: "Tireur (Scaling / Zone)",
    functions: "Self-Peel (R), Feather Snare (E), Front-to-back",
    vectors: "All-in / Hypercarry",
    powerCurve: "Forte contre le dive. Pic massif à 3 items.",
    tags: ["All-in", "Hypercarry"]
  },
  "Yasuo": {
    archetype: "Combattant (Escarmoucheur)",
    functions: "Projectile Blocking (W), R-Followup, Mobile Duelist",
    vectors: "All-in / Hypercarry",
    powerCurve: "Scaling crit. Très fort à 2 items. Sensible au focus.",
    tags: ["All-in", "Hypercarry"]
  },
  "Yorick": {
    archetype: "Combattant (Colosse / Spécialiste)",
    functions: "Push Multi-lane, Objective Sealer, Duel",
    vectors: "Poke / All-in",
    powerCurve: "Fort après le niveau 6. Capable de finir une partie seul.",
    tags: ["Poke", "All-in"]
  },
  "Zac": {
    archetype: "Tank (Vanguard / Initiateur)",
    functions: "Extreme Range Engage, AoE Disruption, Sustain Tank",
    vectors: "All-in",
    powerCurve: "Fort en gank. Pic massif en teamfight. Immortel en late.",
    tags: ["All-in"]
  },
  "Zed": {
    archetype: "Tueur (Assassin)",
    functions: "Backline Deletion, Safe Outplay, Pick Potential",
    vectors: "All-in / Poke",
    powerCurve: "Fort au niveau 6. Reine du mid game. Difficile en late.",
    tags: ["All-in", "Poke"]
  },
  "Ziggs": {
    archetype: "Mage (Artillerie)",
    functions: "Siege / Counter-Siege, AoE Damage, Tower Execution",
    vectors: "Poke",
    powerCurve: "Reine du siège et de la défense. Pic massif en mid game.",
    tags: ["Poke"]
  },
  "Zilean": {
    archetype: "Contrôleur (Spécialiste / Enchanteur)",
    functions: "Revive (R), Double Stun (Q), Speed Control",
    vectors: "Hypercarry",
    powerCurve: "Scaling utilitaire massif. Cauchemar de late game.",
    tags: ["Hypercarry"]
  },
  "Zoe": {
    archetype: "Mage (Artillerie / Choc)",
    functions: "Long Range Pick (E), High Burst, Spell Thief",
    vectors: "Poke",
    powerCurve: "Reine du pick en early/mid game. Très forte sous vision.",
    tags: ["Poke"]
  },
  "Zyra": {
    archetype: "Mage (Zonage / Soutien)",
    functions: "Zone Denial (Plants), AoE CC (R), Lane Harass",
    vectors: "Poke / All-in",
    powerCurve: "Forte en lane. Pic massif en teamfight mid game.",
    tags: ["Poke", "All-in"]
  },

};


