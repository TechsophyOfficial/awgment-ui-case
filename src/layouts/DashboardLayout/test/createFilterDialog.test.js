import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateFilterDailog from '../CreateFilterDailog';
import config from 'src/views/auth/config';
import * as cammundaService from 'src/services/camundaService';
import { filterApiResponse, filterDetailsApiResponse } from 'src/mocks/tasksMock';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

configure({ adapter: new Adapter() });

describe("CreateFilterDailog Component", () => {
    let wrapper, instance, mockFilterDetails, mockCreateFilter;
    beforeEach(() => {
        wrapper = mount(<Provider store={store}><CreateFilterDailog isOpen={true} openStatus={() => console.log('open status')} onFilterSaved={() => console.log('onFilterSaved')} /></Provider>);
        instance = wrapper.instance();

        mockFilterDetails = jest.spyOn(cammundaService, 'getFilter');
        mockFilterDetails.mockResolvedValue(filterApiResponse);

        mockCreateFilter = jest.spyOn(cammundaService, 'createFilter');
        mockCreateFilter.mockResolvedValue(filterApiResponse);

        wrapper.find('#filter-name').first().simulate('change', {
            target: {
                value: 'somenewpassword  ',
            },
        });

        sessionStorage.setItem('config', JSON.stringify(config));

        localStorage.setItem('currentUser', 'sampleUser@gmail.com');
    })

    it('renders without crashing', () => {
        mount(<Provider store={store}><CreateFilterDailog isOpen={true} /></Provider>);
    });

    it('Should call createFilter API when new filter is saved', () => {
        wrapper.find('#filter-name').first().props().onChange({
            target: {
                value: 'new filter',
            },
        });
        wrapper.update()
        expect(wrapper.find('#filter-name').first().props().value).toBe('new filter')
        wrapper.find('#save-filter').first().simulate('click');
        expect(mockCreateFilter).toHaveBeenCalled();
    });

});

describe("CreateFilterDailog Component in mode", () => {
    let wrapper, instance, mockFilterDetails, mockUpdateFilter, mockDeleteFilter;
    beforeEach(() => {
        wrapper = mount(<Provider store={store}><CreateFilterDailog isOpen={true} isEdit={'bc877e77-0fdc-11eb-beaf-0242ac110002'} openStatus={() => console.log('open status')} onFilterSaved={() => console.log('onFilterSaved')} /></Provider>);
        instance = wrapper.instance();

        mockFilterDetails = jest.spyOn(cammundaService, 'getFilter');
        mockFilterDetails.mockResolvedValue(filterDetailsApiResponse);

        mockUpdateFilter = jest.spyOn(cammundaService, 'updateFilter');
        mockUpdateFilter.mockResolvedValue(filterApiResponse);

        mockDeleteFilter = jest.spyOn(cammundaService, 'deleteFilter');
        mockDeleteFilter.mockResolvedValue(filterApiResponse);

        sessionStorage.setItem('config', JSON.stringify(config));
    })

    it('renders without crashing', () => {
        mount(<Provider store={store}><CreateFilterDailog isOpen={true} /></Provider>);
    });

    it('If is in edit mode then should call getFilter api', () => {
        expect(mockFilterDetails).toHaveBeenCalled();
    });

    it('If is in edit mode then should call getFilter api', () => {
        mount(<Provider store={store}><CreateFilterDailog isOpen={true} isEdit={'bc877e77-0fdc-11eb-beaf-0242ac110002'} /></Provider>);
        expect(mockFilterDetails).toHaveBeenCalled();
    });

    it('Should call updateFilter API when new filter is updated', () => {
        wrapper.find('#filter-name').first().props().onChange({
            target: {
                value: 'updated filter',
            },
        });
        wrapper.update()
        expect(wrapper.find('#filter-name').first().props().value).toBe('updated filter')
        wrapper.find('#save-filter').first().simulate('click');
        expect(mockUpdateFilter).toHaveBeenCalled();
    });

    it('Should call deleteFilter API when delete is clicked', () => {
        wrapper.update()
        wrapper.find('#delete-filter').first().simulate('click');
        expect(mockDeleteFilter).toHaveBeenCalled();
    });

    it('Should call handleClose when delete is clicked', () => {
        wrapper.find('#close-filter').first().simulate('click');
    });

    it('Should set selected option for criteria', () => {
        wrapper.find('#add-criteria-btn').first().simulate('click');
        wrapper.update()
        wrapper.find('#name-native-disabled').first().props().onChange({
            target: {
                selectedIndex : 0,
                options: [
                    {
                        dataset: {
                            object: JSON.stringify({ variable: 'caseInstanceBusinessKey' })
                        }
                    }
                ]
            },
        });
        wrapper.update()
        expect( wrapper.find('#name-native-disabled').first().props().value).toBe('caseInstanceBusinessKey');
    });

    it('Should set the value for criteria input feild', () => {
        wrapper.find('#add-criteria-btn').first().simulate('click');
        wrapper.update()
        wrapper.find('#critria-input').first().props().onChange({
            target: {
                value: '123',
            },
        });
        wrapper.update()
        expect( wrapper.find('#critria-input').first().props().value).toBe('123');
    });

    it('Should delete criteria row when clicked on delete icon of the row', () => {
        wrapper.find('#add-criteria-btn').first().simulate('click');
        wrapper.update()
        wrapper.find('#delete-criteria-row').first().simulate('click');
        wrapper.update()
        expect( wrapper.find('#add0').length).toBe(0);
    });

    it('Should set the value for variable name input feild', () => {
        wrapper.find('#add-variable-btn').first().simulate('click');
        wrapper.update()
        wrapper.find('#variable-input').first().props().onChange({
            target: {
                value: 'buyerName',
            },
        });
        wrapper.update()
        expect( wrapper.find('#variable-input').first().props().value).toBe('buyerName');
    });

    it('Should set the value for variable value feild', () => {
        wrapper.find('#add-variable-btn').first().simulate('click');
        wrapper.update()
        wrapper.find('#variable-input-value').first().props().onChange({
            target: {
                value: 'john',
            },
        });
        wrapper.update()
        expect( wrapper.find('#variable-input-value').first().props().value).toBe('john');
    });

    it('Should delete variable row when clicked on delete icon of the row', () => {
        wrapper.find('#add-variable-btn').first().simulate('click');
        wrapper.update()
        wrapper.find('#delete-variable-row').first().simulate('click');
        wrapper.update()
        expect( wrapper.find('#variable-row').length).toBe(1);
    });
});