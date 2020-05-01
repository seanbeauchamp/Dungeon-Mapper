import React, {Component} from 'react';
import {Card, Button, Form, FormGroup,
    Input, Label} from 'reactstrap';

class PropertyCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <>
                <Form>
                    <FormGroup>
                        <Label>
                        <Input
                            type="checkbox"
                            name="autoexpand"
                            defaultChecked={this.props.autoExpandSquares}
                            onChange={this.props.toggleAutoExpandSquares}
                             />
                            Auto-Expand Graph Squares
                        </Label>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

export default PropertyCard;