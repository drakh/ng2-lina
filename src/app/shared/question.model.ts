export class Question {
  constructor(
    public id: string,
    public question: string,
    public answer1: string,
    public answer2: string,
    public answer3: string,
    public answer4: string,
    public timesFailed: number
  ) { }
};
