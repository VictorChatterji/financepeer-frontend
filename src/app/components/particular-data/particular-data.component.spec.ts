import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularDataComponent } from './particular-data.component';

describe('ParticularDataComponent', () => {
  let component: ParticularDataComponent;
  let fixture: ComponentFixture<ParticularDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
