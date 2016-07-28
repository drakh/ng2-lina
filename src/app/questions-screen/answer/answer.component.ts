import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'lina-answer',
	template: '<button (click)="onAnswerClick()">{{answerText}}</button>',
	styleUrls: ['answer.component.css']
})
export class AnswerComponent implements OnInit {

	@Input('answerText') answerText: string;
	@Input('answer') answer: number;
	@Output('selectAnswer') selectAnswer: EventEmitter<number> = new EventEmitter<number>();
	private nativeElement: any;

	constructor(private _elementRef: ElementRef) {}

	ngOnInit() {
		this.nativeElement = this._elementRef.nativeElement;
	}

	onAnswerClick() {
		if( this.nativeElement && this.nativeElement.dataset.answer ) {
			this.selectAnswer.emit(this.nativeElement);
		}
	}
}
