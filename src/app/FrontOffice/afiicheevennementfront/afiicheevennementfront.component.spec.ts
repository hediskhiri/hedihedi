import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiicheevennementfrontComponent } from './afiicheevennementfront.component';

describe('AfiicheevennementfrontComponent', () => {
  let component: AfiicheevennementfrontComponent;
  let fixture: ComponentFixture<AfiicheevennementfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiicheevennementfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiicheevennementfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
