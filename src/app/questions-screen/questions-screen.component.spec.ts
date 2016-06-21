/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { QuestionsScreenComponent } from './questions-screen.component';

describe('Component: QuestionsScreen', () => {
  it('should create an instance', () => {
    let component = new QuestionsScreenComponent();
    expect(component).toBeTruthy();
  });
});
