import React from 'react';
import { shallow, configure } from 'enzyme';
import TaskLayout from '../index';
import Adapter from 'enzyme-adapter-react-16';
import { ASSIGNEE, CANDIDATE } from 'src/variables/taskVariables';
import { DefaultSortingList, searchParam, tasklist, countApiResponse, taskApiResponse, caseDefApiResponse, caseVariablesApiResponse } from 'src/mocks/tasksMock';
configure({ adapter: new Adapter() });
import * as cammundaService from 'src/services/camundaService';

describe("TaskLayout for my tasks", () => {
    let wrapper, instance, taskCountMehtod;

    beforeEach(() => {
        wrapper = shallow(<TaskLayout assignment={ASSIGNEE} title={'My Tasks'} />);
        instance = wrapper.instance();
        instance.refreshTasksOnSorting(DefaultSortingList);
        const mockGetCount = jest.spyOn(cammundaService, 'getTasksCount');
        mockGetCount.mockResolvedValue(countApiResponse);

        const mockGetTasks = jest.spyOn(cammundaService, 'getTasks');
        mockGetTasks.mockResolvedValue(taskApiResponse);

        const mockCaseDef = jest.spyOn(cammundaService, 'getCaseDefinition');
        mockCaseDef.mockResolvedValue(caseDefApiResponse);

        const mockCaseVariables = jest.spyOn(cammundaService, 'getCaseVariables');
        mockCaseVariables.mockResolvedValue(caseVariablesApiResponse);
    })

    it('renders without crashing', () => {
        shallow(<TaskLayout assignment={ASSIGNEE} title={'My Tasks'} />);
    });

    it('Api response for tasks count should be 10', () => {
        expect(instance.state.totalTasks).toBe(10)
    });

    it("Rendered title should be 'My Tasks'", () => {
        expect(wrapper.find("#title").text()).toContain('My Tasks');
    });

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
        wrapper.setState({ tasklist: tasks });
        expect(instance.state.tasklist).toBe(tasks);
        instance.onTaskClicked(tasks[2])
        expect(instance.state.selectedTask).toBe(tasks[2])

    });
});

describe("TaskLayout for Group Tasks", () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<TaskLayout assignment={CANDIDATE} title={'Group Tasks'} />);
        instance = wrapper.instance();
        instance.refreshTasksOnSorting(DefaultSortingList);
    })

    it('renders without crashing', () => {
        shallow(<TaskLayout assignment={CANDIDATE} title={'Group Tasks'} />);
    });

    it("Rendered title should be 'Group Tasks'", () => {
        expect(wrapper.find("#title").text()).toContain('Group Tasks');
    });

    it("getRequestBody() method should retrun 'finished' as 'false'", () => {
        const requestBody = instance.getRequestBody();
        // expect(requestBody.finished).toBe(false);
    });
});

describe("TaskLayout for completed", () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<TaskLayout state={'completed'} title={'Completed Tasks'} />);
        instance = wrapper.instance();
        instance.refreshTasksOnSorting(DefaultSortingList);
    })

    it('renders without crashing', () => {
        shallow(<TaskLayout state={'completed'} title={'Completed Tasks'} />);
    });

    it("Rendered title should be 'Completed Tasks'", () => {
        expect(wrapper.find("#title").text()).toContain('Completed Tasks');
    });

    it("getRequestBody() method should retrun 'finished' as 'true'", () => {
        const requestBody = instance.getRequestBody();
        expect(requestBody.finished).toBe(true);
    });
});