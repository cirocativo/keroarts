import React from "react";
import "./PlannerSelector.scss";
import { PLANNERS } from "../../data/products";

export default function PlannerSelector({ selected, onChange }) {
  const currentPlanner = selected;

  return (
    <div className="planner-selector-wrapper">
      <div className="planner-selector">
        {PLANNERS.map((p) => (
          <button
            key={p.id}
            className={`planner-card ${selected?.id === p.id ? "selected" : ""}`}
            onClick={() => onChange(p)}
            type="button"
          >
            <span className="planner-card__label">{p.label}</span>

            {selected?.id === p.id && (
              <span className="planner-card__check">✓</span>
            )}
          </button>
        ))}
      </div>

      {currentPlanner && (
        <div className="planner-preview step-wrapper">
          <div className="planner-preview__image-box">
            <img
              src={currentPlanner.image}
              alt={currentPlanner.label}
              className="planner-preview__image"
            />
          </div>

          <div className="planner-preview__info">
            <h3>{currentPlanner.label}</h3>

            <ul>
              {currentPlanner.content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
