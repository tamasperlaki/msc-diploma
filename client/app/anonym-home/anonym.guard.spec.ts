import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymGuard } from './anonym.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymGuard]
    });
  });

  it('should ...', inject([AnonymGuard], (guard: AnonymGuard) => {
    expect(guard).toBeTruthy();
  }));
});
