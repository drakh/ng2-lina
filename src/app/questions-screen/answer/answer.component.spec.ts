/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AnswerComponent } from './answer.component';

describe('Component: Answer', () => {
  it('should create an instance', () => {
    let component = new AnswerComponent(null);
    expect(component).toBeTruthy();
  });
});
