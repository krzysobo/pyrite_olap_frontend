import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyriteMainComponent } from './pyrite-main.component';

describe('PyriteMainComponent', () => {
  let component: PyriteMainComponent;
  let fixture: ComponentFixture<PyriteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PyriteMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PyriteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
