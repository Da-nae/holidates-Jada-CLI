#!/usr/bin/env node
import axios from 'axios'
import chalk from 'chalk';
import countryList from "country-list";
import figlet from 'figlet';

const country = process.argv[2];
const countryCode = countryList.getCode(country);
const year = new Date().getFullYear();

async function getCountryCodeAsync(year, countryCode) {
    return await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
}

const response = getCountryCodeAsync(year, countryCode);

figlet('Holidates !', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});

response.then(datas => {

    for (let d of datas.data) {
        console.log(chalk.cyan(`${d.date}:`), chalk.yellow(`${d.name}`), chalk.magenta(`- aka - ${d.localName}`));
    }
});