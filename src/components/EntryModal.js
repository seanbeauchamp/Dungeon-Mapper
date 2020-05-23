import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Button,
    Input, Form, FormGroup, Row, Col} from 'reactstrap';
import {FaPlus, FaMinus} from 'react-icons/fa';

class EntryModal extends Component{
    state = {
        modal: false,
        numEntries: 1,
        maxEntries: 4,
        details: '',
        entryNames: [],
        entryNums: []
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));

        if (!this.state.modal){
            this.loadExistingData();
        }
    };

    loadExistingData = () => {
        //for now just check for existing data in state, apply to other types of data later
        if (this.props.entries){
            this.setState({details: this.props.entries.details,
                        entryNames: this.props.entries.inputs.entryNames,
                        entryNums: this.props.entries.inputs.entryNums,
                        numEntries: this.props.entries.inputs.entryNames.length});
        }
    }

    displayentryAndNumber = () => {
        if (this.state.numEntries <= this.state.maxEntries){
            return(<Row>
                <Col>
                    <Input type="text"
                        name="entryName"
                        placeholder="entry" />
                </Col>
                <Col>
                    <Input type="text"
                        name="entryNum"
                        placeholder="Number" />
                </Col>
                <Col>
                    <Button><FaPlus /></Button>
                </Col>
            </Row>)
        }
    }

    changeEntryRow = (amt) => {
        if ((amt > 0 && this.state.numEntries < this.state.maxEntries) ||
            (amt < 0 && this.state.numEntries > 0)){
            this.setState({numEntries: this.state.numEntries + parseInt(amt)})
            if (amt < 0){
                this.state.entryNames.pop();
                this.state.entryNums.pop();
            }
        }
    }

    revertSettings = () => {
        this.setState({numEntries: 1, details: '', entryNames: [], entryNums: []});
        this.toggle();
    }

    changeNameValue = (event, index) => {
        let newNames = this.state.entryNames;
        newNames[index] = event.target.value;
        this.setState({entryNames: newNames});
    }

    changeNumValue = (event, index) => {
        let newNums = this.state.entryNums;
        newNums[index] = event.target.value;
        this.setState({entryNums: newNums});
    }

    submitData = (event) => {
        event.preventDefault();
        let inputs = {
            entryNames: this.state.entryNames,
            entryNums: this.state.entryNums
        }
        this.props.setEntry(inputs, this.state.details);
        this.revertSettings();
    }

    render(){
        let addedEntries = [];
        let iterableTypes = ['Monster', 'Loot'];
        for (let n = 1; n < this.state.numEntries; n++){
            addedEntries.push(
                        <Row className="mt-1">
                            <Col>
                                <Input type="text"
                                    name={"entryName" + n}
                                    placeholder={this.props.entryType + " Name"}
                                    value={this.state.entryNames[n]}
                                    onChange={(event) => this.changeNameValue(event, n)} />
                            </Col>
                            <Col>
                                <Input type="number"
                                    name={"entryNum" + n}
                                    placeholder="Number"
                                    value={this.state.entryNums[n]}
                                    onChange={(event) => this.changeNumValue(event, n)} />
                            </Col>
                            <Col>
                                {n === 1 ? <Button
                                    onClick={() => this.changeEntryRow(-1)}
                                ><FaMinus /></Button> : ''  }
                            </Col>
                        </Row>
            );
        }

        return(
           <Modal isOpen={this.state.modal} toggle={this.revertSettings}>
               <ModalHeader toggle={this.revertSettings}>{this.props.entryType} Creation</ModalHeader>
               <ModalBody>
                   <Form onSubmit={this.submitData}>
                       <FormGroup>
                       <Row>
                            <Col>
                                <Input required type="text"
                                    name="entryName0"
                                    placeholder={this.props.entryType + " Name"}
                                    value={this.state.entryNames[0]}
                                    onChange={(event) => this.changeNameValue(event, 0)} />
                            </Col>
                            {iterableTypes.includes(this.props.entryType) ? 
                            <>
                            <Col>
                                <Input required type="number"
                                    name="entryNum0"
                                    placeholder="Number" 
                                    value={this.state.entryNums[0]}
                                    onChange={(event) => this.changeNumValue(event, 0)} />
                            </Col>
                            <Col>
                                <Button 
                                onClick={() => this.changeEntryRow(1)}
                                ><FaPlus /></Button>
                            </Col>
                            </>
                            : ''}
                        </Row>
                        {addedEntries}
                       </FormGroup>
                       <FormGroup>
                           <textarea rows="7" cols="45"
                                placeholder="Encounter Details"
                                value={this.state.details}
                                onChange={(event => {this.setState({details: event.target.value})})} />
                       </FormGroup>
                       <FormGroup>
                        <Button type="submit">Update</Button>
                            &nbsp;
                        <Button onClick={this.revertSettings}>Cancel</Button>
                       </FormGroup>
                   </Form>
               </ModalBody>
           </Modal>
        );
    }
}

class ClearEntryModal extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    submitChange = (event) => {
        event.preventDefault();
        this.props.clearEntry();
        this.toggle();
    }

    render() {
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Delete {this.props.entryType} Data</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitChange}>
                        <p>Are you sure you want to remove all {this.props.entryType} data for the 
                            current square?</p>
                        <Button type="submit">OK</Button>
                            &nbsp;
                        <Button onClick={this.toggle}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default EntryModal;

export {
    ClearEntryModal
}