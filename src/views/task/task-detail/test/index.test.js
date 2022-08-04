import React from 'react';
import { shallow, configure } from 'enzyme';
import TaskDetail from '../index';
import Adapter from 'enzyme-adapter-react-16';
import { tasklist, taskDetailsApiResponse, emptyResponse } from 'src/mocks/tasksMock';
configure({ adapter: new Adapter() });
import * as cammundaService from 'src/services/camundaService';
import config from 'src/views/auth/config';


describe("TaskDetail Component", () => {
    let wrapper, instance, mockClaimTaskApi , mockCompleteTaskApi;

    beforeEach(() => {
         wrapper = shallow(<TaskDetail taskId={'123'} />);
         instance = wrapper.instance();

         const mockTaskApi = jest.spyOn(cammundaService, 'getTask');
         mockTaskApi.mockResolvedValue(taskDetailsApiResponse);

          mockCompleteTaskApi = jest.spyOn(cammundaService, 'completeTask');
         mockCompleteTaskApi.mockResolvedValue(emptyResponse);

          mockClaimTaskApi = jest.spyOn(cammundaService, 'claimTask');
         mockClaimTaskApi.mockResolvedValue(emptyResponse);

         sessionStorage.setItem('config', JSON.stringify(config))

    })

    it('renders without crashing', () => {
        shallow(<TaskDetail taskId={'123'} />);
    });

    it('should change taskId state when prop is changed', () => {
        wrapper.setProps({taskId : '345'})
        // expect(instance.state.taskId).toBe('345')
    });

    it('Should complete the task on completeTask(id)', () => {
       instance.completeTask('123');
       expect(mockCompleteTaskApi).toHaveBeenCalled();
    });

    it('Should claim the task on claimTask(id)', () => {
        instance.claimTask('123');
        expect(mockClaimTaskApi).toHaveBeenCalled();
     });

});

