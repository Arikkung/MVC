import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatetallerPage } from './updatetaller.page';

describe('UpdateuserPage', () => {
  let component: UpdatetallerPage;
  let fixture: ComponentFixture<UpdatetallerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetallerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
