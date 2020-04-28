import React, {Component} from 'react';
import styled from 'styled-components';

const StyledSquare = styled.span`
    display: inline-block;
    height: 30px;
    width: 30px;
    border: ${props => !props.bordered ? 
        "1px solid #BBBBBB" : "2px solid black"};
`;

class GraphSquare extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: false,
            border: false,
            row: this.props.rowNum,
            count: this.props.colNum
        }
    }

    toggleborder = () => {
        this.setState({border: !this.state.border});
        this.props.checkAdjacentSquares();
    }

    render(){
        return(
            <StyledSquare bordered={this.state.border} onClick={this.toggleborder} />
        );
    }
}

export default GraphSquare;