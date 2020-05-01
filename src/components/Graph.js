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
        }
    }

    //TODO: Account for disabled squares as well, returning the original borders if they existed
    checkAdjacentSquares = (thisRow, thisCol) => {
        if (!this.props.autoExpandSquares)
            return null;

        let upBox = (thisRow - 1 >= 0 ? 
            this.state.squareArray[thisRow - 1].props.children[thisCol].ref.current : null);
        let downBox = (thisRow + 1 <= this.props.rows ? 
            this.state.squareArray[thisRow + 1].props.children[thisCol].ref.current : null);
        let rightBox = (thisCol + 1 <= this.props.columns ? 
            this.state.squareArray[thisRow].props.children[thisCol + 1].ref.current : null);
        let leftBox = (thisCol - 1 >= 0 ? 
            this.state.squareArray[thisRow].props.children[thisCol - 1].ref.current : null);

        let borderResults = {
            top: false,
            bottom: false,
            right: false,
            left: false
        };
       
        if (upBox !== null && upBox.state.borderSides.bottom){
            borderResults.top = true;
            upBox.toggleSide('bottom');
        }

        if (downBox !== null && downBox.state.borderSides.top){
            borderResults.bottom = true;
            downBox.toggleSide('top');
        }

        if (rightBox !== null && rightBox.state.borderSides.left){
            borderResults.right = true;
            rightBox.toggleSide('left');
        }

        if (leftBox !== null && leftBox.state.borderSides.right){
            borderResults.left = true;
            leftBox.toggleSide('right');
        }
        
        return borderResults;
    }

    createGraph = () => {
        let rows = [];
        for (var r=0; r<=this.props.rows; r++){
            let cols = [];
            for (var c=0; c<= this.props.columns; c++){
                let newref = React.createRef();
                cols.push(
                    <GraphSquare rowNum={r} colNum={c} ref={newref}
                        gridWidth={this.state.rows} gridHeight={this.state.columns}
                        checkAdjacentSquares={this.checkAdjacentSquares}
                        autoExpandSquares={this.state.autoExpandSquares} />
                )
            }
            rows.push(<RowDiv>{cols}</RowDiv>);
        }
        this.setState({squareArray: rows});
    }

    componentDidMount(){
        this.createGraph();
    }

    render(){
    return (
            <GraphDiv>
                {this.state.squareArray}
            </GraphDiv>
        );
    }
}

export default Graph;