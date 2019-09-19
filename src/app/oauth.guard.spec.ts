import {inject, TestBed} from '@angular/core/testing';

import {OAuthGuard} from './oauth.guard';

describe('OauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OAuthGuard]
    });
  });

  it('should ...', inject([OAuthGuard], (guard: OAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
