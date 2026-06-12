import "./About.css";
import profile from "../../assets/profile.jpg";

const About = () => {
  return (
    <section className="about" aria-labelledby="intro-title">
      <div className="about__copy">
        <p className="eyebrow">
          <span>AI Engineer · Full-Stack Developer</span>
          <span>Auckland, NZ</span>
        </p>
        <h1 id="intro-title" className="about__name">
          Daniel Olliver builds AI systems that hold up to evidence.
        </h1>
        <p className="about__desc">
          I build private AI assistants, document-aware retrieval (RAG), and
          AI automation pipelines — and I validate the way a researcher does:
          my own quantum-computing experiments ran on three real IBM
          processors, with controls and error bars. Don&rsquo;t take my word
          for it — <a href="/anyons/decoder/">play against a neural network I
          trained</a>, live in your browser, or read{" "}
          <a href="/essay/">the six-year story</a>. Four years of full-stack
          delivery (React, Node, TypeScript) means the AI work doesn&rsquo;t
          stop at a prototype — it ships, with the accounts, APIs, and
          deployment around it.
        </p>
        <div className="about__meta" aria-label="Profile summary">
          <span>AI &amp; LLM integration</span>
          <span>Validated on real quantum hardware</span>
          <span>Full-stack delivery</span>
        </div>
        <div className="about__contact">
          <a href="/anyons/decoder/" className="btn btn-primary">
            Play the Error-Hunting Game
          </a>
          <a href="/essay/" className="btn btn-outline">
            Read the Essay
          </a>
          <a
            href="https://github.com/dwatces"
            target="_blank"
            rel="noreferrer"
            className="btn btn-plain"
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
          Private AI assistants and document intelligence for professional
          services — built, evaluated honestly, and put into production.
        </div>
        <div className="about__availability">
          <span className="status-dot" aria-hidden="true" />
          Taking on AI &amp; development projects
        </div>
      </div>
    </section>
  );
};

export default About;
