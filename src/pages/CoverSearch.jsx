import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.scss";
import "./CoverSearch.scss";

const coverModules = import.meta.glob(
  "/src/assets/covers/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const covers = Object.entries(coverModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/(\d+)\./)?.[1]);
    const numB = Number(b.match(/(\d+)\./)?.[1]);
    return (numA || 0) - (numB || 0);
  })
  .map(([path, src], index) => ({
    id: index + 1,
    src,
    path,
    label: `Capa ${index + 1}`,
  }));

export const CoverSearch = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return covers;
    return covers.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.path.toLowerCase().includes(q) ||
        String(c.id).includes(q),
    );
  }, [query]);

  return (
    <div className="cover-search page-wrapper">
      <div className="cover-search__header">
        <button
          className="pill-btn selected"
          aria-label="Voltar para home"
          onClick={() => navigate("/")}
        >
          ← Voltar
        </button>
        <h1 className="intro-block__title">Buscar Capas</h1>
      </div>

      <div className="cover-search__controls">
        <input
          className="cover-search__input"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="cover-search__count">{filtered.length} capas</span>
      </div>

      <div className="cover-search__grid">
        {filtered.map((cover) => (
          <button
            key={cover.id}
            className="cover-search__item"
            onClick={() => setActive(cover)}
            aria-label={`Abrir ${cover.label}`}
          >
            <div className="cover-search__thumb">
              <img src={cover.src} alt={cover.label} />
            </div>
            <div className="cover-search__label">{cover.label}</div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="cover-search__modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="cover-search__modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cover-search__modal-close"
              onClick={() => setActive(null)}
              aria-label="Fechar"
            >
              ×
            </button>
            <img src={active.src} alt={active.label} />
            <div className="cover-search__modal-label">{active.label}</div>
          </div>
        </div>
      )}
    </div>
  );
};
