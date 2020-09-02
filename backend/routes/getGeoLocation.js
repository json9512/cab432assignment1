// Load express, axios, and initialize router
const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * getGeolocation endpoint /getGeoLocation?
 * 
 * Retrieves the football club's coordinates from the Google API using the given address
 */
router.get('/:query', (req, res) => {
    
    // Fetch the API to retrieve data
    axios({
        "method":"GET",
        "url":`https://${process.env.GOOGLE_GEOCODING_URL}?address=${req.params.query}&key=${process.env.GOOGLE_APIKEY}`,
        "headers":{
            "useQueryString":true
        }
        })
    .then(r => {
        return r.data;
    })
    .then(response => {
        console.log(response)
        // If data is not found, return error
        if (response.status !== 'OK'){
            return res.status(400).send({error: "No results found"});
        }else{
            // Return the appropriate data fetched
            res.writeHead(res.statusCode, {'content-type': 'text/html; charset=UTF-8'});
            res.write(JSON.stringify(response.results[0].geometry.location));
            res.end();
        }
    })
    .catch(e => {
        // Return error
        console.log(e);
        return res.status(400).send({error: `Search Failed due to ${e}`});
    });
})

module.exports = router;