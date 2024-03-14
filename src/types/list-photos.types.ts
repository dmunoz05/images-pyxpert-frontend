// To parse this data:
//
//   import { Convert } from "./file";
//
//   const listPhotos = Convert.tolistPhotos(json);

export interface listPhotos {
  mediaItems: [MediaItems];
  nextPageToken: string;
}

export interface MediaItems {
  baseUrl: string;
  filename: string;
  id: string;
  mediaMetadata: MediaMetadata;
  mimeType: string;
  productUrl: string;
}

export interface MediaMetadata {
  creationTime: Date;
  width: string;
  height: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static tolistPhotos(json: string): listPhotos[] {
    return JSON.parse(json);
  }

  public static listPhotosToJson(value: listPhotos[]): string {
    return JSON.stringify(value);
  }
}
