// artist-page.component.ts //
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TrackListComponent } from '../../components/track-list/track-list.component';


@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule, CarouselComponent, TrackListComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss'
})
export class ArtistPageComponent implements OnInit {
    artistId:string | undefined;
    artist:ArtistData | undefined;
    relatedArtists:ArtistData[] | undefined;
    topTracks:TrackData[] | undefined;
    albums:AlbumData[] | undefined;

  constructor(private route: ActivatedRoute,
    private spotifyService:SpotifyService) { }

  ngOnInit() {
      this.artistId = this.route.snapshot.paramMap.get('id') || "";
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then(artist => {
      this.artist = artist;
    });

    this.spotifyService.getRelatedArtists(this.artistId).then(relatedArtists => {
      this.relatedArtists = relatedArtists;
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then(topTracks => {
      this.topTracks = topTracks;
      console.log("HERE", this.topTracks);
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then(albumsFor => {
      this.albums = albumsFor;
    });
  }
}