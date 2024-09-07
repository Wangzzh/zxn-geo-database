import type { NextApiRequest, NextApiResponse } from 'next'
import GoogleMapClient from "../../../client/google-map-client"
import ImageTags from "../../../data/image-tags"
import {CountryTag, Tag} from "../../../constants/tags"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const url = req.body.url;
        const countryTag = req.body.countryTag;
        const tags = req.body.tags;
        console.log("Country: " + countryTag);
        console.log("Tags: " + JSON.stringify(tags));

        const imageMetadata = GoogleMapClient.parseMapUrl(url);
        console.log(JSON.stringify(imageMetadata));

        imageMetadata.saveToFile();
        const blob = await GoogleMapClient.getStaticStreetView(imageMetadata);
        const id = await GoogleMapClient.saveStaticStreetView(blob, imageMetadata);

        var imageTags: ImageTags = new ImageTags();
        imageTags.countryTag = countryTag as CountryTag;
        imageTags.tags = tags.map(t => t as Tag);

        imageTags.saveTagsToFile(imageMetadata);

        if (!id || !blob) {
            res.status(500).send("Internal error");
        }

        res.status(200).json({
            message: 'success',
            id: id
        });
    } else {
        res.status(500).send("Internal error");
    }
}