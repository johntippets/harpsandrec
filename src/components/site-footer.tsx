export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <p className="wordmark">Harps <span>&amp;</span> Rec</p>
          <p>harpsandrec.com</p>
        </div>
        <p>© {year} Harps &amp; Rec. Performance inquiries do not confirm availability.</p>
      </div>
    </footer>
  );
}
