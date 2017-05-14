import { TestBed, async, inject } from '@angular/core/testing';

import { CommandsResolverGuard } from './commands-resolver.guard';

describe('CommandsResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandsResolverGuard]
    });
  });

  it('should ...', inject([CommandsResolverGuard], (guard: CommandsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
