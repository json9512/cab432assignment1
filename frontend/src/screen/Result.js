import React, {useState, useEffect} from "react";
import GoogleMapComponent from './../components/GoogleMap';
import BurgerMenu from './../components/BurgerMenu';
import axios from 'axios';
import MessageBox from './../components/MessageBox';

const ResultPage = (props) => {
    /**
     * ResultPage
     * 
     * Shows the Google Map and the appropriate components for the result page
     */
    // Initiate necessary states and module
    const searchQuery = props.location.state.searchQuery;
    const [loaded, setLoading] = useState(false);
    const [clubName, setClubName] = useState("");
    const [stadiumName, setStadiumName] = useState("");
    const [stadiumAddress, setStadiumAddress] = useState("");
    const [stadiumPos, setStadiumPos] = useState({});
    const [clubLogo, setClubLogo] = useState("");
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [messageBox, setMessageBox] = useState({});

    // import utf8 for string encoding and decoding
    const utf8 = require('utf8');
    
    const getClubInformation = async () => {
        /**
         * Search enpoint to retrieve the football club's information
         * 
         */
        if (searchQuery.length < 3){
            setMessageBox({message: "Search string too short", back: true});
            setLoading(true);
            return;
        }

        await axios.get(`http://localhost:8000/search/${searchQuery}`)
        .then( res=>{
            // Data returns an array of possible clubs
            // Retrieve the first result only 
            // Set ClubName
            setClubName(res.data[0].name);

            // Store the stadium name and address if it exists
            // if venue_address (stadium address) does not exist, use country 
            if (res.data[0].venue_address !== null){
                // encode to utf8
                const stadiumAddress = utf8.encode(res.data[0].venue_address + " " + res.data[0].venue_city)
                setStadiumAddress(stadiumAddress);
                setStadiumName(res.data[0].venue_name);
            }else{
                // Check for venue_name. if it does not existsm use country name
                if (res.data[0].venue_name !== null){
                    const stadiumName = utf8.encode(res.data[0].venue_name);
                    setStadiumAddress(stadiumName);
                    setStadiumName(stadiumName);
                }else{
                    console.log("No stadium information, using country name instead");
                    setStadiumAddress(utf8.encode(res.data[0].country));
                    setStadiumName(utf8.encode(res.data[0].country));
                }
            }

            // Store the logo
            if (res.data[0].logo){
                setClubLogo(res.data[0].logo);
            } else {
                console.log("No Club Logo");
            }
        })
        .catch(e =>{
            // catch error and redirect to '/' path
            console.log(e)
            setMessageBox({message: "Search not found", back: true});
            setLoading(true);
        })
    }

    const getGeoLocation = async () =>{
        /**
         * Gets the latitude and the longitude of the given stadium address
         */
        
        if (stadiumAddress && loaded === false){
            // fetch the API endpoint
            await axios.get(`http://localhost:8000/getGeoLocation/${stadiumAddress}`)
            .then(res => {
                if (res.data){
                    // if data is retrieved, set the position 
                    // && set loaded state to true
                    setStadiumPos(res.data);
                    setLoading(true);
                }  
            })
            .catch(e => {
                console.log(e)
                setMessageBox({message: "Coordinates can't be found", back: true})
            });
        }        
    }

    useEffect(()=>{
        // Get the club information once when the page renders or the searchQuery changes
        getClubInformation();
        
    }, [searchQuery])

    useEffect(() => {
        // get the geocoding of the club's address until it gets an actual value
        getGeoLocation();
    })

    return (
        <div>
        { 
        /**
         * Check if loaded is true, render components if load is true else show loading message
         */
        loaded ?
            <div>
                {/**
                 * Pass the "setHotels", "setRestaurants" hook functions to BurgerMenu component
                 * Pass the relevent states for GoogleMapComponent
                 */}
                <MessageBox messageBox={messageBox}/>
                <BurgerMenu 
                    setHotels={setHotels} 
                    setRestaurants={setRestaurants}
                    setMessageBox={setMessageBox}
                    location={stadiumPos} />
                <GoogleMapComponent 
                    clubName={clubName}
                    clubLogo={clubLogo}
                    stadiumName={stadiumName}
                    stadiumAddress={utf8.decode(stadiumAddress)}
                    stadiumPos={stadiumPos}
                    hotels={hotels ? hotels : null}
                    restaurants={restaurants ? restaurants : null}
                />
            </div>
        : "Loading"}
        </div>
        
    );
}




export default ResultPage;