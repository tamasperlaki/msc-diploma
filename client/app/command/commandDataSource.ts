import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Command } from './command';

export class CommandDataSource extends DataSource<Command> {
  constructor(private _commands: Command[]) {
    super();
  }

  connect(): Observable<Command[]> {
    return Observable.of(this._commands);
  }

  disconnect(): void {}
}
