import "./ProjectGrid.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LaunchIcon from "@material-ui/icons/Launch";

const ProjectGrid = ({ project }) => {
  return (
    <article className="project">
      <div className="project__header">
        <div>
          <p className={`project__status project__status--${project.statusTone}`}>
            {project.status}
          </p>
          <h3>{project.name}</h3>
        </div>
        <span className="project__status-detail">{project.statusDetail}</span>
      </div>

      <p className="project-description">{project.description}</p>

      <ul className="project-highlights" aria-label={`${project.name} highlights`}>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <ul className="project-stack">
        {project.stack.map((tech) => (
          <li className="project_stack-item" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      <div className="project-actions">
        <a
          href={project.sourceCode}
          aria-label={`${project.name} source code`}
          className="project-action"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
          <span>Code</span>
        </a>
        {project.livePreview ? (
          <a
            href={project.livePreview}
            aria-label={`${project.name} live website`}
            className="project-action project-action--primary"
            target="_blank"
            rel="noreferrer"
          >
            <LaunchIcon />
            <span>Live Site</span>
          </a>
        ) : (
          <span className="project-action project-action--disabled" aria-disabled="true">
            <LaunchIcon />
            <span>No Live Site</span>
          </span>
        )}
      </div>
    </article>
  );
};

export default ProjectGrid;
