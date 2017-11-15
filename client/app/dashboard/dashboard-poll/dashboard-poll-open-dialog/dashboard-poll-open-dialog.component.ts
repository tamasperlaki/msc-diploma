import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-poll-open-dialog',
  templateUrl: './dashboard-poll-open-dialog.component.html',
  styleUrls: ['./dashboard-poll-open-dialog.component.scss']
})
export class DashboardPollOpenDialogComponent implements OnInit {
  pollForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.pollForm = this.formBuilder.group({
      option: ''
    });
  }

}
