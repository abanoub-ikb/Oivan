import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';
  private readonly DARK_THEME: Theme = 'dark';
  private readonly LIGHT_THEME: Theme = 'light';

  private currentTheme: Theme;

  constructor() {
    this.currentTheme = this.initializeTheme();
    this.applyTheme(this.currentTheme);
  };

  private initializeTheme(): Theme {
    return (localStorage.getItem(this.THEME_KEY) as Theme) || this.getSystemTheme();
  };

  private getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.DARK_THEME : this.LIGHT_THEME;
  };

  private applyTheme(theme: Theme): void {
    document.documentElement.classList.toggle(this.DARK_THEME, theme === this.DARK_THEME);
    localStorage.setItem(this.THEME_KEY, theme);
    this.currentTheme = theme;
  };

  setTheme(theme: Theme): void {
    if (theme !== this.currentTheme) {
      this.applyTheme(theme);
    }
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
    this.applyTheme(newTheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === this.DARK_THEME;
  }
}
