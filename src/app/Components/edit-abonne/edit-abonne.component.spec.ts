import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbonneComponent } from './edit-abonne.component';

describe('EditAbonneComponent', () => {
  let component: EditAbonneComponent;
  let fixture: ComponentFixture<EditAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
