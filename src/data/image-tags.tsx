import * as fs from 'fs'
import ImageMetadata from './image-metadata'
import {Tag, CountryTag} from '../constants/tags'

export class ImageTags {
    public countryTag: CountryTag;
    public tags: Tag[];

    public saveTagsToFile(imageMetadata: ImageMetadata) {
        const data = [
            `${this.countryTag}`,
            `${this.tags.join(",")}`
        ].join("\n");

        fs.writeFileSync(`data/image-tags/tags-${imageMetadata.id}.txt`, data);
    }
}

export default ImageTags;