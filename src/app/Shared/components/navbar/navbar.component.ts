
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeBtnComponent } from "../theme-btn/theme-btn.component";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-navbar',
  imports: [ FormsModule, ThemeBtnComponent, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
}
