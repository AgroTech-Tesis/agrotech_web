import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlostViewComponent } from './plost-view.component';

describe('PlostViewComponent', () => {
  let component: PlostViewComponent;
  let fixture: ComponentFixture<PlostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlostViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
