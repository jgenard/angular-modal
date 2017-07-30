export class DialogModel {
  public closingAction: DialogAction;

  constructor(options: {
    closingAction: DialogAction
  }) {
    this.closingAction = options.closingAction;
  }
}

export enum DialogAction {
  Close,
  Open,
  Confirm
}
