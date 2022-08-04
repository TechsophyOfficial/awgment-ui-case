import React from 'react';
import { shallow, configure } from 'enzyme';
import Sorting from '../index';
import Adapter from 'enzyme-adapter-react-16';
import config from 'src/views/auth/config';
configure({ adapter: new Adapter() });



describe("Sorting Component", () => {
    let wrapper, instance;

    beforeEach(() => {
         wrapper = shallow(<Sorting refreshTasksOnSorting={() => console.log('refreshed')} />);
         instance = wrapper.instance();
         sessionStorage.setItem('config', JSON.stringify(config))

    })

    it('renders without crashing', () => {
        shallow(<Sorting refreshTasksOnSorting={() => console.log('refreshed')}/>);
    });

});

