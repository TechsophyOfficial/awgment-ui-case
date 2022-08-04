import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TaskForm from '../index';
import * as cammundaService from 'src/services/camundaService';
import { selectedTask, emptyResponse, taskDetailsApiResponse } from 'src/mocks/tasksMock';
import theme from 'src/theme';
import { ThemeProvider } from '@material-ui/core';

configure({ adapter: new Adapter() });



describe("Conversation", () => {

    let wrapper, instance, mockClaimTaskApi , mockCompleteTaskApi;

    beforeEach(() => {
        wrapper = shallow(<ThemeProvider theme={theme}><TaskForm taskId={selectedTask.id}/></ThemeProvider>);
        instance = wrapper.instance();

        const mockGetTask = jest.spyOn(cammundaService, 'getTask');
        mockGetTask.mockResolvedValue(taskDetailsApiResponse);

        mockCompleteTaskApi = jest.spyOn(cammundaService, 'completeTask');
        mockCompleteTaskApi.mockResolvedValue(emptyResponse);

         mockClaimTaskApi = jest.spyOn(cammundaService, 'claimTask');
        mockClaimTaskApi.mockResolvedValue(emptyResponse);

    })

    it('renders without crashing', () => {
        mount(<ThemeProvider theme={theme}><TaskForm taskId={selectedTask.id} /></ThemeProvider>);
    });

    it('should change taskId state when prop is changed', () => {
        wrapper.setProps({taskId : '345'})
        // expect(instance.state.taskId).toBe('345')
    });

    it('Should complete the task on completeTask(id)', () => {
        instance.completeSelectedTask('123');
        expect(mockCompleteTaskApi).toHaveBeenCalled();
     });
 
     it('Should claim the task on claimTask(id)', () => {
         instance.claimSelectedTask('123');
         expect(mockClaimTaskApi).toHaveBeenCalled();
      });

    it('Should set the state for taskDetails', () => {
        expect(instance.state.taskDetails).toBeDefined()
    });

   
});