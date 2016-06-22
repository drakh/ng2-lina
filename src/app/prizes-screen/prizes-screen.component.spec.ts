/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PrizesScreenComponent } from './prizes-screen.component';

describe('Component: PrizesScreen', () => {
  it('should create an instance', () => {
    let component = new PrizesScreenComponent(null);
    expect(component).toBeTruthy();
  });
});
