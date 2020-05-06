import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';

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
            }
        }
    }

    toggleAutoExpandSquares = () => {
        this.setState({autoExpandSquares: !this.state.autoExpandSquares});
    }

    updatePresets = (side) => {
        let newPresets = this.state.borderPresets;
        newPresets[side] = !newPresets[side];
        this.setState({borderPresets: newPresets})
    }

    render(){
        return(
            <>
                <Header />
                <Container fluid className='mt-3'>
                <Row>
                    <Col></Col>
                    <Col md="auto">
                        <Graph 
                            autoExpandSquares={this.state.autoExpandSquares} 
                            rows = {this.state.rows}
                            columns = {this.state.columns} 
                            borderPresets = {this.state.borderPresets} />
                    </Col>
                    <Col>
                        <PropertyCard
                            autoExpandSquares={this.state.autoExpandSquares}
                            toggleAutoExpandSquares={this.toggleAutoExpandSquares}
                            borderPresets = {this.state.borderPresets}
                            updatePresets = {this.updatePresets} />
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;