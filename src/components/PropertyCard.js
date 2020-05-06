import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup,
    Input, Label} from 'reactstrap';
import styled from 'styled-components';

import BorderSelector from './BorderSelector';

const CustomBordersField = styled.fieldset`
    opacity: ${props => props.expand ? 
            "0.3" : "1.0"};
`;

class PropertyCard extends Component{

    render(){
        return(
            <Card>
                <CardHeader>Settings</CardHeader>
                <CardBody>
                    <div className="optionsSection pl-2">
                        <Form>
                            <FormGroup>
                                <Label>
                                <Input
                                    type="checkbox"
                                    name="autoexpand"
                                    defaultChecked={this.props.autoExpandSquares}
                                    onChange={this.props.toggleAutoExpandSquares}
                                    />
                                    Auto-Expand/Retract Grid with Neighbour Squares
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
                </CardBody>
            </Card>
        );
    }
}

export default PropertyCard;