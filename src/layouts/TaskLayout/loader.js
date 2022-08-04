import React from 'react';
import './style.css';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        bottom: 0,
        background: "#fff",
        zIndex: 1201
    },
    customPosition: {
        position : 'absolute',
        top : 0,
        left : '1px'
    },
    loader: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto"
    }
});

export default function Loader({ position }) {

    const classes = useStyles();
    return (
        <div className={classes.root + ' ' +  `${position ? classes.customPosition : ''}`}>
            <CircularProgress className={classes.loader} />
        </div>
    )
}

