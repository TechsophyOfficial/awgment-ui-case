import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { Coffee } from 'react-feather';
import keycloak from './keycloak';


configure({adapter: new Adapter()});

describe("App Component", () => {
  let wrapper, instance, mock , mock2;
  beforeEach(() => {
      wrapper =  mount(<BrowserRouter><App /></BrowserRouter>);
      instance = wrapper.instance();
      sessionStorage.setItem('config', JSON.stringify(Coffee));

      mock = jest.spyOn(keycloak , 'updateToken')
      mock.mockResolvedValue(true);

      mock2 = jest.spyOn(keycloak , 'loadUserProfile')
      mock2.mockResolvedValue(true);

  })

  it('renders without crashing', () => {
    mount(<BrowserRouter><App /></BrowserRouter>);
  });

  it('should set token when onAuthSuccess is triggered', () => {
   wrapper.find('KeycloakProvider').first().props().onEvent('onAuthSuccess');
   expect(wrapper.find('#root').length).toBe(1);
  });

  it('should refresh token when onTokenExpired is triggered', () => {
    wrapper.find('KeycloakProvider').first().props().onEvent('onTokenExpired');
    // expect(wrapper.find('header').length).toBe(1);
   });

   it('should logout when onAuthLogout is triggered', () => {
    wrapper.find('KeycloakProvider').first().props().onEvent('onAuthLogout');
    expect(localStorage.getItem('currentUser')).toBeNull();
   });
});

