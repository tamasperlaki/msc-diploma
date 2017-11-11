import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { IAlias } from '../../../../models/alias';

export class AliasDataSource extends DataSource<IAlias> {
  aliasBehaviourSubject: BehaviorSubject<IAlias[]> = new BehaviorSubject<IAlias[]>([]);

  set aliases(aliases: IAlias[]) { this.aliasBehaviourSubject.next(aliases); }

  constructor(aliases: IAlias[]) {
    super();

    this.aliasBehaviourSubject.next(aliases);
  }

  connect(): Observable<IAlias[]> {
    return this.aliasBehaviourSubject;
  }

  disconnect(): void {}
}
