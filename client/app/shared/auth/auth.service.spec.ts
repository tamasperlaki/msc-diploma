import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Http, ConnectionBackend } from '@angular/http';
import { RequestOptions, BaseRequestOptions } from '@angular/http';
import { Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        AuthService,
        Http
      ]
    });
  });

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));

  it('should be created', fakeAsync(inject([AuthService, MockBackend], (authService: AuthService, backend: MockBackend) => {
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
