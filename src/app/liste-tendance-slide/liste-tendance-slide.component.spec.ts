import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTendanceSlideComponent } from './liste-tendance-slide.component';

describe('ListeTendanceSlideComponent', () => {
  let component: ListeTendanceSlideComponent;
  let fixture: ComponentFixture<ListeTendanceSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTendanceSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTendanceSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
