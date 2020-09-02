import React from 'react';
import styled from 'styled-components';


const InformationBox = (props) => {
    /**
     * Information Box Component inside the InfoWindow component
     * 
     * Shows an image, name, address, lat, lng for the football club
     * Shows an image (if available), name, location of the hotel/restaurant
     */
    if (props === undefined){
        return null;
    }

    return (
        <Wrapper>

            {props.img && props.clubInfo ? <Image src={props.img} /> : null}
            {props.img && props.clubInfo === false ? <Image src={props.img} style={{"width": "250px", "height": "120px"}} /> : null}
            <TextWrapper>
                { /**  Check if the information passed is a football club
                 * if true, format the information box for football club details
                 * else, format the information box to show hotel/restaurant details
                */
                props.clubInfo ?
                <div>
                    <h2>{props.clubName}</h2>
                    <span>Stadium/Country Name: <br/>{props.stadiumName}</span> 
                    <br />
                    <span>Stadium/Country Address: <br/>{props.stadiumAddress}</span>
                    <br />
                    <span>lat: {JSON.stringify(props.stadiumPos.lat.toFixed(5))}<br/> 
                        lng: {JSON.stringify(props.stadiumPos.lng.toFixed(5))}
                    </span>
                </div> 
                : 
                <div>
                    <h3>{props.name}</h3>
                    {props.rating ? <span>Rating: <br/>{props.rating}</span> : <span>Rating not available</span> }
                    <br />
                    {props.price? <span>Price: <br/>{props.price}</span> : <span>Price not available</span>}
                    <br />
                    <span>lat: {JSON.stringify(props.pos.lat)}<br/> 
                        lng: {JSON.stringify(props.pos.lng)}
                    </span>
                    {props.web ? <a href={props.web} target="_blank" rel="noopener noreferrer"><br/>{props.web} </a>: null} 
                </div> }
            </TextWrapper>

        </Wrapper>

    );


}

const Wrapper = styled.div`
    position: relative;
    background: white;
    width: 13vw;
    height: 35vh;
    display: grid;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 64px;
    height: 64px;
    align-items: center;
    justify-content: center;
`

const TextWrapper = styled.div`
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
`

export default InformationBox;
