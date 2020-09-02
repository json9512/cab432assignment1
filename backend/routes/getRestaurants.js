// import express, axios and initialize router
const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * getRestaurants endpoint /getRestaurants/:lat/:lng
 * 
 * Retrieves the nearby restaurant information with the given coordinates
 * 
 */
router.get('/:lat/:lng', (req, res) => {

    // Check if given lat and lng is number
    if (isNaN(req.params.lat) || isNaN(req.params.lng)){
        return res.status(400).send({
            message: "Given lat/lng is not numeric"
        });
    }
    
    // Fetch the API using the given lat and lng
    axios({
        "method":"GET",
        "url":`https://${process.env.HOST_TRIPADVISOR}/restaurants/list-by-latlng`,
        "headers":{
        "content-type":"application/json",
        "x-rapidapi-host": `${process.env.HOST_TRIPADVISOR}`,
        "x-rapidapi-key": `${process.env.X_RAPIDAPI_KEY}`,
        "useQueryString":true
        },"params":{
        "limit":"10",
        "currency":"USD",
        "distance": "3",
        "latitude":`${req.params.lat}`,
        "longitude":`${req.params.lng}`
        }
        })
        .then(r => {
            return r.data;
        })
        .then(response => {
            // Send 204 no content if the data is nothing
            if (response.data.length < 1){
                return res.status(204).send();
            }

            // else, send the retrieved content
            res.writeHead(res.statusCode, {'content-type': 'text/html; charset=UTF-8'});
            res.write(JSON.stringify(response.data));
            res.end();
        })
        .catch(e => {
            // Catch error and send 400 when fetch fails
            console.log(e)
            return res.status(400).send({error: `getRestaurants failed due to ${e}`});
        });
})

module.exports = router;