import { TestBed, async, inject } from '@angular/core/testing';

import { AliasesResolverGuard } from './aliases-resolver.guard';
import { CommandAliasesService } from './command-aliases/command-aliases.service';

describe('AliasesResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CommandAliasesService, useValue: {} },
        AliasesResolverGuard
      ]
    });
  });

  it('should ...', inject([AliasesResolverGuard], (guard: AliasesResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
