import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticeComponent } from './politice.component';

describe('PoliticeComponent', () => {
  let component: PoliticeComponent;
  let fixture: ComponentFixture<PoliticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
