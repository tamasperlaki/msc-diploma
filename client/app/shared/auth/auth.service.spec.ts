import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  Response,
  ResponseOptions,
  ResponseOptionsArgs } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        AuthService
      ]
    });
  });

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));

  it('should be created', fakeAsync(inject([AuthService, XHRBackend], (authService: AuthService, backend: MockBackend) => {
    authService.getUser().then(user => console.log(user));
    mockRespond(backend, {
      body: JSON.stringify({data: {}})
    });
    tick();
  })));
});

function mockRespond(backend: MockBackend, responseOptionsArgs: ResponseOptionsArgs) {
  const response = new Response(
    new ResponseOptions(responseOptionsArgs)
  );

  backend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));
}
