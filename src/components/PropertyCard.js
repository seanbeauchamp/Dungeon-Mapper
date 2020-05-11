import React, {Component} from 'react';
import {Card, CardBody, Form, FormGroup,
    Input, Label, Nav, NavItem, NavLink, TabContent, TabPane,
    Row, Col} from 'reactstrap';
import styled from 'styled-components';
import classnames from 'classnames';

import BorderSelector from './BorderSelector';
import CellSpecs from './CellSpecs';

const CustomBordersField = styled.fieldset`
    opacity: ${props => props.expand ? 
            "0.3" : "1.0"};
`;

class PropertyCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: '2',
        }
    }

    setTab = (tabIndex) => {
        this.setState({activeTab: tabIndex});
    }

    render(){
        return(
            <Card>
                <CardBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                              className={classnames({active: this.state.activeTab === '1'})}
                              onClick={() => this.setTab('1')}
                              >Current Cell</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                              className={classnames({active: this.state.activeTab === '2'})}
                              onClick={() => this.setTab('2')}
                            >Settings</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                {!this.props.selectedSquare ? 
                                <h4 className="pt-4"> No Cell Selected </h4> :
                                <CellSpecs className="pt-4"
                                    selectedSquare={this.props.selectedSquare} />} 
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                            <div className="optionsSection pl-2 pt-4">
                                <Form>
                                    <FormGroup>
                                        <Label className="pl-3">
                                        <Input
                                            type="checkbox"
                                            name="autoexpand"
                                            defaultChecked={this.props.autoExpandSquares}
                                            onChange={this.props.toggleAutoExpandSquares}
                                            />
                                            Auto-Expand/Retract Grid
                                        </Label>
                                        <CustomBordersField expand={this.props.autoExpandSquares}>
                                            <Label>
                                                Custom Border Sides:
                                                <BorderSelector expand={this.props.autoExpandSquares}
                                                    updatePresets={this.props.updatePresets} />
                                            </Label>
                                        </CustomBordersField>
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