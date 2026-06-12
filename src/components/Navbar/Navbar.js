import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import "./Navbar.css";

const Navbar = () => {
  const [showNav, setNav] = useState(false);

  const toggleNav = () => setNav(!showNav);

  return (
    <nav className="center nav">
      <ul style={{ display: showNav ? "flex" : null }} className="nav__list">
        <li className="nav__link">
          <a href="#research" className="link nav-link">
            Research
          </a>
        </li>
        <li className="nav__link">
          <a href="/essay/" className="link nav-link">
            Essay
          </a>
        </li>
        <li className="nav__link">
          <a href="/anyons/decoder/" className="link nav-link">
            Playground
          </a>
        </li>
        <li className="nav__link">
          <a href="#projects" onClick={toggleNav} className="link nav-link">
            Projects
          </a>
        </li>
        <li className="nav__link">
          <a href="#contact" onClick={toggleNav} className="link nav-link">
            Contact
          </a>
        </li>
      </ul>
      <button
        type="button"
        onClick={toggleNav}
        className="btn btn-icon nav__hamburger"
        aria-label="toggle navigation"
      >
        {showNav ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
