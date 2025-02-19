import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/themesService/theme.service';

@Component({
  selector: 'app-theme-btn',
  templateUrl: './theme-btn.component.html',
  styleUrls: ['./theme-btn.component.css']
})
export class ThemeBtnComponent implements OnInit {
  LIGHT_THEME_ICON = '/light.png';
  DARK_THEME_ICON = '/dark.png';
  icon: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.updateIcon();
  }

  private updateIcon(): void {
    this.icon = this.themeService.isDarkTheme() ? this.DARK_THEME_ICON : this.LIGHT_THEME_ICON;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateIcon();
  }
}
