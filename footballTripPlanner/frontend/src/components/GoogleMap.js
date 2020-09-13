import React, {useState, useCallback, useEffect} from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import InformationBox from './InformationBox';
import CustomMarker from './CustomMarker';

// import google map key from environment
const GMAP_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function GoogleMapComponent(props){
    /**
     * Renders Google Map 
     * 
     * places markers at: 
     *  1. Home stadium of the club if info exists
     *  2. Country of the club if home stadium info is not available
     *  3. Near by Hotels when "Hotels" button is clicked from the burger menu component
     *  4. Near by Restaurants when "Restaurants" button is clicked from burger menu component
     * 
     * Creates InformationWindows:
     *  1. For the club at the given position property
     *  2. Hotels and restaurants when appropriate buttons are clicked from the burger menu
     */
    // Initialize the states
    const [map, setMap] = useState(null);
    const [clubInfowindowVisible, setClubInfoWindowVisible] = useState(false);
    const [markers, setMarkers] = useState([]);

    // Decoder component to decode predefined html-entities
    const Entity = require('html-entities').XmlEntities;
    const decoder = new Entity();

    const createClubMarker = () => {
        /**
         * Creates a Marker component to locate the club on the Map
         * 
         * return: 
         *      Google Marker Component
         */
        let stadiumAddress = props.stadiumAddress;
        const stadiumPos = {lat: props.stadiumPos.lat, lng: props.stadiumPos.lng};
        if (stadiumAddress === ""){
            stadiumAddress = "N/A"
        } else {
            return(
                <Marker 
                    position={stadiumPos}
                    onClick={() => setClubInfoWindowVisible(true)}
                />
            )
        }
    }

    const createClubInfoWindow = () => {
        /**
         * Creates a InfoWindow Component to locate on the map
         * Contains the information about the club
         * 
         * return:
         *      Google Map InfoWindow Component
         * 
         */
        // initialize the necessary variables to store club details
        const clubName = decoder.decode(props.clubName);
        const clubLogo = props.clubLogo;
        const stadiumName = decoder.decode(props.stadiumName);
        let stadiumAddress =decoder.decode(props.stadiumAddress);
        const stadiumPos = props.stadiumPos;
        
        if (stadiumAddress === ""){
            stadiumAddress = "N/A"
        } else {
            return(
                <InfoWindow 
                    position={stadiumPos}
                    onCloseClick={() => setClubInfoWindowVisible(false)}
                >
                    <InformationBox 
                        img={clubLogo}
                        clubName={clubName}
                        stadiumName={stadiumName}
                        stadiumAddress={stadiumAddress}
                        stadiumPos={stadiumPos}
                        clubInfo={true}
                        ></InformationBox>
                </InfoWindow>
            )
        }
    }

    const onLoad = useCallback(function callback(map) {
        /**
         * Loads the Google map component to the window
         */
        
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map){
        /**
         * Unmounts the Google map component from the window
         */
        setMap(null);
    }, []);

    const createCustomMarker = (obj, key, url) => {
        /**
         * Creates a CustomMarker component with the give object and key
         * URL sets the icon for the marker
         */

        return <CustomMarker obj={obj} key={key} url={url}/>
    }
    
    useEffect(()=>{
        /**
         * Render markers for Hotels if the "hotels" state is changed
         * 
         */
        if (props.hotels){
            var hotelMarkers = [];

            // For each item in "hotels" state,
            // Create a Marker and update the markers state on current component
            props.hotels.map((item, key) => {
                key = markers.length + key
                hotelMarkers.push(createCustomMarker(item, 
                    key, 
                    "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"));
                return null;
            })

            // update markers state
            setMarkers([...markers, ...hotelMarkers]);   
        }
        
    }, [props.hotels])
    
    useEffect(()=>{
        /**
         * Renders restaurants markers when "restaurants" state is changed
         * 
         */
        if (props.restaurants){
            var restaurantMarkers = [];
            props.restaurants.map((item, key) => {
                key = markers.length + key
                restaurantMarkers.push(createCustomMarker(item, 
                    key, 
                    "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"));
                return null;
            })

            setMarkers([...markers, ...restaurantMarkers]);
        }
        
        
    }, [props.restaurants])

    return (
        <LoadScript 
            googleMapsApiKey={GMAP_KEY}
        >
            {/** 
             * Create the google map component and render markers / infowindows
            */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{lat: props.stadiumPos.lat, lng: props.stadiumPos.lng}}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >   
                {createClubMarker()}
                {clubInfowindowVisible ? createClubInfoWindow() : null}
                {markers ? markers : null}
                
            </GoogleMap>
            
        </LoadScript>
    )
}

// set container style for google maps
const containerStyle = {
    width: '100vw',
    height: '100vh'
};

export default React.memo(GoogleMapComponent)