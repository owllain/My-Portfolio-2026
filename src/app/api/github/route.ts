import { NextResponse } from "next/server";

const GITHUB_USERNAME = "enrique-cascante";

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
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      // Return demo data if GitHub API fails
      return NextResponse.json(getDemoRepos());
    }

    const repos: GitHubRepo[] = await response.json();

    // Sort by stars then by update date
    const sortedRepos = repos.sort((a, b) => {
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
      name: "SISREI-System",
      description: "Sistema de Registro de Estudiantes - UNED. Full Stack app with .NET backend and React frontend",
      html_url: "https://github.com/enrique-cascante/SISREI-System",
      homepage: null,
      language: "C#",
      stargazers_count: 5,
      forks_count: 2,
      watchers_count: 3,
      topics: ["dotnet", "react", "education"],
      created_at: "2025-01-15T00:00:00Z",
      updated_at: "2025-03-20T00:00:00Z",
    },
    {
      id: 2,
      name: "PowerAutomate-Workflows",
      description: "Colección de flujos de Power Automate para automatización bancaria bajo normativa SICOP",
      html_url: "https://github.com/enrique-cascante/PowerAutomate-Workflows",
      homepage: null,
      language: "PowerShell",
      stargazers_count: 3,
      forks_count: 1,
      watchers_count: 2,
      topics: ["power-automate", "automation", "banking"],
      created_at: "2024-06-01T00:00:00Z",
      updated_at: "2025-02-10T00:00:00Z",
    },
    {
      id: 3,
      name: "React-Dashboard",
      description: "Dashboard operativo con React, TanStack Query y TailwindCSS para monitoreo de KPIs",
      html_url: "https://github.com/enrique-cascante/React-Dashboard",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 4,
      forks_count: 0,
      watchers_count: 2,
      topics: ["react", "dashboard", "tailwind"],
      created_at: "2024-09-15T00:00:00Z",
      updated_at: "2025-01-05T00:00:00Z",
    },
    {
      id: 4,
      name: "APIS-REST-DotNet",
      description: "Microservicios y APIs REST con .NET Core, SQL Server y patrones de diseño",
      html_url: "https://github.com/enrique-cascante/APIS-REST-DotNet",
      homepage: null,
      language: "C#",
      stargazers_count: 7,
      forks_count: 3,
      watchers_count: 4,
      topics: ["dotnet", "rest-api", "microservices"],
      created_at: "2024-03-20T00:00:00Z",
      updated_at: "2025-04-01T00:00:00Z",
    },
    {
      id: 5,
      name: "portfolio-3d",
      description: "Portfolio interactivo con Next.js, Three.js y diseño pixel art / cozy games",
      html_url: "https://github.com/enrique-cascante/portfolio-3d",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 8,
      forks_count: 2,
      watchers_count: 5,
      topics: ["nextjs", "threejs", "portfolio"],
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-05-20T00:00:00Z",
    },
    {
      id: 6,
      name: "Oracle-MySQL-ETL",
      description: "Scripts ETL para Oracle y MySQL con generación de reportes Power BI",
      html_url: "https://github.com/enrique-cascante/Oracle-MySQL-ETL",
      homepage: null,
      language: "PLSQL",
      stargazers_count: 2,
      forks_count: 1,
      watchers_count: 1,
      topics: ["oracle", "mysql", "etl"],
      created_at: "2023-06-15T00:00:00Z",
      updated_at: "2024-11-20T00:00:00Z",
    },
  ];
}
