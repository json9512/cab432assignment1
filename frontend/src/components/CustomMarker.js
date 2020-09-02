import React, {useState} from "react";
import {Marker, InfoWindow} from '@react-google-maps/api';
import InformationBox from './InformationBox';

const CustomMarker = (props) => {
    /**
     * Creates a CustomMarker Component with given properties
     * which contains a google map Marker, InfoWindow Component, 
     * and a custom Information box component
     */

    // State to check if the information window component should be rendered
    const [showInfo, setShowInfo] = useState(true);

    const handleMarkerClick = (value) => {
        /**
         * Sets the showInfo state with the given value
         */
        setShowInfo(value);
    }

    // If the passed props obj is undefined, return null
    if (props.obj.name === undefined){
        return null;
    }

    const createInfoWindow = (obj) => {
        /**
         * Creates the InfoWindow Component with the information given from the object
         */
        const infoWindow = 
            <InfoWindow
                    position={{lat: parseFloat(obj.lat), lng: parseFloat(obj.lng)}}
                    onCloseClick={()=> {handleMarkerClick(false)}}    
                >
                    <InformationBox
                        img={obj.image}
                        clubInfo={false}
                        name={obj.name}
                        price={obj.price}
                        rating={obj.rating}
                        pos={{lat: obj.lat, lng: obj.lng}}
                        web={obj.web ? obj.web : null}
                    >
                    </InformationBox>
            </InfoWindow> 

        return infoWindow
    }

    return (
        <Marker 
                position={{lat: parseFloat(props.obj.lat), lng: parseFloat(props.obj.lng)}}
                onClick={()=>{handleMarkerClick(!showInfo)}}
                icon={{url: `${props.url}`}} 
            >
                {showInfo ? createInfoWindow(props.obj): null}
        </Marker>
    )
}

export default CustomMarker;