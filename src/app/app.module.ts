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
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {ApiModule, Configuration} from 'sparkworks-cargo-client';
import {environment} from '../environments/environment';
import {LoadingComponent} from './loading/loading.component';
import { GroupsTableComponent } from './groups-table/groups-table.component';
import {DataTablesModule} from 'angular-datatables';
import {ResourcesTableComponent} from './resource-table/resources-table.component';


@NgModule({
  declarations: [
    AppComponent,
    SecuredComponent,
    IndexComponent,
    LogoutSuccessComponent,
    NavbarComponent,
    LoadingComponent,
    GroupsTableComponent,
    ResourcesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    ApiModule,
    DataTablesModule
  ],
  providers: [
    OAuthGuard,
    LoggedInGuard,
    AuthService,
    {
      provide: Configuration,
      useFactory: (oauthService: OAuthService) => new Configuration({
        basePath: environment.sparkworksapiurl,
        accessToken: oauthService.getAccessToken()
      }),
      deps: [OAuthService],
      multi: false
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
