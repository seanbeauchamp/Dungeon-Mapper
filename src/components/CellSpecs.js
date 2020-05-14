import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import BorderSelector from './BorderSelector';

class CellSpecs extends Component {


    render(){
        return(
            <Container className="pt-4">
                <Row>
                    <Col>Row: {this.props.selectedSquare.row}</Col>
                    <Col>Column: {this.props.selectedSquare.col}</Col>
                </Row>
                <Row className="pt-2">
                    <Col>
                        <BorderSelector 
                            source={"cell"}
                            selectedSquareRef={this.props.selectedSquareRef} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CellSpecs;