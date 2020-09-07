import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  login() {
    console.log('[LoginComponent] this.oAuthService.initImplicitFlow()');
    this.authService.obtainAccessToken();
  }

  logout() {
    this.authService.logout();
  }
}
