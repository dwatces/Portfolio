import "./Contact.css";

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="section_title">Let&apos;s talk about the next build</h2>
        <p className="contact__copy">
          Based in Auckland and taking on AI and full-stack projects.
        </p>
      </div>
      <div className="contact__actions">
        <a href="mailto:dwatces@gmail.com" className="btn btn-primary">
          Email Me
        </a>
        <a
          href="https://github.com/dwatces"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
        >
          GitHub
        </a>
      </div>
    </section>
  );
};

export default Contact;
