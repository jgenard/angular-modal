import { DialogModel, DialogAction } from './../../models/dialog.model';
import { Component, OnInit, Input, EventEmitter, Output, trigger, transition, style, animate } from '@angular/core';


@Component({
  selector: 'app-modal-dialog',
  template: `
    <md-card [@dialog] *ngIf="isVisible" class="dialog">
      <md-card-header *ngIf="title">
        <md-card-title><h2>{{title}}</h2></md-card-title>
      </md-card-header>
      <md-card-content *ngIf="text">
        <p>
          {{text}}
        </p>
      </md-card-content>
      <md-card-content>
        <ng-content></ng-content>
      </md-card-content>
      <md-card-actions>
        <button md-button (click)="confirm()">Accepter</button>
        <button md-button (click)="close()">Annuler</button>
      </md-card-actions>
    </md-card>
    <div *ngIf="isVisible" class="overlay" (click)="close({fromBackdrop: true})"></div>
  `,
  styleUrls: ['./modal-dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalDialogComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;

  @Input() hasBackdrop = true;
  @Input() closableFromBackdrop = true;

  @Output() closeEmitter = new EventEmitter<void>();
  @Output() confirmEmitter = new EventEmitter<void>();

  isVisible: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isVisible = false;
  }

  public open() {
    this.isVisible = true;
  }

  private confirm() {
    this.isVisible = false;
    this.confirmEmitter.emit();
  }

  public close(option: any) {
    /**
     * If the closing call comes from the backdrop juste close the popup.
     */
    if (option != null) {
      if (this.closableFromBackdrop && option.fromBackdrop) {
        // do nothing
      } else {
        this.isVisible = false;
      }
    } else {
      this.isVisible = false;
    }

    if (!this.isVisible) {
      this.closeEmitter.emit();
    }
  }

}
