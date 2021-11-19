import ProjectGrid from "../ProjectGrid/ProjectGrid";
import "./Projects.css";

const projects = [
  {
    name: "NZ Camps",
    description:
      "A website where vistors can create a user account, which is able to create, review, update, and delete campgrounds across New Zealand with Geocoding features.",
    stack: ["Node.js", "Express.js", "MongoDB", "HTML5", "CSS3"],
    sourceCode: "https://github.com/dwatces/NZ-Camps",
    livePreview: "https://nz-camps.herokuapp.com/",
  },
  {
    name: "Scenic",
    description:
      "A website where users can create an account, and share pictures of their favourite scenes to the community, with Geocoding map features.",
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
          <ProjectGrid project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
