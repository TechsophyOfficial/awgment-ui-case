import React from 'react';
import { shallow, configure } from 'enzyme';
import GroupTasksView from '../index';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



describe("GroupTasksView Component", () => {
    let wrapper, instance;

    beforeEach(() => {
         wrapper = shallow(<GroupTasksView />);
         instance = wrapper.instance();
        
    })

    it('renders without crashing', () => {
        shallow(<GroupTasksView />);
    });

});

