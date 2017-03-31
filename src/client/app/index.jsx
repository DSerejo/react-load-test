'use strict';
import React from 'react';
import {render} from 'react-dom';
import ValuesManager from './ValuesManager';
import DynamicTable from './DynamicTable';
import Config from './Config';

const step = 1000;
const numCols = 20;
const numRows = 100;
const eachStepValues = 500;
class App extends React.Component {
    constructor(){
        super();

        this.manager = new ValuesManager(numRows*numCols,eachStepValues,step,this.updateValues.bind(this));
        this.state = {numCols:numCols,numRows:numRows,eachStepValues:eachStepValues,values:this.manager.values};
    }
    updateValues(){
        this.setState({values:this.manager.values});
    }
    updateConfig(newConfig){
        this.updateStep(newConfig);
        this.updateNumValues(newConfig);
        this.manager.eachStepValues = newConfig.eachStepValues;
        this.setState(newConfig);
    }
    updateNumValues(newConfig){
        const numValues = newConfig.numCols*newConfig.numRows;
        if(this.manager.numValues!=numValues){
            this.manager.numValues = numValues;
            this.manager.startValues();
        }
    }
    updateStep(newConfig){
        if(newConfig.step!=this.manager.step){
            this.manager.stop();
            this.manager.step = newConfig.step;
            this.manager.scheduleUpdate();
        }
    }
    render () {
        return <div>
            <Config update={this.updateConfig.bind(this)} numRows={this.state.numRows} numCols={this.state.numCols} eachStepValues={eachStepValues} step={step} />
            <DynamicTable numRows={this.state.numRows} numCols={this.state.numCols} values={this.state.values} />
        </div>

    }
}

render(<App/>, document.getElementById('app'));