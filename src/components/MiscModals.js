import React, {useState, useEffect} from 'react';
import {Modal, ModalBody, ModalHeader,
    Form, Button, Label, Input} from 'reactstrap';

//props.modalOpen
//props.inputValue
//props.errors
//props.setModalOpen (function)
//props.renameInput (function)
const RenameModal = (props) => {
    const [tempValue, setTempValue] = useState("");

    useEffect(() => {
        if (props.modalOpen){
            setTempValue(props.inputValue);
        }
    }, [props.modalOpen, props.inputValue]);

    const handleInputChange = event => {
        let currentName = event.target.value;
        setTempValue(currentName);
    }

    const passInput = event => {
        event.preventDefault();
        props.renameInput(tempValue);
    }

    return(
        <Modal isOpen={props.modalOpen} toggle={props.setModalOpen}>
                <ModalHeader toggle={props.setModalOpen}>
                    Rename {props.type} Title
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={passInput}>
                        {props.errors.length > 0 ? <ul>{props.errors}</ul> : ''}
                        <Label for="newName">Enter the new {props.type} name</Label>
                        <Input required
                            type="text"        
                            name="newName"
                            value={tempValue}
                            onChange={(event) => handleInputChange(event)} />
                        <br />
                        <Button type="submit">OK</Button>{" "}
                        <Button onClick={props.setModalOpen}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
    );
}

export {
    RenameModal
}