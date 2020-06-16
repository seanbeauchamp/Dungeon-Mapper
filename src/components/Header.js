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
                <h1 style={{padding: "0%"}}>Placeholder Header</h1>
            </HeaderWrapper>
        );
    }
}

export default Header;