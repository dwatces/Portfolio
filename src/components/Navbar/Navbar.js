import { useState } from "react";

import "./Navbar.css";

const Navbar = () => {
  const [showNav, setNav] = useState(false);

  const toggleNav = () => setNav(!showNav);

  return (
    <nav className="center">
      <ul style={{ display: showNav ? "flex" : null }} className="nav__list">
        <li className="nav__link">
          <a href="#projects" onclick={toggleNav} className="link nav-link">
            Projects
          </a>
        </li>
        <li className="nav__link">
          <a href="#skills" onclick={toggleNav} className="link nav-link">
            Skills
          </a>
        </li>
        <li className="nav__link">
          <a href="#contact" onclick={toggleNav} className="link nav-link">
            Contact
          </a>
        </li>
      </ul>
      {/* <button
        type="button"
        onClick={toggleNav}
        className="btn nav__hamburger"
        aria-label="toggle navigation"
      ></button> */}
    </nav>
  );
};

export default Navbar;
