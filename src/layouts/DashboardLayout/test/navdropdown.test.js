import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavDropdown from '../NavDropdown';
import App from 'src/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { ThemeProvider } from '@material-ui/core';
import theme from 'src/theme';

configure({ adapter: new Adapter() });

describe("NavDropdown", () => {
    let wrapper, instance;
    beforeEach(() => {
        // wrapper = mount(<BrowserRouter><App><NavDropdown /></App></BrowserRouter>);
        // instance = wrapper.instance();
        window.location.href = 'app/filter/bc877e77-0fdc-11eb-beaf-0242ac110002'
    })

    it('renders without crashing', () => {
        mount(<BrowserRouter><ThemeProvider theme={theme}><Provider store={store}><NavDropdown /></Provider></ThemeProvider></BrowserRouter>);
    });

});