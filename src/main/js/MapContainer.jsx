import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const MapContainer = () => {

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 42.2808, lng: -83.7430
    }

    // TODO: Store location information in JSON file
    const locations = [
        {
            id: '1',
            name: "Joe's Pizza",
            location: {
                lat: 42.275275685846324,
                lng: -83.73545554111642
            },
        },
        {
            id: '2',
            name: "Frita Batidos",
            location: {
                lat: 42.28079084122558,
                lng: -83.74947390622958,
            }
        },
   ]

    return (
        <LoadScript
            googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                options={{ styles: [{ elementType: "labels", featureType: "poi", stylers: [{ visibility: "off", }], }], }}
            >
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.id}
                                    position={item.location}
                                    label= {{
                                        text: item.id,
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                    }}
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
