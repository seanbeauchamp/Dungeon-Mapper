import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Button,
    Input, Form, FormGroup, Row, Col} from 'reactstrap';
import {FaPlus, FaMinus} from 'react-icons/fa';

class MonsterModal extends Component{
    state = {
        modal: false,
        numMonsters: 1,
        maxMonsters: 4,
        details: '',
        monsterNames: [],
        monsterNums: []
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
        if (this.props.selectedSquare.monsters){
            this.setState({details: this.props.selectedSquare.monsters.details,
                        monsterNames: this.props.selectedSquare.monsters.inputs.monsterNames,
                        monsterNums: this.props.selectedSquare.monsters.inputs.monsterNums,
                        numMonsters: this.props.selectedSquare.monsters.inputs.monsterNames.length});
        }
    }

    displayMonsterAndNumber = () => {
        if (this.state.numMonsters <= this.state.maxMonsters){
            return(<Row>
                <Col>
                    <Input type="text"
                        name="monsterName"
                        placeholder="Monster" />
                </Col>
                <Col>
                    <Input type="text"
                        name="monsterNum"
                        placeholder="Number" />
                </Col>
                <Col>
                    <Button><FaPlus /></Button>
                </Col>
            </Row>)
        }
    }

    changeMonsterRow = (amt) => {
        if ((amt > 0 && this.state.numMonsters < this.state.maxMonsters) ||
            (amt < 0 && this.state.numMonsters > 0)){
            this.setState({numMonsters: this.state.numMonsters + parseInt(amt)})
            if (amt < 0){
                this.state.monsterNames.pop();
                this.state.monsterNums.pop();
            }
        }
    }

    revertSettings = () => {
        this.setState({numMonsters: 1, details: '', monsterNames: [], monsterNums: []});
        this.toggle();
    }

    changeNameValue = (event, index) => {
        let newNames = this.state.monsterNames;
        newNames[index] = event.target.value;
        this.setState({monsterNames: newNames});
    }

    changeNumValue = (event, index) => {
        let newNums = this.state.monsterNums;
        newNums[index] = event.target.value;
        this.setState({monsterNums: newNums});
    }

    submitData = (event) => {
        event.preventDefault();
        let inputs = {
            monsterNames: this.state.monsterNames,
            monsterNums: this.state.monsterNums
        }
        this.props.setMonsterEntry(inputs, this.state.details);
        this.revertSettings();
    }

    render(){
        let addedMonsters = [];
        for (let n = 1; n < this.state.numMonsters; n++){
            addedMonsters.push(
                        <Row className="mt-1">
                            <Col>
                                <Input type="text"
                                    name={"monsterName" + n}
                                    placeholder="Monster"
                                    value={this.state.monsterNames[n]}
                                    onChange={(event) => this.changeNameValue(event, n)} />
                            </Col>
                            <Col>
                                <Input type="number"
                                    name={"monsterNum" + n}
                                    placeholder="Number"
                                    value={this.state.monsterNums[n]}
                                    onChange={(event) => this.changeNumValue(event, n)} />
                            </Col>
                            <Col>
                                {n === 1 ? <Button
                                    onClick={() => this.changeMonsterRow(-1)}
                                ><FaMinus /></Button> : ''  }
                            </Col>
                        </Row>
            );
        }

        return(
           <Modal isOpen={this.state.modal} toggle={this.revertSettings}>
               <ModalHeader toggle={this.revertSettings}>Monster Creation</ModalHeader>
               <ModalBody>
                   <Form onSubmit={this.submitData}>
                       <FormGroup>
                       <Row>
                            <Col>
                                <Input required type="text"
                                    name="monsterName0"
                                    placeholder="Monster"
                                    value={this.state.monsterNames[0]}
                                    onChange={(event) => this.changeNameValue(event, 0)} />
                            </Col>
                            <Col>
                                <Input required type="number"
                                    name="monsterNum0"
                                    placeholder="Number" 
                                    value={this.state.monsterNums[0]}
                                    onChange={(event) => this.changeNumValue(event, 0)} />
                            </Col>
                            <Col>
                                <Button 
                                onClick={() => this.changeMonsterRow(1)}
                                ><FaPlus /></Button>
                            </Col>
                        </Row>
                        {addedMonsters}
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

class ClearMonsterModal extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    submitChange = (event) => {
        event.preventDefault();
        this.props.clearMonsterEntry();
        this.toggle();
    }

    render() {
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Delete Monster Data</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitChange}>
                        <p>Are you sure you want to remove all monster data for the 
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

export default MonsterModal;

export {
    ClearMonsterModal
}