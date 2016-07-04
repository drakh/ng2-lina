/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { GameoverScreenComponent } from './gameover-screen.component';

describe('Component: GameoverScreen', () => {
  it('should create an instance', () => {
    let component = new GameoverScreenComponent(null, null, null);
    expect(component).toBeTruthy();
  });
});
