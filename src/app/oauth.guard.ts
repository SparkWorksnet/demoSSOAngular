import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OAuthGuard implements CanActivate {

  constructor(private oauthService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.oauthService.hasValidAccessToken().then(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    });
  }
}
