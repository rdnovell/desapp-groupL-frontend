import { Injectable } from '@angular/core';
import { AuthService} from './auth.service';
import { Observable} from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginActivate implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/home']);
        }
        return true;
    }
}
