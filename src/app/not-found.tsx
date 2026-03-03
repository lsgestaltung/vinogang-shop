import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center px-4">
        <span className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
          404
        </span>
        <h1 className="text-display mb-8">Lost in the Vine</h1>
        <p className="text-xl text-white/70 max-w-md mx-auto mb-12">
          Diese Seite existiert nicht. Aber keine Sorge – der Wein wartet
          woanders.
        </p>
        <Link href="/">
          <Button variant="outline-gold" size="lg">
            Zurück zur Startseite
          </Button>
        </Link>
      </div>
    </div>
  );
}
