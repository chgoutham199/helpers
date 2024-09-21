import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHelpersComponent } from './view-helpers.component';

describe('ViewHelpersComponent', () => {
  let component: ViewHelpersComponent;
  let fixture: ComponentFixture<ViewHelpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHelpersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHelpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
