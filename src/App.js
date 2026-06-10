import "./App.css";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Research from "./components/Research/Research";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <div id="top" className="theme app">
      <Header />
      <main>
        <About />
        <Research />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
