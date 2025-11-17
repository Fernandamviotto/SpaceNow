export class PersonalDataModel {
  login: string;
  fullName: string;
  constructor(login = "user", fullName = "Usuário Teste") {
    this.login = login;
    this.fullName = fullName;
  }
}
