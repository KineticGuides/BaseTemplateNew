import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAltComponent } from './template-alt.component';

describe('TemplateAltComponent', () => {
  let component: TemplateAltComponent;
  let fixture: ComponentFixture<TemplateAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateAltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
