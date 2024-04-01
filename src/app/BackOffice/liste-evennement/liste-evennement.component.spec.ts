import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEvennementComponent } from './liste-evennement.component';

describe('ListeEvennementComponent', () => {
  let component: ListeEvennementComponent;
  let fixture: ComponentFixture<ListeEvennementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEvennementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEvennementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
