import React from 'react';
import {Navbar, Nav, UncontrolledDropdown,
DropdownToggle, DropdownItem, DropdownMenu,
Button, ButtonGroup} from 'reactstrap';
import FileSaver from 'file-saver';
import {FaMousePointer, FaSquare, FaBorderAll, FaExclamation} from 'react-icons/fa';

import StairsDown from '../Images/StairsDown.png';
import StairsUp from '../Images/StairsUp.png';
import DoorLocked from '../Images/DoorLocked.png';
import DoorReg from '../Images/DoorReg.png';


const SubHeader = (props) => {
    const serializeStoredFloors = () => {
        let jsonString = `{ 
            name: ${props.name}
            rows: ${props.rows}
            columns: ${props.columns}
            floors: {`;
        props.storedFloors.forEach(floor => {
            jsonString += JSON.stringify(floor);
        });
        jsonString += "}}"
        return jsonString;
    }

    const handleFileSelect = () =>{
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.click();
    }

    const testSave = () => {
        props.prepareBackupForSave();
        let jsonData = serializeStoredFloors();
        var blob = new Blob([jsonData], {type: "application/dgnm;charset=utf-8"});
        FileSaver.saveAs(blob, `${props.name}.dgnm`);
    }

    return (
        <>
            <Navbar id="subHeader" style={{padding: "0"}} color="dark" dark expand="md">
                <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                File
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    New Map
                                </DropdownItem>
                                <DropdownItem onClick={testSave}>
                                    Save
                                </DropdownItem>
                                <DropdownItem onClick={handleFileSelect}>
                                    Load
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <ButtonGroup style={{position: "absolute", left: "50%", top: "50%",
                                transform: "translate(-50%, -50%)"}}>
                            <Button className={props.activeButton === "1" ?
                            "active": null} onClick={() => props.toggleButton("1", "activeButton")}
                            ><FaMousePointer /></Button>
                            <Button className={props.activeButton === "2" ?
                            "active" : null} onClick={() => props.toggleButton("2", "activeButton")}
                            ><FaSquare /></Button>
                            <Button className={props.activeButton === "3" ?
                            "active" : null} onClick={() => props.toggleButton("3", "activeButton")}
                            ><FaBorderAll /></Button>
                            <Button className={props.activeButton === "4" ?
                            "active" : null} onClick={() => props.toggleButton("4", "activeButton")}
                            ><FaExclamation /></Button>
                        </ButtonGroup>
                        {' '}
                        {props.activeButton === "4" ?
                        <ButtonGroup style={{position: "absolute", left: "50%", top: "105%",
                                transform: "translate(-50%, 0%)"}}>
                            <Button outline className={props.activeEvent === "1" ?
                            "active" : null} onClick={() => props.toggleButton(StairsDown, "activeEvent")}
                            ><img src={StairsDown} width="20px" height="20px" alt="option1" /></Button>
                            <Button outline className={props.activeEvent === "2" ?
                            "active" : null} onClick={() => props.toggleButton(StairsUp, "activeEvent")}
                            ><img src={StairsUp} width="20px" height="20px" alt="option2" /></Button>
                            <Button outline className={props.activeEvent === "3" ?
                            "active" : null} onClick={() => props.toggleButton(DoorReg, "activeEvent")}
                            ><img src={DoorReg} width="20px" height="20px" alt="option3" /></Button>
                            <Button outline className={props.activeEvent === "4" ?
                            "active" : null} onClick={() => props.toggleButton(DoorLocked, "activeEvent")}
                            ><img src={DoorLocked} width="20px" height="20px" alt="option4" /></Button>
                        </ButtonGroup> : ''}
                </Nav>
            </Navbar>
        </>
    );
}

export default SubHeader;