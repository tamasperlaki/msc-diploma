import { TestBed, inject } from '@angular/core/testing';

import { CommandsEditorService } from './commands-editor.service';

describe('CommandEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandsEditorService]
    });
  });

  it('should be created', inject([CommandsEditorService], (service: CommandsEditorService) => {
    expect(service).toBeTruthy();
  }));
});
