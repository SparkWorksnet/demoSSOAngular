import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (localStorage.getItem('nonce') !== null && localStorage.getItem('access_token') === null) {
          this.oauthService.initImplicitFlow();
        } else if (localStorage.getItem('nonce') !== null && localStorage.getItem('access_token') !== null) {
          this.router.navigate(['/secured']);
        } else if (localStorage.getItem('nonce') === null && localStorage.getItem('access_token') === null) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  ngOnInit() {
  }

}
