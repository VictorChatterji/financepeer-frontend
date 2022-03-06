/**
 * @author Victor Neerugatti
 */
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { SensitiveService } from './services/sensitive.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private sensitive: SensitiveService,
        private router: Router
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        let currentUser: any = this.sensitive.currentUserValue;
        if (!currentUser) {
            const token = localStorage.getItem('token');
            if (token) {
                const user = localStorage.getItem('user');
                if (user) {
                    currentUser = JSON.parse(user);
                    this.sensitive.confirmUser(currentUser);
                }
            }
        }
        if (currentUser) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }

}
