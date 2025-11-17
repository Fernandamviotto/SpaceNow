import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  mostrarMensagem(arg0: string) {
    throw new Error("Method not implemented.");
  }
  private dadosCompartilhados: any = {};
  closeModal: any;

  setItem(key: string, value: any): void {
    this.dadosCompartilhados[key] = value;
  }

  getItem(key: string): any {
    return this.dadosCompartilhados[key];
  }

  clear(): void {
    this.dadosCompartilhados = {};
  }
}
