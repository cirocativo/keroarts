import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="app-footer">
      <p className="app-footer__tagline">
        💜 Kero Arts Papelaria – Onde a criatividade encontra propósito ✨
      </p>

      <div className="app-footer__links">
        <a
          className="app-footer__link"
          href="https://instagram.com/keroartspapelaria"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="app-footer__icon" aria-hidden="true">
            📷
          </span>
          @keroartspapelaria
        </a>

        <a
          className="app-footer__link"
          href="https://wa.me/5592982444254"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="app-footer__icon" aria-hidden="true">
            💬
          </span>
          (92) 98244-4254
        </a>

        <a
          className="app-footer__link"
          href="https://linktr.ee/keroartspapelaria"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="app-footer__icon" aria-hidden="true">
            🔗
          </span>
          linktr.ee/keroartspapelaria
        </a>
      </div>

      <p className="app-footer__copy">
        © {new Date().getFullYear()} KeroArts Papelaria. Todos os direitos
        reservados.
      </p>
    </footer>
  );
};
