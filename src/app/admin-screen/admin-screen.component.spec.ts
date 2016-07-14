/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AdminScreenComponent } from './admin-screen.component';

describe('Component: AdminScreen', () => {
  it('should create an instance', () => {
    let component = new AdminScreenComponent(null, null);
    expect(component).toBeTruthy();
  });
});
