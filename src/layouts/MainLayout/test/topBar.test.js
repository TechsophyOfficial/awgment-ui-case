import React from 'react';
import { shallow, configure } from 'enzyme';
import TopBar from '../TopBar';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("TopBar", () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<TopBar />);
        instance = wrapper.instance();        
    })

    it('renders without crashing', () => {
        shallow(<TopBar />);
    });

});

