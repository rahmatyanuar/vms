import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrRegistrationComponent } from './ocr-registration.component';

describe('OcrRegistrationComponent', () => {
  let component: OcrRegistrationComponent;
  let fixture: ComponentFixture<OcrRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
