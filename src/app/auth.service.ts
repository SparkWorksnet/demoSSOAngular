import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthConfig, OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  loginUrl: 'https://sso.sparkworks.net/aa/oauth/authorize?domain=smartwork',
  tokenEndpoint: 'https://sso.sparkworks.net/aa/oauth/check_token',
  userinfoEndpoint: 'https://sso.sparkworks.net/aa/user',
  logoutUrl: 'https://sso.sparkworks.net/aa/logout',
  redirectUri: environment.redirecturl,
  clientId: environment.clientid,
  dummyClientSecret: environment.clientsecret,
  scope: 'read',
  responseType: 'token',
  oidc: false,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output()
  isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  username: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient,
              private router: Router,
              private oauthService: OAuthService
  ) {
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
      if (event.type === 'logout') {
        localStorage.clear();
        this.isLoggedIn.emit(false);
        this.router.navigate(['/logoutSuccess']);
      }
    });
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.tryLogin({});
  }

  obtainAccessToken() {
    this.oauthService.initImplicitFlow();
  }

  login() {
    this.obtainAccessToken();
  }

  hasValidAccessToken() {
    if (this.oauthService.hasValidAccessToken()) {
      this.isLoggedIn.emit(true);
      return true;
    } else {
      this.isLoggedIn.emit(false);
      return false;
    }
  }

  logout() {
    this.oauthService.logOut();
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  getUsername() {
    if (this.getUserDetails() !== null) {
      return this.getUserDetails().name;
    } else {
      return null;
    }
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('id_token_claims_obj'));
  }

  getUserAuthorities() {
    if (this.oauthService.hasValidAccessToken() && localStorage.getItem('id_token_claims_obj') === null) {
      this.oauthService.loadUserProfile().then(value => {
        this.username.emit(this.getUserDetails().name);
      }, reason => {
        console.error(reason);
      });
    }
    return JSON.parse(localStorage.getItem('id_token_claims_obj'));
  }

}
