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
}

export default ImageMetadata;