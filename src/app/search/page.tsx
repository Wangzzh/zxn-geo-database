import ImageMetadata from '../../data/image-metadata'
import ImageTags from '../../data/image-tags'
import Image from 'next/image'
import Link from 'next/link'
import {CountryTag, Tag} from "../../constants/tags"

import SearchImageForm from "./search-image-form"

export default function Page({ searchParams }) {
    const ids: String[] = ImageMetadata.listIds();
    var imageTagsMap: {[id: String]: ImageTags} = {};
    ids.forEach(id => imageTagsMap[id] = ImageTags.readTagsFromFile(id));

    const countries = searchParams.countries;
    const tags = searchParams.tags;

    const filteredIds = ids.filter(id => {
        if (countries && !countries.includes(imageTagsMap[id].countryTag.toString())) {
            return false;
        }
        if (tags) {
            var filteredTags = tags.split(",").filter(tag => imageTagsMap[id].tags.includes(tag));
            if (filteredTags.length == 0) {
                return false;
            }
        }
        return true;
    });

    return (
        <div className="container text-center">
            <SearchImageForm />
            <div className="mb-3 mt-3 row">
                <div style={{position: "relative"}}>
                    {filteredIds.map(id =>
                        <a href={`/image?id=${id}`} key={id}>
                            <Image src={`/images/${id}.jpg`} width={200} height={200} alt="Map Image" key={id}></Image>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}