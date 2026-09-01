'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="h-8 w-8 md:h-9 md:w-9 rounded-full border-border bg-background shadow-sm transition-all duration-300 hover:scale-105 hover:bg-muted active:scale-95"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 md:h-4 md:w-4" />
      ) : (
        <Moon className="h-3.5 w-3.5 md:h-4 md:w-4" />
      )}
    </Button>
  );
}
