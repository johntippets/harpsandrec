const navigation = [
  { href: "#performances", label: "Performances" },
  { href: "#about-natalee", label: "About Natalee" },
  { href: "#music-wellbeing", label: "Music & Well-Being" },
  { href: "#request-information", label: "Request Information" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="wordmark" href="#main-content" aria-label="Harps and Rec home">
          Harps <span>&amp;</span> Rec
        </a>
        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
