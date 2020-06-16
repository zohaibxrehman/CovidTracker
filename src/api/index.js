import axios from 'axios';

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
