import React, {useState} from 'react';
import {Navbar, Nav, NavItem, NavLink, UncontrolledDropdown,
DropdownToggle, DropDownItem, DropdownMenu, NavbarText} from 'reactstrap';

const SubHeader = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="dark" dark expand="md">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        
                    </NavItem>
                </Nav>
            </Navbar>
        </>
    );
}

export default SubHeader;