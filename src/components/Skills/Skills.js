import "./Skills.css";

const skillGroups = [
  {
    title: "AI & Research",
    skills: ["Python", "PyTorch", "LLM & RAG integration", "Claude agent pipelines", "Qiskit", "Experiment design"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Backend & Data",
    skills: ["Node.js", "Express", "MongoDB", "EJS", "REST APIs", "Google APIs"],
  },
  {
    title: "Delivery",
    skills: ["Git", "Firebase", "Vercel", "Heroku", "Bootstrap", "Agile"],
  },
];

const Skills = () => {
  return (
    <section className="section" id="skills">
      <div className="section__header">
        <p className="eyebrow">Toolbox</p>
        <h2 className="section_title">AI first, shipped full-stack</h2>
      </div>
      <div className="skills_groups">
        {skillGroups.map((group) => (
          <section className="skills_group" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="skills_list">
              {group.skills.map((skill) => (
                <li className="skills_list-item" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Skills;
