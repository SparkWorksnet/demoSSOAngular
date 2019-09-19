import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {SecuredComponent} from './secured/secured.component';
import {OAuthGuard} from './oauth.guard';
import {IndexComponent} from './index/index.component';
import {LoggedInGuard} from './logged-in.guard';
import {LogoutSuccessComponent} from './logout-success/logout-success.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthService} from './auth.service';
import {TokenReceiveComponent} from './token-receive/token-receive.component';


@NgModule({
  declarations: [
    AppComponent,
    SecuredComponent,
    IndexComponent,
    LogoutSuccessComponent,
    NavbarComponent,
    TokenReceiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    OAuthGuard,
    LoggedInGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
