import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from './mapStyles';
import divStyles from './Map.module.css';
import { fetchCompleteData } from '../../api';
 

const center = { lat: 8, lng: -1 };
const style = {width:'37vw', height:'50vh', margin: 'auto'};
const options = {styles: mapStyles, disableDefaultUI: true, zoomControl: true, fullscreenControl: true};

const Map = () => {
    const [countriesData, setCountriesData] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(async () => {
        async function fetchData(){
            const data = await fetchCompleteData();
            setCountriesData(data);
		};
        fetchData();
    }, [])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps...";

    return (
        <div className={divStyles.wrapControl}>
            <GoogleMap mapContainerStyle={style} zoom={2} center={center} options={options}>
                {(countriesData.map((country, id) => (
                    <Marker key={id} position={country.location} icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: country.scale,
                        fillColor: 'red',
                        fillOpacity: 0.3,
                        strokeColor: 'white',
                        strokeWeight: 0.5,
                        }}
                        onClick={()=>{
                            setSelected(country);
                        }}
                    >
                    </Marker>
                )))}

                {selected && (<InfoWindow position={selected.location} onCloseClick={()=>{setSelected(null)}}>
                    <div>
                        <h2>{selected.name}</h2>
                        <p>Infected: {selected.confirmed.value}</p>
                        <p>Recovered: {selected.recovered.value}</p>
                        <p>Deaths: {selected.deaths.value}</p>
                    </div>                
                    </InfoWindow>)}
            </GoogleMap>
        </div>
    );
};

export default Map;