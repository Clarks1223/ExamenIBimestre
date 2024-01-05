import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarHuecaPage } from './editar-hueca.page';

describe('EditarHuecaPage', () => {
  let component: EditarHuecaPage;
  let fixture: ComponentFixture<EditarHuecaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarHuecaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
