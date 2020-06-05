import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Navbar, 
    Nav, NavItem, ListGroup, ListGroupItem,
    Modal, ModalBody, ModalHeader, Button} from 'reactstrap';
import {FaPlus, FaTrash, FaChevronUp, FaChevronDown, FaEdit} from 'react-icons/fa';

const menuOptionStyles = {
    cursor: "pointer"
}

class FloorSelector extends Component {
    state = {
        activeFloor: 0,
        modalOpen: false
    }

    displayFloors = () => {
        let numFloors = this.props.storedFloors.length;
        let floorBody = [];
        //assume each stored floor has an index number and a name to work with
        for (let n = 0; n < numFloors; n++){
            floorBody.push(<ListGroupItem className={ 
                this.state.activeFloor === n ? "active" : null
            } onClick={() => this.updateActiveFloor(n)}
            key={n}>{this.props.storedFloors[n].name} {this.props.storedFloors[n].index}
            </ListGroupItem>);
        }
        return floorBody;
    }

    removeActiveFloor = () => {
        let currentFloor = this.props.storedFloors[this.state.activeFloor].index;
        this.props.removeFloor(currentFloor);
        this.toggleModal();
    }

    moveActiveFloor = increment => {
        let currentFloor = this.props.storedFloors[this.state.activeFloor].index;
        let successfulMove = this.props.moveFloor(currentFloor, increment);
        if (successfulMove){
            this.setState({activeFloor: this.state.activeFloor + increment});
        }
    }

    updateActiveFloor = (floorNum) => {
        this.setState({activeFloor: floorNum});
    }

    openModal = () => {
        if (this.props.storedFloors.length > 1){
            this.toggleModal();
        }
    }

    toggleModal = () => {
        this.setState(previous => ({
            modalOpen: !previous.modalOpen
        }));
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
                            <NavItem onClick={this.props.addFloor} 
                                style={menuOptionStyles}><FaPlus /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem><FaEdit /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem onClick={() => this.moveActiveFloor(-1)}
                                style={menuOptionStyles}>
                                <FaChevronUp style={ this.props.storedFloors.length <= 1 ?
                                    {color:"#DEDEDE"} : {}}  /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem onClick={() => this.moveActiveFloor(1)}
                                style={menuOptionStyles}>
                                <FaChevronDown style={ this.props.storedFloors.length <= 1 ?
                                    {color:"#DEDEDE"} : {}}  /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem onClick={this.openModal} style={menuOptionStyles}>
                                <FaTrash style={ this.props.storedFloors.length <= 1 ?
                                    {color:"#DEDEDE"} : {}} />
                                </NavItem>
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
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Confirm Deletion
                </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this floor?</p>
                    <Button onClick={this.removeActiveFloor}>OK</Button> {" "}
                    <Button onClick={this.toggleModal}>Cancel</Button>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

export default FloorSelector;