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
            <HeaderWrapper className="text-center">
                <h1 style={{padding: "1%"}}>Placeholder Header</h1>
            </HeaderWrapper>
        );
    }
}

export default Header;