export class UtilComponent {
  static formatTimeHHMM(time: string): string {
    if (!time) return "";
    return time.length >= 5 ? time.substr(0, 5) : time;
  }

  static isEmpty(obj: any): boolean {
    return (
      obj === null ||
      obj === undefined ||
      (typeof obj === "object" && Object.keys(obj).length === 0)
    );
  }
}
