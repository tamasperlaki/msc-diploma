import { TestBed, inject } from '@angular/core/testing';

import { CommandAliasesService } from './command-aliases.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('CommandAliasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        CommandAliasesService
      ]
    });
  });

  it('should be created', inject([CommandAliasesService], (service: CommandAliasesService) => {
    expect(service).toBeTruthy();
  }));
});
