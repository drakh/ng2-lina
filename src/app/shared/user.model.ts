export class User {
  constructor(
    private uid: string,
    private displayName: string,
    private email: string,
    private photoURL: string
  ) { }

  getDisplayName(): string {
    return this.displayName;
  }
};
