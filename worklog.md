---
Task ID: 1
Agent: Main
Task: Major portfolio refactor - terminal loader, 3D scene, remove pixel art, enhance terminal aesthetic

Work Log:
- Created TerminalLoader component with boot-up sequence animation (7 lines, progress bar, cursor blink)
- Rewrote Scene3D as procedural 3D background (floating wireframe shapes, grid, particles) instead of GLB models
- Rewrote HeroSection with 3D background canvas, removed pixel art images, enhanced terminal aesthetic
- Rewrote AboutSection with avatar.png profile picture, removed personal info grid (email/phone/location/linkedin/github/language), kept bio/experience/education/certifications
- Fixed "Admón" → "Admin" in experience section
- Fixed "Inglés B2" → "Inglés C1" in About and Contact sections
- Updated ProjectsSection - removed pixel art, used FolderGit2 icon, cleaner design
- Updated SkillsSection - removed pixel art, used lucide icons (Cpu, Code2, Database, Cloud, Wrench), added skill counts
- Updated ContactSection - removed pixel art, enhanced terminal form labels (const syntax), added Globe icon, fixed language to C1
- Updated globals.css - cleaned up, kept animated gradient + modern grid backgrounds
- Updated Footer - simplified, removed pixel decoration dots
- Updated page.tsx - integrated TerminalLoader with loading state
- All lint checks pass, dev server compiles without errors

Stage Summary:
- Terminal boot-up loader added (3.4s animation sequence)
- 3D procedural scene replaces GLB models (floating wireframes, grid, particles)
- All pixel art images removed from sections
- Avatar profile picture added to About section
- Personal info grid removed from About (email/LinkedIn/GitHub already in hero & contact)
- "Admin" and "C1" fixes applied throughout
- Terminal aesthetic enhanced (code-style form labels, section comments)

---
Task ID: 2
Agent: Main
Task: Enhance 3D experience - add planet, more floating shapes, 3D accents across all sections

Work Log:
- Created Accents3D.tsx with reusable components: SectionAccent3D (8 shape types), Planet3D (wireframe sphere + ring), FloatingOrbs (section backgrounds with 6 floating orbs)
- Enhanced Scene3D with 13 floating shapes (was 4) - added dodecahedron, torusKnot, tetrahedron, cone, sphere variants
- Increased particle count from 120 to 180 in hero scene
- Added 3rd point light for better scene illumination
- Replaced 🌎 emoji in Contact section with Planet3D component (wireframe globe with rotating ring)
- Added SectionAccent3D to every section header: dodecahedron (About), torusKnot (Projects), torusKnot (Skills), dodecahedron (Contact form)
- Added SectionAccent3D to sub-sections: torus (Experience), icosahedron (Education), tetrahedron (Certifications)
- Added individual 3D accents per skill card (octahedron, torus, icosahedron, dodecahedron, cone)
- Added FloatingOrbs background to About, Projects, Skills, and Contact sections
- Added hover glow effects on cards (blur-2xl radial gradients)
- Added 3D accent to Footer
- Fixed AboutSection import (removed broken dynamic import pattern)
- All lint checks pass, dev server stable

Stage Summary:
- 3D is now used extensively throughout the site (not just hero)
- Planet3D replaces emoji in Contact section
- Each section has unique floating 3D accents
- FloatingOrbs backgrounds add depth to all content sections
- 13 shapes in hero scene + 6 orbs per section + individual accents = immersive 3D experience

---
Task ID: 3
Agent: Main
Task: Add ambient sound, hide scrollbar, replace avatar, expand 3D variety, polish transitions

Work Log:
- Generated ambient-terminal.mp3 (30s loop) using ffmpeg: low-frequency sine hum (60/90/120Hz) + filtered pink noise
- Created AmbientSound component with Howler.js: mute/unmute toggle, smooth fade in/out, volume at 0.08
- Hidden scrollbar globally (html scrollbar-width: none, ::-webkit-scrollbar display: none)
- Added .scroll-area class for inner scrollable containers (Projects repos grid)
- Replaced avatar.png with avatar-new.png (uploaded user image)
- Expanded Scene3D with new shape types: FloatingDiamond (extruded rhombus), FloatingTriangle (extruded triangle), FloatingRing (thin torus), FloatingLetter (extruded AECM letters)
- Hero scene now has: 13 polyhedrons + 4 diamonds + 4 triangles + 4 rings + 4 letters (A,E,C,M) + 350 particles
- Expanded Accents3D SectionAccent3D with 14 shape types: added diamond, triangle, ring, pentagon, hexagon, cross
- Added SectionParticles (60 points) to FloatingOrbs for each content section
- Updated skill accents to new shapes: diamond (Backend), triangle (Frontend), hexagon (Databases), pentagon (Automation), cross (Tools)
- Updated About accents: diamond (header), cross (Experience), hexagon (Education), pentagon (Certifications)
- Updated Projects accent: triangle; Skills accent: ring
- Increased PixelParticles from 50→100 particles (window.innerWidth / 18)
- Polished all section transitions: blur(8px)→blur(0px) + y:40→y:0 + cubic-bezier(0.16,1,0.3,1) easing
- Applied to all section headers and inner panels (Contact info/form, About right panel)
- Fixed FontLoader error (removed unused import), removed unused GeometryFactory
- All lint checks pass, page returns 200

Stage Summary:
- Ambient terminal sound with mute/unmute toggle (bottom-right button)
- Scrollbar hidden globally, scroll-area class for inner containers
- New avatar image from user upload
- Massively expanded 3D variety: diamonds, triangles, rings, letters AECM, pentagons, hexagons, crosses
- 350 particles in hero + 60 per section + 100 CSS pixel particles
- Smooth blur+fade transitions on all sections with expo easing

---
Task ID: 4
Agent: Main
Task: Optimize 3D accent loading + update certifications with categorized list

Work Log:
- Created CSSAccent3D.tsx — lightweight CSS/SVG-based rotating wireframe shapes replacing WebGL Canvas instances
  - Supports all 14 shape types: diamond, triangle, hexagon, pentagon, cross, ring, octahedron, torus, icosahedron, dodecahedron, tetrahedron, torusKnot, cone, cylinder
  - Uses CSS perspective + rotateY animation (accent3DRotate keyframe) instead of WebGL
  - SVG wireframe rendering with dual-layer (outer + inner) shapes for 3D depth
  - Framer Motion spring entrance animation
  - Zero WebGL contexts per accent (was 1 each before)
- Added accent3DRotate CSS keyframe animation to globals.css (perspective-based 3D rotation)
- Updated SkillsSection: replaced SectionAccent3D → CSSAccent3D, dynamic import for FloatingOrbs
- Updated AboutSection: replaced SectionAccent3D → CSSAccent3D, dynamic import for FloatingOrbs
  - Added categorized certifications with collapsible accordion (CertCategory component)
  - 4 categories: Gestión/Calidad/Ágiles, Desarrollo Software, Datos/Nube/Análisis, Idiomas
  - Each category has icon, count badge, expand/collapse animation (AnimatePresence)
  - Full certification details with name + issuer
  - Total: 22 certifications across 4 categories
- Updated ProjectsSection: replaced SectionAccent3D → CSSAccent3D, dynamic import for FloatingOrbs
- Updated ContactSection: replaced SectionAccent3D → CSSAccent3D, dynamic import for Planet3D + FloatingOrbs
- WebGL context reduction: ~11 SectionAccent3D canvases eliminated (was 16+ contexts, now ~5: 1 hero + 4 section FloatingOrbs)
- All dynamic imports have loading fallback divs to prevent layout shift
- Lint passes clean, dev server compiles successfully

Stage Summary:
- 3D accent optimization: replaced 11+ WebGL Canvas contexts with CSS/SVG animations (zero cost)
- WebGL contexts reduced from ~16 to ~5 (hero scene + 4 section FloatingOrbs)
- FloatingOrbs and Planet3D now dynamically imported with SSR disabled and loading fallbacks
- Certifications reorganized into 4 collapsible categories with full details
- 22 certifications listed with name and issuer
- Performance significantly improved: no more WebGL context limit issues, faster page load
