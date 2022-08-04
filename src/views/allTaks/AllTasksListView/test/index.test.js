import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AllTasksView from '../index';
configure({ adapter: new Adapter() });



describe("AllTasksView Component", () => {
    let wrapper, instance;

    beforeEach(() => {
         wrapper = shallow(<AllTasksView />);
         instance = wrapper.instance();
        
    })

    it('renders without crashing', () => {
        shallow(<AllTasksView />);
    });

});

