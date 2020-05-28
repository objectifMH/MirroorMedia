import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpbComponent } from './spb.component';

describe('SpbComponent', () => {
  let component: SpbComponent;
  let fixture: ComponentFixture<SpbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
