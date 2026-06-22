import React from "react";
import "./SizeSelector.scss";
import { SIZES } from "../../data/sizes";
import { getPriceLabel } from "../../utils/priceHelper";

export default function SizeSelector({
  selectedProduct,
  selectedSize,
  onChange,
}) {
  return (
    <div className="size-selector">
      {selectedProduct?.sizeList?.map((e) => {
        const s = SIZES.find((sz) => sz.id === e);
        const price = getPriceLabel(selectedProduct, s.id);
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
              {price && (
                <p className="info-price">
                  {getPriceLabel(selectedProduct, s.id)}
                </p>
              )}
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
