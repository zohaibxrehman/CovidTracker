import React, { useState, useEffect } from 'react';

import styles from './Map.module.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import { fetchCountries } from '../../api';

const codeToLatLng = require('./codeToLatLng.json');

const Map = () => {
	const [ countries, setCountries ] = useState([]);

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
		console.log(filteredCountries);
		return (
			<div className={styles.mapControl}>
				<GoogleMap defaultZoom={8} defaultCenter={{ lat: 42.546245, lng: 1.601554 }}>
					{filteredCountries.map((country, i) => (
						<Marker
							key={i}
							position={{
								lat: Number(codeToLatLng[country.iso2]['coordinate'][0]),
								lng: Number(codeToLatLng[country.iso2]['coordinate'][1])
							}}
						/>
					))}
				</GoogleMap>
			</div>
		);
	};

	const Wrapper = withScriptjs(withGoogleMap(GMap));

	return (
		<div style={{ width: '50vw', height: '50vh' }}>
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
