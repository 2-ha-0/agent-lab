import Link from 'next/link';
import { Sparkles, Swords, Users, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: '홈', icon: Sparkles },
  { href: '/champions', label: '챔피언', icon: Users },
  { href: '/builder', label: '팀 빌더', icon: Swords },
  { href: '/agent', label: '에이전트', icon: Workflow },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_24px_rgba(168,85,247,0.35)]">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-violet-200">
              TFT SET 17
            </p>
            <p className="text-lg font-bold leading-none">Cosmic Forge</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href} className="gap-2">
                <item.icon className="size-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <Button variant="glow" asChild className="md:hidden">
          <Link href="/builder">빌더 시작</Link>
        </Button>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-border/40 px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <Button key={item.href} variant="ghost" size="sm" asChild>
            <Link href={item.href} className="gap-2">
              <item.icon className="size-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
