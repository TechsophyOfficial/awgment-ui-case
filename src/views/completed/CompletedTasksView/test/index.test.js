import React from 'react';
import { shallow, configure } from 'enzyme';
import CompletedTasksView from '../index';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



describe("CompletedTasksView Component", () => {
    let wrapper, instance;

    beforeEach(() => {
         wrapper = shallow(<CompletedTasksView />);
         instance = wrapper.instance();
        
    })

    it('renders without crashing', () => {
        shallow(<CompletedTasksView />);
    });

});

