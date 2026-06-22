import React, { useEffect, useState } from "react";
import "./styles/_variables.scss";
import "./styles/app.scss";

import Header from "./components/Header/Header";
import ProductSelector from "./components/ProductSelector/ProductSelector";
import SizeSelector from "./components/SizeSelector/SizeSelector";
import SheetCountSelector from "./components/SheetCountSelector/SheetCountSelector";
import CoverSelector from "./components/CoverSelector/CoverSelector";
import NameSelector from "./components/NameSelector/NameSelector";
import RingColorSelector from "./components/RingColorSelector/RingColorSelector";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import PlannerSelector from "./components/PlannerSelector/PlannerSelector";

export default function App() {
  const [order, setOrder] = useState({
    product: null,
    size: null,
    sheetCount: null,
    cover: null,
    wantsName: null,
    name: "",
    ringColor: null,
    plannerType: null,
    foilActivated: false,
    obs: "",
  });

  const update = (key, value) =>
    setOrder((prev) => ({ ...prev, [key]: value }));
  const reset = () =>
    setOrder({
      product: null,
      size: null,
      sheetCount: null,
      cover: null,
      wantsName: null,
      name: "",
      ringColor: null,
      plannerType: null,
      foilActivated: false,
      obs: "",
    });

  const isFichario = order.product?.id === "ring_binder";
  const isPlanner = order.product?.id === "planner";
  const isNotebook = order.product?.id === "notebook";

  // Steps become visible progressively
  const showSize = !!order.product;
  const showPlannerType = isPlanner && !!order.size;
  const showSheetCount = showPlannerType
    ? showPlannerType && !!order.plannerType
    : showSize && !!order.size;
  const showCover = showSheetCount && !!order.sheetCount;
  const showName = showCover && !!order.cover;
  const showRings = showName && isFichario && order.wantsName !== null;
  const showSummary =
    showName && order.wantsName !== null && (!isFichario || !!order.ringColor);
  const showObs = showSummary;

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* Intro */}
        <div className="intro-block">
          <h2 className="intro-block__title">
            Monte seu caderno dos sonhos ✨
          </h2>
          <p className="intro-block__sub">
            Preencha as opções abaixo e envie seu pedido diretamente para nossa
            atendente pelo WhatsApp!
          </p>
        </div>

        {/* Step 1 – Produto */}
        <div className="section-card step-wrapper">
          <h2 className="section-card__title">
            <span className="step-badge">1</span>
            Que tipo de personalizado você quer?
          </h2>
          <ProductSelector
            selected={order.product}
            onChange={(v) => {
              reset();
              update("product", v);
            }}
          />
        </div>

        {/* Step 2 – Tamanho */}
        {showSize && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">2</span>
              Qual o tamanho da página?
            </h2>
            <SizeSelector
              selectedProduct={order.product}
              selectedSize={order.size}
              onChange={(v) => {
                update("size", v);
                update("sheetCount", null);
              }}
            />
          </div>
        )}

        {/* Step 2.5 – Tipo de Planner */}
        {showPlannerType && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">2.5</span>
              Qual o tipo de planner?
            </h2>
            <PlannerSelector
              selected={order.plannerType}
              onChange={(v) => {
                update("plannerType", v);
                update("sheetCount", null);
                update("cover", null);
              }}
            />
          </div>
        )}

        {/* Step 3 – Folhas */}
        {showSheetCount && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">3</span>
              Quantas folhas?
            </h2>
            <SheetCountSelector
              sheetCountOptions={
                isPlanner
                  ? order.plannerType.sheetCount
                  : isNotebook
                    ? order.product.sheetCount[order.size]
                    : order.product.sheetCount
              }
              value={order.sheetCount}
              onChange={(v) => update("sheetCount", v)}
              product={order.product}
              size={order.size}
              plannerType={order.plannerType}
            />
          </div>
        )}

        {/* Step 4 – Capa */}
        {showCover && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">4</span>
              Escolha o estilo de capa
            </h2>
            <CoverSelector
              selected={order.cover}
              onChange={(v) => update("cover", v)}
            />
          </div>
        )}

        {/* Step 5 – Nome */}
        {showName && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">5</span>
              Personalização do nome
            </h2>
            <NameSelector
              wantsName={order.wantsName}
              onToggle={(v) => update("wantsName", v)}
              name={order.name}
              onNameChange={(v) => update("name", v)}
              foilActivated={order.foilActivated}
              onFoilChange={(v) => update("foilActivated", v)}
            />
          </div>
        )}

        {/* Step 6 – Argolas (só fichário) */}
        {showRings && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">6</span>
              Cor das argolas
            </h2>
            <RingColorSelector
              selected={order.ringColor}
              onChange={(v) => update("ringColor", v)}
            />
          </div>
        )}

        {/* Step 7 – Observação */}
        {showObs && (
          <div className="section-card step-wrapper">
            <h2 className="section-card__title">
              <span className="step-badge">7</span>
              Observações
            </h2>
            <textarea
              className="obs-textarea"
              placeholder="Ex: Gostaria que a capa fosse em tons pastéis, se possível."
              value={order.obs}
              onChange={(e) => update("obs", e.target.value)}
            />
          </div>
        )}

        {/* Summary + WhatsApp */}
        {showSummary && (
          <div className="step-wrapper">
            <OrderSummary order={order} />
            <div className="whatsapp-section">
              <WhatsAppButton order={order} />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>💜 KeroArts – Feito com carinho para você</p>
      </footer>
    </div>
  );
}
