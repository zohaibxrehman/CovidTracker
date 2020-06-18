import axios from 'axios';
import countryToLocation from './countryToLocation';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
	let finalUrl = url;

	if (country) {
		finalUrl = `${url}/countries/${country}`;
	}

	try {
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(finalUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		return error;
	}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		return data.map(({ confirmed, deaths, reportDate: date }) => ({
			confirmed: confirmed.total,
			deaths: deaths.total,
			date
		}));
	} catch (error) {
		return error;
	}
};

export const fetchCountries = async () => {
	try {
		const { data: { countries } } = await axios.get(`${url}/countries`);
		let filter1 = countries.map((country) => {
			return { name: country.name, iso2: country.iso2 };
		});
		let filter2 = [];
		filter1.forEach((country, i) => {
			if (country.iso2 !== undefined) {
				filter2.push(country);
			}
		});
		return filter2;
	} catch (error) {
		return error;
	}
};

// export const oldFetchCompleteData = async () => {
// 	try {
// 		const { data: { countries } } = await axios.get(`${url}/countries`);
// 		let countriesData = [];
// 		countries.forEach(async (country) => {
// 			let response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
// 				params: {
// 					address: 'country ' + country.name,
// 					key: process.env.REACT_APP_GOOGLE_KEY
// 				}
// 			});
// 			if (response.status === 200 && response.data.results.length > 0) {
// 				let { lat, lng } = response.data.results[0].geometry.location;
// 				let countryCases = await axios.get(`${url}/countries/${country.name}`);
// 				if (country && !isNaN(lat) && countryCases && !isNaN(countryCases.data.confirmed.value)) {
// 					let scale = 1 + 1.1 * Math.log2(countryCases.data.confirmed.value);
// 					countriesData.push({
// 						name: country.name,
// 						location: { lat: lat, lng: lng },
// 						...countryCases.data,
// 						scale: scale
// 					});
// 				}
// 			} else {
// 			}
// 		});
// 		return countriesData;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const fetchMaster = async () => {
// 	const { data: { countries } } = await axios.get(`${url}/countries`);
// 	let countriesData = {};
// 	countries.forEach(async (country) => {
// 		let { lat, lng } = countryToLocation[country.name];
// 		console.log(`${country.name}: `, countryToLocation[country.name]);
// 		countriesData[country.name] = { lat: lat, lng: lng };
// 		// }
// 	});
// 	console.log('a:', countryToLocation);
// 	console.log(countriesData);
// };

export const fetchCompleteData = async () => {
	try {
		const { data: { countries } } = await axios.get(`${url}/countries`);
		let countriesData = [];
		countries.forEach(async (country) => {
			let { lat, lng } = countryToLocation[country.name];
			let countryCases = await axios.get(`${url}/countries/${country.name}`);
			if (country && !isNaN(lat) && countryCases && !isNaN(countryCases.data.confirmed.value)) {
				let scale = 1 + 1.1 * Math.log2(countryCases.data.confirmed.value);
				countriesData.push({
					name: country.name,
					location: { lat: lat, lng: lng },
					...countryCases.data,
					scale: scale
				});
			}
		});
		return countriesData;
	} catch (error) {
		console.log(error);
	}
};
