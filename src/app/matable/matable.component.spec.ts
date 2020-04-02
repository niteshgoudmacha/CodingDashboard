import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatableComponent } from './matable.component';

describe('MatableComponent', () => {
  let component: MatableComponent;
  let fixture: ComponentFixture<MatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
