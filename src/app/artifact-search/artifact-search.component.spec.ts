import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactSearchComponent } from './artifact-search.component';

describe('ArtifactSearchComponent', () => {
  let component: ArtifactSearchComponent;
  let fixture: ComponentFixture<ArtifactSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
