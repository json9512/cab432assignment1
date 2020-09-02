import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const MessageBox = (props) => {

    const [open, setOpen] = useState(false);

    const handleClick = () =>{
        setOpen(!open);
        if (props.messageBox.back){
            window.history.back();
        }
    }

    useEffect(() =>{
        if (props.messageBox.message){
            setOpen(true);
        }
    }, [props.messageBox.message])

    if (props === undefined){
        return null;
    }

    return (
        <div style={{"position": "absolute", "left": "0px", "top": "0px"}}>
            {open ? 
            <Wrapper>
                <TextBox>
                    <Head>
                        <Heading>Oops !</Heading>
                    </Head>

                    <Body>
                        <BodyText>{props.messageBox.message ? props.messageBox.message: "test"}</BodyText>
                        <CloseButton onClick={()=>{handleClick()}}>Close</CloseButton>
                    </Body>
                </TextBox>
            </Wrapper> : null}
        </div>
    )
    
}

const Wrapper = styled.div`
    position: absolute;
    background: rgba(27,38,44, 0.8);
    background-size: cover;
    width: 100vw;
    height: 100vh;
    z-index: 9999999;
`

const TextBox = styled.div`
    position: relative;
    width: 30vw;
    height: 30vh;
    background: white;
    left: 35vw;
    top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    -webkit-box-shadow: 3px 6px 16px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 3px 6px 16px 0px rgba(0,0,0,0.75);
    box-shadow: 3px 6px 16px 0px rgba(0,0,0,0.75);
`

const Head = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 10vh;
    background-color: #ea5455;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`

const Heading = styled.span`
    position: relative;
    top: 1vh;
    width: 30vw;
    height: 10vh;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: bolder;
    font-size: 5vh;
    text-align: center;
`

const Body = styled.div`
    position: relative;
    width: 30vw;
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    text-align: center;
`
const BodyText = styled.span`
    position: relative;
    font-family: 'Poppins', sans-serif;
    font-size: 3vh;
    text-align: center;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`
const CloseButton = styled.button`
    position: relative;
    font-family: 'Poppins', sans-serif;
    font-size: 2vh;
    text-align: center;
    width: auto;
    height: auto;
    top: 5vh;
    box-shadow:inset 0px 1px 0px 0px #97c4fe;
	background-color:#3d94f6;
	border-radius:6px;
	border:1px solid #337fed;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
    text-shadow:0px 1px 0px #1570cd;
    
    :hover {
        background-color:#1e62d0;
    }

    :active{
        top: 5.25vh;
    }

    :focus{
        outline: none;
    }
`

export default MessageBox;