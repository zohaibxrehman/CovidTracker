import React, {useState, useEffect} from 'react';

// import { fetchCountries } from '../../api';
import styles from './Map.module.css';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const Map = () => {
    const GMap = () => {
        return (
            <div className={styles.mapControl}>
                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                />
            </div>
        );
    };
    
    const Wrapper = withScriptjs(withGoogleMap(GMap));
    
    return (
        
        <div style={{ width: "50vw", height: "50vh" }}> 
            <Wrapper
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
};

export default Map;