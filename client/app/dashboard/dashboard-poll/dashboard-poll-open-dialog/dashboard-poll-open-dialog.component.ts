import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { pull } from 'lodash';

@Component({
  selector: 'app-dashboard-poll-open-dialog',
  templateUrl: './dashboard-poll-open-dialog.component.html',
  styleUrls: ['./dashboard-poll-open-dialog.component.scss']
})
export class DashboardPollOpenDialogComponent implements OnInit {
  pollForm: FormGroup;
  addedOptions: string[] = [];

  constructor(public dialogRef: MatDialogRef<DashboardPollOpenDialogComponent>, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.pollForm = this.formBuilder.group({
      option: ''
    });
  }

  onOptionDelete(option: string) {
    pull(this.addedOptions, option);
  }

  addOption() {
    const option = this.pollForm.controls.option.value;

    if(!option) {
      return;
    }

    this.pollForm.controls.option.setValue('');
    this.addedOptions.push(option);
  }

  onSubmit() {
    this.dialogRef.close(this.addedOptions);
  }

}
