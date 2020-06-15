import React from 'react';

import { Cards, Chart, CountryPicker, Tweet, Map } from './components';
import { Grid } from '@material-ui/core';
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
		console.log(process.env.REACT_APP_GOOGLE_KEY);
		return (
			<Grid container spacing={1}>
				<Grid item md={8} xs={12}>
				<div className={styles.container}>
					<img className={styles.image} src={image} alt="COVID-19" />
					<CountryPicker handleCountryChange={this.handleCountryChange}/>
					<Cards data={ data }/>
					<Chart data={data} country={country}/>
				</div>
				</Grid>
				<Grid item md={4} xs={12}>
					<Tweet />
					<Map />
				</Grid>
			</Grid>
		);
	}
}

export default App;
