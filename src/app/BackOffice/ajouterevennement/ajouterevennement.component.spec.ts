import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterevennementComponent } from './ajouterevennement.component';

describe('AjouterevennementComponent', () => {
  let component: AjouterevennementComponent;
  let fixture: ComponentFixture<AjouterevennementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterevennementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterevennementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
