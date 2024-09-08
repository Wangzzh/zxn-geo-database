'use server'

import GoogleMapClient from '../../client/google-map-client';
import ImageMetadata from '../../data/image-metadata';
import SearchMapApiClient from './search-map-api-client';

export default async function SearchMap({ props }) {

    const ids: String[] = props.filteredIds;
    const imageMetadataMap: ImageMetadata[] = props.imageMetadataMap;
    const n = ids.length;

    const avgLongitude = ids.reduce((sum, id) => sum + imageMetadataMap[id].longitude, 0) / n;
    const avgLatitude = ids.reduce((sum, id) => sum + imageMetadataMap[id].latitude, 0) / n;

    const maxLongitude = Math.max(...ids.map(id => imageMetadataMap[id].longitude));
    const minLongitude = Math.min(...ids.map(id => imageMetadataMap[id].longitude));

    const maxLatitude = Math.max(...ids.map(id => imageMetadataMap[id].latitude));
    const minLatitude = Math.min(...ids.map(id => imageMetadataMap[id].latitude));
    const span = Math.max(maxLatitude - minLatitude, maxLongitude - minLongitude);

    console.log(JSON.stringify({
        minLongitude,
        avgLongitude,
        maxLongitude,
        minLatitude,
        avgLatitude,
        maxLatitude,
        span
    }))

    function getZoomLevel() {
        if (span <= 6) return 7;
        if (span <= 12) return 6;
        if (span <= 23) return 5;
        if (span <= 45) return 4;
        if (span <= 90) return 3;
        if (span <= 180) return 2;
        return 1;
    }

    const zoom = getZoomLevel();

    const key = await GoogleMapClient.getKey();

    return (
        <div className="mb-3 mt-3 row">
            <div style={{position: "relative"}}>
                <SearchMapApiClient props={{
                    key: key,
                    zoom: zoom,
                    longitude: avgLongitude,
                    latitude: avgLatitude,
                    ids: ids,
                    longitudes: ids.map(id => imageMetadataMap[id].longitude),
                    latitudes: ids.map(id => imageMetadataMap[id].latitude)
                }}/>
            </div>
        </div>
    );
}