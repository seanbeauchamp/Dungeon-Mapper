import React, {Component} from 'react';
import GraphSquare from './GraphSquare';

class Graph extends Component{
    constructor(){
        super();
        this.state = {
            squareRows: [],
            rows: 20,
            columns: 1
        }
    }

    createGraph = () => {
        let rows = [];
        for (var r=0; r<=this.state.rows; r++){
            let cols = []
            for (var c=0; c<= this.state.columns; c++){
                cols.push(
                    <GraphSquare />
                )
            }
        rows.push(<div>{cols}</div>);
        }
        return rows;
    }

    render(){
        return (
            <div>
                {this.createGraph()}
            </div>
        );
    }
}

export default Graph;