import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommandCommunicatorService {

  private commandDeletedSource = new Subject<void>();

  commandsDeleted$ = this.commandDeletedSource.asObservable();

  onCommandDeleted() { this.commandDeletedSource.next(); }
}
