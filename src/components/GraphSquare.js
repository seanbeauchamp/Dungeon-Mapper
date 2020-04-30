import React, {Component} from 'react';
import styled from 'styled-components';

const StyledSquare = styled.span`
    display: inline-block;
    height: 30px;
    width: 30px;
    border-top: ${props => !props.bordered && !props.borderSides.top ? 
        "1px solid #BBBBBB" : "2px solid black"};
    border-bottom: ${props => !props.bordered && !props.borderSides.bottom ? 
        "1px solid #BBBBBB" : "2px solid black"};        
    border-right: ${props => !props.bordered && !props.borderSides.right ? 
        "1px solid #BBBBBB" : "2px solid black"};
    border-left: ${props => !props.bordered && !props.borderSides.left ? 
        "1px solid #BBBBBB" : "2px solid black"}; 
`;

class GraphSquare extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: false,
            border: false,
            borderSides: {
                top: false,
                bottom: false,
                right: false,
                left: false
            },
            row: this.props.rowNum,
            col: this.props.colNum
        }
    }

    toggleborder = () => {
        this.setState({border: !this.state.border});
        let newSides = this.props.checkAdjacentSquares(this.state.row, this.state.col);
        for (var side in newSides){
            if (side){
                this.toggleSide(side);
            }
        }
    }

    toggleSide = (side) => {
        let newBorderSides = this.state.borderSides;
        newBorderSides[side] = !newBorderSides[side];
        this.setState({borderSides: newBorderSides});
    }

    render(){
        return(
            <StyledSquare bordered={this.state.border} onClick={this.toggleborder} borderSides={this.state.borderSides} />
        );
    }
}

export default GraphSquare;