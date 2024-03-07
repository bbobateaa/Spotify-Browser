// search.component.ts
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from '../carousel/carousel.component';
import { TrackListComponent } from '../track-list/track-list.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselComponent, TrackListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [ SpotifyService ]
})

export class SearchComponent implements OnInit {
  searchString:string | undefined;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[] | undefined;
  tracks: TrackData[] | undefined;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    if (this.searchString && this.searchCategory) {
      this.spotifyService.searchFor(this.searchCategory, this.searchString).then((response) => {
        if (this.searchCategory == 'track') {
          this.tracks = response as TrackData[];
          console.log(this.tracks); 
        } 
        this.resources = response;
        console.log(this.resources);
      })
    }
  }
  
}