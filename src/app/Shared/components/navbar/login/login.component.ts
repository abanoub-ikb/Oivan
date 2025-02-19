import { Component, inject } from '@angular/core';
import { UserService } from './../../../../API/user.api/user.service';
import { AuthService } from './../../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { InputComponent } from "../../../../UI-components/input/input.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, InputComponent, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  userNameErr: string | null = null;
  userPwErr: string | null = null;

  isLogged$ = this.authService.isAdmin$;
  slideDownInputs = false;
  user = {
    username: '',
    password: ''
  }


  login() {
    this.dismissErros();

    if (!this.user.username) {
      this.userNameErr = 'User Name is required'
      return
    };

    if (!this.user.password) {
      this.userPwErr = 'Password is required'
      return
    };

    this.userService.login(this.user).subscribe();
  };

  logout() {
    this.authService.logout();
    this.user = { username: '', password: '' };
    this.dismissErros();
    this.router.navigateByUrl('/');
  };

  dismissErros() {
    this.userNameErr = null;
    this.userPwErr = null;
  }

}
