/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
	beforeEach, beforeEachProviders,
	describe, xdescribe,
	expect, it, xit,
	async, inject,
	TestComponentBuilder
} from '@angular/core/testing';

import { provide } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { DataService } from '../shared';
import { QuestionsScreenComponent } from './questions-screen.component';

class MockDataService extends DataService {

	allQuestionsData$(): Observable<any> {
		return Observable.of({
			"-KLMInMzgKpxJeOxqieT": {
				question: "Kde sa tento rok (2016) konajú olympijské hry?",
				answer1: "Atény",
				answer2: "Tokyo",
				answer3: "Rio de Janeiro",
				answer4: "Londýn",
				timesFailed: 0
			},
			"-KLMTxMpSzlJwz4aCfLB": {
				question: "V ktorých športoch nemáme ani sme nikdy nemali reprezentantov?",
				answer1: "tenis",
				answer2: "kanoistika",
				answer3: "golf",
				answer4: "športová streľba",
				timesFailed: 0
			}
		});
	}
}

describe('Component: QuestionsScreen', () => {
	var mockDataService;

	it('should create an instance', () => {
		let component = new QuestionsScreenComponent(null, null, null, null);
		expect(component).toBeTruthy();
	});

	// it('should retrieve all questions', async(inject([TestComponentBuilder], (tcb) => {
	// 	mockDataService = new MockDataService(null);

	// 	return tcb
	// 		.overrideProviders(QuestionsScreenComponent, [provide(DataService, {useValue: mockDataService})])
	// 		.createAsync(QuestionsScreenComponent)
	// 		.then((fixture) => {});
	// })));
});
