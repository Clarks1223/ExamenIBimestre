import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarHuecaPage } from './agregar-hueca.page';

describe('AgregarHuecaPage', () => {
  let component: AgregarHuecaPage;
  let fixture: ComponentFixture<AgregarHuecaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarHuecaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
