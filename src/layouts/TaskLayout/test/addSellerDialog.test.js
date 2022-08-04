import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddSellerDialog from '../AddSellerDialog';
import * as cammundaService from 'src/services/camundaService';
import config from 'src/views/auth/config';
import { commentsApiResponse, selectedSellers,  createCommentApiResponse } from 'src/mocks/tasksMock';

configure({ adapter: new Adapter() });

describe("Add Seller dialog Component", () => {
    let wrapper, instance;
    beforeEach(() => {
        // wrapper = mount(<AddSellerDialog isOpen={true} dialogData={{selectedSellers : selectedSellers}} />);
        // instance = wrapper.instance();

        // const mockGetComment = jest.spyOn(cammundaService, 'getCommentsList');
        // mockGetComment.mockResolvedValue(commentsApiResponse);

        // const mockAddComment = jest.spyOn(cammundaService, 'createComment');
        // mockAddComment.mockResolvedValue(createCommentApiResponse);

        sessionStorage.setItem('config', JSON.stringify(config))

    })

    it('renders without crashing', () => {
        // mount(<AddSellerDialog isOpen={true} dialogData={{selectedSellers : selectedSellers}} />);
    });

    // it('2 comments should be added to the table', () => {
    //     // setTimeout(() => {
    //         expect(wrapper.find("tbody tr").length).toBe(2);
    //     // });
    // });

    // it('handleAddComment() should call createComment() api', () => {
    //     wrapper.find('#add-comment-button').first().simulate('click')
    //     wrapper.find('textarea').first().instance().value = 'Hello';
    //     wrapper.find('#add-comment').first().simulate('click')
    //     setTimeout(() => {
    //         expect(mockAddComment).toHaveBeenCalled();
    //     });
    // });

    // it('Add Comment popup should open when clicked on button', () => {
    //     wrapper.find('#add-comment-button').first().simulate('click')
    //     setTimeout(() => {
    //         expect(openCommentBox).toBeDefined()
    //     });
    // });

});