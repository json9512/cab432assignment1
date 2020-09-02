import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = () => {
    /**
     * Search Bar component 
     * 
     * Contains input field and a button
     */
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for your favorite football club"></Input>
            <Link to={{
                pathname: '/result',
                state: {searchQuery: searchQuery}
            }}>
                <Button>Search</Button>
            </Link>
            
        </div>
    )

}

// CSS styles
const Input = styled.input`
    margin-left: 25vw;
    width: calc(10px + 50vw);
    height: 100%;
    font-size: calc(16px + 1vw);
    border-radius: 30px;
    border: 2px solid #339DFF;
    padding-left: 1vw;
    outline: none;

    ::placeholder,
    ::-webkit-input-placeholder {
        font-size: calc(16px + .4vw);
    }

    :-ms-input-placeholder{
        font-size: calc(16px + .4vw);
    }
    
`

const Button = styled.button`
    background: #339DFF;
    display: inline-block;
    background: #339DFF;
    color: #fff;
    text-decoration: none;
    font-size: calc(16px + .1vw);
    line-height: calc(38px + .1vw);
    border-radius: 50px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    width: calc(170px + .5vw);
    text-align: center;
    border: none;
    outline:none;
    margin-top: 3em;
    margin-left: 46vw;
    justify-content: center;

    :hover {
        background: #F8F8FF;
        color: #339DFF;
        box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
      }
`


export default SearchBar;