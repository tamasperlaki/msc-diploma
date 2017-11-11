import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { IAlias } from '../../../../models/alias';
import { ICommand } from '../../../../models/command';

import { CommandAliasesService } from './command-aliases.service';
import { CommandsEditorService } from './../commands-editor/commands-editor.service';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { DeleteDialogComponent as DeleteDialog } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AliasDataSource } from './aliasDataSource';
import { CommandCommunicatorService } from './../command-communicator.service';

@Component({
  selector: 'app-command-aliases',
  templateUrl: './command-aliases.component.html',
  styleUrls: ['./command-aliases.component.scss']
})
export class CommandAliasesComponent implements OnInit {
  aliasForm: FormGroup;
  aliasDataSource: AliasDataSource;
  displayedColumns = ['name', 'command', 'actions'];
  commands: ICommand[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loadmask: LoadmaskService,
    private alertDialogService: AlertDialogService,
    private dialog: MatDialog,
    private CommandAliasesService: CommandAliasesService,
    private CommandsEditorService: CommandsEditorService,
    private CommandCommunicatorService: CommandCommunicatorService
  ) {
    this.createForm();

    this.CommandCommunicatorService.commandListChanged$.subscribe(() => {
      this.loadmask.start();
      Promise.all([
        this.CommandAliasesService.getAliases(),
        this.CommandsEditorService.getCommands()]
      )
      .then(
        response => {
          this.aliasDataSource.aliases = response[0];
          this.commands = response[1];
        },
        reason => this.alertDialogService.open('Error', reason)
      )
      .then(() => this.loadmask.stop())
      .catch(error => console.error(error));
    });
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { aliases: IAlias[], commands: ICommand[] }) => {
      this.aliasDataSource = new AliasDataSource(data.aliases);
      this.commands = data.commands;
    });
  }

  createForm() {
    this.aliasForm = this.formBuilder.group({
      name: ['', Validators.required],
      command: ['', Validators.required],
    });
  }

  onSubmit() {
    const newAlias = <IAlias>this.aliasForm.value;

    this.loadmask.start();
    this.CommandAliasesService.createAlias(newAlias)
      .then(alias => {
        this.aliasForm.reset();

        return this.CommandAliasesService.getAliases();
      })
      .then(
        aliases => this.aliasDataSource.aliases = aliases,
        reason => this.alertDialogService.open('Error', reason)
      )
      .then(() => this.loadmask.stop())
      .catch(error => console.error(error));
  }

  onAliasDelete(alias: IAlias) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        name: alias.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.loadmask.start();
      this.CommandAliasesService.deleteAlias(alias._id)
        .then(() => this.CommandAliasesService.getAliases())
        .then(aliases => this.aliasDataSource.aliases = aliases)
        .then(() => this.loadmask.stop())
        .catch(error => {
          console.error(error);
          this.alertDialogService.open('Error', error);
        });
    });
  }

}
