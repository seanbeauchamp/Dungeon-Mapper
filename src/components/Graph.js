import React, {Component} from 'react';
import GraphSquare from './GraphSquare';
import styled from 'styled-components';

const GraphDiv = styled.div`
    inline:block;
`;

const RowDiv = styled.div`
    margin-bottom: -.95%;
`;

class Graph extends Component{
    constructor(props){
        super(props);
        let refs = [];
        for (var r=0; r<=this.props.rows; r++){
            let cols = [];
            for (var c=0; c<= this.props.columns; c++){
                cols.push(React.createRef());
            }
            refs.push(cols)
        }

        this.state = {
            squareArray: [],
            refArray: refs,
        }
    }

    setSelectedSquare = (thisRow, thisCol) => {
        //if a previously selected square is in place, de-select that first
        if (this.props.selectedSquare){
            let oldSquare = this.state.squareArray[this.props.selectedSquare.row].props.children[this.props.selectedSquare.col].ref.current;
            oldSquare.toggleSelected();

            if (this.props.selectedSquare.row === thisRow && this.props.selectedSquare.col === thisCol){
                this.props.nullifySelectedSquare();
                return;
            }           
        }
        
        let currentSquare = this.state.squareArray[thisRow].props.children[thisCol].ref.current;
        currentSquare.toggleSelected();
        this.props.setSelectedSquare(thisRow, thisCol);

    }

    //TODO: Account for disabled squares as well, returning the original borders if they existed
    checkAdjacentSquares = (thisRow, thisCol, borderOn) => {
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

        return this.calculateGraphNeighbours(upBox, downBox, rightBox, leftBox, borderOn);
    }

    calculateGraphNeighbours = (upBox, downBox, rightBox, leftBox, borderOn) => {
        let borderResults = {
            top: false,
            bottom: false,
            right: false,
            left: false
        };
        
        //"borderOn" value passed will appear opposite because the child's state has yet to change with the render
        if (!borderOn){
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
        } else {
            if (upBox !== null && !upBox.state.borderSides.bottom && upBox.state.border){
                upBox.toggleSide('bottom');
            }
            if (downBox !== null && !downBox.state.borderSides.top && downBox.state.border){
                downBox.toggleSide('top');
            }
            if (rightBox !== null && !rightBox.state.borderSides.left && rightBox.state.border){
                rightBox.toggleSide('left');
            }
            if (leftBox !== null && !leftBox.state.borderSides.right && leftBox.state.border){
                leftBox.toggleSide('right');
            }
        }
        
        return borderResults;
    }

    createGraph = () => {
        let rows = [];
        let keyID = 0;
        for (var r=0; r<=this.props.rows; r++){
            let cols = [];
            for (var c=0; c<= this.props.columns; c++){
                let newref = this.state.refArray[r][c];
                cols.push(
                    <GraphSquare rowNum={r} colNum={c} ref={newref} key={keyID}
                        gridWidth={this.state.rows} gridHeight={this.state.columns}
                        checkAdjacentSquares={this.checkAdjacentSquares}
                        autoExpandSquares={this.props.autoExpandSquares} 
                        borderPresets={this.props.borderPresets}
                        activeButton={this.props.activeButton}
                        setSelectedSquare={this.setSelectedSquare} />
                )
                keyID++;
            }
            rows.push(<RowDiv key={keyID}>{cols}</RowDiv>);
        }
        return rows;
    }

    componentDidMount(){
        let rows = this.createGraph();
        this.setState({squareArray: rows});
    }

    componentDidUpdate(prevProps){
        if (prevProps.activeButton === "1" && this.props.activeButton !== "1")
        {
            let oldSquare = this.state.squareArray[this.props.selectedSquare.row].props.children[this.props.selectedSquare.col].ref.current;
            oldSquare.toggleSelected();

            this.props.nullifySelectedSquare();
        }
    }

    render(){
    let rows = this.createGraph();
        
    return (
            <GraphDiv>
                {rows}
            </GraphDiv>
        );
    }
}

export default Graph;