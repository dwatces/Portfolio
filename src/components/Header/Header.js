import "./Header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <header className="header center nav__head">
      <h3>
        <a
          onClick={
            (window.onbeforeunload = function () {
              window.scrollTo(0, 0);
            })
          }
          className="link"
        >
          Daniel Olliver
        </a>
      </h3>
      <Navbar />
    </header>
  );
};

export default Header;
