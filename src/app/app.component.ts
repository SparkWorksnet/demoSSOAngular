import {Component, OnInit} from '@angular/core';
import {AuthConfig, OAuthErrorEvent, OAuthService} from "angular-oauth2-oidc";
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sso-demo';

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
    const authConfig: AuthConfig = new AuthConfig();
    this.oauthService.configure(authConfig);
    this.oauthService.loginUrl = 'https://sso.sparkworks.net/aa/oauth/authorize?domain=nemo';
    this.oauthService.tokenEndpoint = 'https://sso.sparkworks.net/aa/oauth/check_token';
    this.oauthService.userinfoEndpoint = 'https://sso.sparkworks.net/aa/user';
    this.oauthService.logoutUrl = 'https://sso.sparkworks.net/aa/logout';
    this.oauthService.redirectUri = environment.redirecturl;
    this.oauthService.clientId = environment.clientid;
    this.oauthService.dummyClientSecret = environment.clientsecret;
    this.oauthService.scope = 'read';
    this.oauthService.responseType = 'token';
    this.oauthService.oidc = false;
    this.oauthService.requireHttps = false;

    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    this.oauthService.setStorage(localStorage);
    console.log('#App : tryLogin');
    this.oauthService.tryLogin({});

    // prevent empty links to reload the page
    document.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && ['', '#'].indexOf(target.getAttribute('href')) > -1) {
        e.preventDefault();
      }
    });

  }

}
