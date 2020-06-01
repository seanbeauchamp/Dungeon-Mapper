import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Navbar, Nav, NavItem, ListGroup, ListGroupItem} from 'reactstrap';
import {FaPlus, FaTrash, FaChevronUp, FaChevronDown, FaEdit} from 'react-icons/fa';

class FloorSelector extends Component {
    render(){
        return(
            <>
            <Card className="h-100">
                <CardHeader style={{backgroundColor: "white"}}>
                    <h4>Floors</h4>
                </CardHeader>
                <CardHeader style={{padding: ".15rem .55rem"}}>
                <Navbar>
                        <Nav>
                            <NavItem><FaPlus /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem><FaEdit /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem><FaChevronUp /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem><FaChevronDown /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem><FaTrash /></NavItem>
                        </Nav>
                    </Navbar>
                </CardHeader>
                <CardBody>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>Default First Floor</ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardBody>
            </Card>
            </>
        );
    }
}

export default FloorSelector;