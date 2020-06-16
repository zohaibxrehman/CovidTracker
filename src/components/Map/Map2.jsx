// import React from 'react';
// import styles from './Map.module.css';
// import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import { fetchCountries, fetchData } from '../../api';
// import mapStyles from './mapStyles';

// const codeToLatLng = require('./codeToLatLng.json');

// // class Map2 extends React.Component {
// // 	constructor() {
// // 		super();
// // 		this.state = {
// // 			countries: [],
// // 			clickedCountry: null
// // 		};
// // 	}

// // 	async componentDidMount() {
// // 		const newCountries = await fetchCountries();
// // 		this.setState({ countries: newCountries });
// // 	}

// // 	GMap = () => {
// // 		let filteredCountries = [];
// // 		const { countries } = this.state;
// // 		const { clickedCountry } = this.state;
// // 		countries.map((country) => {
// // 			if (codeToLatLng[country.iso2] !== undefined) {
// // 				filteredCountries.push(country);
// // 			}
// // 		});
// // 		let covidData = {};
// // 		filteredCountries.forEach(async (country) => {
// // 			let countryName = country.name;
// // 			let countryData = await fetchData(countryName);
// // 			covidData[country.name] = countryData;
// // 		});

// // 		function getScale(covid, countryName) {
// // 			// return covidData[country.name].scale;
// // 			if (covid[countryName]) {
// // 				return 5;
// // 			} else {
// // 				return 30;
// // 			}
// // 		}

// // 		return (
// // 			<div className={styles.mapControl}>
// // 				<GoogleMap
// // 					defaultZoom={2}
// // 					defaultCenter={{ lat: 8, lng: -1 }}
// // 					defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}
// // 				>
// // 					{filteredCountries.map((country, i) => (
// // 						<Marker
// // 							key={i}
// // 							position={{
// // 								lat: Number(codeToLatLng[country.iso2]['coordinate'][0]),
// // 								lng: Number(codeToLatLng[country.iso2]['coordinate'][1])
// // 							}}
// // 							onClick={() => {
// // 								// let covidData = await fetchData(country.name);
// // 								let countryData = covidData[country.name];
// // 								this.setState({
// // 									clickedCountry: { name: country.name, iso2: country.iso2, ...countryData }
// // 								});
// // 							}}
// // 							icon={{
// // 								path: window.google.maps.SymbolPath.CIRCLE,
// // 								// scaledSize: new window.google.maps.Size(20, 20)
// // 								scale: getScale(covidData, country.name),
// // 								fillColor: 'red',
// // 								fillOpacity: 0.2,
// // 								strokeColor: 'white',
// // 								strokeWeight: 0.5
// // 							}}
// // 						/>
// // 					))}
// // 					{clickedCountry &&
// // 					clickedCountry.confirmed && (
// // 						<InfoWindow
// // 							onCloseClick={() => {
// // 								this.setState({ clickedCountry: null });
// // 							}}
// // 							position={{
// // 								lat: Number(codeToLatLng[clickedCountry.iso2]['coordinate'][0]),
// // 								lng: Number(codeToLatLng[clickedCountry.iso2]['coordinate'][1])
// // 							}}
// // 						>
// // 							<div>
// // 								<h2>{clickedCountry.name}</h2>
// // 								<p>Cofirmed: {clickedCountry.confirmed.value}</p>
// // 								<p>Recovered: {clickedCountry.recovered.value}</p>
// // 								<p>Deaths: {clickedCountry.deaths.value}</p>
// // 							</div>
// // 						</InfoWindow>
// // 					)}
// // 				</GoogleMap>
// // 			</div>
// // 		);
// // 	};

// // 	render() {
// // 		const G = this.GMap();
// // 		const Wrapper = withScriptjs(withGoogleMap(G));
// // 		return (
// // 			<div className={styles.wrapControl}>
// // 				<Wrapper
// // 					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process
// // 						.env.REACT_APP_GOOGLE_KEY}`}
// // 					loadingElement={<div style={{ height: `100%` }} />}
// // 					containerElement={<div style={{ height: `100%` }} />}
// // 					mapElement={<div style={{ height: `100%` }} />}
// // 				/>
// // 			</div>
// // 		);
// // 	}
// // }

// export default Map2;
