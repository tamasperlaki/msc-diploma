import { TestBed, async, inject } from '@angular/core/testing';

import { AliasesResolverGuard } from './aliases-resolver.guard';

describe('AliasesResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AliasesResolverGuard]
    });
  });

  it('should ...', inject([AliasesResolverGuard], (guard: AliasesResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
