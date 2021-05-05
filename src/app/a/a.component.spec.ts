import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BComponent } from '../b/b.component';
import { AComponent } from './a.component';

describe('AComponent', () => {
  let component: AComponent;
  let fixture: ComponentFixture<AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AComponent, BComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
