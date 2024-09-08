import * as fs from 'fs'
import * as path from 'path'

class ImageMetadata {
    public id: String = "";
    public latitude: Number = NaN;
    public longitude: Number = NaN;
    public pitch: Number = NaN;
    public heading: Number = NaN;
    public width: Number = NaN;
    public height: Number = NaN;
    public fov: Number = NaN;

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
        imageData.latitude = +splitData[0];
        imageData.longitude = +splitData[1];
        imageData.pitch = +splitData[2];
        imageData.heading = +splitData[3];
        imageData.width = +splitData[4];
        imageData.height = +splitData[5];
        imageData.fov = +splitData[6];
        return imageData;
    }

    public static listIds(): String[] {
        const dir = path.resolve("./public", "images");
        const filenames = fs.readdirSync(dir);
        return filenames.map(n => n.toString().split('.')[0]);
    }
}

export default ImageMetadata;