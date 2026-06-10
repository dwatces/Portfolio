import "./About.css";
import profile from "../../assets/profile.jpg";

const About = () => {
  return (
    <section className="about" aria-labelledby="intro-title">
      <div className="about__copy">
        <p className="eyebrow">
          <span>Software Developer</span>
          <span>Auckland, NZ</span>
        </p>
        <h1 id="intro-title" className="about__name">
          Daniel Olliver builds clear, reliable web applications.
        </h1>
        <p className="about__desc">
          I work across React, Next.js, Node.js, Express, MongoDB, and TypeScript.
          My projects focus on useful full-stack workflows: accounts, media
          uploads, reviews, deployment, and interfaces people can use without
          friction. On the research side I run quantum-computing experiments on
          real IBM hardware — <a href="/essay/">the six-year story</a> and a{" "}
          <a href="/anyons/">playable demo</a> live on this site.
        </p>
        <div className="about__meta" aria-label="Profile summary">
          <span>13 public GitHub repos</span>
          <span>Available for work</span>
          <span>Full-stack JavaScript</span>
        </div>
        <div className="about__contact">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a
            href="https://github.com/dwatces"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-plain"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="about__visual" aria-label="Daniel Olliver profile">
        <img
          src={profile}
          alt="Daniel Olliver"
          className="about__avatar"
          width="288"
          height="288"
        />
        <div className="about__focus">
          <span>Current focus</span>
          React applications, API-backed products, and clean deployment handoffs.
        </div>
        <div className="about__availability">
          <span className="status-dot" aria-hidden="true" />
          Open to software developer roles
        </div>
      </div>
    </section>
  );
};

export default About;
