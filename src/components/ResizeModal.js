import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody,
Input, Form, FormGroup, Label} from 'reactstrap';
import {FaCog} from 'react-icons/fa';

class ResizeModal extends Component {
    state = {
        modal: false,
        currentRows: this.props.rows,
        currentColumns: this.props.columns,
        minVal: 10,
        maxVal: 50
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

    revertSettings = () => {
        this.toggle();
        this.setState({currentRows: this.props.rows, currentColumns: this.props.columns});        
    }

    handleChange(event) {
        let stateName = event.target.name;
        this.setState({[stateName]: Math.min(this.state.maxVal, 
            Math.max(this.state.minVal, event.target.value))});
    }

    render() {
        return (
            <>
                <Button onClick={this.toggle}><FaCog /></Button>
                <Modal isOpen={this.state.modal} toggle={this.revertSettings}>
                    <ModalHeader toggle={this.revertSettings}>Resize Grid</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.performResize}>
                            <FormGroup>
                                <Label for="currentRows">Rows:</Label>
                                <Input 
                                    type="number"
                                    name="currentRows"
                                    onChange={(event) => this.handleChange(event)}
                                    value={this.state.currentRows}
                                    />
                                
                                <Label for="currentColumns">Columns:</Label>
                                <Input
                                    type="number"
                                    name="currentColumns"
                                    onChange={(event) => this.handleChange(event)}
                                    value={this.state.currentColumns}
                                    />
                            </FormGroup>

                            <FormGroup>
                                <Button type="submit">Update</Button>
                                &nbsp;
                                <Button onClick={this.revertSettings}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default ResizeModal;