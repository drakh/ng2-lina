import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../shared';

@Component({
  moduleId: module.id,
  selector: 'lina-question-row',
  templateUrl: 'question-row.component.html',
  styleUrls: ['question-row.component.css']
})
export class QuestionRowComponent implements OnInit {

  @Input('question') question: Question;
	@Input('isActive') isActive: boolean;
	@Output('selectQuestion') selectQuestion: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
		
  }

  onQuestionSelect() {
  	if(this.question && this.question.id !== undefined) {
  		this.selectQuestion.emit(this.question.id);
  	}
  }
}
