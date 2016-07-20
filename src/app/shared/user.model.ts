export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public photoURL: string,
    public highScore: number
  ) { }

  getDisplayName(): string {
    return this.displayName;
  }

  setHighScore(value: number): void {
    this.highScore = value;
  }
};
