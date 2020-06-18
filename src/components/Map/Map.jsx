import React from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

import mapStyles from './mapStyles';
import divStyles from './Map.module.css';
import { fetchCompleteData } from '../../api';

const center = { lat: 8, lng: -1 };
const style = { width: '95%', height: '50vh', margin: 'auto' };
const options = { styles: mapStyles, disableDefaultUI: true, zoomControl: true, fullscreenControl: true };
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_KEY;

class Map2 extends React.Component {
	constructor() {
		super();
		this.state = { countriesData: [], selected: null };
	}

	async componentDidMount() {
		const data = await fetchCompleteData();
		this.setState({ countriesData: data });
	}
	render() {
		const { selected, countriesData } = this.state;

		return (
			<div className={divStyles.wrapControl}>
				<LoadScript googleMapsApiKey={googleMapsApiKey}>
					<GoogleMap mapContainerStyle={style} zoom={2} center={center} options={options}>
						{countriesData.map((country, id) => (
							<Marker
								key={id}
								position={country.location}
								icon={{
									path: window.google.maps.SymbolPath.CIRCLE,
									scale: country.scale,
									fillColor: 'red',
									fillOpacity: 0.3,
									strokeColor: 'white',
									strokeWeight: 0.5
								}}
								onClick={() => {
									this.setState({ selected: country });
								}}
							/>
						))}

						{selected && (
							<InfoWindow
								position={selected.location}
								onCloseClick={() => {
									this.setState({ selected: null });
								}}
							>
								<div>
									<h2>{selected.name}</h2>
									<p>Infected: {selected.confirmed.value}</p>
									<p>Recovered: {selected.recovered.value}</p>
									<p>Deaths: {selected.deaths.value}</p>
								</div>
							</InfoWindow>
						)}
					</GoogleMap>
				</LoadScript>
			</div>
		);
	}
}

export default Map2;
