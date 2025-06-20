export enum Service {
  Spotify = "spotify",
  Apple = "apple-music",
  YouTube = "youtube-music",
  Tidal = "tidal",
  Amazon = "amazon-music",
}

export const services: Service[] = [
  Service.Spotify,
  Service.Apple,
  Service.YouTube,
  Service.Tidal,
  Service.Amazon,
];

export interface TransferJob {
  id: string;
  playlistName: string;
  fromService: string;
  toService: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  songsTotal: number;
  songsTransferred: number;
  createdAt: string;
}

export interface Playlist {
  name: string;
  tracks: string;
  owner: {
    display_name: string;
    id: string;
  };
  number_of_tracks: number;
  image_uri: string;
}
