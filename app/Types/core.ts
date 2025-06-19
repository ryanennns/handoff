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
