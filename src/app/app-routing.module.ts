import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecuredComponent} from './secured/secured.component';
import {OAuthGuard} from './oauth.guard';
import {IndexComponent} from './index/index.component';
import {LoggedInGuard} from './logged-in.guard';
import {LogoutSuccessComponent} from './logout-success/logout-success.component';
import {TokenReceiveComponent} from './token-receive/token-receive.component';
import {LoadingComponent} from './loading/loading.component';

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [LoggedInGuard]},
  {path: 'secured', component: SecuredComponent, canActivate: [OAuthGuard]},
  {path: 'logoutSuccess', component: LogoutSuccessComponent, canActivate: [LoggedInGuard]},
  {path: 'loading', component: LoadingComponent, canActivate: [LoggedInGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
