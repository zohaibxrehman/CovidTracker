import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {}
		}
	}

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}

	render() {
		const { data } = this.state;

		return (
			<div>
				<Cards data={ data }/>
				<CountryPicker />
				<Chart />
			</div>
		);
	}
}

export default App;
