import { NextResponse } from "next/server";

const GITHUB_USERNAME = "owllain";

/* ── Allowlist: solo estos repos se muestran ── */
const ALLOWED_REPOS = new Set([
  "VetFiles",
  "BancaNet",
  "GoZombie-Game-Maker-Lang",
  "AddContent",
  "SYSAlert",
  "Reporte_Telegestion",
  "auto-scheduler",
  "tool-expediente-asesores",
  "thedarkdawn-java-game",
  "graficador-de-arboles",
]);

/* ── Custom descriptions (override GitHub's empty ones) ── */
const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  VetFiles:
    "El sistema más completo para clínicas veterinarias 🐾 — citas, expedientes clínicos, pacientes internados, carga de archivos y facturación. Cloud-native con diseño premium y base de datos en la nube.",
  BancaNet:
    "Tu banco en una sola página 💳 — prototipo SPA con login, dashboard, transferencias, pagos y estados de cuenta. La demo que demuestra que lo financiero también puede verse increíble.",
  "GoZombie-Game-Maker-Lang":
    "Cuando los muertos codifican 🧟 — lenguaje de programación propio + motor de juegos 2D. Compilador ad-hoc con sintaxis minimalista para que crear juegos sea tan fácil como sobrevivir un apocalipsis.",
  AddContent:
    "Wikipedia reimaginada para el siglo XXI 📚 — CMS moderno con módulos interactivos, HTMLs personalizable y colaboración en tiempo real. Donde el contenido cobra vida.",
  SYSAlert:
    "Porque en la banca, cada segundo cuenta ⚡ — sistema de alertas financieras serverless. Notificaciones en tiempo real con arquitectura ligera que escala sin romper el banco (literal).",
  Reporte_Telegestion:
    "De CSV caótico a reporte impecable 📊 — generador stateless que procesa miles de registros SMS en memoria, directo a Vercel. Sin BD, sin drama, con Shadcn/UI y descarga en ZIP.",
  "auto-scheduler":
    "Adiós horarios a mano 🗓️ — algoritmo inteligente que genera turnos automáticamente desde una lista de personal. React + Vite haciendo que RRHH sonría por fin.",
  "tool-expediente-asesores":
    "Expedientes digitales sin salir de la red 🔒 — evaluación de desempeño offline-first con firma biométrica en canvas, dashboard reactivo y PDF listo para auditoría. Cero base de datos, cero dependencias.",
  "thedarkdawn-java-game":
    "La oscuridad tiene su propio código 🌑 — RPG de aventura en Java puro con combate por turnos, exploración y narrativa oscura. Donde la programación se encuentra con la fantasía.",
  "graficador-de-arboles":
    "Visualiza la estructura, entiende el algoritmo 🌳 — herramienta interactiva para estructuras de datos tipo árbol con animaciones en tiempo real. Inserción, eliminación y recorridos visibles al instante.",
};

/* ── Custom language tags (supplement GitHub's single language) ── */
const EXTRA_LANGUAGES: Record<string, string[]> = {
  VetFiles: ["React", "Tailwind CSS", "Prisma"],
  BancaNet: ["CSS", "JavaScript"],
  "GoZombie-Game-Maker-Lang": ["ANTLR", "JavaFX"],
  AddContent: ["Next.js", "Tailwind CSS"],
  SYSAlert: ["Next.js", "Tailwind CSS"],
  Reporte_Telegestion: ["Next.js", "Zustand", "ExcelJS"],
  "auto-scheduler": ["React", "Vite"],
  "tool-expediente-asesores": ["React", "Shadcn/UI", "Framer Motion"],
  "thedarkdawn-java-game": ["JavaFX", "OOP"],
  "graficador-de-arboles": ["JavaFX", "OOP"],
};

/* ── Custom sort order ── */
const SORT_ORDER: Record<string, number> = {
  VetFiles: 0,
  BancaNet: 1,
  "GoZombie-Game-Maker-Lang": 2,
  SYSAlert: 3,
  Reporte_Telegestion: 4,
  AddContent: 5,
  "tool-expediente-asesores": 6,
  "auto-scheduler": 7,
  "thedarkdawn-java-game": 8,
  "graficador-de-arboles": 9,
};

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  extra_languages?: string[];
}

// Cache repos for 5 minutes
let cachedRepos: GitHubRepo[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  try {
    const now = Date.now();
    if (cachedRepos && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedRepos);
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(getDemoRepos());
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter to only allowed repos & apply custom data
    const filtered = repos
      .filter(r => ALLOWED_REPOS.has(r.name))
      .map(r => ({
        ...r,
        description: r.description || CUSTOM_DESCRIPTIONS[r.name] || null,
        extra_languages: EXTRA_LANGUAGES[r.name] || [],
      }))
      // Sort by custom order
      .sort((a, b) => (SORT_ORDER[a.name] ?? 99) - (SORT_ORDER[b.name] ?? 99));

    cachedRepos = filtered;
    cacheTimestamp = now;

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(getDemoRepos());
  }
}

function getDemoRepos(): GitHubRepo[] {
  const names = Object.keys(CUSTOM_DESCRIPTIONS);
  return names.map((name, i) => ({
    id: i,
    name,
    description: CUSTOM_DESCRIPTIONS[name],
    html_url: `https://github.com/owllain/${name}`,
    homepage: null,
    language: name.includes("java") || name.includes("darkdawn") || name.includes("arbol") || name.includes("Zombie")
      ? "Java"
      : name === "BancaNet"
        ? "HTML"
        : "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    watchers_count: 0,
    topics: [],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2025-05-01T00:00:00Z",
    extra_languages: EXTRA_LANGUAGES[name] || [],
  }));
}
