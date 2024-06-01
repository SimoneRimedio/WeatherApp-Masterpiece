import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ProviderProps {
  defaultTheme?: Theme;
  children: ReactNode;
}

export const ThemeContext = createContext<ContextProps | null>(null);

export const useTheme = (): ContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');

  return context;
};

export const ThemeProvider = ({ defaultTheme = 'dark', children }: ProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : undefined;

    return (storedTheme as Theme) ?? defaultTheme;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    document.documentElement.className = theme;
  }, [theme]);

  const value: ContextProps = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
