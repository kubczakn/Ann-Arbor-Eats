import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link } from 'react-scroll';

// TODO: Jump to restaurant card on marker click
const MapContainer = ( { posts } ) => {

    const mapStyles = {
        height: "100vh",
        width: "100%",
        position: "sticky",
        right: 0
    };

    const defaultCenter = {
        lat: 42.2808, lng: -83.7430
    }

    return (
        <div style={{position: "sticky", top: 60, Index: 3 }}>
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
        </div>


    )
}

export default MapContainer;
