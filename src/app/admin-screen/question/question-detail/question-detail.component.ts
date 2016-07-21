import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Control, ControlGroup, Validators } from "@angular/common";
import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { Question, DataService } from '../../../shared';

@Component({
	moduleId: module.id,
	selector: 'lina-question-detail',
	templateUrl: 'question-detail.component.html',
	styleUrls: ['question-detail.component.css'],
	directives: [RADIO_GROUP_DIRECTIVES]
})
export class QuestionDetailComponent implements OnInit {
	private question: Question;
	private questionId: string;
	private editQuestionForm: ControlGroup;
	private questionControl = new Control('', Validators.required);
	private answer1Control = new Control('', Validators.required);
	private answer2Control = new Control('', Validators.required);
	private answer3Control = new Control('', Validators.required);
	private answer4Control = new Control('', Validators.required);
	private timesFailed = new Control('', Validators.required);
	private correctAnswer: string; 

	constructor(
		private _formBuilder: FormBuilder,
		private _dataService: DataService
	) {}

	ngOnInit() {
		this.editQuestionForm = this._formBuilder.group({
			question: this.questionControl,
			timesFailed: this.timesFailed,
			answer1: this.answer1Control,
			answer2: this.answer2Control,
			answer3: this.answer3Control,
			answer4: this.answer4Control
		});
	}

	setQuestion(questionId: string, question: Question, answer: number) {
		this.questionId = questionId;
		this.question = question;
		this.timesFailed.updateValue(question.timesFailed);
		this.questionControl.updateValue(question.question);
		this.answer1Control.updateValue(question.answer1);
		this.answer2Control.updateValue(question.answer2);
		this.answer3Control.updateValue(question.answer3);
		this.answer4Control.updateValue(question.answer4);
		this.correctAnswer = answer + '';
	}

	onEditQuestionFormSubmit() {

		const correctAnswerNumber = parseInt(this.correctAnswer);

		// save Question data
		this._dataService.updateQuestion$(this.questionId, this.editQuestionForm.value)
												.take(1)
												.subscribe();

		this._dataService.updateCorrectAnswer$(this.questionId, correctAnswerNumber)
												.take(1)
												.subscribe();
	}
}
