import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PersonalDataModel } from "src/app/models/personal-data.model";

@Injectable({
  providedIn: "root",
})
export class AppComponentService {
  // Retorna os dados pessoais (mock ou real)
  async getPersonalInfo(): Promise<PersonalDataModel> {
    if (environment.useMock) {
      // Retorna mock de dados pessoais
      return Promise.resolve(
        new PersonalDataModel("fernanda.viotto", "Fernanda Viotto")
      );
    }

    // 🔹 Caso real — substitua pela chamada de API real quando houver
    throw new Error("Método real ainda não implementado.");
  }

  // Mock de verificação de admin
  isAdmin(): boolean {
    return true;
  }

  // Mock de verificação de usuário comum
  isUser(): boolean {
    return true;
  }
}
