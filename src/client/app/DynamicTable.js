'use strict';
import React, { Component,PropTypes } from 'react';
class Col extends Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.value>this.props.value){
            this.className='up'
        }
        if(nextProps.value<this.props.value){
            this.className='down';
        }
    }
    render(){
        return <td className={this.className}>{this.props.value}</td>
    }
}
class DynamicTable extends Component{
    render(){
        const rows = this.mapRows();
        return <table className="dynamic-table"><tbody>{rows}</tbody></table>;
    }
    mapRows(){
        var rows = [];
        for(var i=0;i<this.props.numRows;i++){
            rows.push(<tr key={'row_'+i}>{this.mapCols(i)}</tr>)
        }
        return rows;
    }
    mapCols(row){
        var cols = [];
        for(var i=0;i<this.props.numCols;i++){
            const pos = row*this.props.numCols + i;
            let val;
            if(this.props.values){
                val = this.props.values[pos];
            }
            cols.push(<Col key={'col_'+i} value={val}></Col>)
        }
        return cols;
    }
}
DynamicTable.propTypes = {
    numCols: PropTypes.number,
    numRows: PropTypes.number,
    values: PropTypes.array
}
export default DynamicTable;