import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  getCurrentUser(): any | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  register(user: any): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === user.email)) {
      return false;
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this.login(user);
    return true;
  }

  login(user: any): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: any) => u.email === user.email && u.password === user.password
    );

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
