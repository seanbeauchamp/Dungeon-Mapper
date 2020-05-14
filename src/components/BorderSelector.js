import React, {Component} from 'react';
import styled from 'styled-components';

const CustomBorderGrid = styled.table`
    border: collapse;
    border-left: ${props => props.borderPresets.left ?
        "2px solid black" : "2px solid #EEEEEE"};
    border-right: ${props => props.borderPresets.right ?
        "2px solid black" : "2px solid #EEEEEE"};
    border-top: ${props => props.borderPresets.top ?
        "2px solid black" : "2px solid #EEEEEE"};
    border-bottom: ${props => props.borderPresets.bottom ?
        "2px solid black" : "2px solid #EEEEEE"};
`;

/*const CenterSquare = styled.td`
    width: 100px;
    height: 100px;
    padding: 0;
`;*/

const SideSection = styled.td`
    width: ${props => props.styleWidth};
    height: ${props => props.styleHeight};
    padding: 0;
    background-color: ${props => !props.hovering ?
        "#FFFFFF": "#EEEEEE"}
`;

class BorderSelector extends Component{
    constructor(props){
        super(props);

        let starterBorder = {
            top: true,
            bottom: true,
            left: true,
            right: true
        }
        if (props.source === "cell"){
            starterBorder = this.props.selectedSquareRef.state.borderSides;
        }       

        this.state = {
            borderPresets: starterBorder
        }
    }

    toggleSide = side => {
        if (this.props.source === "settings"){
            if (!this.props.expand){
                let newPresets = this.state.borderPresets;
                newPresets[side] = !newPresets[side];
                this.setState({borderPresets: newPresets});
                this.props.updatePresets(side);
            }
        } else if (this.props.source === "cell"){
            this.props.selectedSquareRef.toggleSide(side);
            this.setState({borderPresets: this.props.selectedSquareRef.state.borderSides})
        }
    }

    toggleAll = () => {
        let allBordersSet = true;
        for (let key in this.state.borderPresets){
            if (!this.state.borderPresets[key]){
                allBordersSet = false;
                break;
            }
        }

        if (allBordersSet){
            for (let side in this.state.borderPresets){
                this.toggleSide(side);
            }
        } else {
            for (let side in this.state.borderPresets){
                if (!this.state.borderPresets[side]){
                    this.toggleSide(side);
                }
            }
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.source === "cell" && prevProps.selectedSquareRef !== this.props.selectedSquareRef){
            this.setState({borderPresets: this.props.selectedSquareRef.state.borderSides})
        }
    }

    render(){
        return(
            <div>
            <CustomBorderGrid borderPresets={this.state.borderPresets}>
                <tbody>
                <tr>
                    <CustomSide thisWidth={"142px"} thisHeight={"20px"}
                            expand={this.props.expand} 
                            colSpan="3" style={{borderBottom: "1px solid #CCCCCC"}}
                            handleClick={() => this.toggleSide("top")}/>
                </tr>
                <tr>
                    <CustomSide thisWidth={"20px"} thisHeight={"100px"}
                            expand={this.props.expand}
                            style={{borderRight: "1px solid #CCCCCC"}}
                            handleClick={() => this.toggleSide("left")} />
                    <CustomSide thisWidth={"100px"} thisHeight={"100px"}
                            expand={this.props.expand} 
                            handleClick={this.toggleAll}/>
                    <CustomSide thisWidth={"20px"} thisHeight={"100px"}
                            expand={this.props.expand}
                            style={{borderLeft: "1px solid #CCCCCC"}}
                            handleClick={() => this.toggleSide("right")} />
                </tr>
                <tr>
                    <CustomSide thisWidth={"142px"} thisHeight={"20px"}
                            expand={this.props.expand}
                            colSpan="3" style={{borderTop: "1px solid #CCCCCC"}}
                            handleClick={() => this.toggleSide("bottom")} />
                </tr>
            </tbody>
            </CustomBorderGrid>
            </div>
        )
    }
}

class CustomSide extends Component{
    constructor(){
        super();
        this.state = {
            hovering: false,
        }
    }

    setHoveringStatus = status => {
        if (!this.props.expand){
            this.setState({hovering: status});
        }
    }

    render(){
        return(
            <SideSection hovering={this.state.hovering}
                styleWidth={this.props.thisWidth} styleHeight={this.props.thisHeight}
                colSpan={this.props.colSpan}
                style={this.props.style}
                onMouseEnter={() => this.setHoveringStatus(true)}
                onMouseLeave={() => this.setHoveringStatus(false)}
                onClick={this.props.handleClick}
                />
        );
    }
}

export default BorderSelector;