/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { MenuScreenComponent } from './menu-screen.component';

describe('Component: MenuScreen', () => {
  it('should create an instance', () => {
    let component = new MenuScreenComponent(null);
    expect(component).toBeTruthy();
  });
});