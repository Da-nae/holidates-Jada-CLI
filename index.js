// Calling the database : 
const {Dataset} = require('data.js')

const path = 'https://datahub.io/core/country-list/datapackage.json'

// We're using self-invoking function here as we want to use async-await syntax:
;(async () => {
    const dataset = await Dataset.load(path)
    // get all tabular data(if exists any)
    for (const id in dataset.resources) {
        if (dataset.resources[id]._descriptor.format === "csv") {
        const file = dataset.resources[id]
        // Get a raw stream
        const stream = await file.stream()
        // print data
        stream.pipe(process.stdout)
        }
    }
})()

// Calling the prompt to be able to read the input from the user :
const prompt = require('prompt-sync')();

// Creation of two parameters to host the country and code :
const countryName = prompt('What country do you wish to know the holidays?');
console.log(countryName);
let countryCode;