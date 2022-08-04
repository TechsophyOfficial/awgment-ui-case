import React from 'react';
import { shallow, configure } from 'enzyme';
import MyTasksListView from '../index';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



describe("MyTasksListView Component", () => {
    let wrapper, instance;

    beforeEach(() => {
         wrapper = shallow(<MyTasksListView />);
         instance = wrapper.instance();
        
    })

    it('renders without crashing', () => {
        shallow(<MyTasksListView />);
    });

});

