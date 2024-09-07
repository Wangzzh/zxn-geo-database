import ImageMetadata from '../../data/image-metadata'
import ImageTags from '../../data/image-tags'
import Image from 'next/image'
import Link from 'next/link'
import Nav from "../nav"

export default function Page({ searchParams }) {
    const id = searchParams.id;
    const imageMetadata: ImageMetadata = ImageMetadata.readFromFile(id);
    const imageTags: ImageTags = ImageTags.readTagsFromFile(id);

    return (
        <div>
            <Nav />
            <div className="container text-center">
                <div className="mb-3 mt-3 row">
                    <div style={{position: "relative"}}>
                        <Image src={`/images/${imageMetadata.id}.jpg`} width={imageMetadata.width} height={imageMetadata.height} alt="Map Image"></Image>
                    </div>
                </div>
                <div className="mb-3 row">
                    <h3>
                        <span className="badge bg-secondary" key="country">{imageTags.countryTag}</span>
                        { imageTags.tags.map((value, i) =>
                            <span className="badge bg-secondary ml-3" key={i}>{value}</span>
                        )}
                    </h3>
                </div>
                <div className="mb-3 mt-3 row">
                    <Link href={`http://maps.google.com/?cbll=${imageMetadata.latitude},${imageMetadata.longitude}&cbp=12,${imageMetadata.heading},,,${-imageMetadata.pitch}&layer=c`}>Open in Google Map</Link>
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
        </div>
    );
}