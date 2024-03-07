import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTopTracksComponent } from './spotify-top-tracks.component';

// Test suite for the SpotifyTopTracksComponent
describe('SpotifyTopTracksComponent', () => {
  let component: SpotifyTopTracksComponent;
  let fixture: ComponentFixture<SpotifyTopTracksComponent>;

  // Before each test, configure TestBed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the component to be tested
      imports: [SpotifyTopTracksComponent]
    })
    .compileComponents();
    
    // Create a component fixture
    fixture = TestBed.createComponent(SpotifyTopTracksComponent);
    // Get the component instance
    component = fixture.componentInstance;
    // Trigger change detection
    fixture.detectChanges();
  });

  // Test case: should create the component
  it('should create', () => {
    // Expect the component to be truthy (i.e., not null or undefined)
    expect(component).toBeTruthy();
  });
});
