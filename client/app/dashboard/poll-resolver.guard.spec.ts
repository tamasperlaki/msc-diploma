import { TestBed, async, inject } from '@angular/core/testing';

import { IsPollOpenResolverGuard } from './is-poll-open-resolver.guard';

describe('IsPollOpenResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsPollOpenResolverGuard]
    });
  });

  it('should ...', inject([IsPollOpenResolverGuard], (guard: IsPollOpenResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
