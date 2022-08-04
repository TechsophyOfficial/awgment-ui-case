import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TaskList from '../TaskList';
import { tasklist } from '../../../mocks/tasksMock'
import config from 'src/views/auth/config';
configure({ adapter: new Adapter() });

describe("Task List", () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = mount(<TaskList tasklist={tasklist} count={{ "total": tasklist.length }}
            loadMore={() => console.log('Load more tasks')} onTaskClicked={() => console.log('task Clicked')} />);
        instance = wrapper.instance();
        sessionStorage.setItem('config', JSON.stringify(config))
    })

    it('renders without crashing', () => {
        mount(<TaskList tasklist={tasklist} count={{ "total": tasklist.length }} loadMore={() => console.log('')} />);
    });

    it("Total tasks should be 3", () => {
        expect(wrapper.find("#total-tasks").text()).toContain(tasklist.length);
    });

    it("should call onItemClickHandler() method on click of the task", () => {
        wrapper.find('#tasklist-section .task-variable-list').first().simulate('click')
        setTimeout(() => {
            expect(wrapper.selectedTask).not.toBeNull();
        });
    });

    it("Task name shoule be 'RFQ for CCO'", () => {
        setTimeout(() => {
            expect(wrapper.find('#tasklist-section .task-variable-list h4')).toContain('RFQ for CCO');
        });
    });

});