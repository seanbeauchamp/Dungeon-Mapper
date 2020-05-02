import React, {Component} from 'react';
import styled from 'styled-components';

const CenterSquare = styled.div`
    position: relative,
    width: 100px,
    height: 100px
    border: 2px solid black;
`;

class BorderSelector extends Component{
    render(){
        return(
            <>
            <CenterSquare />
            </>
        )
    }
}

export default BorderSelector;