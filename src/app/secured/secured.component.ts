import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.css']
})
export class SecuredComponent implements OnInit {

  roles = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.roles = this.authService.getRoles();
  }
}
