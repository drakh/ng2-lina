import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from "@angular/common";
import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { DataService } from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'app-questions-screen',
  templateUrl: 'questions-screen.component.html',
  styleUrls: ['questions-screen.component.css'],
  directives: [RADIO_GROUP_DIRECTIVES]
})
export class QuestionsScreenComponent implements OnInit {

  response: string;
  addQuestionForm: ControlGroup;
  correctAnswer: string;

  constructor(
    private _fb: FormBuilder,
    private _dataService: DataService
  ) {}

  ngOnInit() {

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

  onCheckAnswer(questionId: string, answer: number) {
    this._dataService.checkAnswer(questionId, answer)
    .subscribe({
      next: (result) => {
        if(result) {
          console.log('Correct answer');
        }
        else {
          console.log('NOT Correct answer');
        }
      },
      complete: () => console.log('checkAnswer complete.')
    });
  }

}
