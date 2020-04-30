import React, {Component} from 'react';
import GraphSquare from './GraphSquare';
import styled from 'styled-components';

const GraphDiv = styled.div`
    inline:block;
`;

const RowDiv = styled.div`
    margin-bottom: -5.5px;
`;

class Graph extends Component{
    constructor(){
        super();
        this.state = {
            squareArray: [],
            rows: 20,
            columns: 20
        }
    }

    checkAdjacentSquares = (thisRow, thisCol) => {
        //let testReturn = this.state.squareArray[thisRow].props.children[thisCol].ref.current.state.border;
        let upBox = (thisRow - 1 >= 0 ? 
            this.state.squareArray[thisRow - 1].props.children[thisCol].ref.current : null);
        let downBox = (thisRow + 1 <= this.state.rows ? 
            this.state.squareArray[thisRow + 1].props.children[thisCol].ref.current : null);
        let rightBox = (thisCol + 1 <= this.state.columns ? 
            this.state.squareArray[thisRow].props.children[thisCol + 1].ref.current : null);
        let leftBox = (thisCol - 1 >= 0 ? 
            this.state.squareArray[thisRow].props.children[thisCol - 1].ref.current : null);

        let borderResults = {
            top: false,
            bottom: false,
            right: false,
            left: false
        };
       
        if (upBox.state.borderSides.up || upBox.state.border){
            borderResults.top = true;
            upBox.toggleSide('top');
        }
        
        return borderResults;
    }

    createGraph = () => {
        let rows = [];
        for (var r=0; r<=this.state.rows; r++){
            let cols = [];
            for (var c=0; c<= this.state.columns; c++){
                let newref = React.createRef();
                cols.push(
                    <GraphSquare rowNum={r} colNum={c} ref={newref}
                        gridWidth={this.state.rows} gridHeight={this.state.columns}
                        checkAdjacentSquares={this.checkAdjacentSquares} />
                )
            }
        this.state.squareArray.push(<RowDiv>{cols}</RowDiv>);
        }
        return this.state.squareArray;
    }

    render(){
        return (
            <GraphDiv>
                {this.createGraph()}
            </GraphDiv>
        );
    }
}

export default Graph;