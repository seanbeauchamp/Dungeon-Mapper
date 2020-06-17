import React, {Component} from 'react';
import {Container, Row, Col, Label,
        Input, Button} from 'reactstrap';
import {FaPlus, FaTrash} from 'react-icons/fa';

import EntryModal, {ClearEntryModal} from './EntryModal';
import BorderSelector from './BorderSelector';

const pullBottom = {
    position: "absolute",
    bottom: "0",
}

class CellSpecs extends Component {
    state = {
        monsterModalRef: React.createRef(),
        clearMonsterModalRef: React.createRef(),
        lootModalRef: React.createRef(),
        clearLootModalRef: React.createRef(),
        trapModalRef: React.createRef(),
        clearTrapsModalRef: React.createRef()
    }

    accessEntryModal = (currentRef) => {
        let modalButton = currentRef.current;
        modalButton.toggle();
    }

    accessClearEntryModal = (propVal, currentRef) => {
        if (propVal !== null){
            let modalButton = currentRef.current;
            modalButton.toggle();
        }
    }

    render(){
        let entryStates = [this.props.selectedSquare.monsters,
                        this.props.selectedSquare.loot,
                        this.props.selectedSquare.traps];
                        
        let iteratingStates = [this.props.selectedSquare.monsters,
                                this.props.selectedSquare.loot];                       

        let entryBlurbs = entryStates.map((currentState, index) => {
            let newBlurb = ''
            if (currentState !== null){
                if (iteratingStates.includes(currentState)){
                    let entryName = currentState.inputs.entryNames[0];
                    let entryNum = currentState.inputs.entryNums[0];
                    newBlurb = entryNum + ' x ' + entryName;
                    if (currentState.inputs.entryNames.length > 1){
                        newBlurb += ' & others'
                    }
                } else {
                    newBlurb = currentState.inputs.entryNames[0];
                }
            }
            return newBlurb;
        })

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
                <hr />
                <Row>
                    <Col>
                        <Label for="monsterSection">Monsters</Label>
                        <Input disabled type="text"
                            name="monsterSection"
                            value={entryBlurbs[0]} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button style={pullBottom} 
                            onClick={() => this.accessEntryModal(this.state.monsterModalRef)}><FaPlus /></Button>
                        <EntryModal 
                            ref={this.state.monsterModalRef}
                             entries={this.props.selectedSquare.monsters}
                             setEntry={this.props.setEventEntry}
                             setArguments={["monsterEntries", "monsters", "monsterSet"]}
                             entryType={"Monster"} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button disabled={this.props.selectedSquare.monsters !== null ?
                            "" : "true"} style={pullBottom} 
                            onClick={() => 
                            this.accessClearEntryModal(this.props.selectedSquare.monsters, this.state.clearMonsterModalRef)}>
                            <FaTrash />
                        </Button>
                        <ClearEntryModal
                            ref={this.state.clearMonsterModalRef}
                            clearEventEntry={() => this.props.clearEventEntry("monsterEntries", "monsters", "monsterSet")}
                            entryType={"Monster"} /> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                            <Label for="lootSection">Loot</Label>
                            <Input disabled type="text"
                                name="lootSection"
                                value={entryBlurbs[1]} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button style={pullBottom}
                        onClick={() => this.accessEntryModal(this.state.lootModalRef)}><FaPlus /></Button>
                        <EntryModal
                            ref={this.state.lootModalRef}
                            entries={this.props.selectedSquare.loot}
                            setEntry={this.props.setEventEntry}
                            setArguments={["lootEntries", "loot", "lootSet"]}
                            entryType={"Loot"} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button disabled={this.props.selectedSquare.loot !== null ?
                        "" : "true"} style={pullBottom}
                        onClick={() => this.accessClearEntryModal(this.props.selectedSquare.loot, this.state.clearLootModalRef)}>
                            <FaTrash />
                        </Button>
                        <ClearEntryModal
                            ref={this.state.clearLootModalRef}
                            clearEventEntry={() => this.props.clearEventEntry("lootEntries", "loot", "lootSet")}
                            entryType={"Loot"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                            <Label for="trapSection">Traps</Label>
                            <Input disabled type="text"
                                name="trapSection"
                                value={entryBlurbs[2]} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button style={pullBottom}
                        onClick={() => this.accessEntryModal(this.state.trapModalRef)}><FaPlus /></Button>
                        <EntryModal
                            ref={this.state.trapModalRef}
                            entries={this.props.selectedSquare.traps}
                            setEntry={this.props.setEventEntry}
                            setArguments={["trapEntries", "traps", "trapsSet"]}
                            entryType={"Traps"} />
                    </Col>
                    <Col xs="2" style={{position: "relative"}}>
                        <Button disabled={this.props.selectedSquare.traps !== null ?
                        "" : "true"} style={pullBottom}
                        onClick={() => this.accessClearEntryModal(this.props.selectedSquare.traps, this.state.clearTrapsModalRef)}>
                            <FaTrash />
                        </Button>
                        <ClearEntryModal
                            ref={this.state.clearTrapsModalRef}
                            clearEventEntry={() => this.props.clearEventEntry("trapEntries", "traps", "trapsSet")}
                            entryType="Traps" />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CellSpecs;