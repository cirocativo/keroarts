import React from "react";
import "./SizeSelector.scss";
import { SIZES } from "../../data/sizes";

export default function SizeSelector({
  selectedProduct,
  selectedSize,
  onChange,
}) {
  return (
    <div className="size-selector">
      {selectedProduct?.sizeList?.map((e) => {
        const s = SIZES.find((sz) => sz.id === e);
        return (
          <button
            key={s.id}
            className={`size-card ${s.id === selectedSize ? "selected" : ""}`}
            onClick={() => onChange(s.id)}
          >
            <div className="size-card__paper" data-size={s.id}>
              <span>{s.label}</span>
            </div>
            <div className="size-card__info">
              <strong>{s.label}</strong>
              <span>{s.dimensions}</span>
              <small>{s.description}</small>
            </div>
            {selectedSize === s.id && (
              <span className="size-card__check">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
