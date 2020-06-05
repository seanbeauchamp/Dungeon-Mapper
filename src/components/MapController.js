import React, {Component} from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import {FaMousePointer, FaSquare, FaBorderAll, FaExclamation} from 'react-icons/fa';

import Header from './Header';
import Graph from './Graph';
import PropertyCard from './PropertyCard';
import FloorSelector from './FloorSelector';

import StairsDown from '../Images/StairsDown.png';
import StairsUp from '../Images/StairsUp.png';


const panelStyle = {
    flex: "0 0 400px",
    msFlex: "0 0 400px"
};

const graphStyle = {
    margin: "auto",
    //overflow: "scroll"
}

const maxFloors = 5;

class MapController extends Component {
    constructor(){
        super();

        let allTrueBorder = {
            top: true,
            bottom: true,
            left: true,
            right: true
        };

        this.state= {
            rows: 20,
            columns: 20,
            autoExpandSquares: true,
            borderPresets: allTrueBorder,
            activeButton: "2",
            activeEvent: StairsDown,
            selectedSquare: null,
            selectedSquareRef: null,
            squareArray: [],
            refArray: [],
            monsterEntries: [[],[]],
            lootEntries: [[],[]],
            trapEntries: [[],[]],
            currentFloorIndex: 1,
            storedFloors: [
                {
                    name: "New Floor",
                    index: 1
                }
            ]
        }
    }

    toggleAutoExpandSquares = () => {
        this.setState({autoExpandSquares: !this.state.autoExpandSquares});
    }

    resizeGrid = (newRows, newCols) => {
        let newRef = this.setReferenceArray(newRows, newCols);       
        this.setState({rows: newRows, columns: newCols, refArray: newRef});
    }

    setSelectedSquare = (newRow, newCol, borderSides, squareRef) => {
        //refactor this
        let monsterData = null;
        if (this.state.monsterEntries[newRow] && this.state.monsterEntries[newRow][newCol] !== undefined){
            monsterData = this.state.monsterEntries[newRow][newCol];
        }

        let lootData = null;
        if (this.state.lootEntries[newRow] && this.state.lootEntries[newRow][newCol] !== undefined){
            lootData = this.state.lootEntries[newRow][newCol];
        }

        let trapData = null;
        if (this.state.trapEntries[newRow] && this.state.trapEntries[newRow][newCol] !== undefined){
            trapData = this.state.trapEntries[newRow][newCol];
        }

        let newSquare = {
            row: newRow,
            col: newCol,
            borders: borderSides,
            monsters: monsterData,
            loot: lootData,
            traps: trapData
        };
        this.setState({selectedSquare: newSquare, selectedSquareRef: squareRef});
    }

    nullifySelectedSquare = () => {
        this.setState({selectedSquare: null, selectedSquareRef: null});
    }

    updatePresets = (side) => {
        let newPresets = this.state.borderPresets;
        newPresets[side] = !newPresets[side];
        this.setState({borderPresets: newPresets})
    }

    toggleButton = (button, state) => {
        this.setState({[state]: button});
    }

    setSquareArray = (graphInfo) => {
        this.setState({squareArray: graphInfo});
    }

    setReferenceArray = (rowNum, colNum) => {
        let refs = [];
        for (let r=0; r<=rowNum; r++){
            let cols = [];
            for (var c=0; c<= colNum; c++){
                if (!this.state.refArray[r] || this.state.refArray[r][c] === undefined){
                    cols.push(React.createRef());
                } else{
                    cols.push(this.state.refArray[r][c])
                }
            }
            refs.push(cols)
        }
        return refs
    }

    setEventEntry = (input, detail, entriesState, eventType, eventBool) => {
        let newEventData = {
            inputs: input,
            details: detail
        }
        let newEventArray = this.state[entriesState];
        if (!newEventArray[this.state.selectedSquare.row]){
            newEventArray[this.state.selectedSquare.row] = [];
        }
        newEventArray[this.state.selectedSquare.row][this.state.selectedSquare.col] = newEventData;
        this.setState({[entriesState]: newEventArray, selectedSquare: {...this.state.selectedSquare, [eventType]: newEventData}});
        this.state.selectedSquareRef.setState({[eventBool]: true});
    }

    clearEventEntry = (arrayObject, squareProperty, setBools) => {
        let newMonsterArray = this.state[arrayObject];
        newMonsterArray[this.state.selectedSquare.row][this.state.selectedSquare.col] = null;
        this.setState({[arrayObject]: newMonsterArray, selectedSquare: {...this.state.selectedSquare, [squareProperty]: null}});
        this.state.selectedSquareRef.setState({[setBools]: false});
    }

    componentWillMount() {
        let refs = this.setReferenceArray(this.state.rows, this.state.columns);
        this.setState({refArray: refs});
    }

    addFloor = () => {
        if (this.state.storedFloors.length < maxFloors){
            let newFloors = this.state.storedFloors;
            newFloors.push({
                name: "New Floor",
                index: this.state.currentFloorIndex + 1
            })
            this.setState({storedFloors: newFloors, currentFloorIndex: this.state.currentFloorIndex + 1})
        }
    }

    removeFloor = indexNum => {
        let newFloors = this.state.storedFloors;
        newFloors.forEach(function (floor){
            if (floor.index === indexNum){
                newFloors.splice(newFloors.findIndex(v => v.index === floor.index), 1);
            }
        });
        this.setState({storedFloors: newFloors});
    }

    render(){
        return(
            <>
                <Header />
                <Container fluid className='mt-2'>
                <Row>
                    <Col></Col>
                    <Col>
                        <ButtonGroup>
                            <Button className={this.state.activeButton === "1" ?
                            "active": null} onClick={() => this.toggleButton("1", "activeButton")}
                            ><FaMousePointer /></Button>
                            <Button className={this.state.activeButton === "2" ?
                            "active" : null} onClick={() => this.toggleButton("2", "activeButton")}
                            ><FaSquare /></Button>
                            <Button className={this.state.activeButton === "3" ?
                            "active" : null} onClick={() => this.toggleButton("3", "activeButton")}
                            ><FaBorderAll /></Button>
                            <Button className={this.state.activeButton === "4" ?
                            "active" : null} onClick={() => this.toggleButton("4", "activeButton")}
                            ><FaExclamation /></Button>
                        </ButtonGroup>
                        {' '}
                        {this.state.activeButton === "4" ?
                        <ButtonGroup>
                            <Button outline className={this.state.activeEvent === "1" ?
                            "active" : null} onClick={() => this.toggleButton(StairsDown, "activeEvent")}
                            ><img src={StairsDown} width="20px" height="20px" alt="option1" /></Button>
                            <Button outline className={this.state.activeEvent === "2" ?
                            "active" : null} onClick={() => this.toggleButton(StairsUp, "activeEvent")}
                            ><img src={StairsUp} width="20px" height="20px" alt="option2" /></Button>
                        </ButtonGroup> : ''}
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-2' style={{minHeight: "80vh"}}>
                    <Col style={panelStyle}>
                        <FloorSelector
                            storedFloors={this.state.storedFloors}
                            addFloor={this.addFloor}
                            removeFloor={this.removeFloor} />
                    </Col>
                    <Col md="auto" style={graphStyle}>
                        <Graph 
                            autoExpandSquares={this.state.autoExpandSquares} 
                            refArray = {this.state.refArray}
                            rows = {this.state.rows}
                            columns = {this.state.columns} 
                            borderPresets = {this.state.borderPresets} 
                            activeButton = {this.state.activeButton}
                            activeEvent = {this.state.activeEvent}
                            selectedSquare = {this.state.selectedSquare}
                            setSelectedSquare = {this.setSelectedSquare} 
                            nullifySelectedSquare = {this.nullifySelectedSquare}
                            squareArray = {this.state.squareArray}
                            setSquareArray = {this.setSquareArray} />
                    </Col>
                    <Col style={panelStyle}>
                        <PropertyCard
                            rows={this.state.rows}
                            columns={this.state.columns}
                            autoExpandSquares={this.state.autoExpandSquares}
                            toggleAutoExpandSquares={this.toggleAutoExpandSquares}
                            activeButton={this.state.activeButton}
                            borderPresets = {this.state.borderPresets}
                            updatePresets = {this.updatePresets} 
                            selectedSquare = {this.state.selectedSquare}
                            selectedSquareRef = {this.state.selectedSquareRef} 
                            resizeGrid = {this.resizeGrid}
                            setEventEntry = {this.setEventEntry}
                            clearEventEntry={this.clearEventEntry} />
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;