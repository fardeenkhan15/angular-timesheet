import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardImageComponent } from './onboard-image.component';

describe('OnboardImageComponent', () => {
  let component: OnboardImageComponent;
  let fixture: ComponentFixture<OnboardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
