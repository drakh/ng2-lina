import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from "@angular/common";
import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { DataService, Question } from '../shared/';
import { QuestionComponent } from '../question/';

@Component({
  moduleId: module.id,
  selector: 'lina-questions-screen',
  templateUrl: 'questions-screen.component.html',
  styleUrls: ['questions-screen.component.css'],
  directives: [RADIO_GROUP_DIRECTIVES, QuestionComponent]
})
export class QuestionsScreenComponent implements OnInit {

  response: string;
  addQuestionForm: ControlGroup;
  correctAnswer: string;

  showQuestion: boolean;
  currentQuestionIndex: number;
  currentQuestion: Question;
  questionList: Array<Question>;

  constructor(
    private _fb: FormBuilder,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.showQuestion = true;
    this.questionList = [];

    this.onGetQuestionList();

    this.addQuestionForm = this._fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required]
    });
  }

  onAddQuestionFormSubmit() {
    console.log('Submitting form.');

     this._dataService.postQuestionData(this.addQuestionForm.value)
      .subscribe(
        questionId => this.onSaveCorrectAnswer(questionId),
        error => console.error(error)
      );
  }

  onSaveCorrectAnswer(questionId: string) {
    console.log(`Sending correct answer for ${questionId}: ${this.correctAnswer}`);
    this._dataService.postCorrectAnswer(questionId, parseInt(this.correctAnswer))
      .subscribe({
        error: error => console.error(error)
      });
  }

  onAnswer(answeredCorrectly: boolean) {
    console.log(`Answered correctly: ${answeredCorrectly}`);
  }

  onGetQuestionList() {
    this._dataService.getAllQuestionsData()
      .subscribe({
        next: (question) => {
          question[1].id = question[0];
          this.questionList.push(question[1]);
        },
        complete: () => this.setCurrentQuestion(0)
      });
  }

  setCurrentQuestion(index: number) {
    this.currentQuestion = this.questionList[index];
  }

}
