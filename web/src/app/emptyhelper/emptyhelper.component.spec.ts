import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyhelperComponent } from './emptyhelper.component';

describe('EmptyhelperComponent', () => {
  let component: EmptyhelperComponent;
  let fixture: ComponentFixture<EmptyhelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyhelperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyhelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
