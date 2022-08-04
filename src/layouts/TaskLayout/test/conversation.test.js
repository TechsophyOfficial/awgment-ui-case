import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Conversation from '../conversation';
import * as cammundaService from 'src/services/camundaService';
import * as sxpService from 'src/services/sxpService';

import { caseInstanceApiResponse, selectedTask, tasklist } from 'src/mocks/tasksMock';
import { historyApiResponse } from 'src/mocks/sxpMock';

configure({ adapter: new Adapter() });



describe("Conversation", () => {

    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Conversation selectedTask={selectedTask}/>);
        instance = wrapper.instance();

        const mockGetCaseInstance = jest.spyOn(cammundaService, 'getCaseInstance');
        mockGetCaseInstance.mockResolvedValue(caseInstanceApiResponse);

        const mockGetHistory = jest.spyOn(sxpService, 'getConversationHistory');
        mockGetHistory.mockResolvedValue(historyApiResponse);

        const mockSubmitMessage = jest.spyOn(sxpService, 'submitMessage');
        mockSubmitMessage.mockResolvedValue(historyApiResponse);

        const mockStartJournwy = jest.spyOn(sxpService, 'triggerJourney');
        mockStartJournwy.mockResolvedValue(historyApiResponse);
    })

    it('renders without crashing', () => {
        shallow(<Conversation selectedTask={selectedTask} />);
    });

    it('buyerDetails Should be defined', () => {
       expect(instance.state.buyerDetails).not.toBeNull();
    });

    it('caseDetails Should be defined', () => {
        expect(instance.state.caseDetails).not.toBeNull();
     });

     it('On change of props selectedTask, should call clearWidgetMessages() and clearWidgetTimer()', () => {
         let spy = jest.spyOn(instance , 'clearWidgetMessages');
         let spy2 = jest.spyOn(instance , 'clearWidgetTimer');
         wrapper.setProps({selectedTask: tasklist[1]})
         expect(spy).toHaveBeenCalled();
         expect(spy2).toHaveBeenCalled();
     });

     it('Should call sendMessage() method when message is submitted via buyer side', () => {
        let spy = jest.spyOn(instance , 'sendMessage');
         instance.handleSubmit('abc');
         expect(spy).toHaveBeenCalled();
     });

     it('Should call sendMessage() method when message is submitted via seller side', () => {
        let spy = jest.spyOn(instance , 'sendMessage');
        instance.handleSubmitByBuyer('abc');
        expect(spy).toHaveBeenCalled();
    });

    it('Should call sendMessage() method when message is submitted via multiple sellers', () => {
        let spy = jest.spyOn(instance , 'sendMessage');
        const data = {sellerList : ['seller1', 'seller2'] , message : 'sample message'}
        instance.handleTextInputToSendBySellers(data);
        expect(spy).toHaveBeenCalled();
    });

    it('Should call startJouney() method when a journey is triggered from buyer widget', () => {
        let spy = jest.spyOn(instance , 'startJouney');
        const variables = {journeyName : 'quoteForSeller' , price: 1000}
        instance.onMailOptionSubmitForBuyer(variables);
        expect(spy).toHaveBeenCalled();
    });

    it('Should call startJouney() method when a journey is triggered from seller widget', () => {
        let spy = jest.spyOn(instance , 'startJouney');
        const variables = {journeyName : 'quoteForSeller' , price: 1000}
        instance.onMailOptionSubmitForSeller(variables);
        expect(spy).toHaveBeenCalled();
    });

    it('Should call startJouney() method when a journey is triggered from seller widget', () => {
        let spy = jest.spyOn(instance , 'startJouney');
        const list =['seller1', 'seller2'];
        const variables = {journeyName : 'quoteForSeller' , price: 1000}
        instance.onMailOptionSubmitBySellers(variables, list);
        expect(spy).toHaveBeenCalled();
    });

    it('onSellerListChange() should set the list of new sellers', () => {
        let oldList = instance.state.selectedSellers;
        const list =['seller1', 'seller2'];
        instance.onSellerListChange(list);
        expect(instance.state.selectedSellers).not.toBe(oldList);
    });

    it('onBroadcastSellerListChange() should set the list of new sellers', () => {
        let oldList = instance.state.broadcastSellers;
        const list =['seller1', 'seller2'];
        instance.onBroadcastSellerListChange(list);
        expect(instance.state.broadcastSellers).not.toBe(oldList);
    });

    it('setSellerForChat() should set the list of new sellers', () => {
        const seller ={id: 'seller1' , name : 'Seller 1'};
        instance.setSellerForChat(seller);
        expect(instance.state.currentSellerForChat).toBe(seller);
    });

    it('setSellerForChat() should set id as "broadcast" for sellery type broadcast', () => {
        const seller ='broadcast';
        instance.setSellerForChat(seller);
        expect(instance.state.currentSellerForChat.id).toBe('broadcast');
    });

    it('handleClickOpen() should open addSeller dialog when type is "add"', () => {
        const type ='add';
        instance.handleClickOpen(type);
        expect(instance.state.openAddSeller).toBe(true);
        // const css = wrapper.find("#add-seller-dialog").prop('style');
        // expect(css).toHaveProperty('opacity' , '1')
    });

    it('handleClickOpen() should open addSeller dialog when type is "broadcast"', () => {
        const type ='broadcast';
        instance.handleClickOpen(type);
        expect(instance.state.openBroadMsg).toBe(true);
        // wrapper.find("#add-seller-dialog")
    });

});