import * as fs from 'fs'
import * as path from 'path'
import {v4 as uuid} from 'uuid';
import ImageMetadata from '../data/image-metadata'

class GoogleMapClient {

    private static key: String|null = null;

    private constructor() {}

    private static readKey() {
        if (GoogleMapClient.key === null) {
            fs.readFile('keys/google-api.txt', function (err, data) {
                if (err) {
                    console.log("Error when reading google api key: " + err);
                    return;
                }
                console.log("Got google api key: " + data);
                GoogleMapClient.key = data.toString();
            })
        }
    }

    public static getKey(): String {
        GoogleMapClient.readKey();
        return GoogleMapClient.key;
    }

    public static parseMapUrl(url: String): ImageMetadata {
        const regex = new RegExp(/^.*@([-\.\d]+),([-\.\d]*),.*%26w%3D([-\.\d]*)%26h%3D([-\.\d]*).*pitch%3D([-\.\d]*).*yaw%3D([-\.\d]*).*$/);
        const result = regex.exec(url);

        var imageMetadata: ImageMetadata = new ImageMetadata();
        imageMetadata.id = uuid();
        imageMetadata.latitude = result[1];
        imageMetadata.longitude = result[2];
        imageMetadata.width = result[3];
        imageMetadata.height = result[4];
        imageMetadata.pitch = result[5];
        imageMetadata.heading = result[6];
        return imageMetadata;
    }

    public static async getStaticStreetView() {
        GoogleMapClient.readKey();
        const url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=${GoogleMapClient.getKey()}`;
        const response = await fetch(encodeURI(url));
        const data = await response.blob();
        return data;
    }
}

export default GoogleMapClient;