import React, { useState, useEffect, useRef } from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopBar from '../TopBar';
import App from 'src/App';
import { BrowserRouter } from 'react-router-dom';
import config from 'src/views/auth/config';

configure({ adapter: new Adapter() });

describe("TopBar", () => {
    let wrapper, instance;
    beforeEach(() => {
        // wrapper = mount(<BrowserRouter><App><DashboardLayout /></App></BrowserRouter>);
        // instance = wrapper.instance();
        window.location.href = 'app/my-tasks'
        sessionStorage.setItem('config', JSON.stringify(config))

    })

    it('renders without crashing', () => {
        mount(<BrowserRouter><TopBar /></BrowserRouter>);
    });

});