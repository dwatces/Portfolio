import ProjectGrid from "../ProjectGrid/ProjectGrid";
import "./Projects.css";

const projects = [
  {
    key: "scenic",
    name: "Scenic",
    status: "Live",
    statusTone: "live",
    statusDetail: "Vercel · MongoDB Atlas",
    description:
      "A full-stack image sharing app where users can register, authenticate, upload scenes, and browse community posts.",
    highlights: [
      "React client and Express/MongoDB API, both deployed serverless on Vercel",
      "Includes account flows, JWT authorization, and image upload handling",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    sourceCode: "https://github.com/dwatces/Scenic",
    livePreview: "https://scenic-app.vercel.app/",
  },
  {
    key: "nzcamps",
    name: "NZ Camps",
    status: "Live",
    statusTone: "live",
    statusDetail: "Vercel · MongoDB Atlas",
    description:
      "A campground review platform for New Zealand with accounts, campground CRUD, reviews, and location geocoding. Recently modernized (mongoose 5\u21928) and redeployed serverless.",
    highlights: [
      "Server-rendered Express app using EJS, MongoDB, and RESTful routes",
      "Good case study for auth, data modelling, maps, and deployment tradeoffs",
    ],
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Passport"],
    sourceCode: "https://github.com/dwatces/NZCamps",
    livePreview: "https://nz-camps.vercel.app/",
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
        <p className="eyebrow">Delivery record</p>
        <h2 className="section_title">Earlier full-stack work</h2>
        <p className="section__intro">
          The web-app track record behind the shipping skills: accounts, APIs,
          payments, deployment.
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
