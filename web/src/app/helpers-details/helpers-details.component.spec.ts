import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpersDetailsComponent } from './helpers-details.component';

describe('HelpersDetailsComponent', () => {
  let component: HelpersDetailsComponent;
  let fixture: ComponentFixture<HelpersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpersDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
