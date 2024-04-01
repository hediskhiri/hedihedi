import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierevennementComponent } from './modifierevennement.component';

describe('ModifierevennementComponent', () => {
  let component: ModifierevennementComponent;
  let fixture: ComponentFixture<ModifierevennementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierevennementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierevennementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
