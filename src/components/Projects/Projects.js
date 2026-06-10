import ProjectGrid from "../ProjectGrid/ProjectGrid";
import "./Projects.css";

const projects = [
  {
    key: "hex",
    name: "Hex — Quantum Playground",
    status: "Live",
    statusTone: "live",
    statusDetail: "Runs in your browser",
    description:
      "Braid anyons in your browser on a true stabilizer simulation of a topological quantum computer — with the same experiments verified on three real IBM quantum processors, job IDs included.",
    highlights: [
      "Real Aaronson–Gottesman stabilizer engine in vanilla JS — every interaction is the actual physics",
      "Headline results validated on ibm_marrakesh, ibm_kingston and ibm_fez with error bars",
    ],
    stack: ["JavaScript", "Canvas", "Qiskit", "IBM Quantum", "Stabilizer codes"],
    sourceCode: "https://github.com/dwatces/equivariant-quantum-ml",
    livePreview: "/anyons/",
  },
  {
    key: "scenic",
    name: "Scenic",
    status: "Live shortly",
    statusTone: "soon",
    statusDetail: "Deployment coming online",
    description:
      "A full-stack image sharing app where users can register, authenticate, upload scenes, and browse community posts.",
    highlights: [
      "Firebase-hosted client with a Node, Express, and MongoDB backend",
      "Includes account flows, authorization, and backend file upload handling",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
    sourceCode: "https://github.com/dwatces/Scenic",
    livePreview: "https://scenic-b670e.web.app/",
  },
  {
    key: "nzcamps",
    name: "NZ Camps",
    status: "Live shortly",
    statusTone: "soon",
    statusDetail: "Deployment coming online",
    description:
      "A campground review platform for New Zealand with accounts, campground CRUD, reviews, and Google-powered geocoding.",
    highlights: [
      "Server-rendered Express app using EJS, MongoDB, and RESTful routes",
      "Good case study for auth, data modelling, maps, and deployment tradeoffs",
    ],
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Google APIs"],
    sourceCode: "https://github.com/dwatces/NZCamps",
    livePreview: "https://nz-camps-1890076907bb.herokuapp.com/",
  },
  {
    key: "eon",
    name: "Eon Candles",
    status: "Live",
    statusTone: "live",
    statusDetail: "Deployed on Vercel",
    description:
      "A brand and shop site for Eon, a New Zealand candle label pairing hand-poured soy candles with crystals and a calm, wellness-led identity.",
    highlights: [
      "Multi-page Next.js build spanning home, shop, and about views",
      "Responsive product layout and brand storytelling, deployed on Vercel",
    ],
    stack: ["Next.js", "React", "JavaScript", "CSS", "Vercel"],
    sourceCode: "https://github.com/dwatces/Eon",
    livePreview: "https://eon-ht82.vercel.app/",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section__header">
        <p className="eyebrow">Selected work</p>
        <h2 className="section_title">Four focused builds</h2>
        <p className="section__intro">
          Full-stack product work, client-facing presentation, practical
          account-based workflows — and quantum experiments verified on real
          hardware.
        </p>
      </div>
      <div className="projects_grid">
        {projects.map((project) => (
          <ProjectGrid project={project} key={project.key} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
