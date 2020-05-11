import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody,
Input, Form, FormGroup, Label} from 'reactstrap';
import {FaCog} from 'react-icons/fa';

class ResizeModal extends Component {
    state = {
        modal: false,
        currentRows: this.props.rows,
        currentColumns: this.props.columns
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    performResize = (e) => {
        e.preventDefault();
        this.props.resizeGrid(this.state.currentRows, this.state.currentColumns);
        this.toggle();
    };

    render() {
        return (
            <>
                <Button onClick={this.toggle}><FaCog /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Resize Grid</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.performResize}>
                            <FormGroup>
                                <Label for="rowBox">Rows:</Label>
                                <Input 
                                    type="number"
                                    name="rowBox"
                                    onChange={event =>
                                    this.setState({currentRows: event.target.value})}
                                    value={this.state.currentRows}
                                    />
                                
                                <Label for="colBox">Columns:</Label>
                                <Input
                                    type="number"
                                    name="colBox"
                                    onChange={event =>
                                    this.setState({currentColumns: event.target.value})}
                                    value={this.state.currentRows}
                                    />
                            </FormGroup>

                            <FormGroup>
                                <Button type="submit">Update</Button>
                                &nbsp;
                                <Button type="cancel">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default ResizeModal;