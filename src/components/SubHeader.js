import React, {useState} from 'react';
import {Navbar, Nav, UncontrolledDropdown,
DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';
import FileSaver, {saveAs} from 'file-saver';

const SubHeader = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    const testJson = `{
        "glossary": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        "GlossSee": "markup"
                    }
                }
            }
        }
    }`

    const serializeStoredFloors = () => {
        let jsonString = '{ floors: {';
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
        let jsonData = serializeStoredFloors();
        var blob = new Blob([jsonData], {type: "application/dgnm;charset=utf-8"});
        FileSaver.saveAs(blob, "testfile.dgnm");
    }

    return (
        <>
            <Navbar style={{padding: "0"}} color="dark" dark expand="md">
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
                </Nav>
            </Navbar>
        </>
    );
}

export default SubHeader;