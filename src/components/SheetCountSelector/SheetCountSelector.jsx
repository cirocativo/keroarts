import React from "react";
import "./SheetCountSelector.scss";

export default function SheetCountSelector({
  sheetCountOptions,
  value,
  onChange,
}) {
  return (
    <div className="sheet-count-selector">
      <div className="sheet-count-selector__presets">
        {sheetCountOptions.map((n) => (
          <button
            key={n}
            className={`pill-btn ${value === n ? "selected" : ""}`}
            onClick={() => onChange(n)}
          >
            {n} folhas
          </button>
        ))}
      </div>
    </div>
  );
}
