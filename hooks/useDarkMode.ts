import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage<boolean>('cv4me-dark-mode', true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
