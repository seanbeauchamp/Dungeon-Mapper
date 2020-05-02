import React, {Component} from 'react';
import styled from 'styled-components';

const StyledSquare = styled.span`
    display: inline-block;
    height: 30px;
    width: 30px;
    border-top: ${props => !props.borderSides.top ? 
        "1px solid #BBBBBB" : "2px solid black"};
    border-bottom: ${props => !props.borderSides.bottom ? 
        "1px solid #BBBBBB" : "2px solid black"};        
    border-right: ${props => !props.borderSides.right ? 
        "1px solid #BBBBBB" : "2px solid black"};
    border-left: ${props => !props.borderSides.left ? 
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
        this.changeAllSides();
        let newSides = this.props.checkAdjacentSquares(this.state.row, this.state.col, this.state.border);
        if (newSides){        
            for (var side in newSides){
                if (newSides[side]){
                    this.toggleSide(side);
                }
            }
        }
    }

    toggleSide = (side) => {
        let newBorderSides = this.state.borderSides;
        newBorderSides[side] = !newBorderSides[side];
        this.setState({borderSides: newBorderSides});
    }

    changeAllSides = () =>
    {
        let newState = !this.state.border;
        let tempSides = this.state.borderSides;
        for (let key in tempSides){
            tempSides[key] = newState;
        }
        this.setState({borderSides: tempSides, border: newState});
    }

    componentDidUpdate(prevProps, prevState){
        this.confirmBordersInPlace();
    }

    confirmBordersInPlace = () => {
        if (this.state.border){
            let borderFound = false;
            for (let key in this.state.borderSides){
                if(this.state.borderSides[key]){
                    borderFound = true;
                    break;
                }
            }
            if (!borderFound){
                this.setState({border: false});
            }
        }
    }

    render(){
        return(
            <StyledSquare bordered={this.state.border} onClick={this.toggleborder} borderSides={this.state.borderSides} />
        );
    }
}

export default GraphSquare;