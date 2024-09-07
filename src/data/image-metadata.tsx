import * as fs from 'fs'

class ImageMetadata {
    public id: String;
    public latitude: Number;
    public longitude: Number;
    public pitch: Number;
    public heading: Number;
    public width: Number;
    public height: Number;
    public fov: Number;

    public saveToFile() {
        const data = [
            this.latitude,
            this.longitude,
            this.pitch,
            this.heading,
            this.width,
            this.height,
            this.fov
        ].join(',');
        fs.writeFile(`data/image-metadata/${this.id}.txt`, data, (err) => {
            if (err) {
                console.log("Error writing image metadata " + err);
            }
        });
    }

    public static readFromFile(id: String): ImageMetadata {
        const data = fs.readFileSync(`data/image-metadata/${id}.txt`).toString();
        const splitData = data.split(',');
        var imageData: ImageMetadata = new ImageMetadata();
        imageData.id = id;
        imageData.latitude = splitData[0];
        imageData.longitude = splitData[1];
        imageData.pitch = splitData[2];
        imageData.heading = splitData[3];
        imageData.width = splitData[4];
        imageData.height = splitData[5];
        imageData.fov = splitData[6];
        return imageData;
    }
}

export default ImageMetadata;