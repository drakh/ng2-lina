/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { QuestionRowComponent } from './question-row.component';

describe('Component: QuestionRow', () => {
  it('should create an instance', () => {
    let component = new QuestionRowComponent();
    expect(component).toBeTruthy();
  });
});
