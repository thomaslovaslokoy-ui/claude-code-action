import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            NorwegianSpark SA | Org. 834 984 172 | norwegianspark@gmail.com | +47 99 73 74 67
          </p>
          <nav className="flex gap-4">
            <Link href="/personvern" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Personvernerklaering
            </Link>
            <Link href="/vilk%C3%A5r" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Vilk&aring;r for bruk
            </Link>
          </nav>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Affiliate-lenker er merket med &quot;Annonsoerinnhold&quot;. CoinWatch Norge er ikke finansiell r&aring;dgivning.
        </p>
      </div>
    </footer>
  );
}
