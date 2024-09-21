import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperHeadComponent } from './helper-head.component';

describe('HelperHeadComponent', () => {
  let component: HelperHeadComponent;
  let fixture: ComponentFixture<HelperHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
