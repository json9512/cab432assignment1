// Load express, axios, and initialize router
const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Search endpoint /search?
 * 
 * Retrieves the football club's information from the FOOTBALL API
 */
router.get('/:query', (req, res) => {
    
    // Check if query is just letters, otherwise throw error 
    var letters = /^[A-Za-z]+$/;
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
            // Return the appropriate data fetched
            res.writeHead(res.statusCode, {'content-type': 'text/html; charset=UTF-8'});
            res.write(JSON.stringify(r.data.api.teams));
            res.end();
        }
    })
    .catch(e => {
        // Return error
        console.log(e);
        return res.status(400).send({error: `Search Failed due to ${e}`});
    });
});

module.exports = router;