import React, {Component} from 'react';
import styled from 'styled-components';

import goblinFace from '../Images/GoblinFace.png';
import lootBag from '../Images/LootBag.png';

const StyledSquare = styled.span`
    background-color: ${props => !props.selected ?
        props.backgroundNeutral : "#e3e184"};
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

const imageContainer = {
    position: "relative", 
    height: '30px'
}

const centeredImage = {
    height: '20px',
    width: '20px',
    position: 'absolute',
    left: '50%',
    marginLeft: '-10px',
    top: '50%',
    marginTop: '-10px'
}

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
            backgroudNeutral: "#FFFFFF",
            row: this.props.rowNum,
            col: this.props.colNum,
            monsterSet: false
        }
    }

    toggleSelected = () => {
        this.setState({selected: !this.state.selected});
    }

    toggleborder = () => {
        if (this.props.autoExpandSquares){
            this.changeAllSides();
            //will return null if auto-expand is disabled
            let newSides = this.props.checkAdjacentSquares(this.state.row, this.state.col, this.state.border);
            if (newSides){        
                for (var side in newSides){
                    if (newSides[side]){
                        this.toggleSide(side);
                    }
                }
            }
        } else {
            this.changeDefaultSides();
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

    changeDefaultSides = () =>
    {
        if (this.state.border){
            let newSides = this.state.borderSides;
            for (let key in newSides){
                newSides[key] = false
            }
            this.setState({borderSides: newSides, border: false});
        } else {
            let newSides = this.state.borderSides;
            for (let key in newSides){
                newSides[key] = this.props.borderPresets[key];
            }
            this.setState({borderSides: newSides, border: true});
        }
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

    handleClicks = () => {
        if (this.props.activeButton === "1"){
            this.props.setSelectedSquare(this.state.row, this.state.col, this.state.borderSides)
        } else if (this.props.activeButton === "2"){
            this.toggleborder();
        }
    }

    setHoveringStatus = status => {
        if (status === true){
            this.setState({backgroundNeutral: "#EEEEEE"});
        } else {
            this.setState({backgroundNeutral: "#FFFFFF"});
        }
    }

    render(){
        let eventIcon = '';
        if (this.state.monsterSet){
            eventIcon = <div style={imageContainer}>
                <img src={goblinFace}
                    alt="Monster Icon" style={centeredImage} />
                </div>
        } else if (this.state.lootSet){
            eventIcon = <div style={imageContainer}>
                <img src={lootBag}
                    alt="Loot Icon" style={centeredImage} />
                </div>
        }

        return(
            <StyledSquare bordered={this.state.border} 
            onClick={this.handleClicks} 
            borderSides={this.state.borderSides}
            selected={this.state.selected}
            backgroundNeutral={this.state.backgroundNeutral}
            onMouseEnter={() => this.setHoveringStatus(true)}
            onMouseLeave={() => this.setHoveringStatus(false)}>
                {eventIcon}
            </StyledSquare>
        );
    }
}

export default GraphSquare;