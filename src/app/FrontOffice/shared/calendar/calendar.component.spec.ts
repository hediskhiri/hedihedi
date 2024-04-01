import { ComponentFixture, TestBed } from '@angular/core/testing';

import { calendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: calendarComponent;
  let fixture: ComponentFixture<calendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ calendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(calendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
