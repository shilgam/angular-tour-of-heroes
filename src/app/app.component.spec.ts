// https://angular.io/guide/testing-components-scenarios#component-binding

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Tour of Heroes"', () => {
    expect(component.title).toEqual('Tour of Heroes');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');

    expect(h1.textContent).toContain('Tour of Heroes');
  });
});
