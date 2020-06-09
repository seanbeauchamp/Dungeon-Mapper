import React, {Component} from 'react';
import styled from 'styled-components';

import goblinFace from '../Images/GoblinFace.png';
import lootBag from '../Images/LootBag.png';
import skullFace from '../Images/SkullFace.png';
import miscIcon from '../Images/MiscIcon.png';

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
            monsterSet: false,
            lootSet: false,
            trapsSet: false,
            currentSticker: null
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

        if (this.props.refUpdateFlag !== prevProps.refUpdateFlag){
            let tempBorder = false;
            let tempBorderSides = {
                top: false,
                bottom: false,
                right: false,
                left: false
            };
            let tempMonsterSet = false;
            let tempLootSet = false;
            let tempTrapsSet = false;
            let newData = this.props.checkExistingSquareData(this.state.row, this.state.col);
            if (newData.borderInfo){
                tempBorder = newData.borderInfo.border;
                tempBorderSides = newData.borderInfo.borderSides;
            } 
            if (newData.monsterInfo){
                tempMonsterSet = true;
            }
            if (newData.lootInfo){
                tempLootSet = true;
            }
            if (newData.trapInfo){
                tempTrapsSet = true;
            }
            this.setState({border: tempBorder, borderSides: tempBorderSides, monsterSet: tempMonsterSet,
                trapsSet: tempTrapsSet, lootSet: tempLootSet, selected: null});
        }
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
        //you'll be able to replace this with a switch statement
        if (this.props.activeButton === "1"){
            this.props.setSelectedSquare(this.state.row, this.state.col, this.state.borderSides)
        } else if (this.props.activeButton === "2"){
            this.toggleborder();
        } else if (this.props.activeButton === "4"){
            this.setSticker();
        }
    }

    setSticker = () => {
        if (this.state.currentSticker === this.props.activeEvent){
            this.setState({currentSticker: null});
        } else {
            this.setState({currentSticker: this.props.activeEvent});
        }
    }

    setHoveringStatus = status => {
        if (status === true){
            this.setState({backgroundNeutral: "#EEEEEE"});
        } else {
            this.setState({backgroundNeutral: "#FFFFFF"});
        }
    }

    setIcon = () => {
        let eventIcon = '';
        if (this.state.currentSticker){
            eventIcon = <div style={imageContainer}>
                <img src={this.state.currentSticker}
                    alt="sticker" style={centeredImage} />
                </div>;
        } else {        
            let source;
            let altName;
            let iconCount = 0;
            if (this.state.monsterSet){
                source = goblinFace;
                altName= "Monster Icon";
                iconCount++;
            } 
            if (this.state.lootSet){
                source=lootBag;
                altName = "Loot Icon";
                iconCount++;
            }
            if (this.state.trapsSet){
                source = skullFace;
                altName = "Trap Icon"
                iconCount++;
            } 
            
            if (iconCount === 0) {
                return eventIcon;
            } else if (iconCount >= 2){
                source = miscIcon;
                altName = "Multiple Events";
            }

            eventIcon = <div style={imageContainer}>
                <img src={source}
                    alt={altName} style={centeredImage} />
                </div>;
        }

        return eventIcon;
    }

    render(){
        let eventIcon = this.setIcon();      

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