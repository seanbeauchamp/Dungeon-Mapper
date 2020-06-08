import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Navbar, 
    Nav, NavItem, ListGroup, ListGroupItem,
    Modal, ModalBody, ModalHeader, Button,
    Form, Input, Label} from 'reactstrap';
import {FaPlus, FaTrash, FaChevronUp, FaChevronDown, 
    FaEdit, FaEye} from 'react-icons/fa';

const menuOptionStyles = {
    cursor: "pointer"
}

class FloorSelector extends Component {
    state = {
        activeFloor: 0,
        deleteModalOpen: false,
        renameModalOpen: false,
        tempRenameValue: '',
        errors: []
    }

    displayFloors = () => {
        let numFloors = this.props.storedFloors.length;
        let floorBody = [];
        //assume each stored floor has an index number and a name to work with
        for (let n = 0; n < numFloors; n++){
            floorBody.push(<ListGroupItem className={ 
                this.state.activeFloor === n ? "active" : null
            } onClick={() => this.updateActiveFloor(n)}
            onDoubleClick={() => this.switchFloor(n)}
            key={n}><span style={{userSelect: "none"}}>{this.props.storedFloors[n].name}</span>
            {this.props.storedFloors[n].index === this.props.currentFloorIndex ?
                <FaEye style={{float: "right"}} /> : ''}
            </ListGroupItem>);
        }
        return floorBody;
    }

    removeActiveFloor = () => {
        let currentFloor = this.props.storedFloors[this.state.activeFloor].index;
        this.props.removeFloor(currentFloor);
        this.toggleDeleteModal();
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

    openDeleteModal = () => {
        if (this.props.storedFloors.length > 1){
            this.toggleDeleteModal();
        }
    }

    toggleDeleteModal = () => {
        this.setState(previous => ({
            deleteModalOpen: !previous.deleteModalOpen
        }));
    }

    openRenameModal = () => {
        this.setState({tempRenameValue: this.props.storedFloors[this.state.activeFloor].name,
                        errors: []});
        this.toggleRenameModal();
    }

    toggleRenameModal = () => {
        this.setState(previous => ({
            renameModalOpen: !previous.renameModalOpen
        }));
    }

    handleRenameChange = event => {
        let currentName = event.target.value;
        this.setState({tempRenameValue: currentName});
    }

    renameFloor = (event) => {
        event.preventDefault();
        let newName = this.state.tempRenameValue;
        let nameAlreadyExists = false;
        let currentFloor = this.props.storedFloors[this.state.activeFloor].index;
        this.props.storedFloors.forEach(floor => {
            if (newName === floor.name && currentFloor !== floor.index){
               nameAlreadyExists = true;
            }
        });
        if (!nameAlreadyExists){
            this.props.renameFloor(currentFloor, newName);
            this.toggleRenameModal();
        } else {
            let newErrors = [];
            newErrors.push(<li key={this.state.errors.length}>Name already exists. Please choose another</li>)
            this.setState({errors: newErrors});
        }
    }

    switchFloor = (floorNum) => {
        let newFloorIndex = this.props.storedFloors[floorNum].index;
        this.props.switchActiveFloor(newFloorIndex);
    }

    render(){
        return(
            <>
            <Card className="h-100 mt-1">
                {/*<CardHeader style={{backgroundColor: "white"}}>
                    <h4>Floors</h4>
                    </CardHeader>*/}
                <CardHeader style={{padding: ".15rem .55rem"}}>
                <Navbar>
                        <Nav>
                            <NavItem onClick={this.props.addFloor} 
                                style={menuOptionStyles}>
                                <FaPlus style={ this.props.storedFloors.length >= this.props.maxFloors ?
                                    {color:"#DEDEDE"} : {}} /></NavItem>
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
                            <NavItem onClick={this.openRenameModal} style={menuOptionStyles}>
                                <FaEdit /></NavItem>
                        </Nav>
                        <Nav>
                            <NavItem onClick={this.openDeleteModal} style={menuOptionStyles}>
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
            <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleDeleteModal}>
                <ModalHeader toggle={this.toggleDeleteModal}>
                    Confirm Deletion
                </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this floor?</p>
                    <Button onClick={this.removeActiveFloor}>OK</Button> {" "}
                    <Button onClick={this.toggleDeleteModal}>Cancel</Button>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.renameModalOpen} toggle={this.toggleRenameModal}>
                <ModalHeader toggle={this.toggleRenameModal}>
                    Rename Floor Title
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.renameFloor}>
                        { this.state.errors.length > 0 ? <ul>{this.state.errors}</ul> : ''}
                        <Label for="newName">Enter the new floor name</Label>
                        <Input required
                            type="text"        
                            name="newName"
                            value={this.state.tempRenameValue}
                            onChange={(event) => this.handleRenameChange(event)} />
                        <br />
                        <Button type="submit">OK</Button>{" "}
                        <Button onClick={this.toggleRenameModal}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

export default FloorSelector;