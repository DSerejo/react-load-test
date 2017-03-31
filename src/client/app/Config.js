'use strict';
import React,{Component} from 'react';
import _ from 'lodash';
function isNumeric(x) {
    return !(isNaN(x)) && (typeof x !== "object") &&
        (x != Number.POSITIVE_INFINITY) && (x != Number.NEGATIVE_INFINITY);
}
class Config extends Component{
    constructor(props){
        super(props);
        this.state = {
            eachStepValues:this.props.eachStepValues,
            numRows:this.props.numRows,
            numCols:this.props.numCols,
            step:this.props.step
        }
    }

    updateNumericStateVal(state,e){
        const val = e.target.value;
        if(isNumeric(val) && val)
            this.setState({[state]:parseInt(e.target.value)});
    }
    handleClick(){
        this.props.update && this.props.update(this.state);
    }
    render(){
        return <table>
            <tbody>
                <tr>
                    <td>Num cols: <input value={this.state.numCols} onChange={this.updateNumericStateVal.bind(this,'numCols')} /></td>
                    <td>Num rows: <input value={this.state.numRows} onChange={this.updateNumericStateVal.bind(this,'numRows')}/></td>
                    <td>Total values: {this.state.numCols*this.state.numRows} </td>
                </tr>
                <tr>
                    <td>
                        Values to update on each step: <input value={this.state.eachStepValues} onChange={this.updateNumericStateVal.bind(this,'eachStepValues')}/>
                    </td>
                    <td>
                        Time step (ms): <input value={this.state.step} onChange={this.updateNumericStateVal.bind(this,'step')}/>
                    </td>
                    <td><button onClick={this.handleClick.bind(this)}>Update</button></td>
                </tr>
            </tbody>
        </table>
    }
}

export default Config;