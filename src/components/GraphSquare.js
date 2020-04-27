import React, {Component} from 'react';

const StyledSquare = styled.span`
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