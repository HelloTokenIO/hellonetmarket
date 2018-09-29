import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCustom } from './slider-custom.component';

describe('SliderCustom', () => {
  let component: SliderCustom;
  let fixture: ComponentFixture<SliderCustom>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderCustom ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
