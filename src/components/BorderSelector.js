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

const CenterSquare = styled.td`
    width: 100px;
    height: 100px;
    padding: 0;
`;

const SideSection = styled.td`
    width: ${props => props.styleWidth};
    height: ${props => props.styleHeight};
    padding: 0;
    background-color: ${props => !props.hovering ?
        "#FFFFFF": "#EEEEEE"}
`;

class BorderSelector extends Component{
    constructor(){
        super();
        this.state = {
            borderPresets: {
                top: true,
                bottom: true,
                left: true,
                right: true
            }
        }
    }

    toggleSide = side => {
        if (!this.props.expand){
            let newPresets = this.state.borderPresets;
            newPresets[side] = !newPresets[side];
            this.setState({borderPresets: newPresets});
            this.props.updatePresets(side);
        }
    }

    render(){
        return(
            <div>
            <CustomBorderGrid borderPresets={this.state.borderPresets}>
                <tr>
                    <td colSpan="3" style={{padding: "0", borderBottom: "1px solid #CCCCCC"}}
                        onClick={() => this.toggleSide("top")}>
                        <CustomSide thisWidth={"142px"} thisHeight={"20px"}
                            expand={this.props.expand} />
                    </td>
                </tr>
                <tr>
                    <td style={{padding: "0", borderRight: "1px solid #CCCCCC"}}
                        onClick={() => this.toggleSide("left")}>
                        <CustomSide thisWidth={"20px"} thisHeight={"100px"}
                            expand={this.props.expand} />
                    </td>
                    <td style={{padding: "0"}}>
                        <CenterSquare />
                    </td>
                    <td style={{padding: "0", borderLeft: "1px solid #CCCCCC"}}
                        onClick={() => this.toggleSide("right")}>
                        <CustomSide thisWidth={"20px"} thisHeight={"100px"}
                            expand={this.props.expand} />
                    </td>
                </tr>
                <tr>
                    <td colSpan="3" style={{padding: "0", borderTop: "1px solid #CCCCCC"}}
                        onClick={() => this.toggleSide("bottom")}>
                        <CustomSide thisWidth={"142px"} thisHeight={"20px"}
                            expand={this.props.expand} />
                    </td>
                </tr>
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
                onMouseEnter={() => this.setHoveringStatus(true)}
                onMouseLeave={() => this.setHoveringStatus(false)}
                />
        );
    }
}

export default BorderSelector;