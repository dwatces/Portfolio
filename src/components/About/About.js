import "./About.css";

const About = () => {
  return (
    <div className="about center">
      <h1 className="about__name">Hey! I'm Daniel</h1>
      <h2 className="about__role">Graduate Developer</h2>
      <p className="about__desc">
        I'm a highly motivated, recent graduate of AUT. I'm passionate about
        programming to solve problems. I'm a team player, a quick learner, and
        eager to grow my skills. Below you will find some independent projects
        I've worked on since graduating to start my journey with full stack web
        development; particularly focusing on the MERN stack.
      </p>
      <div className="about__contact center">
        <a href="https://www.dropbox.com/t/C6iZPWOmh86rCnjZ">
          <span type="button" className="btn btn-outline">
            Resume
          </span>
        </a>
      </div>
    </div>
  );
};

export default About;
