import React from "react";
import "./OrderSummary.scss";
import { calculateTotal } from "../../utils/priceHelper";

const PRODUCT_LABELS = {
  notebook: "Caderno",
  notepad: "Bloco de Notas",
  checklist: "Checklist",
  prayer_notebook: "Caderno de Oração",
  planner: "Planner",
  ring_binder: "Fichário",
};

export default function OrderSummary({ order }) {
  const {
    product,
    size,
    sheetCount,
    cover,
    wantsName,
    name,
    ringColor,
    plannerType,
    foilActivated,
    obs,
  } = order;

  const value = calculateTotal(order);

  const productLabel = plannerType
    ? plannerType.label
    : (PRODUCT_LABELS[product?.id] ?? "—");
  const coverLabel =
    cover === "upload" ? "Imagem personalizada pelo cliente" : cover;
  const rows = [
    { label: "Produto", value: productLabel, icon: "📓" },
    { label: "Tamanho", value: size ?? "—", icon: "📐" },
    {
      label: "Folhas",
      value: sheetCount ? `${sheetCount} folhas` : "—",
      icon: "📄",
    },
    { label: "Capa", value: coverLabel ?? "—", icon: "🎨" },
    {
      label: "Nome",
      value:
        wantsName === false
          ? "Sem nome"
          : name || (wantsName === true ? "A definir" : "—"),
      icon: "✍️",
    },
    {
      label: "Foil",
      value: foilActivated ? "Sim" : "Não",
      icon: "✨",
    },
    ...(product?.id === "ring_binder"
      ? [{ label: "Argolas", value: ringColor ?? "—", icon: "🔩" }]
      : []),
    ...(obs ? [{ label: "Observação", value: obs, icon: "📝" }] : []),
    { label: "Valor Total", value: `R$ ${value.toFixed(2)}`, icon: "💰" },
  ];

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">📋 Resumo do Pedido</h3>
      <ul className="order-summary__list">
        {rows.map((r) => (
          <li key={r.label} className="order-summary__item">
            <span className="order-summary__icon">{r.icon}</span>
            <span className="order-summary__label">{r.label}</span>
            <span className="order-summary__value">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
