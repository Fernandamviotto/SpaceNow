export class UtilComponent {
  static maxLength(e: any, len: number) {
    // stub
  }

  static isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  static adjustFileNameUpload(value: string) {
    return value.split('\\').pop();
  }
}

export interface PersonalDataModel {
  login: string;
  fullName: string;
}
