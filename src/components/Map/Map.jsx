import React from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

import mapStyles from './mapStyles';
import divStyles from './Map.module.css';
import { fetchCompleteData } from '../../api';

const center = { lat: 8, lng: -1 };
const style = { width: '90%', height: '50vh', margin: 'auto' };
const options = { styles: mapStyles, disableDefaultUI: true, zoomControl: true, fullscreenControl: true };
const googleMapsApiKey = 'AIzaSyD1lEtysbbwF44VrCVopsXoK0dzrookSFc';

class Map extends React.Component {
	constructor() {
		super();
		this.state = { countriesData: [], selected: null, hasTouched: false };
	}

	async componentDidMount() {
		const data = await fetchCompleteData();

		setTimeout(() => {
			this.setState({ countriesData: data });
		}, 3000);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state !== nextState;
	}

	render() {
		const { selected, countriesData } = this.state;
		return (
			<div className={divStyles.wrapControl}>
				<LoadScript googleMapsApiKey={googleMapsApiKey}>
					<GoogleMap
						mapContainerStyle={style}
						zoom={3}
						center={center}
						options={options}
						onMouseOver={() => {
							if (!this.state.hasTouched) {
								this.setState({ hasTouched: true });
							}
						}}
					>
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
									<p>Infected: {selected.confirmed.value.toLocaleString('en')}</p>
									<p>Recovered: {selected.recovered.value.toLocaleString('en')}</p>
									<p>Deaths: {selected.deaths.value.toLocaleString('en')}</p>
								</div>
							</InfoWindow>
						)}
					</GoogleMap>
				</LoadScript>
			</div>
		);
	}
}

export default Map;
