import React, {Component} from 'react';
import styled from 'styled-components';

const CustomBorderGrid = styled.table`
    border: collapse;
    border: 1px solid black;
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
    render(){
        return(
            <div>
            <CustomBorderGrid>
                <tr>
                    <td colspan="3" style={{padding: "0", borderBottom: "1px solid #CCCCCC"}}>
                        <CustomSide thisWidth={"142px"} thisHeight={"20px"} />
                    </td>
                </tr>
                <tr>
                    <td style={{padding: "0", borderRight: "1px solid #CCCCCC"}}>
                        <CustomSide thisWidth={"20px"} thisHeight={"100px"} />
                    </td>
                    <td style={{padding: "0"}}><CenterSquare /></td>
                    <td style={{padding: "0", borderLeft: "1px solid #CCCCCC"}}>
                        <CustomSide thisWidth={"20px"} thisHeight={"100px"} />
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style={{padding: "0", borderTop: "1px solid #CCCCCC"}}>
                        <CustomSide thisWidth={"142px"} thisHeight={"20px"} />
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
        this.setState({hovering: status});
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