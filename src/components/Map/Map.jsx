import React, { useState, useEffect } from 'react';

import styles from './Map.module.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { fetchCountries, fetchData } from '../../api';

const codeToLatLng = require('./codeToLatLng.json');

const Map = () => {
	const [ countries, setCountries ] = useState([]);
	const [ clickedCountry, setClickedCountry ] = useState(null);
	useEffect(() => {
		const fetchAPI = async () => {
			setCountries(await fetchCountries());
		};

		fetchAPI();
	}, []);

	const GMap = () => {
		let filteredCountries = [];
		countries.map((country) => {
			if (codeToLatLng[country.iso2] !== undefined) {
				filteredCountries.push(country);
			}
		});
		return (
			<div className={styles.mapControl}>
				<GoogleMap defaultZoom={2} defaultCenter={{ lat: 8, lng: -1 }}>
					{filteredCountries.map((country, i) => (
						<Marker
							key={i}
							position={{
								lat: Number(codeToLatLng[country.iso2]['coordinate'][0]),
								lng: Number(codeToLatLng[country.iso2]['coordinate'][1])
							}}
							onClick={async () => {
								const covidData = await fetchData(country.name);
								setClickedCountry({ name: country.name, iso2: country.iso2, ...covidData });
							}}
						/>
					))}
					{clickedCountry && (
						<InfoWindow
							onCloseClick={() => {
								setClickedCountry(null);
							}}
							position={{
								lat: Number(codeToLatLng[clickedCountry.iso2]['coordinate'][0]),
								lng: Number(codeToLatLng[clickedCountry.iso2]['coordinate'][1])
							}}
						>
							<div>
								<h2>{clickedCountry.name}</h2>
								<p>Cofirmed: {clickedCountry.confirmed.value}</p>
								<p>Recovered: {clickedCountry.recovered.value}</p>
								<p>Deaths: {clickedCountry.deaths.value}</p>
							</div>
						</InfoWindow>
					)}
				</GoogleMap>
			</div>
		);
	};

	const Wrapper = withScriptjs(withGoogleMap(GMap));

	return (
		<div className={styles.wrapControl}>
			<Wrapper
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process
					.env.REACT_APP_GOOGLE_KEY}`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100%` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		</div>
	);
};

export default Map;
