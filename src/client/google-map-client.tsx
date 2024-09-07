import * as fs from 'fs'
import {v4 as uuid} from 'uuid';
import ImageMetadata from '../data/image-metadata'

class GoogleMapClient {

    private static key: String|null = null;

    private constructor() {}

    private static async readKey() {
        if (!GoogleMapClient.key) {
            const data = fs.readFileSync('keys/google-api.txt');
            console.log("Got google api key: " + data);
            GoogleMapClient.key = data.toString();
        }
    }

    public static async getKey(): String {
        await GoogleMapClient.readKey();
        return GoogleMapClient.key;
    }

    public static parseMapUrl(url: String): ImageMetadata {
        const regex = new RegExp(/^.*@([-\.\d]*),([-\.\d]*),.*,([-\.\d]*)y,.*%26w%3D([-\.\d]*)%26h%3D([-\.\d]*).*pitch%3D([-\.\d]*).*yaw%3D([-\.\d]*).*$/);
        const result = regex.exec(url);

        var imageMetadata: ImageMetadata = new ImageMetadata();
        imageMetadata.id = uuid();
        imageMetadata.latitude = result[1];
        imageMetadata.longitude = result[2];
        imageMetadata.fov = result[3];
        imageMetadata.width = 900;
        imageMetadata.height = 600;
        imageMetadata.pitch = -result[6];
        imageMetadata.heading = result[7];
        return imageMetadata;
    }

    public static async getStaticStreetView(imageMetadata: ImageMetadata) {
        const url = `https://maps.googleapis.com/maps/api/streetview?size=${imageMetadata.width}x${imageMetadata.height}&location=${imageMetadata.latitude},${imageMetadata.longitude}&heading=${imageMetadata.heading}&pitch=${imageMetadata.pitch}&fov=${imageMetadata.fov}&key=${await GoogleMapClient.getKey()}`;
        console.log("Fetching url: " + url);
        const response = await fetch(encodeURI(url));
        const data = await response.blob();
        return data;
    }

    public static async saveStaticStreetView(blob: Blob, imageMetadata: ImageMetadata): String {
        if (!blob) {
            console.log("Blob is invalid");
            return;
        }
        const blobArray = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(`data/images/${imageMetadata.id}.jpg`, blobArray, {encoding: "binary"}, (err) => {
            if (err) {
                console.log("Error writing image file: " + err.toString());
            }
        });
        return imageMetadata.id;
    }
}

export default GoogleMapClient;