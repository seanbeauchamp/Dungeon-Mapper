import React, {Component} from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import {FaMousePointer, FaSquare, FaBorderAll} from 'react-icons/fa';

import Header from './Header';
import Graph from './Graph';
import PropertyCard from './PropertyCard';

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
            selectedSquare: null
        }
    }

    toggleAutoExpandSquares = () => {
        this.setState({autoExpandSquares: !this.state.autoExpandSquares});
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
                    <Col></Col>
                    <Col md="auto">
                        <Graph 
                            autoExpandSquares={this.state.autoExpandSquares} 
                            rows = {this.state.rows}
                            columns = {this.state.columns} 
                            borderPresets = {this.state.borderPresets} 
                            activeButton = {this.state.activeButton}
                            selectedSquare = {this.state.selectedSquare}
                            setSelectedSquare = {this.setSelectedSquare} 
                            nullifySelectedSquare = {this.nullifySelectedSquare} />
                    </Col>
                    <Col>
                        <PropertyCard
                            autoExpandSquares={this.state.autoExpandSquares}
                            toggleAutoExpandSquares={this.toggleAutoExpandSquares}
                            borderPresets = {this.state.borderPresets}
                            updatePresets = {this.updatePresets} 
                            selectedSquare = {this.state.selectedSquare} />
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;