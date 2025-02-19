import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());
  token$ = this.tokenSubject.asObservable();

  isAdmin$: Observable<boolean> = this.token$.pipe(map(token => !!token));

  constructor() { }

   getTokenFromStorage(): string | null {
    try {
      return localStorage.getItem('token') || null;
    } catch (error) {
      return null;
    }
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
