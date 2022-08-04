import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes, { func, element } from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
    IconButton,
    makeStyles,
    InputLabel,
    Grid
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControl, Input } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { filter } from 'lodash';
import { generatePath } from 'react-router';
import ListSubheader from '@material-ui/core/ListSubheader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import { FileText } from 'react-feather';
import Loader from '../TaskLayout/loader';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDispatch } from 'react-redux';
import { refreshFilters } from 'src/redux/actions';
import { getFilter, deleteFilter, updateFilter, createFilter } from 'src/services/camundaService';



const useStyles = makeStyles((theme) => ({
    filterDialog: {
        '&.MuiDialogContent-root': {
            padding: 0
        }
    },
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    hide: {
        display: 'none'
    },
    tabHead: {
        backgroundColor: theme.palette.primary.light,
        minHeight: '30px',
        marginBottom: '2px',
        '&.Mui-expanded': {
            margin: '0 0',
            minHeight: '30px'
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '12px 0',
        },
        '& p': {
            fontSize: '14px',
            fontWeight: '500'
        },
        '& .MuiAccordionSummary-expandIcon': {
            display: 'none'
        }
    },
    error: {
        color: theme.palette.error.main
    },
    dialogTitle: {
        width: '80%',
        float: 'left'
    },
    dialogPaper: {
        minHeight: '60vh',
        maxHeight: '80vh',
        minWidth: '50%',
        width: '60vh',
        maxWidth: '80vh'
    },
    filterFeilds: {
        '& label': {
            fontSize: '14px',
            color: '#c1c1c1',
            fontWeight: 400,
            marginRight: 7
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 7,
            borderColor: '#C1C1C1'
        },
        '& .MuiOutlinedInput-input': {
            maxHeight: '27px',
            padding: '0px 7px',
            minHeight: '27px',
        },
        '& .MuiTypography-body1': {
            color: theme.palette.primary.main,
            fontSize: 14,
            fontWeight: 400
        }
    },
    dialogActions: {
        '& .MuiButton-text': {
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'capitalize'
        }
    },
    feildWrap: {
        display: 'flex',
        padding: '0 5px',
        alignItems: 'center',
        '& label': {
            flex: 1,
            textAlign: 'right'
        },
        '& .MuiFormControl-root': {
            flex: 3
        }
    },
    criteriaSelect: {
        '& select': {
            paddingLeft: 10,
        },
        '& select::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '4px',
        },
        '& .MuiNativeSelect-select:not([multiple]) option, .MuiNativeSelect-select:not([multiple]) optgroup': {
            fontSize: 12
        }
    }
}));

const CreateFilterDailog = ({ isOpen, isEdit, openStatus, onFilterSaved }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false
    });
    const [rows, setRows] = useState([]);
    const [permission, setPermissions] = useState([]);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [age, setAge] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [variables, setVariables] = React.useState([]);
    const [searchOptionsGroupBycategory, setSearchOptionsGroupBycategoryLabel] = React.useState([]);
    const configJson = JSON.parse(sessionStorage.getItem('config'));
    const searchOptions = configJson?.search_parameters;
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

    const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    };


    useEffect(() => {
        if (edit && isOpen) {
            setLoading(true);
            getFilterDetails();
        }
        setOpen(isOpen);
        if ((isEdit && !edit) || (isEdit && (isEdit != edit))) {
            setEdit(isEdit);
        }

    }, [isOpen, isEdit, edit])

    useEffect(() => {
        let searchOps = searchOptions ? searchOptions.filter(x => !x.category) : [];
        let searchOptionsGroupBycategoryLabel = [];
        searchOptionsGroupBycategoryLabel = groupBy([...searchOps], 'categoryLabel');
        setSearchOptionsGroupBycategoryLabel(searchOptionsGroupBycategoryLabel);
        if (isOpen) {
            setLoading(true);
            getFilterDetails();
        }
        return () => {
            restValues();
        }
    }, []);

    function restValues() {
        setIsSubmit(false);
        setName('');
        setVariables([]);
        setRows([]);
    }

    // function handleKeyChange(event, newValue, idx) {
    //     console.log(JSON.parse(event.target.value))
    //     debugger
    //     if (newValue) {
    //         const ageRow = [...age];
    //         ageRow[idx] = newValue.variable;
    //         setAge(ageRow);
    //         const newRows = [...rows];
    //         newRows[idx].key = newValue.variable;
    //         if (newValue.defaultValue) {
    //             newRows[idx].value = newValue.defaultValue;
    //         }
    //         setRows(newRows);
    //     } else {
    //         const ageRow = [...age];
    //         ageRow[idx] = null;
    //         setAge(ageRow);
    //         const newRows = [...rows];
    //         newRows[idx].key = null
    //         setRows(newRows);
    //     }
    // }


    function handleKeyChange(event, idx) {
        console.log(event);
        let newValue = JSON.parse(event?.target.options[event.target.selectedIndex].dataset.object);
        if (newValue) {
            const ageRow = [...age];
            ageRow[idx] = newValue.variable;
            setAge(ageRow);
            const newRows = [...rows];
            newRows[idx].key = newValue.variable;
            if (newValue.defaultValue) {
                newRows[idx].value = newValue.defaultValue;
            }
            setRows(newRows);
        } else {
            const ageRow = [...age];
            ageRow[idx] = null;
            setAge(ageRow);
            const newRows = [...rows];
            newRows[idx].key = null
            setRows(newRows);
        }
    }

    function handleChangeCriteria(e, idx) {
        const { param, value } = e.target;
        const newRows = [...rows];
        newRows[idx].value = e.target.value;
        setRows(newRows);
    }

    function handleAddRow() {
        const item = {
            key: "",
            value: ""
        };
        let newArr = [...rows];
        newArr.push(item);
        setRows(newArr);
    }

    function handleRemoveSpecificRow(idx) {
        const newRows = [...rows]
        newRows.splice(idx, 1)
        setRows(newRows);
    }

    // for permissions tab
    // const handleUserChange = (event, idx) => {
    //     const userRow = [...user];
    //     userRow[idx] = event.target.value;
    //     setUser(userRow);
    //     const newRows = [...permission];
    //     newRows[idx].user = event.target.value
    //     setPermissions(newRows);
    // };

    // function handleChangePermissions(e, idx) {
    //     const { user, value } = e.target;
    //     const newRows = [...permission];
    //     newRows[idx].value = e.target.value;
    //     setPermissions(newRows);
    // }

    // function handleAddPermissionRow() {
    //     const item = {
    //         user: "",
    //         value: ""
    //     };
    //     let newArr = [...permission];
    //     newArr.push(item);
    //     setPermissions(newArr);
    // }

    // function handleRemoveSpecificPermissionRow(idx) {
    //     const newRows = [...permission]
    //     newRows.splice(idx, 1)
    //     setPermissions(newRows);
    // }

    // for variables
    const handleVariableChange = (event, idx) => {
        // const variableRow = [...variable];
        // variableRow[idx] = event.target.value;
        // setVariable(variableRow);
        const newRows = [...variables];
        newRows[idx].variable = event.target.value
        setVariables(newRows);
    };

    function handleChangeVariables(e, idx) {
        const { variable, value } = e.target;
        const newRows = [...variables];
        newRows[idx].value = e.target.value
        setVariables(newRows);
    }

    function handleAddVariableRow() {
        const item = {
            variable: "",
            value: ""
        };
        let newArr = [...variables];
        newArr.push(item);
        setVariables(newArr);
    }

    function handleRemoveSpecificVariableRow(idx) {
        const newRows = [...variables]
        newRows.splice(idx, 1)
        setVariables(newRows);
    }


    const handleChange = (event) => {
        const checkboxValue = { ...state };
        checkboxValue[event.target.name] = event.target.checked
        setState(checkboxValue);
    };

    const handleClose = () => {
        openStatus(false);
        setOpen(false);
        setEdit(null);
        setName('');
        setDescription('');
        setState({
            checkedA: false,
            checkedB: false,
            checkedC: false
        });
        setRows([]);
        setVariables([]);
        onFilterSaved('close');
    };

    // save filter
    function handleSave() {
        if (name) {
            setLoading(true)
            if (!edit) {
                createNewfilter()
            } else {
                updateFilterDetails()
            }
        } else {
            setIsSubmit(true);
        }

    }

    function createNewfilter() {
        const query = generateQuery();
        if (query) {
            createFilter(query).then(response => {
                if (response.success) {
                    openStatus(false);
                    setOpen(false);
                    setEdit(null);
                    onFilterSaved();
                    restValues();
                }
                setLoading(false);
            })
        }
    }

    function updateFilterDetails() {
        const query = generateQuery();
        if (query && edit) {
            updateFilter(edit, query).then(response => {
                if (response.success) {
                    openStatus(false);
                    setOpen(false);
                    setEdit(null);
                    onFilterSaved('update');
                    restValues();
                    dispatch(refreshFilters(true))
                }
                setLoading(false);
            })
        }
    }

    function getFilterDetails() {
        if (edit) {
            getFilter(isEdit).then(response => {
                if (response.success && response.data) {
                    let filter = response.data;
                    setName(filter.name);
                    setDescription(filter.properties.description);
                    setPriority(filter.properties.priority);
                    setState({
                        checkedA: filter.properties.refresh,
                        checkedC: filter.properties.checkedC
                    });

                    if (filter.query) {
                        let rowArr = [];
                        let ageArr = [...age];
                        const query = filter.query;
                        Object.keys(query).forEach(function (key) {
                            if (typeof (query[key]) == 'string') {
                                let obj = { key: key, value: query[key] }
                                rowArr.push(obj);
                                ageArr.push(key);
                            } else if (typeof (query[key]) == 'object') {
                                if (query[key] && query[key].length > 0) {
                                    query[key].map((item) => {
                                        let obj = { key: key, category: key, value: item.value }
                                        rowArr.push(obj);
                                        ageArr.push(key);
                                    });
                                }
                            } else if (typeof (query[key]) == 'boolean') {
                                let obj = { key: key, value: query[key] }
                                rowArr.push(obj);
                                ageArr.push(key);
                            }

                        });
                        setRows(rowArr);
                        setAge(ageArr);
                    }

                    // for variables
                    if (filter.properties.variables && filter.properties.variables.length > 0) {
                        let variablesArr = [];
                        let variablesObj = filter.properties.variables;
                        variablesObj.map(item => {
                            let obj = item ? { variable: item.name, value: item.label } : {};
                            variablesArr.push(obj);
                        })
                        setVariables(variablesArr);
                    } else {
                        setVariables([]);
                    }

                }
                setLoading(false)
            })
        }
    }

    function handleDelete() {
        if (edit) {
            setLoading(true);
            deleteFilter(edit).then(response => {
                if (response.success) {
                    openStatus(false);
                    setOpen(false);
                    setEdit(null);
                    onFilterSaved('delete');
                    dispatch(refreshFilters(true))
                }
                setLoading(false);
            })
        }
    }

    function generateQuery() {
        const query = {
            "resourceType": "Task",
            "name": name,
            "owner": localStorage.getItem('currentUser'),
            "query": getQuery(),
            "properties": getProperties()
        };

        return query;
    }

    function getVariables() {
        const query = [];
        variables.map(element => {
            let obj = {};
            obj['name'] = element.variable;
            obj['label'] = element.value;
            query.push(obj);
        });
        return query;
    }

    function getProperties() {
        const query = {};
        query["color"] = "#3e4d2f";
        query["showUndefinedVariable"] = state.checkedC;
        query["refresh"] = state.checkedA
        query["owner"] = localStorage.getItem('currentUser')
        query["description"] = description
        if (priority) {
            query["priority"] = priority
        } else {
            query["priority"] = 0
        }
        if (variables.length > 0) {
            query["variables"] = getVariables();
        }

        return query;
    }

    function getQuery() {
        const query = {};
        rows.map(param => {
            query[param.key] = param.value;
        });

        return query;
    }

    function isDisabled() {
        // if(!);
        return false;
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlePriorityChange(event) {
        setPriority(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function getCategoryOption(category, value, i) {
        if (i == 0) {
            return (
                // <>
                [<ListSubheader>{category}</ListSubheader>,
                <MenuItem key={value.variable}>
                    {value.title}
                </MenuItem>]
                // </>
            )
        } else {
            return (
                <MenuItem key={value.variable}>
                    {value.title}
                </MenuItem>
            )
        }

    }

    const dialogTitle = () => {
        if (edit) {
            return <Typography variant="h5" className={classes.dialogTitle}>Edit Filter</Typography>
        } else {
            return <Typography variant="h5" className={classes.dialogTitle}>Create a filter</Typography>
        }
    }

    const getOptionLabel = (option) => {
        if (option.title) {
            return option.title
        } else {
            let title = '';
            searchOptions.map((op) => {
                if (option == op.variable) {
                    title = op.title;
                }
            });
            return title;
        }
    }
    const createFilterForm = (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                className={{ paper: classes.dialogPaper }}>
                <DialogTitle id="form-dialog-title">
                    {dialogTitle()}
                    <CloseIcon onClick={handleClose} style={{ float: 'right' }} />
                </DialogTitle>

                <DialogContent className={classes.filterDialog}>
                    {loading && <Loader position={'absolute'} />}
                    <Accordion expanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.tabHead}
                        >
                            <Typography className={classes.heading}>General</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.filterFeilds}>
                                <Grid container
                                    spacing={3}>
                                    <Grid item lg={8} md={8} xs={8}>
                                        <div className={classes.feildWrap}>
                                            <label>Name</label>
                                            {/* <TextField required id="outlined-basic" value={name} variant="outlined"
                                                onChange={handleNameChange} /> */}

                                            <TextField
                                                variant="outlined"
                                                value={name}
                                                id="filter-name"
                                                onChange={event => setName(event.target.value)}
                                                error={isSubmit && (name === "")}
                                                helperText={(isSubmit && (name === "")) ? 'Empty field!' : ' '}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item lg={4} md={4} xs={4}>
                                        <div className={classes.feildWrap}>
                                            <label>Priority</label>
                                            <TextField id="outlined-basic" value={priority} variant="outlined"
                                                onChange={handlePriorityChange} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} xs={8}>
                                        <div className={classes.feildWrap}>
                                            <label>Description</label>
                                            <TextField id="outlined-basic" value={description} variant="outlined"
                                                onChange={handleDescriptionChange} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={4} md={4} xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={state.checkedA}
                                                    onChange={handleChange}
                                                    name="checkedA"
                                                    color="primary"
                                                />
                                            }
                                            label="Auto-Refresh"
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            className={classes.tabHead}
                        >
                            <Typography className={classes.heading}>Criteria</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <div className="container">
                                    <div className="row clearfix">
                                        <div className="col-md-12 column">
                                            <table
                                                className="table table-bordered table-hover"
                                                id="tab_logic"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">
                                                            <Button id="add-criteria-btn" variant="contained" color="primary" onClick={handleAddRow} className="btn btn-primary">
                                                                Add Criteria
                                                            </Button>
                                                        </th>
                                                        <th className="text-center"> Key </th>
                                                        <th className="text-center"> Value </th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rows.map((item, idx) => (
                                                        <tr id="addr0" key={idx}>
                                                            <td>
                                                                {idx + 1}
                                                            </td>
                                                            <td>
                                                                {/* <Autocomplete
                                                                    value={rows[idx].key}
                                                                    onChange={(event, newInputValue) => handleKeyChange(event, newInputValue, idx)}
                                                                    // inputValue={this.state.inputValue}
                                                                    // onInputChange={(event, newInputValue) => handleKeyChange(event, newInputValue)}
                                                                    id="controllable-states-demo"
                                                                    groupBy={(option) => option.categoryLabel}
                                                                    // options={this.state.searchOptions.map((option) => option.title)}
                                                                    options={searchOptions}
                                                                    getOptionLabel={option => getOptionLabel(option)}
                                                                    style={{ minWidth: '182px' }}
                                                                    renderInput={(params) =>
                                                                        <TextField {...params} label="Key" />}
                                                                /> */}

                                                                <FormControl >
                                                                    <InputLabel htmlFor="name-native-disabled">Key</InputLabel>
                                                                    <NativeSelect
                                                                        value={rows[idx].key}
                                                                        onChange={(event) => handleKeyChange(event, idx)}
                                                                        inputProps={{
                                                                            name: 'name',
                                                                            id: 'name-native-disabled',
                                                                        }}

                                                                        className={classes.criteriaSelect + ' criteria-select'}
                                                                    >
                                                                        <option value='' selected></option>
                                                                        {Object.keys(searchOptionsGroupBycategory).map(function (key) {
                                                                            return (<optgroup label={key}>
                                                                                {searchOptionsGroupBycategory[key].map((subOpts, index) => {
                                                                                    return <option data-object={JSON.stringify(subOpts)} value={subOpts.variable}>{subOpts.title}</option>
                                                                                })}
                                                                            </optgroup>
                                                                            )
                                                                        })}

                                                                    </NativeSelect>
                                                                </FormControl>
                                                                {/* <FormControl className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-label">Key</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={age[idx]}
                                                                        onChange={($event) => handleKeyChange($event, idx)}
                                                                    >
                                                                        {searchOptions.map((o, i) => (
                                                                            <MenuItem value={o.variable} key={o.variable}>
                                                                                {o.title}
                                                                            </MenuItem>
                                                                        ))}


                                                                        {Object.keys(searchOptionsGroupBycategoryLabel).map((category, value) => {
                                                                            return (
                                                                                searchOptionsGroupBycategoryLabel[category].map((o, i) => (
                                                                                    getCategoryOption(category, o, i)

                                                                                )))
                                                                        })};

                                                                    </Select>
                                                                </FormControl> */}

                                                            </td>
                                                            <td>
                                                                <TextField id="critria-input" label="Value"
                                                                    value={rows[idx].value}
                                                                    onChange={($event) => handleChangeCriteria($event, idx)} />

                                                            </td>
                                                            <td>
                                                                <IconButton aria-label="delete" >
                                                                    <DeleteIcon id="delete-criteria-row" onClick={(event) => handleRemoveSpecificRow(idx)} />
                                                                </IconButton>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography className={classes.heading}>Permissions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedB}
                                            onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Accessible by all users"
                                />

                                <div className="container">
                                    <div className="row clearfix">
                                        <div className="col-md-12 column">
                                            <table
                                                className="table table-bordered table-hover"
                                                id="tab_logic"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">
                                                            <Button variant="contained" color="primary" onClick={handleAddPermissionRow} >
                                                                Add Permissions
                              </Button>
                                                        </th>
                                                        <th className="text-center"> Group/User </th>
                                                        <th className="text-center"> Identifier </th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {permission.map((item, idx) => (
                                                        <tr id="addr0" key={idx}>
                                                            <td>
                                                                {idx + 1}
                                                            </td>
                                                            <td>
                                                                <FormControl className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={user[idx]}
                                                                        onChange={($event) => handleUserChange($event, idx)}
                                                                    >
                                                                        <MenuItem value={'user'} key={'user'}>
                                                                            {'User'}
                                                                        </MenuItem>
                                                                        <MenuItem value={'group'} key={'group'}>
                                                                            {'Group'}
                                                                        </MenuItem>

                                                                    </Select>
                                                                </FormControl>

                                                            </td>
                                                            <td>
                                                                <TextField id="standard-basic" label="Value"
                                                                    value={permission[idx].value}
                                                                    onChange={($event) => handleChangePermissions($event, idx)} />

                                                            </td>
                                                            <td>
                                                                <IconButton aria-label="delete" >
                                                                    <DeleteIcon onClick={(idx) => handleRemoveSpecificPermissionRow(idx)} />
                                                                </IconButton>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>

                    </Accordion> */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            className={classes.tabHead}
                        >
                            <Typography className={classes.heading}>Variables</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                {/* <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedC}
                                            onChange={handleChange}
                                            name="checkedC"
                                            color="primary"
                                        />
                                    }
                                    label="Show undefined variables"
                                /> */}
                                <div className="container">
                                    <div className="row clearfix">
                                        <div className="col-md-12 column">
                                            <table
                                                className="table table-bordered table-hover"
                                                id="tab_logic"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">
                                                            <Button id="add-variable-btn" variant="contained" color="primary" onClick={handleAddVariableRow} >
                                                                Add Variables
                              </Button>
                                                        </th>
                                                        <th className="text-center"> Name </th>
                                                        <th className="text-center"> Label </th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {variables.map((item, idx) => (
                                                        <tr id="variable-row" key={idx}>
                                                            <td>
                                                                {idx + 1}
                                                            </td>
                                                            <td>
                                                                <TextField id="variable-input" label="Name"
                                                                    value={variables[idx].variable}
                                                                    onChange={($event) => handleVariableChange($event, idx)} />

                                                            </td>
                                                            <td>
                                                                <TextField id="variable-input-value" label="Value"
                                                                    value={variables[idx].value}
                                                                    onChange={($event) => handleChangeVariables($event, idx)} />

                                                            </td>
                                                            <td>
                                                                <IconButton aria-label="delete">
                                                                    <DeleteIcon id="delete-variable-row" onClick={(event) => handleRemoveSpecificVariableRow(idx)} />
                                                                </IconButton>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>

                    </Accordion>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button id="delete-filter" onClick={handleDelete} className={classes.error + ' ' + (edit ? '' : classes.hide)}>
                        Delete
        </Button>
                    <Button id="save-filter" onClick={handleSave} color="primary">
                        Save
        </Button>
                    <Button id="close-filter" onClick={handleClose} color="secondary">
                        Cancel
        </Button>

                </DialogActions>
            </Dialog>
        </div>
    );

    return (
        <>
            <div>
                {createFilterForm}
            </div>
        </>
    );
};

// NavBar.propTypes = {
// //   onMobileClose: PropTypes.func,
// //   openMobile: PropTypes.bool
// };

// NavBar.defaultProps = {
// //   onMobileClose: () => { },
// //   openMobile: false
// };

export default CreateFilterDailog;
