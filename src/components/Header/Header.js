import "./Header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <header className="header center">
      <h3>
        <a href="#" className="link">
          Daniel Olliver
        </a>
      </h3>
      <Navbar />
    </header>
  );
};

export default Header;
