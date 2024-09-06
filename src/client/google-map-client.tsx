import * as fs from 'fs'
import * as path from 'path'


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
}

export default GoogleMapClient;