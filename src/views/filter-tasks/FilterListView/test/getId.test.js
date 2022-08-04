import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import GetId from '../GetId';
import Adapter from 'enzyme-adapter-react-16';
import { DefaultSortingList } from 'src/mocks/tasksMock';
import { BrowserRouter } from 'react-router-dom';
import App from 'src/App';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
configure({ adapter: new Adapter() });

describe("GetId", () => {
    let wrapper, instance , taskCountMehtod;

    beforeEach(() => {
         wrapper = mount(<BrowserRouter><Provider store={store}><GetId  /></Provider></BrowserRouter>);
         instance = wrapper.instance();
        //  Object.assign(location, { host: "http://localhost:3000", pathname: 'app/filter/bc877e77-0fdc-11eb-beaf-0242ac110002' });
        //  Object.defineProperty(window.location, 'href', {
        //     writable: true,
        //     value: 'app/filter/bc877e77-0fdc-11eb-beaf-0242ac110002'
        //   });
          window.location.href = 'app/filter/bc877e77-0fdc-11eb-beaf-0242ac110002'
    })

    it('renders without crashing', () => {
        // mount()
        mount(<BrowserRouter><Provider store={store}><GetId  /></Provider></BrowserRouter>);
        
    });

    it('should redirect', () => {
        wrapper.find('FilterListView').props().onFilterSaved('/app/my-tasks');
        
    });
});

