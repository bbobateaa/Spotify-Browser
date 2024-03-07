import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { SearchComponent } from '../components/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    var uri:string = this.expressBaseUrl + endpoint;
    console.log(uri);

    return firstValueFrom(this.http.get(uri)).then((response) => {
      console.log("success ");
      return response;
    }, (err) => {
      console.log("error here");
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    const endpoint = `/search/${encodeURIComponent(category)}/${encodeURIComponent(resource)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      if (category == "artist") {
        return response.artists.items.map((artist: any) => new ArtistData(artist));
      } else if (category == "track") {
        return response.tracks.items.map((track: any) => new TrackData(track));
      } else if (category == "album") {
        return response.albums.items.map((album: any) => new AlbumData(album));
      } else {
        console.log("error");
      }
    })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const endpoint = '/artist/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new ArtistData(data);
    })
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    const endpoint = '/artist-related-artists/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.artists.map((artist: any) => new ArtistData(artist));
    })
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const endpoint = '/artist-top-tracks/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.tracks.map((track: any) => new TrackData(track));
    })
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const endpoint = '/artist-albums/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.items.map((album: any) => new AlbumData(album));
    })
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const endpoint = '/album/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new AlbumData(data);
    })
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const endpoint = '/album-tracks/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.items.map((track: any) => new TrackData(track));
    })
    
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const endpoint = '/track/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new TrackData(data);
    })
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    const endpoint = '/track-audio-features/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      console.log("data", data);
      const trackFeatures: TrackFeature[] = [];
      for (const feature of TrackFeature.FeatureTypes) {
        trackFeatures.push(new TrackFeature(feature, data[feature]));
      }
      return trackFeatures;
    })
  }
}