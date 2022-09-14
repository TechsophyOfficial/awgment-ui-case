import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './style.css';
import components from 'src/task-froms/components';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        borderRadius: '30px',
        display: 'inline-block',
        marginRight: '15px'
    },
    txnSummary: {
        paddingLeft: 25,
        '& .MuiCardHeader-root': {
            paddingTop: 9
        }
    },
    sumHeading: {
        padding: '14px 0px',
        fontSize: 18,
        fontWeight: 500,
        fontStyle: 'normal'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '50%',
        padding: '2px 4px',
        color: '#fff'
    },
    cardHeading: {
        paddingBottom: '0'
    },
    cardContent: {
        marginLeft: '26px'
    },
}));

const TransactionSummary = ({ selectedTask, dialogData, isEdit, openStatus, onFilterSaved }) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const config = JSON.parse(sessionStorage.getItem('config'));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const cardContents = (

        <div style={{ position: 'relative' }}>
            <div className="card-wrapper card-wrapper-underley">

            </div>
            <div className="card-wrapper">
                {getDetailsCondition() &&
                    config.transaction_summary_list[selectedTask.taskDefinitionKey].map(widget => {
                        const block = {
                            type: 'txn',
                            component: widget.component ? widget.component : '',
                            selectedTask: selectedTask,
                            config: widget.details ? widget.details : null
                        }
                        return (components(block));
                    })}

                {/* {
                    getDetailsCondition('txnDetails') &&
                    <TxnDetails selectedTask={selectedTask} config={getCardConfig('txnDetails')} />

                }

                {
                    getDetailsCondition('txnState') &&
                    <TxnState selectedTask={selectedTask} config={getCardConfig('txnState')} />
                } */}

            </div>

        </div>
    );

    function getDetailsCondition() {
        let result = false;
        result = (config && selectedTask &&
            config['transaction_summary_list'] && config.transaction_summary_list[selectedTask.taskDefinitionKey]
            && config.transaction_summary_list[selectedTask.taskDefinitionKey].length > 0);
        return result;
    }

    // function getDetailsCondition(type) {
    //     let result = false;
    //     if (type == 'txnDetails') {
    //         result = (config && selectedTask &&
    //             config['transaction_summary'] && config.transaction_summary[selectedTask.taskDefinitionKey]
    //             && config.transaction_summary[selectedTask.taskDefinitionKey].transaction_details);
    //     }

    //     if (type == 'txnState') {
    //         result = (config && selectedTask &&
    //             config['transaction_summary'] && config.transaction_summary[selectedTask.taskDefinitionKey]
    //             && config.transaction_summary[selectedTask.taskDefinitionKey].transaction_state);
    //     }
    //     return result
    // }

    // function getCardConfig(type) {
    //     let result = {};
    //     if (type == 'txnDetails') {
    //         result = config.transaction_summary[selectedTask.taskDefinitionKey].transaction_details;
    //     }

    //     if (type == 'txnState') {
    //         result = config.transaction_summary[selectedTask.taskDefinitionKey].transaction_state;
    //     }
    //     return result
    // }

    return (
        <div className={classes.txnSummary}>
            <Typography variant="h4" className={classes.sumHeading}>
                Transaction Summary
        </Typography>
            <div>
                {cardContents}

                {/* 2 */}
                {/* <Card className={classes.root}>
                    <CardHeader className={classes.cardHeading}
                        avatar={
                            <EventNoteIcon className={classes.avatar} color={theme.palette.background.white} />
                        }
                        title={
                            <Typography variant="h5">
                                Quote 
                                <span>
                                [Brand Name]
                                </span>
                            </Typography>
                        }
                    />
                    <CardContent>
                        <div className={classes.cardContent}>
                            <Grid container ml={2}>
                                <Grid item lg={6} md={6} sm={6}>
                                    <Typography variant="caption">
                                        RFQ ID
                            </Typography>
                                </Grid>

                                <Grid item lg={6} md={6} sm={6}>
                                    <Typography variant="caption">
                                        1234
                            </Typography>
                                </Grid>

                                <Grid item lg={6} md={6} sm={6}>
                                    <Typography variant="caption">
                                        RFQ ID
                            </Typography>
                                </Grid>

                                <Grid item lg={6} md={6} sm={6}>
                                    <Typography variant="caption" color="primary">
                                        1234
                            </Typography>
                                </Grid>
                            </Grid>
                        </div>

                    </CardContent>
                </Card> */}
            </div>
        </div>
    );
}

export default TransactionSummary;
