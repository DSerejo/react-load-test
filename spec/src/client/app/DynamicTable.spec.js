'use strict';
import {expect} from '../../../helpers.js'
import DynamicTable from '../../../../src/client/app/DynamicTable.js';
import { mount,shallow} from 'enzyme';
import React from 'react';
describe('DynamicTable',function(){
    const values = [1,2,3,4,5];
    const num_rows = 1;
    const num_cols = 5;
    it('renders table with correct size',function(){
        const wrapper = shallow(<DynamicTable numRows={num_rows} numCols={num_cols}/>);
        expect(wrapper.find('tr')).to.have.length(num_rows);
        expect(wrapper.find('td')).to.have.length(num_cols*num_rows);
    })
    it('renders table with values',function(){
        const wrapper = mount(<DynamicTable numRows={num_rows} numCols={num_cols} values={values}/>);
        const firstTd = wrapper.find('td').get(0);
        const lastTd = wrapper.find('td').get(values.length-1);
        expect(firstTd.textContent).to.equal(''+values[0]);
        expect(lastTd.textContent).to.equal(''+values[values.length-1]);
    })
    it('updates value',function(){
        const wrapper = mount(<DynamicTable numRows={num_rows} numCols={num_cols} values={values}/>);
        values[0]=2;
        wrapper.setProps({values:values});
        const firstTd = wrapper.find('td').get(0);
        expect(firstTd.textContent).to.equal(''+values[0]);
    })
});