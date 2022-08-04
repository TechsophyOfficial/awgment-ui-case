import React from 'react';
import { shallow, configure } from 'enzyme';
import FilterListView from '../index';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import * as cammundaService from 'src/services/camundaService';
import { DefaultSortingList, searchParam, tasklist, countApiResponse, taskApiResponse, caseDefApiResponse, caseVariablesApiResponse, filterApiResponse } from 'src/mocks/tasksMock';



describe("FilterListView Component", () => {
    let wrapper, instance , taskCountMehtod;

    beforeEach(() => {
         wrapper = shallow(<FilterListView filterId={123} />);
         instance = wrapper.instance();
         instance.refreshTasksOnSorting(DefaultSortingList);

         const mockFilterDetails = jest.spyOn(cammundaService, 'getFilter');
         mockFilterDetails.mockResolvedValue(filterApiResponse);

         const mockGetCount = jest.spyOn(cammundaService, 'getFilterTasksCount');
         mockGetCount.mockResolvedValue(countApiResponse);
 
         const mockGetTasks = jest.spyOn(cammundaService, 'getFilterTasks');
         mockGetTasks.mockResolvedValue(taskApiResponse);
 
         const mockCaseDef = jest.spyOn(cammundaService, 'getCaseDefinition');
         mockCaseDef.mockResolvedValue(caseDefApiResponse);
 
         const mockCaseVariables = jest.spyOn(cammundaService, 'getCaseVariables');
         mockCaseVariables.mockResolvedValue(caseVariablesApiResponse);
         
    })

    it('renders without crashing', () => {
        shallow(<FilterListView  filterId={123} />);
    });

    // it("Rendered title should be 'My Tasks'", () => {
    //     expect(wrapper.find("#title").text()).toContain('My Tasks');
    // });

    it("search() should set state for queryParam ", () => {
        const params = searchParam;
        taskCountMehtod = jest.spyOn(instance, 'getTasksCount');
        instance.search(params);
        expect(taskCountMehtod).toHaveBeenCalled();
        expect(wrapper.state('queryParam')).toBe(params)
    });

    it("refreshTasks() should reset tasklist and page state , and enable loader flag", () => {
        instance.refreshTasks();
        expect(wrapper.state('tasklist')).toStrictEqual([])
        expect(wrapper.state('page')).toBe(0);
        expect(wrapper.state('loading')).toBe(true);
    });

    it("setTaskList() should set state for tasklist and selectedTask ", () => {
        const tasks = tasklist;
        instance.setTaskList(tasks);
        expect(wrapper.state('tasklist')).toStrictEqual(tasks);
        expect(wrapper.state('selectedTask')).toBe(tasks[0])
    });

    it("onTaskClicked() should set selected task for the state selectedTask ", () => {
        const tasks = tasklist;
        wrapper.setState({tasklist : tasks});
        expect(instance.state.tasklist).toBe(tasks);
        instance.onTaskClicked(tasks[2])
        expect(instance.state.selectedTask).toBe(tasks[2])
    });

    it('on prop change should call the details', () => {
        wrapper.setProps({filterId : '234'})
        expect(instance.props.filterId).toBe('234')
    });
});


