import { TestBed, inject } from '@angular/core/testing';

import { CommandsEditorService } from './commands-editor.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('CommandEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        CommandsEditorService
      ]
    });
  });

  it('should be created', inject([CommandsEditorService], (service: CommandsEditorService) => {
    expect(service).toBeTruthy();
  }));
});
