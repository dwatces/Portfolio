import "./Contact.css";

const Contact = () => {
  return (
    <section className="section contact center" id="contact">
      <h2 className="section_title">Contact</h2>
      <a href="mailto:daniel@danielolliver.tech">
        <span type="button" className="btn btn-outline">
          Email Me
        </span>
      </a>
    </section>
  );
};

export default Contact;
