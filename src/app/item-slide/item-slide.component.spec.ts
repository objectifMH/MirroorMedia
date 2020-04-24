import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSlideComponent } from './item-slide.component';

describe('ItemSlideComponent', () => {
  let component: ItemSlideComponent;
  let fixture: ComponentFixture<ItemSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
