import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaviroteComponent } from './favirote.component';

describe('FaviroteComponent', () => {
  let component: FaviroteComponent;
  let fixture: ComponentFixture<FaviroteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaviroteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaviroteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
