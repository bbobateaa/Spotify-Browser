// Import necessary modules and components from Angular core
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Define the SpotifyTopTracksComponent class
@Component({
  // Selector for the component
  selector: 'app-top-tracks',
  // Indicate that the component is standalone
  standalone: true,
  // Import necessary Angular CommonModule
  imports: [CommonModule],
  // Define the HTML template and style for the component
  templateUrl: './spotify-top-tracks.component.html',
  styleUrl: './spotify-top-tracks.component.scss'
})
// Implement the OnInit lifecycle hook
export class SpotifyTopTracksComponent implements OnInit{
  // Declare class properties
  topTracks: any[] = [];
  topArtists: any[] = [];
  trackId: string | undefined;
  trackInfo: any[] = [];

  // Constructor with HttpClient injection
  constructor(private http: HttpClient) {}

  // Implement the OnInit interface's ngOnInit method
  ngOnInit(): void {
    // Make HTTP GET request to fetch top tracks data
    this.http.get<any>('http://localhost:8888/me/top/tracks').subscribe(
      // Success callback
      (response: any) => {
        // Convert object to array
        this.trackInfo = Object.values(response);
        // Extract top tracks data
        this.topTracks = this.trackInfo[0];
      },
      // Error callback
      (error: any) => {
        console.error('Error fetching top tracks:', error);
      }
    );
  }
}
