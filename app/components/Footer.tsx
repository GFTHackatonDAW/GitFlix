export function Footer() {
  return (
    <footer className="footer-main">
      <div className="container-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>GitFlix</h2>
            <p>Tu plataforma de películas y series sin límites. Descubre historias increíbles hoy.</p>
            <div className="social-networks">
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#"><i className="fa-solid fa-x"></i></a>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="#peliculas">Películas</a></li>
              <li><a href="#series">Series</a></li>
              <li><a href="#originales">Originales GitFlix</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Géneros</h3>
            <ul>
              <li className="footer-services-list">Acción</li>
              <li className="footer-services-list">Comedia</li>
              <li className="footer-services-list">Drama</li>
              <li className="footer-services-list">Ciencia Ficción</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Suscripción</h3>
            <p>Disfruta de un catálogo ilimitado de películas y series. Prueba gratis 30 días.</p>
            <button
              className="inline-block font-bold py-3 px-6 rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--color-acentos)",
                color: "var(--color-texto-principal)",
              }}
            >
              Subscribirse
            </button>
          </div>
        </div>

        <div className="footer-divider-line"></div>

        <div className="footer-lower">
          <p>&copy; 2026 GitFlix. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#terminos">Términos de Uso</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
