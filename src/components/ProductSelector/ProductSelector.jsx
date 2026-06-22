import React from "react";
import "./ProductSelector.scss";
import { PRODUCTS } from "../../data/products";

export default function ProductSelector({ selected, onChange }) {
  return (
    <div className="product-selector">
      {PRODUCTS.map((p) => (
        <button
          key={p.id}
          className={`product-card ${selected?.id === p.id ? "selected" : ""}`}
          onClick={() => onChange(p)}
        >
          <span className="product-card__icon">{p.icon}</span>
          <span className="product-card__label">{p.label}</span>
          <span className="product-card__desc">{p.desc}</span>
          {selected?.id === p.id && (
            <span className="product-card__check">✓</span>
          )}
        </button>
      ))}
    </div>
  );
}
