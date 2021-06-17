import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Locations from "./Locations";

// TODO: Jump to restaurant card on marker click
const MapContainer = () => {

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
                    Locations.locations.map(item => {
                        return (
                            <Marker key={item.id}
                                    position={item.location}
                                    label= {{
                                        text: item.id,
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
