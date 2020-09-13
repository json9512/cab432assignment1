// Load express, axios, and initialize router
const express = require('express');
const axios = require('axios');
const router = express.Router();
const utf8 = require('utf8');

const getClubAddress = (data) => {
    /**
     * Gets the club's physical address from the given response (data)
     * 
     */
    var clubAddress = ""
    if (data.venue_address !== null){
        clubAddress = utf8.encode(data.venue_address + " " + data.venue_city)
    }else{
        // Check for venue_name. if it does not exist use country name
        if (data.venue_name !== null){
            clubAddress = utf8.encode(data.venue_name);
        }else{
            console.log("No stadium information, using country name instead");
            clubAddress = utf8.encode(data.country);
        }
    }

    return clubAddress;
}


/**
 * Search endpoint /search?
 * 
 * Retrieves the football club's information from the FOOTBALL API
 */
router.get('/:query', (req, res) => {
    
    // Check if query is just letters and white spaces, otherwise throw error 
    var letters = /^[a-z][a-z\s]*$/;
    if (!req.params.query.match(letters)){
        return res.status(400).send({
            message: "Search string is not alphabets"
        });
    }
    
    // Fetch the information from the API
    axios({
        "method":"GET",
        "url":`https://${process.env.HOST_FOOTBALL}/v2/teams/search/${req.params.query}`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":`${process.env.HOST_FOOTBALL}`,
        "x-rapidapi-key": `${process.env.X_RAPIDAPI_KEY}`,
        "useQueryString":true
        }
        })
    .then(r => {
        // If data is not found, return error
        if (r.data === undefined || r.data.api.teams.length < 1){
            return res.status(400).send({error: "No search results found"});
        }else{
            // Final result to return 
            var result = {};

            // Use the first team found from the array of searched result
            var teamFound = r.data.api.teams[0];

            // Create the header for reponse
            res.writeHead(res.statusCode, {'content-type': 'text/html; charset=UTF-8'});

            // Store searched item's information on result object
            result["name"] = teamFound.name;
            result["logo"] = teamFound.logo ? teamFound.logo : null;
            result["venue_address"] = teamFound.venue_address ? teamFound.venue_address : null;
            result["venue_city"] = teamFound.venue_city ? teamFound.venue_city : null;
            result["venue_name"] = teamFound.venue_name ? teamFound.venue_name : null;
            result["country"] = teamFound.country ? teamFound.country : null;

            // Get the address of club's location
            const club_address = getClubAddress(teamFound);

            // Fetch the google api to get latitude and longitude
            axios({
                "method":"GET",
                "url":`https://${process.env.GOOGLE_GEOCODING_URL}?address=${club_address}&key=${process.env.GOOGLE_APIKEY}`,
                "headers":{
                    "useQueryString":true
                }
                })
            .then(r => {
                return r.data;
            })
            .then(response => {
                // If data is not found, return error
                if (response.status !== 'OK'){
                    return res.status(400).send({error: "No results found"});
                }else{
                    // Return the appropriate data fetched
                    result["lat"] = response.results[0].geometry.location.lat;
                    result["lng"] = response.results[0].geometry.location.lng;

                    // respond back to the client with the result object
                    res.write(JSON.stringify(result));
                    res.end();
                }
            })
            .catch(e => {
                // Return error if geo coding not found
                console.log(e);
                return res.status(400).send({error: `Search Failed due to ${e}`});
            });
        }
    })
    .catch(e => {
        // Return error if search does not exist
        console.log(e);
        return res.status(400).send({error: `Search Failed due to ${e}`});
    });
});

module.exports = router;