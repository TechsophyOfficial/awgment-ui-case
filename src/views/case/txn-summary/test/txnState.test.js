import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TxnState from '../txnState';
import { selectedTask, txnDetailsConfigMock, txnStateConfigMock } from 'src/mocks/tasksMock';

configure({ adapter: new Adapter() });

describe("Case Details", () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = mount(<TxnState selectedTask={selectedTask} config={txnStateConfigMock}/>);
        instance = wrapper.instance();
    })

    it('renders without crashing', () => {
        mount(<TxnState selectedTask={selectedTask} config={txnStateConfigMock}/>);
    });

    it('caseDetails should be defined', () => {
       expect(wrapper.find('#title').first().text()).toBe('Transaction State');
    });


});