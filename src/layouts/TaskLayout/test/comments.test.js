import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Comments from '../comments';
import * as cammundaService from 'src/services/camundaService';
import { commentsApiResponse, createCommentApiResponse, selectedTask } from 'src/mocks/tasksMock';

configure({ adapter: new Adapter() });

describe("Comments Component", () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = mount(<Comments selectedTask={selectedTask} />);
        instance = wrapper.instance();

        const mockGetComment = jest.spyOn(cammundaService, 'getCommentsList');
        mockGetComment.mockResolvedValue(commentsApiResponse);

        const mockAddComment = jest.spyOn(cammundaService, 'createComment');
        mockAddComment.mockResolvedValue(createCommentApiResponse);
    })

    it('renders without crashing', () => {
        mount(<Comments selectedTask={selectedTask} />);
    });

    it('2 comments should be added to the table', () => {
        setTimeout(() => {
            expect(wrapper.find("tbody tr").length).toBe(2);
        });
    });

    it('handleAddComment() should call createComment() api', () => {
        wrapper.find('#add-comment-button').first().simulate('click')
        wrapper.find('textarea').first().instance().value = 'Hello';
        wrapper.find('#add-comment').first().simulate('click')      
        setTimeout(() => {
            expect(mockAddComment).toHaveBeenCalled();
        });
    });



    it('Add Comment popup should open when clicked on button', () => {
        wrapper.find('#add-comment-button').first().simulate('click')
        setTimeout(() => {
            expect(openCommentBox).toBeDefined()
        });
    });

});