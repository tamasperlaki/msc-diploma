import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { ICommand } from '../../../models/command';

export class CommandDataSource extends DataSource<ICommand> {
  commandsBehaviourSubject: BehaviorSubject<ICommand[]> = new BehaviorSubject<ICommand[]>([]);

  set commands(commands: ICommand[]) { this.commandsBehaviourSubject.next(commands); }

  constructor(commands: ICommand[]) {
    super();

    this.commandsBehaviourSubject.next(commands);
  }

  connect(): Observable<ICommand[]> {
    return this.commandsBehaviourSubject;
  }

  disconnect(): void {}
}
