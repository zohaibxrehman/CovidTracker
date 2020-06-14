import React, {useState, useEffect} from 'react';
import {FormControl, Select} from '@material-ui/core';

import { fetchCountries } from '../../api';
import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountryChange}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
        setCountries(await fetchCountries());
        };

        fetchAPI();
    }, []);

    return (
        <FormControl variant="outlined" className={styles.formControl}>
            <Select native defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
            <option value="">Global</option>
            {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </Select>
        </FormControl>
    );
};

export default CountryPicker;