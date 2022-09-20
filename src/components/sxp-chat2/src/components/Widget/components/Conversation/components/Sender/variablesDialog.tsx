import React, { useRef, useEffect, useState, useContext } from 'react';

import './style.scss';
import { Button, Icon } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Loader from 'src/layouts/TaskLayout/loader';
import { getCaseVariables } from 'src/services/camundaService';
import AppConfig from 'src/appConfig';


const send = require('../../../../../../../assets/send_button.svg') as string;
const upload = require('../../../../../../../assets/file_upload.svg') as string;
const restart = require('../../../../../../../assets/restart.svg') as string;
const editInput = require('../../../../../../../assets/edit-input.svg') as string;


type Props = {
    isOpen: boolean;
    dialogData: any;
    caseInstanceId: any,
    closeDialog: () => void;
    onMailOptionSubmit: (event: any) => void;
}

function VariablesDialog({ isOpen, dialogData, caseInstanceId, closeDialog, onMailOptionSubmit }: Props) {

    const [open, setOpen] = React.useState(false);
    const [variables, setVariables]: any[] = React.useState([]);
    const [fieldVariables, setFieldVariables] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [caseVariables, setCaseVariables] = React.useState({});
    const appData: any = useContext(AppConfig)


    useEffect(() => {
        setOpen(isOpen);
        setVariables(dialogData.variablesList);
        if (isOpen && caseInstanceId && (dialogData.variablesList.length>0) && (dialogData.variablesList.length>0) ) {
            setFieldVariables({});
            setLoading(true);
            getCaseInstanceVariables();
        }
    }, [isOpen])

    function handleDClose() {
        setOpen(false);
        closeDialog();
    };

    function getCaseInstanceVariables() {
        const BASE_URL = `${appData.appServerURL}`;
        getCaseVariables(caseInstanceId, BASE_URL).then(response => {
            if(response.success) {
                setVariableValue(response.data);
                setCaseVariables(response.data);
            }
        })
        // fetch(`${process.env.REACT_APP_SERVER_URL}/case-instance/${caseInstanceId}/variables`, {
        //     "method": "GET",
        //     "headers": {
        //         "Authorization": "Bearer " + localStorage.getItem('react-token'),
        //     }
        // })
        //     .then(presponse => presponse.json())
        //     .then(response => {
        //         setVariableValue(response);
        //         setCaseVariables(response);
        //     })
        //     .catch(err => {

        //         console.log(err);
        //     });
    }

    function setVariableValue(response) {
        if ((dialogData.variablesList.length > 0) && response) {
            let fieldObj = {};
            let variables = [...dialogData.variablesList]
            dialogData.variablesList.map((dialogVar: any , index) => {
                fieldObj[dialogVar.id] = dialogVar.defaultValue ? dialogVar.defaultValue : '';
                Object.keys(response).forEach(function (key) {
                    if (dialogVar.id == key) {  
                        fieldObj[dialogVar.id] = response[key].value;
                    }
                })
                if(fieldObj[dialogVar.id] && dialogVar.readOnly){
                    variables[index]['disableInput'] = true;
                }              
            })
            setFieldVariables(fieldObj);
            setVariables(variables);
        }
        setLoading(false);
    }
    // function feildVariableObj(list: any) {
    //     let obj = {};
    //     list.forEach(element => {
    //         obj[element.id] = '';
    //     });
    //     setFieldVariables(obj);
    // }

    function setFieldValue(key, value) {
        let obj = { ...fieldVariables };
        obj[key] = value;
        setFieldVariables(obj);
    }

    function submitTemplateData() {
        let obj = {...fieldVariables};
        Object.keys(caseVariables).forEach(function (key) {
            if(key == 'brandNames'){
                obj[key] = caseVariables[key].value;
            }
        })

        setLoading(true);
        let journeyDetails = {
            ...{ journeyName: dialogData.journeyName ,negotiationIteration:dialogData.negotiationIteration},
            ...obj
        }
        onMailOptionSubmit(journeyDetails);
        setOpen(false);
        setLoading(true);
    }

    return (
        <div style={{position : 'relative'}}>
           
            <Dialog maxWidth="xs" open={open} onClose={handleDClose} aria-labelledby="form-dialog-title">
            {loading && <Loader position={'absolute'}/>}
                <DialogTitle id="form-dialog-title">{dialogData ? dialogData.name : ''}</DialogTitle>
                <DialogContent>
                    {variables && variables.map((field: any, index) => {
                        return (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label={field.label}
                                type="text"
                                value={fieldVariables[field.id] || ''}
                                onChange={(event) => setFieldValue(field.id, event.target.value)}
                                fullWidth
                                disabled={field.disableInput}
                            />
                        )
                    }
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitTemplateData} color="primary">
                        Submit
      </Button>
                    <Button onClick={handleDClose} color="secondary">
                        cancel
      </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default VariablesDialog;
