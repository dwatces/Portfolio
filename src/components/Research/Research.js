import "./Research.css";

const items = [
  {
    key: "braiding",
    img: "/research/kitaev_topological_order.png",
    title: "Anyon braiding on three quantum computers",
    claim:
      "Topological order on the Kitaev honeycomb, measured on real hardware: conserved fluxes, a localized anyon, and the −1 braiding statistics — ⟨Z̄⟩ +0.845 ± 0.030 → −0.843 ± 0.035 against a +0.845 control — reproduced on ibm_marrakesh, ibm_kingston and ibm_fez with error bars.",
  },
  {
    key: "nonabelian",
    img: "/research/nonabelian_phase.png",
    title: "The non-Abelian phase, computed end to end",
    claim:
      "Kitaev + field, exactly: Chern number ±1 (analytic gap matched to 4 digits), one chiral Majorana edge mode, Majorana zero modes bound to vortices — then braided numerically. Exchanges sharing a vortex refuse to commute (Ivanov-pattern match 0.975); disjoint exchanges commute to 0.005.",
  },
  {
    key: "decoder",
    img: "/research/equiv_decoder.png",
    title: "Symmetry-tied neural decoders for quantum error correction",
    claim:
      "An ML decoder tied to the surface code's exact symmetry — at identical parameter count — wins at every training size, is ~4× more sample-efficient, and reaches the matching-decoder baseline (0.9943 vs 0.9948). Found en route: the correct group action carries a syndrome-dependent twist; naive lattice symmetry mis-ties the label.",
  },
  {
    key: "coldstart",
    img: "/research/coldstart_equivariance.png",
    title: "The equivariance law, held on real city data",
    claim:
      "Equivariant models pay exactly when the symmetry is present and data is scarce. New-station demand forecasting across five cities × two seasons: the hex-equivariant model beats the directional one in 10 of 10 city-seasons, with the gain largest where history is thinnest.",
  },
  {
    key: "qrc",
    img: "/research/qrc_equivariance.png",
    title: "Equivariant readouts for quantum machine learning",
    claim:
      "A quantum reservoir with a symmetry-tied readout (exact C3 commutation, [P,H] error = 0): large sample-efficiency gains in the scarce-data regime — the same commutant mathematics that makes equivariant quantum neural networks trainable at all.",
  },
  {
    key: "chern",
    img: "/research/haldane_chern.png",
    title: "Topological-materials ML: match the symmetry, exactly",
    claim:
      "Classifying Chern phases of the Haldane model: the physically matched C3 prior wins at every scarce size, while the too-large C6 group — broken by the mass term — underperforms it everywhere. Built-in mismatch control; the law cuts both ways.",
  },
];

const Research = () => {
  return (
    <section id="research" className="section">
      <div className="section__header">
        <p className="eyebrow">AI research</p>
        <h2 className="section_title">Measured, controlled, and run on real hardware</h2>
        <p className="section__intro">
          A self-directed research program in geometric machine learning and
          quantum computing — ~30 controlled experiments under one hard rule:
          no result recorded before its run completes. Highlights below; the
          full story is in <a href="/essay/">the essay</a>, the physics is
          playable at <a href="/anyons/">/anyons</a>, and every number has a
          log at <a href="https://github.com/dwatces" target="_blank" rel="noreferrer">github.com/dwatces</a>.
        </p>
      </div>
      <div className="research_grid">
        {items.map((it) => (
          <a className="research_card" key={it.key} href={`/research/${it.key}/`}>
            <img src={it.img} alt={it.title} loading="lazy" />
            <h3>{it.title}</h3>
            <p>{it.claim}</p>
            <span className="research_more">full result →</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Research;
