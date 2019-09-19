import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export const authConfig = {
  loginUrl: 'https://sso.sparkworks.net/aa/oauth/authorize',
  tokenEndpoint: 'https://sso.sparkworks.net/aa/oauth/check_token',
  userinfoEndpoint: 'https://sso.sparkworks.net/aa/user',
  logoutUrl: 'https://sso.sparkworks.net/aa/logout',
  redirectUri: 'http://localhost:4200/tokenReceive',
  clientId: 'client-id',
  dummyClientSecret: 'client-secret',
  scope: 'read',
  responseType: 'token',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getRedirectUri(): string {
    return authConfig.redirectUri;
  }

  setRedirectUri(redirectUri) {
    authConfig.redirectUri = redirectUri;
  }

  login() {
    const url = authConfig.loginUrl +
      '?response_type=' + authConfig.responseType +
      '&client_id=' + authConfig.clientId +
      '&scope=' + authConfig.scope +
      '&redirect_uri=' + encodeURIComponent(this.getRedirectUri());
    window.location.replace(url);
  }

  async hasValidAccessToken() {
    const accessToken = this.getAccessToken();
    if (accessToken === null) {
      return false;
    }
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        token: accessToken,
      }
    };
    return await this.http.post(authConfig.tokenEndpoint, null, options).toPromise().then(value => {
      return true;
    }).catch(reason => {
      return false;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/logoutSuccess']);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getUserAuthorities() {
    if (localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }

  getUsername() {
    if (this.getUserAuthorities() !== null) {
      return this.getUserAuthorities().name;
    }
  }

  getRoles() {
    const roles = [];
    if (this.getUserAuthorities() !== null) {
      this.getUserAuthorities().authorities.forEach(elem => {
        roles.push(elem.authority);
      });
    }
    return roles;
  }
}
