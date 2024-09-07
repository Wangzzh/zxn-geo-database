import * as fs from 'fs'
import GoogleMapClient from "../client/google-map-client"
import AddImageButton from "./add-image-button"

export default function Home() {

    async function testParse() {
        const url = "https://www.google.com/maps/@47.6196956,-122.3381863,3a,15y,287.64h,114.69t/data=!3m7!1e1!3m5!1sGtjfIXLEnNfm9WFT5wHpJQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-24.68774301612079%26panoid%3DGtjfIXLEnNfm9WFT5wHpJQ%26yaw%3D287.6446047034545!7i16384!8i8192?coh=205410&entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D";
        const imageMetadata = GoogleMapClient.parseMapUrl(url);
        console.log(JSON.stringify(imageMetadata));
        imageMetadata.saveToFile();
        const blob = await GoogleMapClient.getStaticStreetView(imageMetadata);
        GoogleMapClient.saveStaticStreetView(blob, imageMetadata);
    }

    return (
        <div className="container text-center">
            <AddImageButton />
        </div>
    );
}
