import React, {useState} from "react";
import styled from 'styled-components';
import Burger from '@animated-burgers/burger-squeeze';
import '@animated-burgers/burger-squeeze/dist/styles.css';
import axios from 'axios';

const BurgerMenu = (props) => {
    /**
     * Creates the BurgerMenu Component
     * 
     * contains 2 buttons (hotels, restaurants) which updates the 
     * "hotels" and "restaurant" states that is passed with props
     */
    const [open, setOpen] = useState(false);
    const [hotelClicked, setHotelClicked] = useState(false);
    const [restaurantClicked, setRestaurantClicked] = useState(false);

    const handleButtonClick = async (url, type) => {
        /**
         * Updates the props state by fetching the given url for the given type (hotel or restaurant)
         */
        var condition = false;
        // Store the condition to check if hotels or restaurants are already rendered on the map
        if (type === "hotel"){
            condition = hotelClicked;
            setHotelClicked(true);
        }else{
            condition = restaurantClicked;
            setRestaurantClicked(true);
        }
        // Exit if condition is already true
        if (condition){
            props.setMessageBox({message: `${type} already loaded on map`, back: false})
            return;
        } else{
            // Get the latitude and longitude information from props
            const lat = props.location.lat;
            const lng = props.location.lng;
            const results = []

            // Fetch the given url with lat and lng values
            await axios.get(`${url}${lat}/${lng}`)
            .then(res => {

                // Indicate no result message
                if (res.data.length < 1){
                    console.log(`No nearby ${type} available`);
                    props.setMessageBox({message: `No nearby ${type} available`, back: false});
                    return;
                }

                // Retrieve only 10 items
                // Create an object and extract only the items needed
                res.data.map(item => {
                    const modifiedItem = {
                        name: item.name,
                        lat: item.latitude,
                        lng: item.longitude,
                        image: item.photo ? item.photo.images.large.url : null,
                        price: item.price,
                        rating: item.rating,
                        web: item.website ? item.website : null
                    }
                    
                    // Store in temp array
                    results.push(modifiedItem);
                    return null;
                })

                
            })
            .catch(e => {
                console.log(e)
                
                // Set markers for hotels
                if (type === "hotel"){
                    setHotelClicked(false);
                } else {
                    // set markers for restaurants
                    setRestaurantClicked(false);
                }
            })

            // Set markers for hotels
            if (type === "hotel"){
                props.setHotels(results);
            } else {
                // set markers for restaurants
                props.setRestaurants(results);
            }

        }
    }

    const showContent = () => {
        /**
         * Renders the layout box containing the two buttons when the burgermenu is extended
         */

        if (open) {
            return (
                <ContentWrapper>
                    <Button disabled={hotelClicked} onClick={() => {handleButtonClick("http://localhost:8000/getHotels/", "hotel")}}>Hotels</Button>
                    <Button disabled={restaurantClicked} onClick={() => {handleButtonClick("http://localhost:8000/getRestaurants/", "restaurant")}}>Restaurants</Button>
                </ContentWrapper>
            )
        }

        return null;
    }

    return (
        <Wrapper>

            <Burger 
                isOpen={open} 
                style={{
                    "fontSize": '18px', 
                    "zIndex": '10000'}}  
                onClick={() => {setOpen(!open)}}/>
            {showContent()}
        </Wrapper>
        
        
    );
}

// CSS Styles
const Wrapper = styled.div`
    position: absolute;
    margin-left: 48%;
    margin-top: 1em;
    background: rgba(214, 224, 240, .8);
    z-index: 9999;
    border-radius: 25px;
    display: grid;
`

const ContentWrapper = styled.div`
    position: absolute;
    width: 10em;
    height 20vh;
    background: rgba(214, 224, 240, .8);
    border-radius: 25px;

    grid-row: 2 / 3;
    margin-left: -3.25em;
    margin-top: 1em;
`

const Button = styled.button`
    position: relative;
    width: 10em;
    height: 5em;
    background: white;
    border-radius: 25px;
    margin-top: 1.5em;
    margin-left: .7em;
    outline: none;
    font-size: 14px;
    font-weight: bold;
    border: white;
    -webkit-box-shadow: -6px -2px 34px -8px rgba(0,0,0,0.23);
    -moz-box-shadow: -6px -2px 34px -8px rgba(0,0,0,0.23);
    box-shadow: -6px -2px 34px -8px rgba(0,0,0,0.23);
    text-decoration: none;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    :hover:enabled {
        background: #F8F8FF;
        color: #339DFF;
        box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
    }
`

export default BurgerMenu;