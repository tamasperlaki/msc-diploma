import { TestBed, async, inject } from '@angular/core/testing';

import { CommandsResolverGuard } from './commands-resolver.guard';
import { CommandsEditorService } from './commands-editor/commands-editor.service';

describe('CommandsResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CommandsEditorService, useValue: {} },
        CommandsResolverGuard
      ]
    });
  });

  it('should ...', inject([CommandsResolverGuard], (guard: CommandsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
