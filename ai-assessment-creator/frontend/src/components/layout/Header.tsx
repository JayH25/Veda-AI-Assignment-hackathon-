import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-20 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300">
      <Link href="/" className="flex items-center gap-2 font-black text-2xl text-foreground tracking-tighter hover:opacity-90 transition-opacity">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 animate-pulse">
          V
        </div>
        VedaAI
      </Link>
      
      <div className="flex items-center gap-6">
        <ThemeToggle />
      </div>
    </header>
  );
}