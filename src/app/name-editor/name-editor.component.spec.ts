/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * Docs: https://angular.io/guide/forms-overview#testing-reactive-forms
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NameEditorComponent } from './name-editor.component';

describe('NameEditorComponent', () => {
  let component: NameEditorComponent;
  let fixture: ComponentFixture<NameEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NameEditorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // view to model
  it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    const event = createNewEvent('input');

    input.value = 'Carl';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.name.value).toEqual('Carl');
  });

  // model to view
  it('should update the value in the control', () => {
    component.name.setValue('Barack');

    const input = fixture.nativeElement.querySelector('input');

    expect(input.value).toBe('Barack');
  });
});

function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}
