import ImageMetadata from '../../data/image-metadata'
import ImageTags from '../../data/image-tags'
import Image from 'next/image'
import Link from 'next/link'
import {CountryTag, Tag} from "../../constants/tags"
import Nav from "../nav"

import SearchImageForm from "./search-image-form"

function shuffle(array: String[]) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export default function Page({ searchParams }) {
    var ids: String[] = ImageMetadata.listIds();
    shuffle(ids);

    var imageTagsMap: {[id: String]: ImageTags} = {};
    ids.forEach(id => imageTagsMap[id] = ImageTags.readTagsFromFile(id));

    const countries = searchParams.countries;
    const tags = searchParams.tags;
    
    const outputSize = 12;
    var currentSize = 0;

    const filteredIds = ids.filter(id => {
        if (currentSize >= outputSize) {
            return false;
        }
        if (countries && !countries.includes(imageTagsMap[id].countryTag.toString())) {
            return false;
        }
        if (tags) {
            var filteredTags = tags.split(",").filter(tag => imageTagsMap[id].tags.includes(tag));
            if (filteredTags.length == 0) {
                return false;
            }
        }
        currentSize += 1;
        return true;
    });

    return (
        <div>
            <Nav />
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
        </div>
    );
}