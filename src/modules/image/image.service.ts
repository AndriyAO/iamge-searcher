import { Injectable } from '@nestjs/common';
import * as giphyApi from'giphy-api';
import { get } from 'lodash';
import { SearchOptions, Image, ImageResponse } from '../../interfaces';

@Injectable()
export class ImageService {
    private client;
    constructor() {
        this.client = giphyApi('QPxKSYo3WJEJFqGf2pFnTKCQJ74ttDER');
     }

    async searchImages(searchOptions: SearchOptions): Promise<ImageResponse> {
        const response = await this.client.search({ q: searchOptions.query, ...searchOptions });
        const images = this.transformImage(response);
        return {
            images,
            pagination: response.pagination,
        };
    }

    likeImage(imageId: string) {
        return `image ${imageId}`;
    }

    private transformImage(data: giphyApi.GIFObject): Image[] {
        const images = get(data, 'data', []);
        return images.map(image => {
            return {
                id: image.id,
                type: image.type,
                title: image.title,
                url: get(image, 'images.original.url', null),            
            }
        })
    }
}
