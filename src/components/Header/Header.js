import "./Header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="header center nav__head">
      <h3>
        <button onClick={scrollToTop} className="link">
          Daniel Olliver
        </button>
      </h3>
      <Navbar />
    </header>
  );
};

export default Header;
