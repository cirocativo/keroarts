import React from "react";
import "./NameSelector.scss";
import { MoneyTag } from "../MoneyTag/MoneyTag";

export default function NameSelector({
  wantsName,
  onToggle,
  name,
  onNameChange,
  foilActivated,
  onFoilChange,
}) {
  return (
    <div className="name-selector">
      <div className="name-selector__toggle-row">
        <span className="name-selector__question">
          Deseja seu nome na capa?
        </span>

        <div className="toggle-group">
          <button
            className={`toggle-btn ${wantsName === true ? "active" : ""}`}
            onClick={() => onToggle(true)}
          >
            Sim ✨
          </button>

          <button
            className={`toggle-btn ${wantsName === false ? "active-no" : ""}`}
            onClick={() => onToggle(false)}
          >
            Não
          </button>
        </div>
      </div>

      {wantsName && (
        <div className="name-selector__input-row">
          <label>Como deseja que apareça:</label>

          <input
            type="text"
            placeholder="Ex: Ana Clara, Dr. Paulo..."
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            maxLength={40}
          />

          <label className="foil-option">
            <input
              type="checkbox"
              checked={foilActivated}
              onChange={(e) => onFoilChange(e.target.checked)}
            />

            <span className="foil-option__check">✓</span>

            <div className="foil-option__content">
              <span className="foil-option__title">Nome Brilhoso (Foil)</span>

              <MoneyTag price={10} />
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
