import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Cpu, 
  Play, 
  Box, 
  GitBranch, 
  Sparkles, 
  Palette, 
  ArrowRight, 
  Github, 
  CheckCircle2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sun,
  Moon,
  BookOpen,
  FileText,
  Languages
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import hero3d1 from "../assets/hero-3d-1.svg";
import hero3d2 from "../assets/hero-3d-2.svg";
import hero3d3 from "../assets/hero-3d-3.svg";

type Language = 'en' | 'pt';

const translations = {
  en: {
    nav: {
      features: "Features",
      showcase: "Try it",
      howItWorks: "How it Works",
      roadmap: "Roadmap",
      startDesigning: "Open the Editor"
    },
    hero: {
      title: "Learn and practice Ladder Logic",
      subtitle: "right in your browser",
      description: "A free PLC Ladder Logic editor and simulator. Nothing to install and no vendor license: open it, build your rungs and watch the logic run.",
      ctaStart: "Open the Editor",
      ctaExamples: "Read the Docs"
    },
    features: {
      badge: "What you can do today",
      description: "A complete practice environment for PLC logic, built by an automation engineer for people learning the trade.",
      items: [
        { title: "Visual Ladder editor", desc: "Build rungs with contacts, coils, latches, one-shots, timers, counters, comparisons and math. 35 instructions, named in the Rockwell style you find in the field." },
        { title: "Built-in simulator", desc: "Run the logic instantly and see which paths are energized. No PLC required." },
        { title: "Real program structure", desc: "Continuous and periodic tasks, routines, subroutine calls and reusable function blocks." },
        { title: "Your projects stay with you", desc: "Everything runs in your browser. Projects are saved locally and can be exported and imported as JSON or XML. Git and Google Drive integrations are in progress." },
        { title: "Document as you build", desc: "Rung comments and Markdown documentation pages live inside the project, next to the logic they describe." },
        { title: "English and Portuguese", desc: "Bilingual interface, with Dark, Light and Industrial Blue themes." }
      ]
    },
    showcase: {
      title: "Try it right here",
      description: "These are live editors, not videos. Click the variables to change their values and watch the rung react.",
      demos: [
        { title: "Blank editor", desc: "An empty routine to try your own logic." },
        { title: "Motor start/stop", desc: "A classic seal-in circuit, ready to simulate." }
      ]
    },
    howItWorks: {
      title: "From first rung to",
      subtitle: "tested logic",
      badge: "For study and prototyping. It does not control real equipment.",
      diagramLabel: "Motor start/stop with seal-in",
      steps: [
        { title: "Open the editor", desc: "No account and no installation. Start from scratch or from a sample: motor control, tank filling or traffic light." },
        { title: "Declare your variables", desc: "Create the tags your logic needs: bits, numbers, timers and counters." },
        { title: "Build and simulate", desc: "Assemble the rungs and run the simulator to check the behavior scan by scan." },
        { title: "Export and share", desc: "Save the project as JSON or XML to keep it, hand it in or continue on another computer." }
      ]
    },
    cta: {
      title: "Ready to practice Ladder Logic?",
      start: "Open the Editor",
      repos: "Read the Docs"
    },
    footer: {
      tagline: "A free Ladder Logic editor and simulator for people learning industrial automation.",
      product: "Product",
      resources: "Resources",
      simulator: "Simulator",
      docs: "Documentation",
      instructions: "Instruction reference",
      builtWith: "Built with",
      forEngineers: "for the people who keep plants running",
      rights: "All rights reserved."
    },
    roadmap: {
      title: "Roadmap",
      subtitle: "Where OpenLadder is and where it is going",
      phaseLabel: "Phase",
      scopeLabel: "Scope",
      phases: [
        {
          title: "Editor and simulator",
          status: "Available",
          desc: "The foundation is online and free to use.",
          details: "Visual editor with 35 instructions, simulator, tasks and routines, function blocks, JSON and XML export, bilingual interface, and an embedded version of the editor for tutorials."
        },
        {
          title: "ControlLogix equivalence",
          status: "In progress",
          desc: "Behave like the controllers people actually meet at work.",
          details: "Reach a minimum equivalence with Rockwell ControlLogix: fill the gaps in the instruction set, align timer and counter behavior, and cover everything with automated tests."
        },
        {
          title: "Other manufacturers",
          status: "Planned",
          desc: "One tool to learn across brands.",
          details: "A compatibility table mapping each instruction to its equivalents from other manufacturers, followed by controller types inside the app, moving step by step toward international standards."
        },
        {
          title: "Open source and tutorials",
          status: "Planned",
          desc: "Open the code and teach with it.",
          details: "Publish the source code once the project reaches a stable version, along with step-by-step tutorials and videos built on the samples."
        }
      ]
    }
  },
  pt: {
    nav: {
      features: "Recursos",
      showcase: "Experimente",
      howItWorks: "Como Funciona",
      roadmap: "Roadmap",
      startDesigning: "Abrir o Editor"
    },
    hero: {
      title: "Aprenda e pratique lógica Ladder",
      subtitle: "direto no navegador",
      description: "Editor e simulador de lógica Ladder para CLP, gratuito. Sem instalação e sem licença de fabricante: abra, monte suas linhas e veja a lógica funcionando.",
      ctaStart: "Abrir o Editor",
      ctaExamples: "Ler a Documentação"
    },
    features: {
      badge: "O que você já pode fazer",
      description: "Um ambiente completo para praticar lógica de CLP, feito por um engenheiro de automação para quem está aprendendo a profissão.",
      items: [
        { title: "Editor visual de Ladder", desc: "Monte linhas com contatos, bobinas, retenção, one-shots, temporizadores, contadores, comparações e matemática. São 35 instruções, com os nomes no estilo Rockwell que você encontra em campo." },
        { title: "Simulador embutido", desc: "Rode a lógica na hora e veja quais trechos estão energizados. Não precisa de CLP." },
        { title: "Estrutura de programa real", desc: "Tarefas contínuas e periódicas, rotinas, chamadas de sub-rotina e blocos de função reutilizáveis." },
        { title: "Seus projetos ficam com você", desc: "Tudo roda no seu navegador. Os projetos são salvos localmente e podem ser exportados e importados em JSON ou XML. Integrações com Git e Google Drive estão em desenvolvimento." },
        { title: "Documente enquanto constrói", desc: "Comentários de linha e páginas de documentação em Markdown ficam dentro do projeto, ao lado da lógica que descrevem." },
        { title: "Português e inglês", desc: "Interface bilíngue, com temas Escuro, Claro e Azul Industrial." }
      ]
    },
    showcase: {
      title: "Experimente aqui mesmo",
      description: "São editores de verdade, não vídeos. Clique nas variáveis para mudar os valores e veja a linha reagir.",
      demos: [
        { title: "Editor em branco", desc: "Uma rotina vazia para testar a sua própria lógica." },
        { title: "Partida e parada de motor", desc: "O clássico circuito com selo, pronto para simular." }
      ]
    },
    howItWorks: {
      title: "Da primeira linha à",
      subtitle: "lógica testada",
      badge: "Para estudo e prototipagem. Não comanda equipamentos reais.",
      diagramLabel: "Partida e parada de motor com selo",
      steps: [
        { title: "Abra o editor", desc: "Sem cadastro e sem instalação. Comece do zero ou de um exemplo: partida de motor, enchimento de tanque ou semáforo." },
        { title: "Declare as variáveis", desc: "Crie as tags que a lógica precisa: bits, números, temporizadores e contadores." },
        { title: "Monte e simule", desc: "Construa as linhas e rode o simulador para conferir o comportamento, varredura a varredura." },
        { title: "Exporte e compartilhe", desc: "Salve o projeto em JSON ou XML para guardar, entregar ou continuar em outro computador." }
      ]
    },
    cta: {
      title: "Pronto para praticar lógica Ladder?",
      start: "Abrir o Editor",
      repos: "Ler a Documentação"
    },
    footer: {
      tagline: "Editor e simulador de lógica Ladder gratuito, para quem está aprendendo automação industrial.",
      product: "Produto",
      resources: "Recursos",
      simulator: "Simulador",
      docs: "Documentação",
      instructions: "Referência de instruções",
      builtWith: "Feito com",
      forEngineers: "para quem mantém a planta rodando",
      rights: "Todos os direitos reservados."
    },
    roadmap: {
      title: "Roadmap",
      subtitle: "Onde o OpenLadder está e para onde vai",
      phaseLabel: "Fase",
      scopeLabel: "Escopo",
      phases: [
        {
          title: "Editor e simulador",
          status: "Disponível",
          desc: "A base está no ar e é gratuita.",
          details: "Editor visual com 35 instruções, simulador, tarefas e rotinas, blocos de função, exportação em JSON e XML, interface bilíngue e uma versão embutida do editor para tutoriais."
        },
        {
          title: "Equivalência com ControlLogix",
          status: "Em andamento",
          desc: "Comportar-se como os controladores que se encontra no trabalho.",
          details: "Atingir uma equivalência mínima com o Rockwell ControlLogix: completar o conjunto de instruções, alinhar o comportamento de temporizadores e contadores e cobrir tudo com testes automáticos."
        },
        {
          title: "Outros fabricantes",
          status: "Planejado",
          desc: "Uma ferramenta para aprender em mais de uma marca.",
          details: "Uma tabela de compatibilidade relacionando cada instrução às equivalentes de outros fabricantes e, em seguida, tipos de controlador dentro do app, avançando em etapas até os padrões internacionais."
        },
        {
          title: "Código aberto e tutoriais",
          status: "Planejado",
          desc: "Abrir o código e ensinar com ele.",
          details: "Publicar o código-fonte quando o projeto atingir uma versão estável, junto com tutoriais passo a passo e vídeos baseados nos exemplos."
        }
      ]
    }
  }
};

const DOCS_URL = "https://docs.openladder.app";

// Diagrama estático de uma linha com selo, desenhado em SVG para não depender de imagem externa.
const SealInDiagram = ({ label }: { label: string }) => (
  <svg viewBox="0 0 400 400" role="img" aria-label={label} className="w-full h-full text-text-secondary">
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="40" y1="60" x2="40" y2="340" />
      <line x1="360" y1="60" x2="360" y2="340" />
      <line x1="40" y1="150" x2="95" y2="150" />
      <line x1="95" y1="130" x2="95" y2="170" />
      <line x1="115" y1="130" x2="115" y2="170" />
      <line x1="115" y1="150" x2="195" y2="150" />
      <line x1="195" y1="130" x2="195" y2="170" />
      <line x1="215" y1="130" x2="215" y2="170" />
      <line x1="192" y1="172" x2="218" y2="128" />
      <line x1="215" y1="150" x2="290" y2="150" />
      <line x1="322" y1="150" x2="360" y2="150" />
      <line x1="65" y1="150" x2="65" y2="240" />
      <line x1="65" y1="240" x2="95" y2="240" />
      <line x1="95" y1="220" x2="95" y2="260" />
      <line x1="115" y1="220" x2="115" y2="260" />
      <line x1="115" y1="240" x2="155" y2="240" />
      <line x1="155" y1="240" x2="155" y2="150" />
    </g>
    <circle cx="306" cy="150" r="16" fill="none" strokeWidth="3" className="stroke-accent" />
    <g className="fill-current font-mono" fontSize="13" textAnchor="middle">
      <text x="105" y="118">Cmd_Start</text>
      <text x="205" y="118">Cmd_Stop</text>
      <text x="306" y="118" className="fill-accent">Out_Motor</text>
      <text x="105" y="282">Out_Motor</text>
    </g>
    <text x="200" y="340" textAnchor="middle" fontSize="13" className="fill-current opacity-70">{label}</text>
  </svg>
);

const FloatingCard = ({ children, className = "", delay = 0, rotate = 0 }: { children: React.ReactNode, className?: string, delay?: number, rotate?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotateX: 0, rotateY: 0 }}
    animate={{ 
      opacity: 1, 
      y: [0, -20, 0],
      rotateX: [0, 10, 0],
      rotateY: [0, -10, 0]
    }}
    transition={{
      opacity: { duration: 0.8, delay },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut", delay }
    }}
    style={{ rotateZ: rotate, transformStyle: "preserve-3d" }}
    className={`absolute p-1 rounded-2xl bg-gradient-to-br from-industrial-800/40 to-industrial-900/40 border border-industrial-700/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${className}`}
  >
    <div className="bg-industrial-950/40 rounded-xl p-2 border border-white/5">
      {children}
    </div>
  </motion.div>
);

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, className = "", index = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    whileHover={{ y: -5 }}
    className={`p-6 rounded-2xl bg-industrial-900 border border-industrial-800 hover:border-accent/50 transition-colors group ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
      <Icon className="w-6 h-6 text-accent" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
    <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
  </motion.div>
);

const ProjectShowcase = ({ lang }: { lang: Language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[lang].showcase;
  
  const demos = [
    {
      url: "https://editor-vibe.openladder.app/?logic=eyJ2YXJpYWJsZXMiOltdLCJyb3V0aW5lcyI6W3siaWQiOiJtYWluIiwibmFtZSI6Ik1haW5Sb3V0aW5lIn1dLCJsYWRkZXJMb2dpYyI6eyJtYWluIjpbXX19",
      title: t.demos[0].title,
      description: t.demos[0].desc
    },
    {
      url: "https://editor-vibe.openladder.app/?logic=eyJ2YXJpYWJsZXMiOlt7Im5hbWUiOiJDbWRfU3RhcnQiLCJ0eXBlIjoiQk9PTCIsInNjb3BlIjoiZ2xvYmFsIiwiZGVzY3JpcHRpb24iOiIiLCJpZCI6IjliZWJiNjYxLThmNmItNGE3Ny1hMmQzLWE2YTYzN2ZiZWZjMyIsInZhbHVlIjp0cnVlfSx7Im5hbWUiOiJPdXRfTW90b3IiLCJ0eXBlIjoiQk9PTCIsInNjb3BlIjoiZ2xvYmFsIiwiZGVzY3JpcHRpb24iOiIiLCJpZCI6IjNjNjczYWYxLWY4NDUtNDkwMC1hZGRkLTFhNWMyY2JiMWMyZCIsInZhbHVlIjp0cnVlfSx7Im5hbWUiOiJDbWRfU3RvcCIsInR5cGUiOiJCT09MIiwic2NvcGUiOiJnbG9iYWwiLCJkZXNjcmlwdGlvbiI6IiIsImlkIjoiYmJlYzgwY2QtZTM1NS00YTNmLWFhNTAtMTRkMmNkMDRmYTk2IiwidmFsdWUiOmZhbHNlfV0sInJvdXRpbmVzIjpbeyJpZCI6Im1haW4iLCJuYW1lIjoiTWFpblJvdXRpbmUifV0sImxhZGRlckxvZ2ljIjp7Im1haW4iOlt7ImlkIjoiZjE5NjE3Y2UtNGQ2Zi00YWEwLWJiMTUtYzIwMDg2NjRiZGM4IiwiY29uZGl0aW9ucyI6W3siaWQiOiI2NmE1MTdlNy01NWIzLTRiYTMtODFmZi03ZGFhMDZiYzI5NjMiLCJ0eXBlIjoiQlJBTkNIIiwibGVncyI6W1t7ImlkIjoiNjZjNDYyYjItMmRiNS00ZTYyLTg2MDYtMjk3MDVjOThkOTAwIiwidHlwZSI6Ik5PX0NPTlRBQ1QiLCJ0YWdJZCI6IjliZWJiNjYxLThmNmItNGE3Ny1hMmQzLWE2YTYzN2ZiZWZjMyIsInN1YlRhZyI6IiIsInNvdXJjZUEiOiIiLCJzb3VyY2VCIjoiIiwicHJlc2V0IjowfV0sW3siaWQiOiIyMzk1ODFiMy1hM2Y3LTRiMmEtYTVmYy1jZjVlM2JmODMxOGUiLCJ0eXBlIjoiTk9fQ09OVEFDVCIsInRhZ0lkIjoiM2M2NzNhZjEtZjg0NS00OTAwLWFkZGQtMWE1YzJjYmIxYzJkIiwic3ViVGFnIjoiIiwic291cmNlQSI6IiIsInNvdXJjZUIiOiIiLCJwcmVzZXQiOjB9XV19LHsiaWQiOiI0YzI0ZGQ2YS1jYjJkLTQ1NzgtYTdhZC1lNDk4YTFiZGE1ZjEiLCJ0eXBlIjoiTkNfQ09OVEFDVCIsInRhZ0lkIjoiYmJlYzgwY2QtZTM1NS00YTNmLWFhNTAtMTRkMmNkMDRmYTk2Iiwic3ViVGFnIjoiIiwic291cmNlQSI6IiIsInNvdXJjZUIiOiIiLCJwcmVzZXQiOjB9XSwiY29pbHMiOlt7ImlkIjoiMTY5MjFiMTItNjBhZS00NTJjLWJlZmMtY2E2NDU3YzJlNDEwIiwidHlwZSI6Ik9VVFBVVF9DT0lMIiwidGFnSWQiOiIzYzY3M2FmMS1mODQ1LTQ5MDAtYWRkZC0xYTVjMmNiYjFjMmQiLCJzdWJUYWciOiIiLCJzb3VyY2VBIjoiIiwic291cmNlQiI6IiIsInByZXNldCI6MH1dfV19fQ==",
      title: t.demos[1].title,
      description: t.demos[1].desc
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % demos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + demos.length) % demos.length);

  return (
    <section id="showcase" className="py-24 bg-industrial-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-4">{t.title}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="relative group">
          <div className="relative aspect-video overflow-hidden rounded-[32px] border border-industrial-800 bg-industrial-900 shadow-2xl">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <iframe 
                src={demos[currentIndex].url} 
                title={demos[currentIndex].title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Overlay for text - moved to bottom to not block iframe interaction too much, or made smaller */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-industrial-950/90 to-transparent pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{demos[currentIndex].title}</h3>
                  <p className="text-sm lg:text-base text-slate-300 max-w-xl">{demos[currentIndex].description}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-industrial-950/50 backdrop-blur-md border border-industrial-800 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-industrial-950/50 backdrop-blur-md border border-industrial-800 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {demos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-accent' : 'w-2 bg-industrial-800 hover:bg-industrial-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<Language>(() =>
    typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  );
  const [activeSection, setActiveSection] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const t = translations[lang];

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Logo transforms
  const logoScale = useTransform(smoothY, [0, 300], [7, 1]);
  const logoTranslateY = useTransform(smoothY, [0, 300], [220, 0]);
  const logoLeft = useTransform(smoothY, [0, 300], ["15%", "0%"]);
  const logoX = useTransform(smoothY, [0, 300], ["0%", "0%"]);
  
  // Navbar background transforms
  const navBgOpacity = useTransform(smoothY, [0, 100], [0, 0.8]);
  const navBorderOpacity = useTransform(smoothY, [0, 100], [0, 1]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const sections = ["hero", "features", "showcase", "how-it-works", "roadmap"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: "features", label: t.nav.features },
    { id: "showcase", label: t.nav.showcase },
    { id: "how-it-works", label: t.nav.howItWorks },
    { id: "roadmap", label: t.nav.roadmap }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-accent/30 selection:text-accent bg-industrial-950 text-text-primary">
      {/* Navbar */}
      <motion.nav 
        style={{ 
          backgroundColor: useTransform(navBgOpacity, (o) => `rgba(11, 17, 32, ${o})`),
          borderColor: useTransform(navBorderOpacity, (o) => `rgba(31, 41, 55, ${o})`)
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-12">
              <div className="flex items-center relative">
                {/* Placeholder to maintain flex layout spacing */}
                <div className="h-16 w-48" />
                
                {/* Animated Logo */}
                <motion.div 
                  style={{ 
                    position: "absolute",
                    left: logoLeft,
                    x: logoX,
                    y: logoTranslateY,
                    scale: logoScale,
                    top: "0",
                    transformOrigin: "left center",
                    pointerEvents: "none"
                  }}
                  className="flex items-center z-[60] h-16"
                >
                  <div className="pointer-events-auto cursor-pointer" onClick={scrollToTop}>
                    <Logo withText className="h-16" />
                  </div>
                </motion.div>
              </div>

              {/* Nav Links - Moved to the left next to logo */}
              <div className="hidden md:flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.id}
                    href={`#${link.id}`} 
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      activeSection === link.id 
                        ? "text-accent" 
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center bg-industrial-900 border border-industrial-800 rounded-lg p-1 mr-2">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 text-xs font-bold rounded transition-all ${lang === 'en' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('pt')}
                  className={`px-2 py-1 text-xs font-bold rounded transition-all ${lang === 'pt' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  PT
                </button>
              </div>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-industrial-900 border border-industrial-800 text-text-secondary hover:text-text-primary transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="https://editor.openladder.app" target="_blank" rel="noopener noreferrer" className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                {t.nav.startDesigning}
              </a>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <div className="flex items-center bg-industrial-900 border border-industrial-800 rounded-lg p-1">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${lang === 'en' ? 'bg-accent text-white' : 'text-text-secondary'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('pt')}
                  className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${lang === 'pt' ? 'bg-accent text-white' : 'text-text-secondary'}`}
                >
                  PT
                </button>
              </div>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-industrial-900 border border-industrial-800 text-text-secondary hover:text-text-primary transition-all"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-text-secondary hover:text-text-primary p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-industrial-900 border-b border-industrial-800 px-4 pt-2 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  activeSection === link.id 
                    ? "text-accent" 
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="https://editor.openladder.app" target="_blank" rel="noopener noreferrer" className="block bg-accent text-white px-3 py-2 rounded-lg text-base font-semibold text-center mt-4">
              {t.nav.startDesigning}
            </a>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col">
            {/* Spacer for the large logo at scroll 0 */}
            <div className="h-[350px] lg:h-[450px]" />

            <div className="relative flex flex-col lg:flex-row items-start">
              {/* Left Side: Floating 3D Elements */}
              <div className="hidden lg:block w-1/4 relative h-[400px]">
                <FloatingCard delay={0} rotate={-8} className="top-0 -left-12 w-56">
                  <img src={hero3d1} alt="3D Logic Card" className="w-full h-auto rounded-lg" referrerPolicy="no-referrer" />
                </FloatingCard>
                
                <FloatingCard delay={0.4} rotate={12} className="top-32 left-16 w-40">
                  <img src={hero3d2} alt="3D Control Element" className="w-full h-auto rounded-lg" referrerPolicy="no-referrer" />
                </FloatingCard>

                <FloatingCard delay={0.8} rotate={-15} className="top-64 -left-4 w-52">
                  <img src={hero3d3} alt="3D Status Panel" className="w-full h-auto rounded-lg" referrerPolicy="no-referrer" />
                </FloatingCard>
              </div>

              {/* Right Side: Text Content */}
              <div className="w-full lg:w-3/4 text-right">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl lg:text-7xl font-bold text-text-primary tracking-tight mb-8 leading-[1.1]">
                    {t.hero.title} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">{t.hero.subtitle}</span>
                  </h1>
                  <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl ml-auto">
                    {t.hero.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                    <a href="https://editor.openladder.app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                      {t.hero.ctaStart}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-industrial-900 hover:bg-industrial-800 text-text-primary border border-industrial-800 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {t.hero.ctaExamples}
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-24 bg-industrial-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-4">{t.features.badge}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t.features.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: t.features.items[0].title, desc: t.features.items[0].desc, span: "md:col-span-2" },
              { icon: Play, title: t.features.items[1].title, desc: t.features.items[1].desc },
              { icon: Box, title: t.features.items[2].title, desc: t.features.items[2].desc },
              { icon: GitBranch, title: t.features.items[3].title, desc: t.features.items[3].desc, span: "md:col-span-2" },
              { icon: FileText, title: t.features.items[4].title, desc: t.features.items[4].desc, span: "md:col-span-2" },
              { icon: Languages, title: t.features.items[5].title, desc: t.features.items[5].desc }
            ].map((feature, i) => (
              <FeatureCard 
                key={i}
                index={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.desc}
                className={feature.span}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectShowcase lang={lang} />

      {/* How it Works */}
      <section id="how-it-works" className="py-24 border-y border-industrial-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-8">{t.howItWorks.title} <br /><span className="text-accent">{t.howItWorks.subtitle}</span></h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: t.howItWorks.steps[0].title, desc: t.howItWorks.steps[0].desc },
                  { step: "02", title: t.howItWorks.steps[1].title, desc: t.howItWorks.steps[1].desc },
                  { step: "03", title: t.howItWorks.steps[2].title, desc: t.howItWorks.steps[2].desc },
                  { step: "04", title: t.howItWorks.steps[3].title, desc: t.howItWorks.steps[3].desc }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-4xl font-mono font-bold text-industrial-800 group-hover:text-accent transition-colors">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-2">{item.title}</h4>
                      <p className="text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-3xl bg-industrial-900 border border-industrial-800 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 p-6">
                  <SealInDiagram label={t.howItWorks.diagramLabel} />
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-accent text-industrial-950 shadow-xl max-w-[240px]">
                <p className="text-sm font-bold leading-tight">{t.howItWorks.badge}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 bg-industrial-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-4">{t.roadmap.title}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t.roadmap.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Phases List */}
            <div className="lg:col-span-5 space-y-4">
              {t.roadmap.phases.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedPhase(i)}
                  className={`relative p-6 rounded-2xl border transition-all cursor-pointer group ${
                    selectedPhase === i 
                      ? "bg-accent/10 border-accent shadow-[0_0_20px_rgba(250,204,21,0.1)]" 
                      : "bg-industrial-900 border-industrial-800 hover:border-industrial-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`font-mono text-xs ${selectedPhase === i ? "text-accent" : "text-slate-500"}`}>
                      {t.roadmap.phaseLabel} 0{i + 1}
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedPhase === i ? "bg-accent text-industrial-950" : "bg-industrial-800 text-accent"
                    }`}>
                      {phase.status}
                    </div>
                  </div>
                  <h3 className={`text-lg font-bold transition-colors ${selectedPhase === i ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"}`}>
                    {phase.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Details Panel */}
            <div className="lg:col-span-7">
              <motion.div
                key={selectedPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-industrial-900 border border-industrial-800 p-8 lg:p-12 rounded-[32px] shadow-2xl sticky top-24"
              >
                <div className="text-accent font-mono text-sm mb-2">{t.roadmap.phaseLabel} 0{selectedPhase + 1}</div>
                <h3 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">{t.roadmap.phases[selectedPhase].title}</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-wider text-accent mb-8">
                  {t.roadmap.phases[selectedPhase].status}
                </div>
                
                <div className="space-y-6">
                  <p className="text-xl text-text-primary leading-relaxed">
                    {t.roadmap.phases[selectedPhase].desc}
                  </p>
                  <div className="p-8 rounded-2xl bg-industrial-950/50 border border-industrial-800">
                    <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">
                      {t.roadmap.scopeLabel}
                    </h4>
                    <p className="text-text-secondary leading-relaxed text-lg">
                      {t.roadmap.phases[selectedPhase].details}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-text-primary mb-8">{t.cta.title}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://editor.openladder.app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-accent/20">
              {t.cta.start}
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-transparent hover:bg-text-primary/5 text-text-primary border border-text-primary/20 px-10 py-5 rounded-2xl font-bold text-xl transition-all">
              {t.cta.repos}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-industrial-800 bg-industrial-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Logo withText className="h-8 mb-6" />
              <p className="text-slate-500 max-w-xs mb-6">
                {t.footer.tagline}
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/OpenLadder-App" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
              </div>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t.footer.product}</h6>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="https://editor.openladder.app" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Editor</a></li>
                <li><a href="#showcase" className="hover:text-accent transition-colors">{t.footer.simulator}</a></li>
                <li><a href="#roadmap" className="hover:text-accent transition-colors">{t.nav.roadmap}</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t.footer.resources}</h6>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{t.footer.docs}</a></li>
                <li><a href={`${DOCS_URL}${lang === 'en' ? '/en' : ''}/referencia/instrucoes/`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{t.footer.instructions}</a></li>
                <li><a href="https://github.com/OpenLadder-App" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-industrial-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">© 2026 OpenLadder. {t.footer.rights}</p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              {t.footer.builtWith} <Zap className="w-4 h-4 text-accent" /> {t.footer.forEngineers}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
