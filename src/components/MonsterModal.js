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
        monsterData: {
            monsterNames: [],
            monsterNums: []
        }
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

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
        }
    }

    revertSettings = () => {
        this.toggle();
    }

    createEntry = (event) => {
        event.preventDefault();

    }

    render(){
        let addedMonsters = [];
        for (let n = 1; n < this.state.numMonsters; n++){
            addedMonsters.push(
                        <Row className="mt-1">
                            <Col>
                                <Input type="text"
                                    name="monsterName"
                                    placeholder="Monster"
                                    value={this.state.monsterData.monsterNames[n]} />
                            </Col>
                            <Col>
                                <Input type="number"
                                    name="monsterNum"
                                    placeholder="Number"
                                    value={this.state.monsterData.monsterNums[n]} />
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
           <Modal isOpen={this.state.modal} toggle={this.toggle}>
               <ModalHeader toggle={this.toggle}>Monster Creation</ModalHeader>
               <ModalBody>
                   <Form>
                       <FormGroup>
                       <Row>
                            <Col>
                                <Input type="text"
                                    name="monsterName"
                                    placeholder="Monster"
                                    value={this.state.monsterData.monsterNames[0]} />
                            </Col>
                            <Col>
                                <Input type="number"
                                    name="monsterNum"
                                    placeholder="Number" 
                                    value={this.state.monsterData.monsterNums[0]} />
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
                                value={this.state.details} />
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

export default MonsterModal;