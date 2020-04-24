import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TendanceSlideComponent } from './tendance-slide.component';

describe('TendanceSlideComponent', () => {
  let component: TendanceSlideComponent;
  let fixture: ComponentFixture<TendanceSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TendanceSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TendanceSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
