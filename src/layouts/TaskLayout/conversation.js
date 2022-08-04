import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StyleIcon from '@material-ui/icons/Style';
import './style.css';
import { Grid, Icon, MenuItem, Menu, Checkbox, Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddSellerDialog from './AddSellerDialog';
import BroadcastMessageDialog from './BroadcastMessageDialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Person from '@material-ui/icons/Person';

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from '../../components/sxp-chat2/index';
import { addUserMessage, dropMessages } from '../../components/sxp-chat2/';
import selectedSellersData from './data/selectedSeller';
import broadCaseSellerListData from './data/broadcastSeller';
import { NO_OF_MESSAGES, MAX_SELLER_TEXT_LENGTH, BUYER_WIDGET_ID, SELLER_WIDGET_ID, HISTORY_API_TIME_INTERVAL } from 'src/variables/chatWidget';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TOAST_MESSAGES from 'src/variables/toastMessages';
import http from '../../services/HTTP';
import { triggerJourney, getConversationHistory, submitMessage } from 'src/services/sxpService';
import { displayErrorToast, displaySuccessToast } from 'src/helpers/toast';
import { getCaseInstance } from 'src/services/camundaService';

class Conversation extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: true,
            caseDetails: null,
            openAddSeller: false,
            openRemSeller: false,
            openBroadMsg: false,
            dialogData: null,
            deleteSellerMenu: null,
            checked: [1],
            broadcastTitle: '',
            selectedSellers: [],
            broadcastSellers: [],
            configJson: JSON.parse(sessionStorage.getItem('config')),
            currentSellerForChat: null,
            buyerDetails: null,
            buyerWidgetTimer: null,
            sellerWidgetTimer: null
        };

    }

    componentDidMount() {
        this.getBuyerDetails();
        this.getSelectedSellers();
        this.caseDetails();
        this.getSelectedBroadcastSeller();
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedTask != this.props.selectedTask) {
            this.clearWidgetMessages()
            this.clearWidgetTimer();
            this.caseDetails();
            this.getBuyerDetails();
        }
    }

    componentWillUnmount() {
        this.clearWidgetMessages()
        this.clearWidgetTimer();
    }

    // Clear all or specific widget messages
    clearWidgetMessages(id = '') {
        if (id) {
            dropMessages(id);
        } else {
            dropMessages(BUYER_WIDGET_ID);
            dropMessages(SELLER_WIDGET_ID);
            setQuickButtons([], BUYER_WIDGET_ID)
            setQuickButtons([], SELLER_WIDGET_ID)
        }
    }

    // clear all or specific widget timer 
    clearWidgetTimer(widgetId = '') {
        if (widgetId) {
            if (widgetId == BUYER_WIDGET_ID) {
                clearInterval(this.state.buyerWidgetTimer);
            } else {
                clearInterval(this.state.sellerWidgetTimer);
            }
        } else {
            clearInterval(this.state.buyerWidgetTimer);
            clearInterval(this.state.sellerWidgetTimer);
            this.setState({
                timer: null,
                sellerWidgetTimer: null
            })
        }
    }

    setWidgetTimer(widgetId = '') {
        if (widgetId) {
            if (widgetId == BUYER_WIDGET_ID) {
                this.state.buyerWidgetTimer = setInterval(() => {
                    this.getMessageHistory(this.state.caseDetails.businessKey, this.state.buyerDetails.buyerId, BUYER_WIDGET_ID);
                }, HISTORY_API_TIME_INTERVAL);
            } else {
                this.state.sellerWidgetTimer = setInterval(() => {
                    this.getMessageHistory(this.state.caseDetails.businessKey, this.state.currentSellerForChat.id, SELLER_WIDGET_ID);
                }, HISTORY_API_TIME_INTERVAL);
            }
        } else {
            // timer for buyer 
            this.state.buyerWidgetTimer = setInterval(() => {
                this.getMessageHistory(this.state.caseDetails.businessKey, this.state.buyerDetails.buyerId, BUYER_WIDGET_ID);
            }, HISTORY_API_TIME_INTERVAL);
            // set timer for seller 
            this.state.sellerWidgetTimer = setInterval(() => {
                this.getMessageHistory(this.state.caseDetails.businessKey, this.state.currentSellerForChat.id, SELLER_WIDGET_ID);
            }, HISTORY_API_TIME_INTERVAL);
        }
    }
    // get case details 
    caseDetails() {
        if (this.props.selectedTask) {
            getCaseInstance(this.props.selectedTask.caseInstanceId).then(response => {
                if (response.success && response.data) {
                    this.setState({
                        caseDetails: response.data
                    })
                    window.scrollTo(0, 0)
                    this.getMessageHistory(response.data.businessKey, this.state.buyerDetails.buyerId, BUYER_WIDGET_ID);
                    this.getMessageHistory(response.data.businessKey, this.state.currentSellerForChat.id, SELLER_WIDGET_ID);
                    this.setWidgetTimer()
                }
                if (!response.success) {
                }
            })
            // fetch(`${process.env.REACT_APP_SERVER_URL}/case-instance/${this.props.selectedTask.caseInstanceId}`, {
            //     "method": "GET",
            //     "headers": {
            //         "content-type": "application/json",
            //         "accept": "application/json",
            //         "Authorization": "Bearer " + localStorage.getItem('react-token'),
            //     }
            // })
            //     .then(presponse => presponse.json())
            //     .then(response => {
            //         if (response) {
            //             this.setState({
            //                 caseDetails: response
            //             })
            //             window.scrollTo(0, 0)
            //             this.getMessageHistory(response.businessKey, this.state.buyerDetails.buyerId, BUYER_WIDGET_ID);
            //             this.getMessageHistory(response.businessKey, this.state.currentSellerForChat.id, SELLER_WIDGET_ID);
            //             this.setWidgetTimer()
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    }

    // get buyer details from case variables 
    getBuyerDetails() {
        if (this.props.selectedTask && this.props.selectedTask.variables) {
            let buyerName = this.props.selectedTask ?
                (this.props.selectedTask.variables ? this.props.selectedTask.variables['buyerName'] : null) : null;
            let buyerId = this.props.selectedTask ?
                (this.props.selectedTask.variables ? this.props.selectedTask.variables['buyer_id'] : null) : null;

            this.setState({
                buyerDetails: {
                    buyerName: buyerName ? buyerName.value : '',
                    buyerId: buyerId ? buyerId.value : ''
                }
            })
        }
    }

    // handle seller data
    getSelectedSellers() {
      
        this.setState({
            selectedSellers: selectedSellersData,
            currentSellerForChat: (selectedSellersData.length > 0) ? selectedSellersData[0] : null
        });
    }

    getSelectedBroadcastSeller() {
        this.setState({
            broadcastSellers: broadCaseSellerListData
        });
        this.setBroadcastName(broadCaseSellerListData);
    }

    setBroadcastName(list) {
        let sellers = list.map(function (item) {
            return item.name;
        });
        let broadcastSellerName = 'Broadcast 1 || ' + sellers.join(',');
        this.setState({
            broadcastTitle: broadcastSellerName
        });
    }

    onSellerListChange(list) {
        this.setState({
            selectedSellers: list
        })
    }

    onBroadcastSellerListChange(list) {
        this.setState({
            broadcastSellers: list
        });
        this.setBroadcastName(list);
    }

    setSellerForChat(seller) {
        this.clearWidgetTimer(SELLER_WIDGET_ID)
        this.clearWidgetMessages(SELLER_WIDGET_ID)
        if (seller == 'broadcast') {
            this.setState({
                currentSellerForChat: { id: 'broadcast', name: this.state.broadcastTitle }
            })
            if (this.state.broadcastSellers.length > 0) {
                let sellers = this.state.broadcastSellers.map(function (item) {
                    return item.name;
                });
                this.getMessageHistory(this.state.caseDetails.businessKey, sellers, SELLER_WIDGET_ID);
                this.setWidgetTimer(SELLER_WIDGET_ID)
            } else {
                // toast.info(TOAST_MESSAGES.INFO.NO_BROADCAST_SELLERS)
            }

        } else {
            this.setState({
                currentSellerForChat: seller
            })
            this.getMessageHistory(this.state.caseDetails.businessKey, seller.id, SELLER_WIDGET_ID);
            this.setWidgetTimer(SELLER_WIDGET_ID)
        }

    }

    // ends here

    // identify reciever and sender messages 
    setMessageFormate(response, widgetId) {
        if (response && response.messages && response.messages.length > 0) {
            response.messages.reverse().forEach(msg => {
                if (msg.actor == 'bot') {
                    addUserMessage(msg.message, new Date(msg.created), widgetId);
                    // if(msg.type == 'button') {
                    //     setQuickButtons(this.getMappedButtons(msg.buttonPayload), widgetId);
                    //     addUserMessage(msg.message, new Date(msg.created), widgetId);
                    // } else {
                    //     addUserMessage(msg.message, new Date(msg.created), widgetId);

                    // }
                } else if (msg.actor == 'user') {
                    if (msg.type == 'button') {
                        setQuickButtons(msg.buttonPayload, widgetId);
                    } else {
                        addResponseMessage(msg.message, new Date(msg.created), widgetId)

                    }
                }
            });
        }
    }

    // getMappedButtons(buttons) {
    //     let buttonArr = [];
    //     if (buttons && buttons.length) {
    //         buttons.map(button => {
    //             let obj = { label: '', value: '' };
    //             obj.label = button.text;
    //             obj.value = button.value;
    //             buttonArr.push(obj);
    //         })
    //         return buttonArr;
    //     } else {
    //         return buttonArr;
    //     }
    // }

    handleClickOpen(type) {
        let data = {
            selectedSellers: this.state.selectedSellers
        };

        if (type == 'add') {
            this.setState({
                openAddSeller: true,
                dialogData: data
            })
        } else if (type == 'broadcast') {
            this.setState({
                openBroadMsg: true,
                dialogData: data
            })
        } else {
            //
        }
    }

    handleMenuClick(event) {
        this.setState({
            deleteSellerMenu: event.currentTarget
        })
    };


    // delete seller functions
    handleMenuClose() {
        this.setState({
            deleteSellerMenu: null
        })
    };

    handleCheckboxToggle(event, value) {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        })
    }

    handleDeleteSeller(e) {
        if (this.state.selectedSellers.length > 0 && this.state.checked.length > 0) {
            let newSelectedSeller = this.state.selectedSellers.filter(seller => this.state.checked.indexOf(seller) === -1);
            this.setState({
                deleteSellerMenu: null,
                selectedSellers: newSelectedSeller
            })
        } else {
            this.setState({
                deleteSellerMenu: null
            })
        }
    }

    // ends here
    handleNewUserMessage = (newMessage) => {
        // toggleMsgLoader();
        // setTimeout(() => {
        //     toggleMsgLoader();
        //     if (newMessage === 'fruits') {
        //         setQuickButtons([{ label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' }]);
        //     } else {
        //         addResponseMessage(newMessage);
        //     }
        // }, 2000);
    }

    handleQuickButtonClicked = (e) => {
        addResponseMessage('Selected ' + e);
        setQuickButtons([]);
    }

    getPathVariables(businessKey, user) {
        let query = '';
        if (this.state.buyerDetails && user) {
            query = `${user}/${businessKey}/-1/${NO_OF_MESSAGES}`;
        }
        return query;
    }

    // get history of message based on user and businessKey 
    getMessageHistory(businessKey, user, widgetId) {
        const pathVariables = this.getPathVariables(businessKey, user);

        if (pathVariables) {
            getConversationHistory(pathVariables).then(response => {
                if (response && response.success) {
                    this.clearWidgetMessages(widgetId);
                    this.setMessageFormate(response.data, widgetId)
                }
                if (!response.success) {

                }
            })
            // fetch(`${process.env.REACT_APP_CONTEXT_ENGINE_API_URL}/chat/history/working/${pathVariables}`, {
            //     "method": "GET",
            //     "headers": {
            //         "content-type": "application/json",
            //         "accept": "application/json",
            //     }
            // })
            //     .then(presponse => presponse.json())
            //     .then(response => {
            //         if (response.success) {
            //             this.clearWidgetMessages(widgetId);
            //             this.setMessageFormate(response, widgetId)
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }

    }

    handleSubmit = (msgText) => {
        let userIdList = [];
        if (this.state.currentSellerForChat && this.state.currentSellerForChat.id == 'broadcast') {
            let ids = this.state.broadcastSellers.map(function (item) {
                return item.id;
            });
            userIdList = ids
        } else if (this.state.currentSellerForChat) {
            userIdList = [(this.state.currentSellerForChat ? this.state.currentSellerForChat.id : '')]
        }
        if (userIdList.length > 0) {
            let requestBody = {
                "businessKey": this.state.caseDetails ? this.state.caseDetails.businessKey : '',
                "event": {
                    "name": "invokeSXPJourney",
                    "value": true
                },
                "variables": {
                    "userId": userIdList,
                    "userType": "seller",
                    "message": msgText,
                    "journeyName": "",
                }
            }

            this.sendMessage(requestBody)
        }

        return true;
    }

    handleSubmitByBuyer = (msgText) => {
        if (this.state.buyerDetails && this.state.buyerDetails.buyerId) {
            let ids = [];
            ids.push(this.state.buyerDetails.buyerId)
            let requestBody = {
                "businessKey": this.state.caseDetails ? this.state.caseDetails.businessKey : '',
                "event": {
                    "name": "invokeSXPJourney",
                    "value": true
                },
                "variables": {
                    "userId": [this.state.buyerDetails.buyerId],
                    "userType": "buyer",
                    "message": msgText,
                    "journeyName": "",
                    "seller_id" : ""
                }
            }

            if(this.state.buyerDetails.buyerId) {
                this.sendMessage(requestBody)
            }
            
        }

        return true;
    }

    sendMessage(requestBody) {
        submitMessage(requestBody).then(response => {
            if (response.success) {
                this.setState({
                    openAddSeller: false
                })
            }
            if (!response.success) {

            }
        })
        // fetch(`${process.env.REACT_APP_CUSTOM_API_SERVER_URL}/case/event`, {
        //     "method": "POST",
        //     "headers": {
        //         "content-type": "application/json",
        //         "accept": "application/json",
        //         "Authorization": "Bearer " + localStorage.getItem('react-token'),
        //     },
        //     "body": JSON.stringify(requestBody)
        // })
        //     .then(presponse => presponse.json())
        //     .then(response => {
        //         this.setState({
        //             openAddSeller: false
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    onMailOptionSubmitForBuyer = (e, chatId) => {
        let negotiationIteration;
        if(e.journeyName=='quoteForBuyer')
        {
             negotiationIteration=true;
        }
        else if(e.journeyName=='quoteForSeller')
        {
             negotiationIteration=false;

        }
       
        let userDetails = {
            "userId": (this.state.buyerDetails ? this.state.buyerDetails.buyerId : ''),
            "userType": "buyer",
            "seller_id":(this.state.currentSellerForChat ? this.state.currentSellerForChat.id : ''),
            "buyer_id": (this.state.buyerDetails ? this.state.buyerDetails.buyerId : ''),
        }

        let variables = {
            ...userDetails, ...(e ? e : {})
        }
        let requestBody = {
            "businessKey": this.state.caseDetails ? this.state.caseDetails.businessKey : '',
            "event": {
                "name": "invokeSXPJourney",
                "value": true
            },
            "variables": variables
        }

        this.startJouney(requestBody, chatId);
    }

    onMailOptionSubmitForSeller = (e, chatId) => {
        console.log(e);
        let negotiationIteration;

        if(e.journeyName=='quoteForSeller')
        {
             negotiationIteration=false;

        }
       
        
        
        let userDetails = {
            "userId": (this.state.currentSellerForChat ? this.state.currentSellerForChat.id : ''),
            "userType": "seller",
            "seller_id": (this.state.currentSellerForChat ? this.state.currentSellerForChat.id : ''),
            "buyer_id": (this.state.buyerDetails ? this.state.buyerDetails.buyerId : ''),
            negotiationIteration,
        }

        let variables = {
            ...userDetails, ...(e ? e : {})
        }
        let requestBody = {
            "businessKey": this.state.caseDetails ? this.state.caseDetails.businessKey : '',
            "event": {
                "name": "invokeSXPJourney",
                "value": true
            },
            "variables": variables
        }
        this.startJouney(requestBody, chatId);
    }

    onMailOptionSubmitBySellers = (e, sellers, chatId) => {
        if (sellers.length > 0) {
            let ids = sellers.map(function (item) {
                return item.id;
            });
            let userDetails = {
                "userId": [...ids],
                "userType": "seller",
                "seller_id" : "",
                "buyer_id":(this.state.buyerDetails ? this.state.buyerDetails.buyerId : ''),
            }

            let variables = {
                ...userDetails, ...(e ? e : {})
            }
            let requestBody = {
                "businessKey": this.state.caseDetails ? this.state.caseDetails.businessKey : '',
                "event": {
                    "name": "invokeSXPJourney",
                    "value": true
                },
                "variables": variables
            }

            this.startJouney(requestBody, chatId);
        }
    }

    // handleErrors(response) {
    //     if (!response.ok) {
    //         throw response;
    //     }
    //     return response.json();
    // }
  
    getJourneyName(journey, chatId) {
        let msg = '';
        let templateList = this.state.configJson ? 
        (this.state.configJson.journey_templates ? this.state.configJson.journey_templates[chatId] : []) : [];
       if(templateList.length > 0) {
           templateList.map(item => {
               if(item.journeyName ==  journey){
                msg = item.successMsg
               }
           })
       }
       return msg;
    }

    startJouney(requestBody, chatId) {
        triggerJourney(requestBody).then(response => {
            if(response.success){
                if(requestBody?.variables?.journeyName){
                   let msg = this.getJourneyName(requestBody?.variables?.journeyName, chatId);
                   if(msg) {
                    displaySuccessToast(msg)
                   } else {
                    displaySuccessToast(TOAST_MESSAGES.SUCCESS.JOURNEY_STARTED)
                   }
                } else {
                    displaySuccessToast(TOAST_MESSAGES.SUCCESS.JOURNEY_STARTED)
                }
               
            }
            if (!response.success) {
                displayErrorToast(response.errors.data.message)
            }
        })
        // fetch(`${process.env.REACT_APP_CUSTOM_API_SERVER_URL}/case/event`, {
        //     "method": "POST",
        //     "headers": {
        //         "content-type": "application/json",
        //         "accept": "application/json",
        //         "Authorization": "Bearer " + localStorage.getItem('react-token'),
        //     },
        //     "body": JSON.stringify(requestBody)
        // })
        //     .then(presponse => {
        //         this.handleErrors(presponse)
        //     })
        //     .then(response => {
        //         toast.success(TOAST_MESSAGES.SUCCESS.JOURNEY_STARTED);
        //     })
        //     .catch(error => {
        //         try {
        //             error.json().then(body => {
        //                 let message = body.message ? JSON.parse(body.message).message : '';
        //                 toast.error(TOAST_MESSAGES.ERROR.JOURNEY_NOT_STARTED + ', ' + message)
        //             });
        //         } catch (e) {
        //             toast.error(TOAST_MESSAGES.ERROR.JOURNEY_NOT_STARTED)
        //             console.log(error);
        //         }

        //         console.log(error);
        //     });
    }

    handleTextInputToSendBySellers(data) {
        if (data) {
            let requestBody = {
                "businessKey": this.state.caseDetails ? this.state.caseDetails.businessKey : '',
                "event": {
                    "name": "invokeSXPJourney",
                    "value": true
                },
                "variables": {
                    "userId": data.senderList,
                    "userType": "seller",
                    "message": data.message,
                    "journeyName": ""
                }
            }

            this.sendMessage(requestBody);
        }

    }

    render() {

        return (
            <div>
                <Grid container className={'widget-wrapper'}>
                    <Grid item lg={4} md={4} sm={12} className={'bg-1'}>
                        <AppBar position="relative" color="transparent" className={'buyer-head  bg-1'}>
                            <Toolbar>
                                <Typography variant="h5">
                                    {(this.state.configJson && this.state.configJson.headings) ? this.state.configJson.headings.conversation.buyer : ''}
                                </Typography>
                                <span className={'refresh-widget-icon'} onClick={() => this.getMessageHistory(this.state.caseDetails.businessKey, this.state.buyerDetails.buyerId, BUYER_WIDGET_ID)}>
                                    <Tooltip title={'Refresh Chat'}><Icon>refresh</Icon></Tooltip>
                                </span>
                            </Toolbar>
                        </AppBar>
                        <div className={'chat-header-buyer'}>
                            <Widget
                                title={this.state.buyerDetails ? this.state.buyerDetails.buyerName : ''}
                                subtitle="Active Now"
                                chatId={BUYER_WIDGET_ID}
                                caseDetails={this.state.caseDetails}
                                senderPlaceHolder="Write a Message"
                                handleNewUserMessage={this.handleNewUserMessage}
                                handleQuickButtonClicked={this.handleQuickButtonClicked}
                                imagePreview
                                // onRestart={this.onRestart}
                                // onEdit={this.onEdit}
                                // onFileUpload={this.onFileUpload}
                                handleSubmit={this.handleSubmitByBuyer}
                                onMailOptionSubmit={(e) => this.onMailOptionSubmitForBuyer(e , BUYER_WIDGET_ID)}
                            />
                        </div>

                    </Grid>
                    <Grid item lg={8} md={8} sm={12}>
                        <AppBar position="relative" color="transparent" variant="dense" className={'seller-head bg-1'}>
                            <Toolbar>
                                <Grid container spacing={0}>
                                    <Grid item lg={5} md={3} xs={12}>
                                        <Typography variant="h5">
                                            {(this.state.configJson && this.state.configJson.headings) ? this.state.configJson.headings.conversation.seller : ''}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={7} md={9} xs={12}>
                                        <Grid container spacing={0} >
                                            <Grid item lg={11} md={11} xs={11}>
                                                <div className={'activiti-main'}>
                                                    <div className="activiti-option"
                                                        onClick={() => this.handleClickOpen('add')}>
                                                        <Icon color="primary" fontSize="inherit">person_add</Icon>
                                                        <Typography color="primary" variant="caption" >Add Seller</Typography>
                                                    </div>
                                                </div>


                                                <div className={'activiti-main'}>
                                                    <div className="activiti-option" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => this.handleMenuClick(event)}>
                                                        <Icon color="primary" fontSize="inherit">person_remove</Icon>
                                                        <Typography color="primary" variant="caption">Delete Seller</Typography>
                                                    </div>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={this.state.deleteSellerMenu}
                                                        keepMounted
                                                        open={Boolean(this.state.deleteSellerMenu)}
                                                        onClose={() => { this.handleMenuClose() }}
                                                        className={'delete-menu'}
                                                    >
                                                        {this.state.selectedSellers.map((value, index) => {
                                                            const labelId = `checkbox-list-secondary-label-${value.id}`;
                                                            return (
                                                                <MenuItem key={value.id} button>
                                                                    <Checkbox
                                                                        edge="end"
                                                                        color="primary"
                                                                        checkedIcon={<Icon>done</Icon>}
                                                                        onChange={(event) => { this.handleCheckboxToggle(event, value) }}
                                                                        checked={this.state.checked.indexOf(value) !== -1}
                                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                                        className={' seller-checkbox'}
                                                                    />
                                                               # {`${value.name}`}
                                                                </MenuItem>
                                                            );
                                                        })}

                                                        <MenuItem >
                                                            <div className="activiti-option" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => this.handleDeleteSeller(event)}>
                                                                <Icon color="error" fontSize="inherit">person_remove</Icon>
                                                                <Typography color="error" variant="caption">Delete</Typography>
                                                            </div>
                                                            <div className="activiti-option" aria-controls="simple-menu" aria-haspopup="true" onClick={() => this.handleMenuClose()}>
                                                                <Icon fontSize="inherit">person_remove</Icon>
                                                                <Typography variant="caption">Cancel</Typography>
                                                            </div>
                                                        </MenuItem>
                                                    </Menu>

                                                </div>
                                                <div className={'activiti-main'}>
                                                    <div className="activiti-option" onClick={() => this.handleClickOpen('broadcast')}>
                                                        {/* <StyleIcon color="primary" fontSize="inherit" /> */}
                                                        <Icon color="primary" fontSize="inherit">style</Icon>
                                                        <Typography color="primary" variant="caption">Broadcast Message</Typography>
                                                    </div> 
                                                </div>
                                            </Grid>
                                            {/* <Grid item lg={3} md={3} xs={3}>

                                            </Grid>
                                            <Grid item lg={3} md={3} xs={3}>

                                            </Grid> */}
                                            {/* <Grid item lg={5} md={5} xs={3}>
                                               
                                            </Grid> */}
                                            <Grid item lg={1} md={1} xs={3}>
                                                <span className={'refresh-widget-icon'} onClick={() => this.getMessageHistory(this.state.caseDetails.businessKey, this.state.currentSellerForChat.id, SELLER_WIDGET_ID)}>
                                                    <Tooltip title={'Refresh Chat'}><Icon>refresh</Icon></Tooltip>
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>

                        <Grid container spacing={0} className={'bg-2'}>
                            <Grid item lg={6} md={6} sm={12}>

                                {/* chat widget */}
                                {this.state.currentSellerForChat && <div
                                    className={'chat-header-seller ' + ((this.state.currentSellerForChat.id == 'broadcast') ? ' chat-header-broadcast' : '')}>
                                    <Widget
                                        title={this.state.currentSellerForChat.name}
                                        subtitle="Active Now"
                                        chatId={SELLER_WIDGET_ID}
                                        senderPlaceHolder="Write a Message"
                                        caseDetails={this.state.caseDetails}
                                        handleNewUserMessage={this.handleNewUserMessage}
                                        handleQuickButtonClicked={this.handleQuickButtonClicked}
                                        imagePreview
                                        // onRestart={this.onRestart}
                                        // onEdit={this.onEdit}
                                        // onFileUpload={this.onFileUpload}
                                        handleSubmit={this.handleSubmit}
                                        onMailOptionSubmit={(e) => this.onMailOptionSubmitForSeller(e, SELLER_WIDGET_ID)}
                                    />
                                </div>
                                }

                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <div>
                                    <List dense className={'seller-list'}>
                                        {this.state.selectedSellers.map((value, index) => {
                                            const labelId = `checkbox-list-secondary-label-${value}`;
                                            return (
                                                <ListItem key={value.id} button className={'seller-row'} onClick={() => this.setSellerForChat(value)}>
                                                    <div>
                                                        <Typography variant="h5">
                                                            {value.name}
                                                            <br></br>
                                                            <Typography variant="caption">
                                                                Active Now
                                                             </Typography>
                                                        </Typography>
                                                    </div>

                                                    <ListItemAvatar>
                                                        <div className="user-icon">
                                                            <Person fontSize="small" />
                                                        </div>
                                                    </ListItemAvatar>
                                                </ListItem>
                                            );
                                        })}
                                        {/* <ListItem key={'broadcast'} button className={'seller-row' + ' broadcast-row'} onClick={() => this.setSellerForChat('broadcast')}>
                                            <div>
                                                <Typography variant="h5">
                                                    {this.state.broadcastTitle.length > MAX_SELLER_TEXT_LENGTH ?
                                                        (
                                                            <span>
                                                                {`${this.state.broadcastTitle.substring(0, MAX_SELLER_TEXT_LENGTH)}...`}
                                                            </span>
                                                        ) :
                                                        <span>{this.state.broadcastTitle}</span>
                                                    }

                                                    <br></br>
                                                    <Typography variant="caption">
                                                        Active Now
                                                    </Typography>

                                                </Typography>
                                            </div>

                                            <ListItemAvatar>
                                                <div className="user-icon">
                                                    <Person fontSize="small" />
                                                </div>
                                            </ListItemAvatar>
                                        </ListItem> */}
                                    </List>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                {/* respective dialogs */}
                <AddSellerDialog id="add-seller-dialog" isOpen={this.state.openAddSeller}
                    dialogData={this.state.dialogData}
                    openStatus={() => { this.setState({ openAddSeller: false }) }}
                    onSellerListChange={(sellerList) => this.onSellerListChange(sellerList)}
                    handleTextInputToSend={(data) => this.handleTextInputToSendBySellers(data)}
                    onMailOptionSubmit={(e, sellers) => this.onMailOptionSubmitBySellers(e, sellers, SELLER_WIDGET_ID)}
                />
                <BroadcastMessageDialog isOpen={this.state.openBroadMsg}
                    dialogData={this.state.dialogData}
                    openStatus={() => { this.setState({ openBroadMsg: false }) }}
                    onBroadcastSellerListChange={(list) => this.onBroadcastSellerListChange(list)}
                />
            </div>
        )
    }
}

export default Conversation;
