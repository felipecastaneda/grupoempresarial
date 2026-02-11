import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg font-headline text-foreground">
              AppIntel Hub
            </span>
          </Link>
          <nav>
            <Button asChild>
              <Link href="/login">Employee Login</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
