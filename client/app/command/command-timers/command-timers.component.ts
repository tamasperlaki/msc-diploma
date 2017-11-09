import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ITimer } from '../../../../models/timer';

@Component({
  selector: 'app-command-timers',
  templateUrl: './command-timers.component.html',
  styleUrls: ['./command-timers.component.css']
})
export class CommandTimersComponent implements OnInit {
  timerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.timerForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(120)]
      ]
    });
  }

  onSubmit() {
    const newTimer = <ITimer>this.timerForm.value;
  }

}
