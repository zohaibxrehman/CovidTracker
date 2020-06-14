import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';
import styles from './App.module.css';
import image from './images/covidtracker.png';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {},
			country: ''
		}
	}

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}

	handleCountryChange = async (country) => {
		const data = await fetchData(country);
		this.setState({ data, country: country });
	}

	render() {
		const { data, country } = this.state;

		return (
			<div className={styles.container}>
				<img className={styles.image} src={image} alt="COVID-19" />
				<CountryPicker handleCountryChange={this.handleCountryChange}/>
				<Cards data={ data }/>
				<Chart data={data} country={country}/>
			</div>
		);
	}
}

export default App;
