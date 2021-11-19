import "./Skills.css";

const skills = [
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "Visual Studio",
  "Git",
  "MongoDB",
  "HTML5",
  "CSS3",
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
