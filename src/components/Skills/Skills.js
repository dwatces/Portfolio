import "./Skills.css";

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "Visual Studio",
  "Git",
  "MongoDB",
];

const Skills = () => {
  return (
    <section className="section" id="skills">
      <h2 className="section_title">Skills</h2>
      <ul className="skills_list">
        {skills.map((skill) => (
          <li className="skills_list-item btn btn-plain">{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
