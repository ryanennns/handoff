export enum Service {
  Spotify = "spotify",
  Tidal = "tidal",
  YouTube = "youtube-music",
  Apple = "apple-music",
  Amazon = "amazon-music",
}

export const services: Service[] = [
  Service.Spotify,
  Service.Tidal,
  Service.YouTube,
  Service.Apple,
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
