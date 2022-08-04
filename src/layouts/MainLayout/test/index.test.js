import React from 'react';
import { shallow, configure } from 'enzyme';
import MainLayout from '../index';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("MainLayout", () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<MainLayout />);
        instance = wrapper.instance();
        
    })

    it('renders without crashing', () => {
        shallow(<MainLayout />);
    });

});

