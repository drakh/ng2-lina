/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { RulesScreenComponent } from './rules-screen.component';

describe('Component: RulesScreen', () => {
  it('should create an instance', () => {
    let component = new RulesScreenComponent();
    expect(component).toBeTruthy();
  });
});