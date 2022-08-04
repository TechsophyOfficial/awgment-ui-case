import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TxnDetails from '../txnDetails';
import { selectedTask, txnDetailsConfigMock } from 'src/mocks/tasksMock';

configure({ adapter: new Adapter() });

describe("Case Details", () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = mount(<TxnDetails selectedTask={selectedTask} config={txnDetailsConfigMock}/>);
        instance = wrapper.instance();
    })

    it('renders without crashing', () => {
        mount(<TxnDetails selectedTask={selectedTask} config={txnDetailsConfigMock}/>);
    });

    it('caseDetails should be defined', () => {
       expect(wrapper.find('#title').first().text()).toBe('RFQ Details');
    });


});