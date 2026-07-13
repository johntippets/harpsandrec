import Link from "next/link";

const navigation = [
  { href: "/#performances", label: "Performance Settings" },
  { href: "/#about-natalee", label: "About Natalee" },
  { href: "/#music-wellbeing", label: "Music & Well-Being" },
  { href: "/#request-performance", label: "Request a Performance" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link className="wordmark" href="/" aria-label="Harps and Rec home">
          Harps <span>&amp;</span> Rec
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
