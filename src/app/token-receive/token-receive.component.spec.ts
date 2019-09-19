import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TokenReceiveComponent} from './token-receive.component';

describe('TokenReceiveComponent', () => {
  let component: TokenReceiveComponent;
  let fixture: ComponentFixture<TokenReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TokenReceiveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
