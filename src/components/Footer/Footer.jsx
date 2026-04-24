import scss from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={scss.footer} data-aos="fade-up">
      <div className="container">
        <div className={scss.content}>
          <div className={scss.brandInfo} data-aos="fade-right">
            <span className={scss.logo}>Forecast</span>
            <a href="#" className={scss.copyright}>
              © 2026 Forecast. All rights reserved.
            </a>
          </div>
          <nav className={scss.nav} data-aos="fade-left">
            <a href="#" className={scss.navLink}>
              Privacy Policy
            </a>
            <a href="#" className={scss.navLink}>
              Terms of Service
            </a>
            <a href="#" className={scss.navLink}>
              API Documentation
            </a>
            <a href="#" className={scss.navLink}>
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
