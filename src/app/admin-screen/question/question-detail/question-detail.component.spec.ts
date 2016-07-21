/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { QuestionDetailComponent } from './question-detail.component';

describe('Component: QuestionDetail', () => {
  it('should create an instance', () => {
    let component = new QuestionDetailComponent(null, null);
    expect(component).toBeTruthy();
  });
});
