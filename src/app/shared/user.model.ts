export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public photoURL: string,
    public highScore: number,
    public codes: Array<string>
  ) { }

  getDisplayName(): string {
    return this.displayName;
  }

  setHighScore(value: number): void {
    console.log(this.highScore + ':' + value);
    this.highScore = value;
  }

  addCode(code: string): void {
    this.codes.push(code);
  }

  getCodes(): Array<string> {
    return this.codes;
  }

};
