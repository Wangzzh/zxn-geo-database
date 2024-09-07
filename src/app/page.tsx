import * as fs from 'fs'
import GoogleMapClient from "../client/google-map-client"

export default function Home() {

    async function test() {
        const blob = await GoogleMapClient.getStaticStreetView();
        const blobArray = Buffer.from(await blob.arrayBuffer());
        fs.writeFile('data/images/test2.jpg', blobArray, {encoding: "binary"}, (err) => {
            if (err) {
                console.log("Error writing image file: " + err.toString());
            }
        });
    }


    async function testParse() {
        const url = "https://www.google.com/maps/@47.6196945,-122.338051,3a,15.3y,299.5h,85.69t/data=!3m7!1e1!3m5!1s-W5kqykzXSlRwPZXVkBKyg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.30628572260548%26panoid%3D-W5kqykzXSlRwPZXVkBKyg%26yaw%3D299.50118444015305!7i16384!8i8192?coh=205410&entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D";
        const data = GoogleMapClient.parseMapUrl(url);
        console.log(JSON.stringify(data));
    }

    testParse();

    return (
        <div className="container text-center">
            Hello!
        </div>
    );
}
