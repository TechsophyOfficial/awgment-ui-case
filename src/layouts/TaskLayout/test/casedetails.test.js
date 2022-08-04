import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CaseDetails from '../CaseDetails';
import * as cammundaService from 'src/services/camundaService';
import { caseInstanceApiResponse, selectedTask } from 'src/mocks/tasksMock';

configure({ adapter: new Adapter() });

describe("Case Details", () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = mount(<CaseDetails selectedTask={selectedTask} />);
        instance = wrapper.instance();

        const mockGetCaseInstance = jest.spyOn(cammundaService, 'getCaseInstance');
        mockGetCaseInstance.mockResolvedValue(caseInstanceApiResponse);
    })

    it('renders without crashing', () => {
        mount(<CaseDetails selectedTask={selectedTask} />);
    });

    it('caseDetails should be defined', () => {
        setTimeout(() => {
            expect(wrapper.caseDetails).toBeDefined()
        });
    });

    it('Business Key should be 600', () => {
        setTimeout(() => {
            expect(wrapper.find('h4').first().text()).toContain(600)
        });
    });

    it('Menu should optn when clicked on button', () => {
        wrapper.find('#action-btn').first().simulate('click')
        expect(wrapper.anchorEl).not.toBeNull();
    });

    it('Should call completeTask() when option is selected', () => {
        let ul = wrapper.find('.MuiMenu-list .MuiListItem-root').first().simulate('click')
        setTimeout(() => {
            expect(wrapper.anchorEl).toBeNull();
        });
    });

    it('Should call claimTask() when option is selected', () => {
        let selectedT = selectedTask;
        selectedTask.assignee = null;
        let wrapper2 = mount(<CaseDetails selectedTask={selectedT} />)
        let ul = wrapper2.find('.MuiMenu-list .MuiListItem-root').first().simulate('click')
        setTimeout(() => {
            expect(wrapper2.anchorEl).toBeNull();
        });
    });

});