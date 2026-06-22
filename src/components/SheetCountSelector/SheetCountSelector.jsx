import React from "react";
import "./SheetCountSelector.scss";
import { getPrice } from "../../utils/priceHelper";
import { MoneyTag } from "../MoneyTag/MoneyTag";
import { normalizePrice } from "../../utils/priceHelper";

const getOptionPrice = ({ productId, size, sheetCount, plannerType }) => {
  const rawPrice = getPrice({
    productId,
    size,
    sheetCount,
    plannerId: plannerType?.id,
  });
  return normalizePrice(rawPrice);
};

export default function SheetCountSelector({
  sheetCountOptions,
  value,
  onChange,
  product,
  size,
  plannerType,
}) {
  const basePrice =
    product && size
      ? Math.min(
          ...sheetCountOptions.map((n) =>
            getOptionPrice({
              productId: product.id,
              size,
              sheetCount: n,
              plannerType,
            }),
          ),
        )
      : 0;

  return (
    <div className="sheet-count-selector">
      <div className="sheet-count-selector__presets">
        {sheetCountOptions.map((n) => {
          const optionPrice = getOptionPrice({
            productId: product?.id,
            size,
            sheetCount: n,
            plannerType,
          });
          const diff = optionPrice - basePrice;

          return (
            <button
              key={n}
              className={`pill-btn ${value === n ? "selected" : ""}`}
              onClick={() => onChange(n)}
            >
              {n} folhas
              {diff > 0 && <MoneyTag price={diff} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
