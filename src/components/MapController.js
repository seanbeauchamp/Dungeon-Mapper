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
            autoExpandSquares: true
        }
    }

    toggleAutoExpandSquares = () => {
        this.setState({autoExpandSquares: !this.state.autoExpandSquares});
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
                            columns = {this.state.columns} />
                    </Col>
                    <Col>
                        <PropertyCard
                            autoExpandSquares={this.state.autoExpandSquares}
                            toggleAutoExpandSquares={this.toggleAutoExpandSquares} />
                    </Col>
                </Row>
                </Container> 
            </>
        )
    }
}

export default MapController;