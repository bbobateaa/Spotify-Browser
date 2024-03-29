import { Component, OnInit } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { SearchComponent } from '../../components/search/search.component';
import { SpotifyTopTracksComponent } from '../spotify-top-tracks/spotify-top-tracks.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AboutComponent, SearchComponent, SpotifyTopTracksComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
