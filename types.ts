import { Nullable } from "unsplash-js/dist/helpers/typescript";
export interface Photo {
  id: string;
  width: number;
  height: number;
  blur_hash?: Nullable<string> | string;
  alt: Nullable<string> | string;
  url: string;
  freeland_url: string;
  author: string;
  author_url: string;
  likes?: number;
  provider: string;
  provider_logo: string;
  provider_url: string;
}
