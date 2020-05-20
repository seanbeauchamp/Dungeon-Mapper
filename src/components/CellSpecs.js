import React, {Component} from 'react';
import {Container, Row, Col, Label,
        Input, Button} from 'reactstrap';
import {FaPlus, FaTrash} from 'react-icons/fa';

import MonsterModal, {ClearMonsterModal} from './MonsterModal';
import BorderSelector from './BorderSelector';

const pullBottom = {
    position: "absolute",
    bottom: "0",
}

class CellSpecs extends Component {
    state = {
        monsterModalRef: React.createRef(),
        clearMonsterModalRef: React.createRef()
    }

    accessMonsterModal = () => {
        let modalButton = this.state.monsterModalRef.current;
        modalButton.toggle();
    }

    accessClearMonsterModal = () => {
        if (this.props.selectedSquare.monsters !== null){
            let modalButton = this.state.clearMonsterModalRef.current;
            modalButton.toggle();
        }
    }

    render(){
        let monsterBlurb = '';
        if (this.props.selectedSquare.monsters !== null){
            let monsterName = this.props.selectedSquare.monsters.inputs.monsterNames[0];
            let monsterNum = this.props.selectedSquare.monsters.inputs.monsterNums[0];
            monsterBlurb = monsterNum + ' x ' + monsterName;
            if (this.props.selectedSquare.monsters.inputs.monsterNames.length > 1){
                monsterBlurb += ' & others'
            }
        }

        return(
            <Container className="pt-4">
                <Row>
                    <Col>Row: {this.props.selectedSquare.row}</Col>
                    <Col>Column: {this.props.selectedSquare.col}</Col>
                </Row>
                <Row className="pt-2">
                    <Col>
                        <BorderSelector 
                            source={"cell"}
                            selectedSquareRef={this.props.selectedSquareRef} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label for="monsterSection">Monsters</Label>
                        <Input disabled type="text"
                            name="monsterSection"
                            value={monsterBlurb} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button style={pullBottom} onClick={this.accessMonsterModal}><FaPlus /></Button>
                        <MonsterModal 
                            ref={this.state.monsterModalRef}
                             selectedSquare={this.props.selectedSquare}
                             setMonsterEntry={this.props.setMonsterEntry} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button disabled={this.props.selectedSquare.monsters !== null ?
                            "" : "true"} style={pullBottom} 
                            onClick={this.accessClearMonsterModal}>
                            <FaTrash />
                        </Button>
                        <ClearMonsterModal
                            ref={this.state.clearMonsterModalRef}
                            clearMonsterEntry={this.props.clearMonsterEntry} /> 
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CellSpecs;