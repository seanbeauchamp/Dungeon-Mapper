import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup,
    Input, Label} from 'reactstrap';

import BorderSelector from './BorderSelector';

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
                                <Label>
                                    Custom Border Sides:
                                    <BorderSelector />
                                </Label>
                            </FormGroup>
                        </Form>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default PropertyCard;