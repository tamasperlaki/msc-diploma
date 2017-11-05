import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Command } from './command';

export class CommandDataSource extends DataSource<Command> {
  commandsBehaviourSubject: BehaviorSubject<Command[]> = new BehaviorSubject<Command[]>([]);

  set commands(commands: Command[]) { this.commandsBehaviourSubject.next(commands); }

  constructor(commands: Command[]) {
    super();

    this.commandsBehaviourSubject.next(commands);
  }

  connect(): Observable<Command[]> {
    return this.commandsBehaviourSubject;
  }

  disconnect(): void {}
}
