import React, {Component} from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import {FaMousePointer, FaSquare, FaBorderAll, FaExclamation} from 'react-icons/fa';

import Header from './Header';
import Graph from './Graph';
import PropertyCard from './PropertyCard';
//import GoblinFaceButton from '../Images/GoblinFaceButton.png';


const panelStyle = {
    flex: "0 0 400px",
    msFlex: "0 0 400px"
};

const graphStyle = {
    margin: "auto",
    //overflow: "scroll"
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
            selectedSquare: null,
            selectedSquareRef: null,
            refArray: [],
            monsterEntries: [[],[]]
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
        let monsterData = null;
        if (this.state.monsterEntries[newRow] && this.state.monsterEntries[newRow][newCol] !== undefined){
            monsterData = this.state.monsterEntries[newRow][newCol];
        }
        let newSquare = {
            row: newRow,
            col: newCol,
            borders: borderSides,
            monsters: monsterData
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

    toggleButton = (button) => {
        this.setState({activeButton: button});
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

    setMonsterEntry = (monsters, details) => {
        let newMonsterData = {
            inputs: monsters,
            details: details
        }
        let newMonsterArray = this.state.monsterEntries;
        if (!newMonsterArray[this.state.selectedSquare.row])
        newMonsterArray[this.state.selectedSquare.row] = [];
        newMonsterArray[this.state.selectedSquare.row][this.state.selectedSquare.col] = newMonsterData;
        this.setState({monsterEntries: newMonsterArray, selectedSquare: {...this.state.selectedSquare, monsters: newMonsterData}});
        this.state.selectedSquareRef.setState({monsterSet: true});
    }

    componentWillMount() {
        let refs = this.setReferenceArray(this.state.rows, this.state.columns);
        this.setState({refArray: refs});
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
                            "active": null} onClick={() => this.toggleButton("1")}
                            ><FaMousePointer /></Button>
                            <Button className={this.state.activeButton === "2" ?
                            "active" : null} onClick={() => this.toggleButton("2")}
                            ><FaSquare /></Button>
                            <Button className={this.state.activeButton === "3" ?
                            "active" : null} onClick={() => this.toggleButton("3")}
                            ><FaBorderAll /></Button>
                            <Button className={this.state.activeButton === "4" ?
                            "active" : null} onClick={() => this.toggleButton("4")}
                            ><FaExclamation /></Button>
                        </ButtonGroup>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-2' style={{minHeight: "80vh"}}>
                    <Col style={panelStyle}></Col>
                    <Col md="auto" style={graphStyle}>
                        <Graph 
                            autoExpandSquares={this.state.autoExpandSquares} 
                            refArray = {this.state.refArray}
                            rows = {this.state.rows}
                            columns = {this.state.columns} 
                            borderPresets = {this.state.borderPresets} 
                            activeButton = {this.state.activeButton}
                            selectedSquare = {this.state.selectedSquare}
                            setSelectedSquare = {this.setSelectedSquare} 
                            nullifySelectedSquare = {this.nullifySelectedSquare} />
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
                            setMonsterEntry={this.setMonsterEntry} />
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;