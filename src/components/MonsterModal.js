import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Button,
    Input, Form, FormGroup, Row, Col} from 'reactstrap';
import {FaPlus} from 'react-icons/fa';

class MonsterModal extends Component{
    state = {
        modal: false,
        numMonsters: 0,
        maxMonsters: 3
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

    addMonsterRow = () => {
        if (this.state.numMonsters < this.state.maxMonsters){
            this.setState({numMonsters: this.state.numMonsters + 1})
        }
    }

    render(){
        let addedMonsters = [];
        for (let n = 0; n < this.state.numMonsters; n++){
            addedMonsters.push(
                        <Row>
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
                            <Col></Col>
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
                                    placeholder="Monster" />
                            </Col>
                            <Col>
                                <Input type="text"
                                    name="monsterNum"
                                    placeholder="Number" />
                            </Col>
                            <Col>
                                <Button onClick={this.addMonsterRow}><FaPlus /></Button>
                            </Col>
                        </Row>
                        {addedMonsters}
                       </FormGroup>
                       <FormGroup>
                        <Button type="submit">Update</Button>
                            &nbsp;
                        <Button>Cancel</Button>
                       </FormGroup>
                   </Form>
               </ModalBody>
           </Modal>
        );
    }
}

export default MonsterModal;