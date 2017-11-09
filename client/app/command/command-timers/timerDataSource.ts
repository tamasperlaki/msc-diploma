import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { ITimer } from '../../../../models/timer';

export class TimerDataSource extends DataSource<ITimer> {
  timerBehaviourSubject: BehaviorSubject<ITimer[]> = new BehaviorSubject<ITimer[]>([]);

  set timers(timers: ITimer[]) { this.timerBehaviourSubject.next(timers); }

  constructor(timers: ITimer[]) {
    super();

    this.timerBehaviourSubject.next(timers);
  }

  connect(): Observable<ITimer[]> {
    return this.timerBehaviourSubject;
  }

  disconnect(): void {}
}
