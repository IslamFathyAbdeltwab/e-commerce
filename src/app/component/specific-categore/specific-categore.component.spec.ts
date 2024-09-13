import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCategoreComponent } from './specific-categore.component';

describe('SpecificCategoreComponent', () => {
  let component: SpecificCategoreComponent;
  let fixture: ComponentFixture<SpecificCategoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificCategoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificCategoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
