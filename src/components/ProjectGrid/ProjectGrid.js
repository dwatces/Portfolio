import "./ProjectGrid.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LaunchIcon from "@material-ui/icons/Launch";

const ProjectGrid = ({ project }) => {
  return (
    <div className="project">
      <h3>{project.name}</h3>

      <p className="project-description">{project.description}</p>
      <ul className="project-stack">
        {project.stack.map((tech) => (
          <li className="project_stack-item"> {tech} </li>
        ))}
      </ul>
      <a
        href={project.sourceCode}
        aria-label="source code"
        className="link link-icon"
      >
        <GitHubIcon />
      </a>
      <a
        href={project.livePreview}
        aria-label="live preview website"
        className="link link-icon"
      >
        <LaunchIcon />
      </a>
    </div>
  );
};

export default ProjectGrid;
