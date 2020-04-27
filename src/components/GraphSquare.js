import React, {Component} from 'react';
import styled from 'styled-components';

const StyledSquare = styled.span`
    display: inline-block;
    height: 30px;
    width: 30px;
    border: 1px solid gray;
`;

class GraphSquare extends Component{
    render(){
        return(
            <StyledSquare />
        );
    }
}

export default GraphSquare;