export enum Service {
  Spotify = "spotify",
  Apple = "apple",
  YouTube = "youtube",
  Tidal = "tidal",
  Amazon = "amazon",
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
  source: Service;
  destination: Service;
  playlists: Pick<Playlist, "id" | "name">[];
  status: "pending" | "in_progress" | "completed" | "failed";
  created_at: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: string;
  owner: {
    display_name: string;
    id: string;
  };
  number_of_tracks: number;
  image_uri: string;
}
