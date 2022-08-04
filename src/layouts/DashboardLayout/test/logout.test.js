import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logout from '../Logout';

configure({ adapter: new Adapter() });

describe("Logout", () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = mount(<Logout />);
        instance = wrapper.instance();

    })

    it('renders without crashing', () => {
        mount(<Logout />);
    });

});