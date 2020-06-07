import React, {Component} from 'react';
import {Card, CardBody, Form, FormGroup, Container,
    Input, Label, Nav, NavItem, NavLink, TabContent, TabPane,
    Row, Col} from 'reactstrap';
import styled from 'styled-components';
import classnames from 'classnames';

import BorderSelector from './BorderSelector';
import CellSpecs from './CellSpecs';
import ResizeModal from './ResizeModal';
import FloorSelector from './FloorSelector';

const CustomBordersField = styled.fieldset`
    opacity: ${props => props.expand ? 
            "0.3" : "1.0"};
`;

class PropertyCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: '0',
        }
    }

    setTab = (tabIndex) => {
        this.setState({activeTab: tabIndex});
    }

    componentDidUpdate(prevProps){
        if (prevProps.activeButton !== this.props.activeButton &&
                (this.props.activeButton === "1" || this.props.activeButton === "2")){
                    this.setState({activeTab: this.props.activeButton})
                }
    }

    render(){
        return(
            <Card className="h-100">
                <CardBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '0'})}
                                onClick={() => this.setTab('0')}
                                style={{cursor: "pointer"}}
                                >Floors</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                              className={classnames({active: this.state.activeTab === '1'})}
                              onClick={() => this.setTab('1')}
                              style={{cursor: "pointer"}}
                              >Current Cell</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                              className={classnames({active: this.state.activeTab === '2'})}
                              onClick={() => this.setTab('2')}
                              style={{cursor: "pointer"}}
                            >Settings</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="0">
                        <Row>
                            <Col sm="12">
                                <FloorSelector 
                                    storedFloors={this.props.storedFloors}
                                    currentFloorIndex={this.props.currentFloorIndex}
                                    maxFloors={this.props.maxFloors}
                                    addFloor={this.props.addFloor}
                                    removeFloor={this.props.removeFloor}
                                    renameFloor={this.props.renameFloor}
                                    moveFloor={this.props.moveFloor} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                {!this.props.selectedSquare ? 
                                <h4 className="pt-4"> No Cell Selected </h4> :
                                <CellSpecs 
                                    selectedSquare={this.props.selectedSquare}
                                    selectedSquareRef={this.props.selectedSquareRef} 
                                    setEventEntry={this.props.setEventEntry}
                                    clearEventEntry={this.props.clearEventEntry} />} 
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                            <div className="optionsSection pl-2 pt-4">
                                <Form>
                                    <FormGroup check>
                                        <Label check>
                                        <Input
                                            type="checkbox"
                                            name="autoexpand"
                                            defaultChecked={this.props.autoExpandSquares}
                                            onChange={this.props.toggleAutoExpandSquares}
                                            />
                                            Auto-Expand/Retract Grid
                                        </Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <CustomBordersField expand={this.props.autoExpandSquares}>
                                            <Label>
                                                Custom Border Sides:
                                                <BorderSelector expand={this.props.autoExpandSquares}
                                                    updatePresets={this.props.updatePresets}
                                                    source={"settings"} />
                                            </Label>
                                        </CustomBordersField>
                                    </FormGroup>
                                    <FormGroup>
                                        <Container>
                                            <Row>
                                                <Col xs="1">X</Col>
                                                <Col xs="3"><Input disabled type="text" id="rowCount" value={this.props.rows} /></Col>
                                                <Col xs="1">Y</Col>
                                                <Col xs="3"><Input disabled type="text" id="colCount" value={this.props.columns} /></Col>
                                                <Col xs="2">
                                                    <ResizeModal 
                                                        rows={this.props.rows}
                                                        columns={this.props.columns}
                                                        resizeGrid={this.props.resizeGrid} />
                                                </Col>
                                                <Col xs="3"></Col>
                                            </Row>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </div>
                    </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        );
    }
}

export default PropertyCard;