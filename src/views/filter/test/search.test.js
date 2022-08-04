import React from 'react';
import { shallow, configure } from 'enzyme';
import Search from '../search';
import Adapter from 'enzyme-adapter-react-16';
import config from 'src/views/auth/config';
import * as commonService from 'src/services/common';

configure({ adapter: new Adapter() });

describe("Search Component", () => {
    let wrapper, instance;

    beforeEach(() => {
         wrapper = shallow(<Search onSearchClicked={() => console.log('search clicked')}/>);
         instance = wrapper.instance();
         sessionStorage.setItem('config', JSON.stringify(config));
    })

    it('renders without crashing', () => {
        shallow(<Search />);
    });

    it('should set search option to caseInstanceBusinessKey and enable value input feild', () => {
        wrapper.find('#search-input').props().onChange({}, 'caseInstanceBusinessKey');        
        expect(wrapper.find('#search-input').props().value).toBe('caseInstanceBusinessKey');
        expect(wrapper.find('#search-value-input')).toBeDefined()

    });


    it('should set search option to empty and hide value input feild', () => {
        wrapper.find('#search-input').props().onChange({}, '');        
        expect(wrapper.find('#search-input').props().value).toBe('');
        expect(wrapper.find('#search-value-input').length).toBe(0)

    });

    it('should set state inputValue when entered a value', () => {
        wrapper.find('#search-input').props().onInputChange({} , 'caseInstanceBusinessKey');
        expect(instance.state.inputValue).toBe('caseInstanceBusinessKey')
    });

    it('should set state value when entered a value', () => {
        wrapper.find('#search-input').props().onChange({}, 'caseInstanceBusinessKey'); 
        wrapper.find('#search-value-input').props().onChange({
            target : {
                value : '123'
            }
        })
        expect(wrapper.find('#search-value-input').props().value).toBe('123')
        expect(instance.state.value).toBe('123')
    });

    it('should search for the given input', () => {
        const spy= jest.spyOn(instance, 'handleSearch');
        wrapper.find('#search-input').props().onChange({}, 'caseInstanceBusinessKey'); 
        wrapper.find('#search-value-input').props().onChange({
            target : {
                value : '123'
            }
        })
        wrapper.find('#search-btn').props().onClick(); 
       expect(spy).toHaveBeenCalledTimes(1)
       
    });
});

describe("Search Component without config", () => {
    let wrapper, instance, mockConfigApi;

    beforeEach(() => {
         wrapper = shallow(<Search />);
         instance = wrapper.instance();

         sessionStorage.setItem('config', JSON.stringify(null));

         mockConfigApi = jest.spyOn(commonService, 'getConfig');
         mockConfigApi.mockResolvedValue({success: true , data : JSON.stringify(config)});
    })

    it('renders without crashing', () => {
        shallow(<Search />);
    });

    it('renders without crashing', () => {
        expect(mockConfigApi).toHaveBeenCalled()
    });

});

