'use client'

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

export default async function SearchMapApiClient({ props }) {
    return (
        <APIProvider apiKey={props.key}>
            <Map
                style={{width: '80vw', height: '60vh'}}
                defaultCenter={{lat: props.latitude, lng: props.longitude}}
                defaultZoom={props.zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                {props.ids.map((id, idx) => 
                    <Marker position={{
                            lat: props.latitudes[idx], 
                            lng: props.longitudes[idx]
                        }}
                        icon={{
                            url: `images/${id}.jpg`,
                            scaledSize: {width: 100, height: 100}
                        }}
                    />
                )}
                
            </Map>
        </APIProvider>
    );
}