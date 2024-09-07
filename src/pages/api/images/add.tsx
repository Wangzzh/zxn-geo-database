import type { NextApiRequest, NextApiResponse } from 'next'
import GoogleMapClient from "../../../client/google-map-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const url = req.body.url;
        console.log(`Body: ${url}`);

        const imageMetadata = GoogleMapClient.parseMapUrl(url);
        console.log(JSON.stringify(imageMetadata));

        imageMetadata.saveToFile();
        const blob = await GoogleMapClient.getStaticStreetView(imageMetadata);
        const id = await GoogleMapClient.saveStaticStreetView(blob, imageMetadata);

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