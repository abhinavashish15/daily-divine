export interface Image {
  id: string;
  title: string | null;
  deity: string;
  imageUrl: string;
  caption: string | null;
  active: boolean;
  timesUsed: number;
  lastSent: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateImageDTO {
  title?: string;
  deity: string;
  imageUrl: string;
  caption?: string;
  active?: boolean;
}

export interface UpdateImageDTO {
  title?: string;
  deity?: string;
  imageUrl?: string;
  caption?: string;
  active?: boolean;
}
