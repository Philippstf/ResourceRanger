import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// AuthGuard is used to prevent users from accessing the main pages without being logged in.
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1), 
      map(user => {
        const isLoggedIn = !!user; 
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login'); 
          return false;
        }
        return true; 
      })
    );
  }
}
