import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Navbar, Nav, NavItem, ListGroup, ListGroupItem} from 'reactstrap';
import {FaPlus, FaTrash, FaChevronUp, FaChevronDown, FaEdit} from 'react-icons/fa';

const menuOptionStyles = {
    cursor: "pointer"
}

class FloorSelector extends Component {

    displayFloors = () => {
        let numFloors = this.props.storedFloors.length;
        let floorBody = [];
        //assume each stored floor has an index number and a name to work with
        for (let n = 0; n < numFloors; n++){
            floorBody.push(<ListGroupItem key={this.props.storedFloors[n].index}>{this.props.storedFloors[n].name} {this.props.storedFloors[n].index}</ListGroupItem>);
        }
        return floorBody;
    }

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
                            <NavItem onClick={this.props.addFloor} style={menuOptionStyles}><FaPlus /></NavItem>
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
                            {this.displayFloors()}
                        </ListGroup>
                    </Card>
                </CardBody>
            </Card>
            </>
        );
    }
}

export default FloorSelector;