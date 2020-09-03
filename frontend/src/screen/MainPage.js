import React from "react";
import SearchBar from "./../components/SearchBar";
import styled from 'styled-components';

export default function MainPage(){
    /**
     * Home Page for the Application
     * 
     * User can search their favorite soccer team
     */

    return (
        <Wrapper>
            <Image></Image>
            <SearchBar></SearchBar>
        </Wrapper>
    )
}

// <div> wrapper for the homepage
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`

// Logo image for the homepage
const Image = () => {
    return (<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="256" height="131" viewBox="0 0 1280.000000 658.000000"
            preserveAspectRatio="xMidYMid meet" style={{"marginTop": "5vh", "marginBottom": "5vh"}}>
            <g transform="translate(0.000000,658.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M795 6574 c-11 -2 -45 -9 -75 -15 -198 -38 -403 -173 -517 -339 -53
            -78 -113 -209 -135 -293 -32 -124 -29 -312 6 -430 26 -87 71 -187 107 -238
            l19 -26 -60 -12 c-134 -27 -171 -122 -110 -284 30 -81 72 -127 116 -127 29 0
            38 -6 59 -40 l26 -41 59 7 60 7 0 -32 c0 -43 19 -48 104 -27 102 26 211 35
            284 25 92 -13 117 -29 137 -89 19 -58 27 -65 75 -61 27 2 45 -5 75 -29 40 -32
            41 -32 130 -27 110 6 178 30 242 87 68 60 121 82 202 82 106 0 183 -26 352
            -119 156 -86 627 -298 909 -409 158 -62 266 -91 495 -134 283 -53 316 -65 478
            -173 55 -36 263 -164 464 -284 200 -120 387 -238 415 -263 42 -38 51 -53 59
            -94 15 -80 33 -93 242 -175 251 -98 388 -163 383 -180 -3 -9 -14 -65 -26 -126
            -32 -164 -74 -280 -172 -475 l-88 -175 -112 -44 c-172 -68 -330 -150 -472
            -245 -71 -47 -135 -86 -141 -86 -16 0 -112 -71 -229 -168 -122 -101 -158 -116
            -266 -112 -216 9 -226 7 -645 -133 -571 -193 -734 -296 -735 -470 0 -79 55
            -159 140 -203 77 -39 259 -30 498 27 68 16 151 29 184 29 60 0 62 -1 102 -45
            25 -26 51 -45 63 -45 34 0 69 52 103 154 60 180 54 178 425 187 450 11 574 31
            711 119 107 68 424 133 424 87 0 -26 40 -57 73 -57 41 0 156 26 379 83 98 25
            230 53 295 61 65 9 269 50 453 91 184 42 411 91 505 111 93 19 187 44 210 55
            22 12 76 51 120 88 44 37 87 72 96 79 9 7 50 21 91 31 92 24 414 143 778 289
            457 183 707 288 1297 546 l153 67 92 -35 c215 -80 560 -138 793 -133 l120 2
            100 -52 c55 -28 180 -96 279 -151 l178 -99 110 -189 c311 -535 465 -855 508
            -1054 33 -150 72 -636 62 -772 -3 -52 -2 -58 16 -58 10 0 31 9 46 21 44 34 68
            95 75 186 4 45 12 88 19 95 19 19 90 -22 272 -157 178 -132 241 -169 270 -160
            11 3 20 12 20 19 0 7 -48 72 -106 145 -59 72 -104 134 -102 136 2 3 37 -22 76
            -55 39 -33 113 -89 165 -124 175 -119 229 -112 178 23 -10 27 -15 53 -10 58
            12 12 -30 97 -83 168 -24 33 -105 116 -179 185 -264 246 -278 270 -454 790
            -179 527 -258 712 -367 857 -74 97 -352 377 -734 738 -202 192 -353 343 -387
            388 -32 42 -110 124 -174 184 -65 59 -156 146 -203 193 -47 47 -130 125 -185
            174 -122 107 -258 255 -322 350 -25 38 -66 115 -90 170 l-44 100 100 226 c103
            229 141 347 141 429 0 25 -9 105 -20 176 -11 72 -27 176 -35 232 -17 119 -45
            182 -104 236 -51 46 -79 60 -204 103 -122 43 -153 58 -189 92 -23 21 -28 23
            -28 9 0 -33 -41 -40 -157 -28 -147 15 -210 14 -334 -6 -98 -15 -108 -15 -139
            0 -43 22 -60 21 -60 -2 0 -45 -64 -91 -158 -115 -38 -9 -47 -16 -53 -40 -12
            -43 7 -125 41 -179 17 -27 30 -59 30 -72 0 -13 -18 -61 -40 -107 -44 -91 -63
            -169 -50 -204 12 -31 3 -59 -69 -203 -33 -68 -61 -132 -61 -141 0 -23 23 -41
            63 -49 l32 -7 5 -74 c3 -49 11 -84 23 -101 17 -26 17 -28 -4 -68 -14 -27 -23
            -67 -26 -120 -7 -94 0 -126 30 -145 34 -23 135 -36 192 -25 27 5 53 5 58 0 14
            -14 -115 -123 -406 -343 l-278 -210 -157 -33 c-208 -45 -325 -65 -379 -65
            -110 0 -255 60 -403 166 -51 37 -113 73 -137 80 -24 7 -96 16 -161 19 -176 9
            -246 23 -372 72 -105 42 -126 46 -240 54 -188 13 -255 26 -485 91 -115 33
            -237 66 -270 73 -74 18 -422 60 -601 74 -145 12 -210 30 -417 120 -65 28 -143
            57 -173 65 -30 8 -151 67 -269 131 -118 64 -250 129 -293 145 -142 52 -663
            157 -983 199 -93 12 -183 31 -226 46 -61 22 -101 27 -250 35 -159 8 -486 43
            -522 55 -9 4 -2 17 24 46 83 92 167 250 199 376 23 86 30 225 17 314 -48 344
            -292 625 -623 719 -70 21 -283 36 -333 24z"/>
            </g>
            </svg>)
} 
