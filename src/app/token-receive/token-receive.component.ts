import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {authConfig, AuthService} from '../auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-token-receive',
  templateUrl: './token-receive.component.html',
  styleUrls: ['./token-receive.component.css']
})
export class TokenReceiveComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {

    if (this.authService.hasValidAccessToken()) {
      this.router.navigate(['']);
    }

    this.route.fragment.subscribe(fragment => {
      if (fragment === null) {
        this.authService.login();
      } else {
        localStorage.setItem('access_token', new URLSearchParams(fragment).get('access_token'));
        if (localStorage.getItem('access_token') === null) {
          localStorage.removeItem('access_token');
          return;
        }
        localStorage.setItem('expires_in', new URLSearchParams(fragment).get('expires_in'));
        localStorage.setItem('token_type', new URLSearchParams(fragment).get('token_type'));
        this.setupUser().subscribe(response => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['']);
        }, error => {
          console.error(error);
        });
      }
    });
  }

  private setupUser() {
    if (this.authService.getAccessToken()) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getAccessToken()
      });
      return this.http.get(authConfig.userinfoEndpoint, {headers});
    }
  }
}
