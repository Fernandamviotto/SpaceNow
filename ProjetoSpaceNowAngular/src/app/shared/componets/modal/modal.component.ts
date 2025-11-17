import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalModel } from "../../models/modal.model";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    public matDialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalModel,
    private renderer: Renderer2
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
    // adiciona backdrop manualmente
    const backdrop = this.renderer.createElement("div");
    this.renderer.addClass(backdrop, "modal-backdrop");
    this.renderer.addClass(backdrop, "fade");
    this.renderer.addClass(backdrop, "show");
    this.renderer.appendChild(document.body, backdrop);
  }

  confirm(): void {
    this.closeModal(true);
  }

  close(): void {
    this.closeModal(false);
  }

  private closeModal(result: boolean): void {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((el) => el.remove());
    this.matDialogRef.close(result);
  }
}
