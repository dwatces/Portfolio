import "./About.css";

const About = () => {
  return (
    <div className="about center">
      <h1 className="about__name">Hey! I'm Daniel</h1>
      <h2 className="about__role">Software Developer</h2>
      <p className="about__desc">
      I’m a skilled and versatile software developer passionate about creating full-stack web applications using the MERN stack and other cutting-edge technologies. With a strong foundation in agile methodologies, I excel at delivering scalable, user-focused solutions that meet client needs. I thrive on solving complex problems and am always eager to expand my knowledge of emerging technologies. Whether collaborating with a team or tackling challenges independently, I’m committed to building impactful software that makes a difference.
      </p>
      <div className="about__contact center">
        <a href="https://www.dropbox.com/scl/fi/5rpnm8ea7woz07lmmg45d/Daniel-Olliver.docx?rlkey=8s08701xo5qi5veru75wz63aa&st=xsup5mdg&dl=0">
          <span type="button" className="btn btn-outline">
            Resume
          </span>
        </a>
      </div>
    </div>
  );
};

export default About;
