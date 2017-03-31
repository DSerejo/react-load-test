'use strict';
import {expect} from '../../../helpers.js'
import sinon from 'sinon';
import ValuesManager from '../../../../src/client/app/ValuesManager.js';

describe('ValuesManager',function(){
    let numValues = 10,
        eachStepValues = 3,
        step = 1000,
        mockRandomValue=0;
    ValuesManager.getRandomValuesFromArray = function(arr,n){
        let r = [];
        for(var i=0;i<n;i++){
            r.push(arr[i]);
        }
        return r;
    };
    ValuesManager.randomValue = function(){
        return mockRandomValue++;
    };
    it('create random values',function(){

        const manager = new ValuesManager(numValues,eachStepValues,step);
        expect(manager.values).to.shallowDeepEqual([0,1,2,3,4]);
    });
    it('get random indexes',function(){
        const manager = new ValuesManager(numValues,eachStepValues,step);
        expect(manager.getIndexesToUpdate()).to.shallowDeepEqual([0,1,2]);
    });
    it('updates numbers',function(){
        const manager = new ValuesManager(numValues,eachStepValues,step);
        manager.update();
        expect(manager.values).to.shallowDeepEqual([numValues*3,numValues*3+1,numValues*3+2])
    })
    it('notifies updates',function(){
        var cb = sinon.spy();
        const manager = new ValuesManager(numValues,eachStepValues,step,cb);
        manager.update(cb);
        expect(cb).to.have.been.called;
    })
});