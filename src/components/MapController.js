import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';

import Header from './Header';
import Graph from './Graph';
import PropertyCard from './PropertyCard';
import SubHeader from './SubHeader';

const maxFloors = 5;
const panelWidth = 400;

const panelStyle = {
    flex: "0 0 " + panelWidth + "px",
    msFlex: "0 0 400px"
};

//default info on your monitor for ref: total graph size is 630px. Free space after two panels at full screen: 1120px
//with borders etc, starts having trouble when 660px free space or less
//ergo,  on window check, if smaller than 660, set to 30 below free space and turn on X-Scroll
const graphStyle = {
    margin: "auto",
    whiteSpace: "nowrap",
    //width: "calc(100% - 800px)"
    //overflowX: "scroll"
}


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
            activeEvent: null,
            selectedSquare: null,
            selectedSquareRef: null,
            squareArray: [],
            refArray: [],
            bordersArray: [],
            monsterEntries: [[],[]],
            lootEntries: [[],[]],
            trapEntries: [[],[]],
            stickerEntries: [[],[]],
            incrementingFloorIndex: 1,
            currentFloorIndex: 1,
            storedFloors: [
                {
                    name: "New Floor",
                    index: 1
                }
            ]
        }
    }

    handleWindowResize = () => {
        let freeWidth = window.innerWidth - (panelWidth * 2);
        console.log("Width: " + window.innerWidth);
        console.log("Height: " + window.innerHeight);
        console.log("Available width for graph: " + freeWidth);
    }    

    toggleAutoExpandSquares = () => {
        this.setState({autoExpandSquares: !this.state.autoExpandSquares});
    }

    resizeGrid = (newRows, newCols) => {
        let newRef = this.setReferenceArray(newRows, newCols);       
        this.setState({rows: newRows, columns: newCols, refArray: newRef});
    }

    backupBordersArray = (newArray) => {
        let newBordersArray = []
        for (let row = 0; row < this.state.rows; row++){
            newBordersArray[row] = [];
            for (let col=0; col < this.state.columns; col++){
                let currentSquare = this.state.squareArray[row].props.children[col].ref.current;
                newBordersArray[row][col] = {
                    border: currentSquare.state.border,
                    borderSides: currentSquare.state.borderSides
                }
            }
        }
        return newBordersArray;
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

    setStickerEntry = (rowNum, colNum, stickerOn) => {
        let newStickerEntries = this.state.stickerEntries;
        if (!newStickerEntries[rowNum]){
            newStickerEntries[rowNum] = [];
        }
        newStickerEntries[rowNum][colNum] = stickerOn ? this.state.activeEvent : null;
        this.setState({stickerEntries: newStickerEntries});
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

    setRefs = () => {
        let refs = this.setReferenceArray(this.state.rows, this.state.columns);
        this.setState({refArray: refs});
    }

    componentWillMount() {
        this.setRefs();
    }

    componentDidMount(){
        window.addEventListener("resize", this.handleWindowResize);
    }

    addFloor = () => {
        if (this.state.storedFloors.length < maxFloors){
            let newFloors = this.state.storedFloors;
            //TODO: If name already exists in array, count occurrances and add that number to new name
            let newName = "New Floor";
            newFloors.forEach(floor => {
                if (floor.name.includes(newName)) {
                    newName = floor.name + "+";
                }
            });
            newFloors.push({
                name: newName,
                index: this.state.incrementingFloorIndex + 1
            })
            this.setState({storedFloors: newFloors, incrementingFloorIndex: this.state.incrementingFloorIndex + 1})
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

    renameFloor = (indexNum, newName) => {
        let newFloors = this.state.storedFloors;
        for (let n = 0; n < newFloors.length; n++){
            if (newFloors[n].index === indexNum){
                newFloors[n].name = newName;
                break;
            }
        }
        this.setState({storedFloors: newFloors});
    }

    moveFloor = (indexNum, increment) => {
        let validMove = false;
        if (this.state.storedFloors.length > 1){
            let newFloors = this.state.storedFloors;
            let arrayNum;
            for (let n = 0; n < newFloors.length; n++){
                if (newFloors[n].index === indexNum){
                    arrayNum = n;
                    break;
                }
            }
            if ((increment < 0 && arrayNum > 0) ||
                (increment > 0 && arrayNum < newFloors.length - 1)){
                let tempFloor = newFloors[arrayNum + increment];
                newFloors[arrayNum + increment] = newFloors[arrayNum];
                newFloors[arrayNum] = tempFloor;
                validMove = true;
            }
            this.setState({storedFloors: newFloors});
        }
        return validMove;
    }

    switchActiveFloor = (newIndex) => {
        //first backup current data into current floor element
        let storedState;
        let storedIndex;
        for (let n = 0; n < this.state.storedFloors.length; n++){
            let currentState = this.state.storedFloors[n];
            if (currentState.index === this.state.currentFloorIndex){
                storedIndex = n;
                storedState = this.backupFloor(n);
                break;
            }
        }
        //recreate storedFloors in full to replace element data on stored State in setState
        let newStoredFloors = this.state.storedFloors;
        newStoredFloors[storedIndex] = storedState;
        //now check new element, loading data if present and nullifying existing states otherwise
        let newState;
        for (let n = 0; n < this.state.storedFloors.length; n++){
            let currentState = this.state.storedFloors[n];
            if (currentState.index === newIndex)
                newState = this.loadFloor(n);
        }
        //squareArray is just the actual component instances, not the underlying states. Create & save border info instead
        this.setState({
            currentFloorIndex: newIndex,
            storedFloors: newStoredFloors,
            bordersArray: newState.bordersArray,
            monsterEntries: newState.monsterEntries,
            lootEntries: newState.lootEntries,
            trapEntries: newState.trapEntries,
            stickerEntries: newState.stickerEntries,
            selectedSquare: null,
            selectedSquareRef: null,
        });
        this.setRefs();
    }

    backupFloor = (n) => {
        let currentState = this.state.storedFloors[n];
        currentState.bordersArray = this.backupBordersArray()
        currentState.monsterEntries = this.state.monsterEntries;
        currentState.lootEntries = this.state.lootEntries;
        currentState.trapEntries = this.state.trapEntries;
        currentState.stickerEntries = this.state.stickerEntries;
        return currentState;
    }

    loadFloor = (n) => {
        let newState = this.state.storedFloors[n];
        newState.bordersArray = newState.bordersArray ? newState.bordersArray : []
        newState.monsterEntries = newState.monsterEntries ? newState.monsterEntries : [[],[]];
        newState.lootEntries = newState.lootEntries ? newState.lootEntries : [[],[]];
        newState.trapEntries = newState.trapEntries ? newState.trapEntries : [[],[]];
        newState.stickerEntries = newState.stickerEntries ? newState.stickerEntries : [[],[]];
        return newState;
    }

    render(){
        return(
            <>
                <Header />
                <SubHeader storedFloors={this.state.storedFloors}
                            toggleButton={this.toggleButton}
                            activeButton={this.state.activeButton}
                             />
                <Container fluid className='mt-2' style={{whiteSpace: "nowrap"}}>
                <Row>
                    <Col></Col>
                    <Col>
                        
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-2' style={{minHeight: "80vh"}}>
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
                            clearEventEntry={this.clearEventEntry}
                            storedFloors={this.state.storedFloors}
                            currentFloorIndex={this.state.currentFloorIndex}
                            maxFloors={maxFloors}
                            addFloor={this.addFloor}
                            removeFloor={this.removeFloor}
                            renameFloor={this.renameFloor}
                            moveFloor={this.moveFloor}
                            switchActiveFloor={this.switchActiveFloor} />
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
                            setSquareArray = {this.setSquareArray}
                            backupBordersArray = {this.backupBordersArray}
                            bordersArray = {this.state.bordersArray}
                            monsterEntries = {this.state.monsterEntries}
                            lootEntries = {this.state.lootEntries}
                            trapEntries = {this.state.trapEntries}
                            stickerEntries = {this.state.stickerEntries}
                            setStickerEntry = {this.setStickerEntry} />
                    </Col>
                    <Col style={panelStyle}>
                        
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;