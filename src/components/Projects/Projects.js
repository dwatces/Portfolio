import ProjectGrid from "../ProjectGrid/ProjectGrid";
import "./Projects.css";

const projects = [
  {
    name: "NZ Camps",
    description:
      "A website where vistors can create a user account, which is able to create, review, update, and delete campgrounds across New Zealand with Geocoding features.",
    stack: ["HTML5", "CSS3", "Node.js", "Express.js", "MongoDB"],
    sourceCode: "https://github.com/dwatces/NZ-Camps",
    livePreview: "https://nz-camps.herokuapp.com/",
  },
  {
    name: "Scenic",
    description:
      "A website where users can create an account, login, and share pictures of their favourite scenes, connected to each independent user with Geocoding map features.",
    stack: ["HTML5", "CSS3", "React.js", "Node.js", "Express.js", "MongoDB"],
    sourceCode: "..",
    livePreview: "..",
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
