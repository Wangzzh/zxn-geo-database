import type { NextApiRequest, NextApiResponse } from 'next'
import ImageMetadata from '../../../data/image-metadata';
import ImageTags from "../../../data/image-tags"
import {CountryTag, Tag} from "../../../constants/tags"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const countryTag = req.body.countryTag;
        const tags = req.body.tags;
        const id = req.body.id;

        var imageMetadata = ImageMetadata.readFromFile(id);

        var imageTags: ImageTags = new ImageTags();
        imageTags.countryTag = countryTag as CountryTag;
        imageTags.tags = tags.map(t => t as Tag);

        imageTags.saveTagsToFile(imageMetadata);

        res.status(200).json({
            message: 'success',
            id: id
        });
    } else {
        res.status(500).send("Internal error");
    }
}