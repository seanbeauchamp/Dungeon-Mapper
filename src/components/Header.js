import React, {Component} from "react";
import styled from 'styled-components';

const HeaderWrapper = styled.section`
    background-color: #DDDDDD;
    width: 100%;
    display:inline-block;
`;

class Header extends Component{
    render(){
        return(
            <HeaderWrapper id="mainHeader" className="text-center">
                <h2 style={{padding: "0%"}}>Square Dungeon</h2>
                <h5>Grid-Based Mapping App</h5>
            </HeaderWrapper>
        );
    }
}

export default Header;