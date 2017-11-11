import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommandCommunicatorService {

  private commandDeletedSource = new Subject<void>();
  private commandListChangedSource = new Subject<void>();

  commandDeleted$ = this.commandDeletedSource.asObservable();
  commandListChanged$ = this.commandListChangedSource.asObservable();

  onCommandDeleted() { this.commandDeletedSource.next(); }
  onCommandListChanged() { this.commandListChangedSource.next(); }
}
