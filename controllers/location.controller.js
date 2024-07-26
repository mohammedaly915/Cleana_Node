const Country = require('../models/Country');
const City = require('../models/City');
const axios = require('axios');
// Country and City Initialization from External API
const fetchCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
};

// Fetch city data from external API
// const fetchCities = async (countryCode) => {
//     try {
//         const response = await axios.get(`http://api.geonames.org/searchJSON?formatted=true&country=${countryCode}&maxRows=10&username=moali915`); // Replace 'demo' with your actual GeoNames username
//         if (response.data && response.data.geonames) {
//             return response.data.geonames.map(city => city.name);
//         } else {
//             return [];
//         }
//     } catch (error) {
//         console.error(`Error fetching cities for country code ${countryCode}:`, error.message);
//         return [];
//     }
// };

const fetchCitiesFromGeoNames = async (countryCode) => {
    try {
        const geoNamesUsername = 'moali915'; // Replace with your GeoNames username

        const response = await axios.get(`http://api.geonames.org/searchJSON?formatted=true&country=${countryCode}&maxRows=10&username=${geoNamesUsername}`);
        if (response.data && response.data.geonames) {
            return response.data.geonames.map(city => city.name);
        } else {
            return [];
        }
    } catch (error) {
        console.error(`Error fetching cities for country code ${countryCode}:`, error.message);
        return [];
    }
};



const initializeCountriesAndCities = async (req, res) => {
    try {
        // Fetch country data from external API
        const countries = await fetchCountries();

        // Iterate over each country and save to database
        for (const countryData of countries) {
            let country = await Country.findOne({ name: countryData.name.common });
            if (!country) {
                country = new Country({ name: countryData.name.common });
                await country.save();
            }

            // const country = new Country({ name: countryData.name.common });
            // await country.save();
              // Fetch cities for the country
            //  const cities = await fetchCities(countryData.cca2); // Use appropriate country identifier
              const cities = await fetchCitiesFromGeoNames(countryData.cca2); // Use appropriate country identifier
 
              // Check and save cities
              for (const cityName of cities) {
                  let city = await City.findOne({ name: cityName, country: country._id });
                  if (!city) {
                      city = new City({ name: cityName, country: country._id });
                      await city.save();
                  }
              }
            // const cities = await fetchCities() // Replace with actual city fetching logic

            //     for (const cityName of cities) {
            //         const city = new City({ name: cityName, country: country._id });
            //         await city.save();
            //     }
        }

        res.status(201).json({ message: 'Countries and cities initialized' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Country Controllers
const createCountry = async (req, res) => {
    try {
        const country = new Country(req.body);
        await country.save();
        res.status(201).json(country);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// City Controllers
const createCity = async (req, res) => {
    try {
        const city = new City({
            name: req.body.name,
            country: req.params.countryId
        });
        await city.save();
        res.status(201).json(city);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCitiesByCountry = async (req, res) => {
    try {
        const cities = await City.find({ country: req.params.countryId });
        res.status(200).json(cities);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports={
    initializeCountriesAndCities,
    createCountry,
    getCountries,
    createCity,
    getCitiesByCountry
}
