import { Image } from "./image.interface";

export interface ImageResponse {
    images: Image[],
    pagination: {
        total_count: number;
        limit: number;
        offset: number;
    }
}