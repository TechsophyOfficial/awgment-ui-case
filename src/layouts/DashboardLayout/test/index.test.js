import React, { useState, useEffect, useRef } from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardLayout from '../index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { ThemeProvider } from '@material-ui/core';
import theme from 'src/theme';

configure({ adapter: new Adapter() });

describe("DashboardLayout", () => {
    let wrapper, instance;
    beforeEach(() => {
        // wrapper = mount(<BrowserRouter><App><DashboardLayout /></App></BrowserRouter>);
        // instance = wrapper.instance();
        window.location.href = 'app/my-tasks'
    })

    it('renders without crashing', () => {
        mount(<BrowserRouter><ThemeProvider theme={theme}><Provider store={store}><DashboardLayout /></Provider></ThemeProvider></BrowserRouter>);
    });

});