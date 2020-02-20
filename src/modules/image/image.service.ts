import { Injectable } from '@nestjs/common';
import * as giphyApi from'giphy-api';
import { get, some } from 'lodash';
import { SearchOptions, Image, ImageResponse, Like } from '../../interfaces';
import { DbService } from '../../services/db/db.service';

@Injectable()
export class ImageService {
    private readonly COLLECTION_NAME = 'likes';

    private client;
    constructor(private databaseService: DbService) {
        this.client = giphyApi('QPxKSYo3WJEJFqGf2pFnTKCQJ74ttDER'); // move to env
     }

    async searchImages(searchOptions: SearchOptions, userId: string): Promise<ImageResponse> {
        const response = await this.client.search({ q: searchOptions.query, ...searchOptions });
        const images = this.transformImage(response, userId);
        return {
            images,
            pagination: response.pagination,
        };
    }

    likeImage(imageId: string, userId: string): Like {
        const likeId = this.databaseService.create(this.COLLECTION_NAME, { imageId, userId });
        return this.databaseService.getById(this.COLLECTION_NAME, likeId);
    }

    private transformImage(data: giphyApi.GIFObject, userId: string): Image[] {
        const images = get(data, 'data', []);
        return images.map(image => {
            return {
                id: image.id,
                type: image.type,
                title: image.title,
                url: this.getImageUrl(image),
                liked: this.ifImageLiked(image, userId),
            }
        })
    }

    private getImageUrl(image: any): string {
        return get(image, 'images.original.url', null);
    }

    private ifImageLiked(image: any, userId: string): boolean {
        const likes = this.databaseService.getByKey(this.COLLECTION_NAME, 'userId', userId);
        return some(likes, ['imageId', image.id]);
    }
}
