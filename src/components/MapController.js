import React, {Component} from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import {FaMousePointer, FaSquare, FaBorderAll} from 'react-icons/fa';

import Header from './Header';
import Graph from './Graph';
import PropertyCard from './PropertyCard';


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
        this.state= {
            rows: 20,
            columns: 20,
            autoExpandSquares: true,
            borderPresets: {
                top: true,
                bottom: true,
                left: true,
                right: true
            },
            activeButton: "2",
            selectedSquare: null,
            refArray: []
        }
    }

    toggleAutoExpandSquares = () => {
        this.setState({autoExpandSquares: !this.state.autoExpandSquares});
    }

    resizeGrid = (newRows, newCols) => {
        //create new refArray. For each cell, check if one exists in current version.
        //if so, copy that, if not create one, then reset the refArray state
        let newRef = this.setReferenceArray(newRows, newCols);       
        this.setState({rows: newRows, columns: newCols, refArray: newRef});
    }

    setSelectedSquare = (newRow, newCol) => {
        let newSquare = {
            row: newRow,
            col: newCol
        };
        this.setState({selectedSquare: newSquare});
    }

    nullifySelectedSquare = () => {
        this.setState({selectedSquare: null});
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

    componentWillMount() {
        let refs = this.setReferenceArray(this.state.rows, this.state.columns)
        this.setState({refArray: refs})
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
                            "active" : null} onClick={() => this.toggleButton(3)}
                            ><FaBorderAll /></Button>
                        </ButtonGroup>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-2'>
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
                            borderPresets = {this.state.borderPresets}
                            updatePresets = {this.updatePresets} 
                            selectedSquare = {this.state.selectedSquare} 
                            resizeGrid = {this.resizeGrid} />
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;