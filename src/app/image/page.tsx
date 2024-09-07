import ImageMetadata from '../../data/image-metadata'
import Image from 'next/image'

export default function Page({ searchParams }) {
    const id = searchParams.id;
    const imageMetadata: ImageMetadata = ImageMetadata.readFromFile(id);

    return (
        <div className="container text-center">
            <div className="mb-3 mt-3 row">
                <div style={{position: "relative"}}>
                    <Image src={`/images/${imageMetadata.id}.jpg`} width={imageMetadata.width} height={imageMetadata.height} alt="Map Image"></Image>
                </div>
            </div>
            <div className="mb-3 mt-3 row">
                <p>ID: {imageMetadata.id}</p>
                <p>Latitude: {imageMetadata.latitude}</p>
                <p>Longitude: {imageMetadata.longitude}</p>
                <p>Heading: {imageMetadata.heading}</p>
                <p>Pitch: {imageMetadata.pitch}</p>
                <p>FOV: {imageMetadata.fov}</p>
                <p>Width: {imageMetadata.width}</p>
                <p>Height: {imageMetadata.height}</p>
            </div>
        </div>
    );
}