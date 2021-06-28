import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AComponent } from '../a/a.component';

import { BComponent } from './b.component';

describe('BComponent', () => {
  let component: BComponent;
  let fixture: ComponentFixture<BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BComponent],
      providers: [
        {
          provide: AComponent
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
