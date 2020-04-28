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
            rows: 20,
            columns: 20
        }
    }

    checkAdjacentSquares = () => {
        console.log("test");
    }

    createGraph = () => {
        let rows = [];
        for (var r=0; r<=this.state.rows; r++){
            let cols = [];
            for (var c=0; c<= this.state.columns; c++){
                cols.push(
                    <GraphSquare rowNum={r} colNum={c} 
                        gridWidth={this.state.rows} gridHeight={this.state.columns}
                        checkAdjacentSquares={this.checkAdjacentSquares} />
                )
            }
        rows.push(<RowDiv>{cols}</RowDiv>);
        }
        return rows;
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