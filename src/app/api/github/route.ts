import { NextResponse } from "next/server";

const GITHUB_USERNAME = "owllain";

/* ── Allowlist: only these repos will be shown ──
   Add or remove names here to control what appears in the portfolio.
   Any new public repo NOT in this list will be automatically filtered out. */
const ALLOWED_REPOS = new Set([
  "GoZombie-Game-Maker-Lang",
  "My-Portfolio-2026",
  "AddContent",
  "SYSAlert",
  "Reporte_Telegestion",
  "auto-scheduler",
  "tool-expediente-asesores",
  "roadmap-2026",
  "thedarkdawn-java-game",
  "graficador-de-arboles",
]);

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

    // Filter to only allowed repos
    const filtered = repos.filter(r => ALLOWED_REPOS.has(r.name));

    // Sort by stars then by update date
    const sortedRepos = filtered.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    cachedRepos = sortedRepos;
    cacheTimestamp = now;

    return NextResponse.json(sortedRepos);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(getDemoRepos());
  }
}

function getDemoRepos(): GitHubRepo[] {
  return [
    {
      id: 1,
      name: "GoZombie-Game-Maker-Lang",
      description: "Lenguaje de programación y motor para crear juegos — compilador propio con sintaxis simplificada para desarrollo rápido de videojuegos 2D.",
      html_url: "https://github.com/owllain/GoZombie-Game-Maker-Lang",
      homepage: null,
      language: "Java",
      stargazers_count: 2,
      forks_count: 0,
      watchers_count: 1,
      topics: ["game-engine", "programming-language", "compiler", "2d"],
      created_at: "2024-04-01T00:00:00Z",
      updated_at: "2025-05-20T00:00:00Z",
    },
    {
      id: 2,
      name: "My-Portfolio-2026",
      description: "Portfolio interactivo con Next.js 16, Three.js y estética cozy/terminal. Diseño pixel art con objetos 3D y personalidad ☕🐱",
      html_url: "https://github.com/owllain/My-Portfolio-2026",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 3,
      forks_count: 0,
      watchers_count: 2,
      topics: ["nextjs", "threejs", "portfolio", "cozy"],
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },
    {
      id: 3,
      name: "AddContent",
      description: "CMS moderno estilo wiki con módulos interactivos y HTMLs personalizable. La evolución de Wikipedia para la gestión de contenido colaborativo.",
      html_url: "https://github.com/owllain/AddContent",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 1,
      forks_count: 0,
      watchers_count: 1,
      topics: ["cms", "wiki", "content-management", "typescript"],
      created_at: "2025-03-01T00:00:00Z",
      updated_at: "2025-05-01T00:00:00Z",
    },
    {
      id: 4,
      name: "SYSAlert",
      description: "Sistema de alertas bancarias con base de datos serverless. Arquitectura ligera y escalable para notificaciones financieras en tiempo real.",
      html_url: "https://github.com/owllain/SYSAlert",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 1,
      forks_count: 0,
      watchers_count: 1,
      topics: ["banking", "alerts", "serverless", "typescript"],
      created_at: "2025-02-01T00:00:00Z",
      updated_at: "2025-04-20T00:00:00Z",
    },
    {
      id: 5,
      name: "Reporte_Telegestion",
      description: "Generador de reportes SMS — procesamiento stateless en memoria, compatible con Vercel. Batch de archivos pesados con Shadcn/UI y Tailwind CSS.",
      html_url: "https://github.com/owllain/Reporte_Telegestion",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 1,
      forks_count: 0,
      watchers_count: 1,
      topics: ["nextjs", "sms", "reports", "serverless"],
      created_at: "2025-01-10T00:00:00Z",
      updated_at: "2025-05-15T00:00:00Z",
    },
    {
      id: 6,
      name: "auto-scheduler",
      description: "Generador automático de horarios basado en lista de personal. Algoritmo inteligente para asignación de turnos con React + TypeScript + Vite.",
      html_url: "https://github.com/owllain/auto-scheduler",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["scheduler", "react", "automation", "hr"],
      created_at: "2024-11-01T00:00:00Z",
      updated_at: "2025-02-15T00:00:00Z",
    },
    {
      id: 7,
      name: "tool-expediente-asesores",
      description: "Evaluación de desempeño offline-first para nuevos ingresos — firma digital biométrica, dashboard reactivo y exportación PDF. Sin BD externa.",
      html_url: "https://github.com/owllain/tool-expediente-asesores",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["offline-first", "hr", "evaluation", "digital-signature"],
      created_at: "2024-09-15T00:00:00Z",
      updated_at: "2025-03-10T00:00:00Z",
    },
    {
      id: 8,
      name: "roadmap-2026",
      description: "Vision board interactivo estilo cozy ☕ — estética Life is Strange, masonry layout con notas adhesivas, Polaroids y modo Dark Noir.",
      html_url: "https://github.com/owllain/roadmap-2026",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["vision-board", "cozy", "react", "creative"],
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-05-25T00:00:00Z",
    },
    {
      id: 9,
      name: "thedarkdawn-java-game",
      description: "Juego de aventura RPG desarrollado en Java — exploración, combate por turnos y narrativa oscura. Proyecto de game development personal.",
      html_url: "https://github.com/owllain/thedarkdawn-java-game",
      homepage: null,
      language: "Java",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["java", "rpg", "game", "adventure"],
      created_at: "2024-02-01T00:00:00Z",
      updated_at: "2024-08-15T00:00:00Z",
    },
    {
      id: 10,
      name: "graficador-de-arboles",
      description: "Herramienta de visualización e interactiva para estructuras de datos tipo árbol — recorrido, inserción y eliminación con animaciones en tiempo real.",
      html_url: "https://github.com/owllain/graficador-de-arboles",
      homepage: null,
      language: "Java",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["data-structures", "trees", "visualization", "education"],
      created_at: "2024-05-01T00:00:00Z",
      updated_at: "2024-10-20T00:00:00Z",
    },
  ];
}
