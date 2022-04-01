import ProjectGrid from "../ProjectGrid/ProjectGrid";
import "./Projects.css";

const projects = [
  {
    key: "0",
    name: "Eon Candles",
    description: "Eon Candles is a website for a candle company I built for a client. It is a single page application built with React.js and Next.js.",
    stack: ["React.js", "Next.js", "HTML5", "CSS3"],
    sourceCode: "https://github.com/dwatces/Eon",
    livePreview: "https://eoncandles.co.nz/"
  },
  {
    key: "1",
    name: "NZ Camps",
    description:
      "Explore, rate, and upload you favourite campsites around beautiful Aotearoa. A responsive web app supporting geocoding features and CRUD operations for campsites and users.",
    stack: ["Node.js", "Express.js", "MongoDB", "HTML5", "CSS3", "Bootstrap"],
    sourceCode: "https://github.com/dwatces/NZ-Camps",
    livePreview: "https://nz-camps.herokuapp.com/",
  },
  {
    key: "2",
    name: "Scenic",
    description:
      "Upload and share your favourite scenes with the world. A responsive React app supporting geocoding features, in addition to CRUD operations implemented for images and users.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "HTML5", "CSS3"],
    sourceCode: "https://github.com/dwatces/Scenic",
    livePreview: "https://scenic-16511.web.app/",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <h2 className="section_title">Projects</h2>
      <div className="projects_grid">
        {projects.map((project) => (
          <ProjectGrid project={project} key={project.key} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
