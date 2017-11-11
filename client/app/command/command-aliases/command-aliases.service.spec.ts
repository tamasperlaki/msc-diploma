import { TestBed, inject } from '@angular/core/testing';

import { CommandAliasesService } from './command-aliases.service';

describe('CommandAliasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandAliasesService]
    });
  });

  it('should be created', inject([CommandAliasesService], (service: CommandAliasesService) => {
    expect(service).toBeTruthy();
  }));
});
