import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';

class CellSpecs extends Component {
    render(){
        return(
            <Container className="pt-4">
                <Row>
                    <Col>Row: {this.props.selectedSquare.row}</Col>
                    <Col>Column: {this.props.selectedSquare.col}</Col>
                </Row>
            </Container>
        );
    }
}

export default CellSpecs;