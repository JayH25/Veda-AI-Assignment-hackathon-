import { Bell, ChevronDown, UserCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="h-20 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-xl text-xs font-bold text-muted-foreground uppercase tracking-tighter">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live Session
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <ThemeToggle />
        
        <div className="h-8 w-[1px] bg-border mx-2"></div>

        <button className="text-muted-foreground hover:text-primary relative transition-all hover:scale-110">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] text-white flex items-center justify-center font-bold rounded-full border-2 border-card">
            2
          </span>
        </button>

        <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-secondary/50 rounded-2xl cursor-pointer hover:bg-secondary transition-all group">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <UserCircle size={24} />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-black text-foreground leading-none mb-0.5">Jay Hirapara</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Admin</p>
          </div>
          <ChevronDown size={14} className="text-muted-foreground group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </header>
  );
}