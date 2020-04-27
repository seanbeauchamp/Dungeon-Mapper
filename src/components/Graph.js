import React, {Component} from 'react';
import styled from 'styled-components';

class Graph extends Component{
    constructor(){
        super();
        this.state = {
            squareRows: [],
            rows: 20,
            columns: 20
        }
    }

    componentWillMount(){
        let rows = [];
        for (r=0; r<=this.state.rows; r++){
            rows.push({
                cols: []
            });
            for (c=0; c<= this.state.columns; c++){
                rows[r].cols.push(

                )
            }
        }
    }

    render(){
        return (
            <>
            </>
        );
    }
}