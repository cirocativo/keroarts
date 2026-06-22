import { useState } from "react";
import "./CoverSelector.scss";
import { MoneyTag } from "../MoneyTag/MoneyTag";

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
    return numA - numB;
  })
  .map(([_, src], index) => ({
    id: index + 1,
    src,
    label: `Capa ${index + 1}`,
  }));

export default function CoverSelector({ selected, onChange }) {
  const [coverMode, setCoverMode] = useState(null);
  console.log("Selected cover:", selected);

  const onButtonClick = (mode) => {
    setCoverMode(mode);
    onChange(mode === "template" ? null : mode);
  };
  return (
    <div className="cover-selector">
      <div className="cover-selector__switch">
        <button
          type="button"
          className={`pill-btn ${coverMode === "upload" ? "selected" : ""}`}
          onClick={() => onButtonClick("upload")}
        >
          Enviar minha imagem
        </button>

        <button
          type="button"
          className={`pill-btn ${coverMode === "template" ? "selected" : ""}`}
          onClick={() => onButtonClick("template")}
        >
          Escolher uma capa
        </button>
      </div>
      {coverMode === "upload" && (
        <p className="cover-selector__hint">
          💡 Será necessário enviar sua imagem posteriormente por Whatsapp.
        </p>
      )}
      {coverMode === "template" && (
        <div className="cover-selector__templates step-wrapper">
          <div className="cover-grid">
            {covers.map((cover) => (
              <button
                key={cover.id}
                className={`cover-item ${selected === cover.id ? "selected" : ""}`}
                onClick={() =>
                  onChange(selected === cover.id ? null : cover.id)
                }
              >
                <div className="cover-item__preview">
                  <img src={cover.src} alt={cover.label} />
                </div>

                <span className="cover-item__label">{cover.label}</span>

                {selected === cover.id && (
                  <span className="cover-item__check">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="cover-selector__preview" hidden={!selected}>
            <img
              className="step-wrapper"
              src={covers.find((c) => c.id === selected)?.src || ""}
              alt="Preview"
              hidden={!selected}
            />
          </div>
        </div>
      )}
    </div>
  );
}
