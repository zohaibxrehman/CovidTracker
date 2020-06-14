import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';

class App extends React.Component {
	constructor() {
		this.state = {
			data: {}
		}
	}

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}

	render() {
		return (
			<div>
				<Cards />
				<CountryPicker />
				<Chart />
			</div>
		);
	}
}

export default App;
