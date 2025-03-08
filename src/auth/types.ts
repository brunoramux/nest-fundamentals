export interface PayloadType {
  userId: number;
  email: string;
  artistId?: number;
}

export type Enable2FAType = {
  secret: string;
};
