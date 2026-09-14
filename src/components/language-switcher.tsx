"use client";

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-md border bg-background p-1 shadow-sm">
      <Button
        type="button"
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 px-3"
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        type="button"
        variant={language === 'es' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 px-3"
        onClick={() => setLanguage('es')}
      >
        ES
      </Button>
    </div>
  );
}
