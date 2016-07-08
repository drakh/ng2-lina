/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { IntroScreenComponent } from './intro-screen.component';

describe('Component: IntroScreen', () => {
  it('should create an instance', () => {
    let component = new IntroScreenComponent(null, null, null);
    expect(component).toBeTruthy();
  });
});
