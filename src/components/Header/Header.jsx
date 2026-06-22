import React from "react";
import "./Header.scss";
import logoImg from "/src/assets/logo.jpeg";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img
            src={logoImg}
            alt="KeroArts Logo"
            className="header__logo-image"
          />
          <div className="header__brand">
            <h1>KeroArts</h1>
            <p>Papelaria personalizada</p>
          </div>
        </div>
        <div className="header__tagline">
          ✨ Onde a criatividade encontra propósito
        </div>
      </div>
    </header>
  );
}
