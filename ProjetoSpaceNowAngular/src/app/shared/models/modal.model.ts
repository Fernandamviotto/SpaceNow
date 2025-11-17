export class ModalModel {
  title: string = "";
  message: string = "";
  confirmButtonText?: string;
  cancelButtonText?: string;

  constructor(init?: Partial<ModalModel>) {
    Object.assign(this, init);
  }
}
