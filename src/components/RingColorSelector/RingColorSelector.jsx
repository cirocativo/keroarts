import React from "react";
import "./RingColorSelector.scss";

const RING_COLORS = [
  { id: "dourado", label: "Dourado", hex: "#d4a843" },
  { id: "prateado", label: "Prateado", hex: "#b0b8c1" },
  // { id: 'rose_gold', label: 'Rose Gold', hex: '#c9736a' },
  // { id: 'preto',     label: 'Preto',     hex: '#2d2d2d' },
  // { id: 'branco',    label: 'Branco',    hex: '#f0f0f0', border: true },
  // { id: 'lilas',     label: 'Lilás',     hex: '#c9a8e8' },
  // { id: 'rosa',      label: 'Rosa',      hex: '#e8a8c4' },
  // { id: 'verde',     label: 'Verde',     hex: '#9cba8a' },
];

export default function RingColorSelector({ selected, onChange }) {
  return (
    <div className="ring-selector">
      {RING_COLORS.map((c) => (
        <button
          key={c.id}
          className={`ring-swatch ${selected === c.id ? "selected" : ""}`}
          onClick={() => onChange(c.id)}
          title={c.label}
        >
          <span
            className="ring-swatch__dot"
            style={{
              background: c.hex,
              border: c.border ? "2px solid #ccc" : "none",
            }}
          />
          <span className="ring-swatch__label">{c.label}</span>
          {selected === c.id && <span className="ring-swatch__check">✓</span>}
        </button>
      ))}
    </div>
  );
}
