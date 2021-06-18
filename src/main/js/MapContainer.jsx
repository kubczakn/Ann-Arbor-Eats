import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// TODO: Jump to restaurant card on marker click
const MapContainer = ( { posts } ) => {

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 42.2808, lng: -83.7430
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={defaultCenter}
                options={{ styles: [{ elementType: "labels", featureType: "poi", stylers: [{ visibility: "off", }], }], }}
            >
                {
                    Object.keys(posts).map((key, index) => {
                        return (
                            <Marker key={index}
                                    position={{
                                        lat: posts[key].lat,
                                        lng: posts[key].lng
                                    }}
                                    label= {{
                                        text: String(posts[key].id),
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                    }}
                                    clickable={true}
                            />
                        )
                    })
                }
            }
            </GoogleMap>
        </LoadScript>

    )
}

export default MapContainer;
