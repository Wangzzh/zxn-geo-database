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

    public static readTagsFromFile(id: String): ImageTags {
        const data = fs.readFileSync(`data/image-tags/tags-${id}.txt`).toString();
        const lines = data.split('\n');

        var imageTags: ImageTags = new ImageTags();
        imageTags.countryTag = lines[0] as CountryTag;
        imageTags.tags = lines[1].split(",").map(t => t as Tag);

        return imageTags;
    }
}

export default ImageTags;