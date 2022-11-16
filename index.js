#!/usr/bin/env node
import axios from 'axios'
import countryList from "country-list";

const country = process.argv[2];
const countryCode = countryList.getCode(country);
const year = new Date().getFullYear();

async function getCountryCodeAsync(year, countryCode) {
    return await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
}

const response = getCountryCodeAsync(year, countryCode);

response.then(datas => {
    for (let d of datas.data) {
        console.log(`${d.date}: ${d.name} - aka - ${d.localName}`);
    }
});