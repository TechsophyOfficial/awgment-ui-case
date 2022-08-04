import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MouseRoundedIcon from '@material-ui/icons/MouseRounded';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import StyleIcon from '@material-ui/icons/Style';
import './style.css';

import theme from '../../../theme';
import { Grid, Icon } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { relative } from 'path';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 219,
        minWidth : 219, 
        borderRadius: '30px',
        display: 'inline-block',
        marginRight: '15px',
        height: '100%',

        '& .MuiCardContent-root': {
            paddingTop: 0
        },
        '& .MuiCardContent-root p': {
            fontSize: 10,
            fontWeight: 500
        }
    },
    cardOverlay: {
        maxWidth: 219,
        borderRadius: '30px',
        display: 'inline-block',
        marginRight: '15px',
        position: 'absolute',
        zindex: '1200',
        visibility: 'hidden',
        top: 0,
        left: 0,
        minHeight : 110,

        '& .MuiCardContent-root': {
            paddingTop: 0
        },
        '& .MuiCardContent-root p': {
            fontSize: 10,
            fontWeight: 500
        }
    },
    cardHolder: {
        position: 'relative',
        // position : 'absolute',
        maxHeight: 110
    },
    sumHeading: {
        padding: '14px'
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
        padding: '5px',
        color: '#fff',
        width: '26px',
        height: '26px',
        fontSize: 'medium'
    },
    cardHeading: {
        paddingBottom: '0',
        '& .MuiCardHeader-avatar': {
            marginRight: '3px'
        },
        '& h4': {
            fontSize: '18px',
            fontWeight: '700'
        }
    },
    cardContent: {
        marginLeft: '26px'
    },
}));

const TxnDetails = ({ selectedTask, config, isEdit, openStatus, onFilterSaved }) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const [task, setTask] = useState(selectedTask);
    useEffect(() => {
        setTask(selectedTask);
        getVariables()
    }, [selectedTask])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getVariables = (flag = false) => {
        let variables = [];
        const taskVariables = config ? config.variables : [];
        taskVariables.forEach(variable => {
            Object.keys(selectedTask.variables).forEach(function (key , index) {
                if(!flag){
                    if (variable.name == key) {
                        variables.push({ name: key, title: variable.title, value: selectedTask.variables[key].value });
                    }
                } else {
                    if(variables.length<4){
                        if (variable.name == key) {
                            variables.push({ name: key, title: variable.title, value: selectedTask.variables[key].value });
                        }
                    }
                }
               
            });
        })

        return (
            <Grid container ml={2}>
                {variables.map((variable) =>
                    <>
                        <Grid item lg={6} md={6} xs={12}>
                            <Typography color="textPrimary" variant="body2" >
                                {variable.title}
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <Typography color="textPrimary" variant="body2" style={{fontWeight : 400}}>
                                {variable.value}
                            </Typography>
                        </Grid>
                    </>
                )}
            </Grid>
        )
    }

    return (
        <div className={classes.cardHolder}>
            <Card className={classes.root + ' card-wrap'}>
                <CardHeader className={classes.cardHeading}
                    avatar={
                        <Icon className={classes.avatar} color={theme.palette.background.white}>{config ? config.icon : 'star'}</Icon>
                    }
                    title={
                        <Typography variant="h4" id="title"> 
                            {config ? config.label : ''}
                        </Typography>
                    }
                />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Grid container ml={2}>
                            {getVariables(true)}
                        </Grid>
                    </div>
                </CardContent>
            </Card>

            <Card className={classes.cardOverlay  + ' card-overlay'}>
                <CardHeader className={classes.cardHeading}
                    avatar={
                        <Icon className={classes.avatar} color={theme.palette.background.white}>{config ? config.icon : 'star'}</Icon>
                    }
                    title={
                        <Typography variant="h4">
                            {config ? config.label : ''}
                        </Typography>
                    }
                />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Grid container ml={2}>
                            {getVariables()}
                        </Grid>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

export default TxnDetails;
