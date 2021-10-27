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
          <a href="#projects" onClick={toggleNav} className="link nav-link">
            Projects
          </a>
        </li>
        <li className="nav__link">
          <a href="#skills" onClick={toggleNav} className="link nav-link">
            Skills
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
