import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {

    const mapStyles = {
        height: "100vh",
        width: "100%"};

    const defaultCenter = {
        lat: 42.2808, lng: -83.7430
    }

    // TODO: Set up environment variable for api key
    return (
        <LoadScript
            googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            />
        </LoadScript>
    )
}

export default MapContainer;
