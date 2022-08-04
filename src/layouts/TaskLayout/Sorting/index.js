import React, { Component } from 'react';
import {
    Box,
    Grid,
    Icon, MenuItem, Menu,
    Button,
    Typography,
    Divider,
    TextField,
    Tooltip
} from '@material-ui/core';
import "../style.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { STATE_COMPLETED } from 'src/variables/taskVariables';
import { withStyles } from '@material-ui/styles';

const DATA_TYPES = ['boolean', 'double', 'date', 'integer', 'long', 'short', 'string'];
const DESCENDING = 'desc';
const ASCENDING = 'asc';

const styles = theme => ({
    sortingWrapper : {
        '& .sorting-section button' : {
            color : theme.palette.primary.main
        }
    }
  });

 class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortingMenu: null,
            loading: false,
            variableName: '',
            variableType: 'integer',
            sortingOptions: JSON.parse(sessionStorage.getItem('config')) ? JSON.parse(sessionStorage.getItem('config')).tasklist_sorting_options.single : [],
            selectedSortingOptions: [],
            openVariableFormArray: [],
            sortingOptionsWithVariables: JSON.parse(sessionStorage.getItem('config')) ? JSON.parse(sessionStorage.getItem('config')).tasklist_sorting_options.variable : [],
        };
    }

    componentDidMount() {
        let form = [];
        this.state.sortingOptionsWithVariables.map((item, index) => {
            form.push(false);
        })
        this.setState({
            openVariableFormArray: form
        })
        if (this.props.state && this.props.state == STATE_COMPLETED) {
            let sortingOpts = [...this.state.sortingOptions];
            if (sortingOpts.length > 0) {
                sortingOpts.map((op) => {
                    if (op.historicId) {
                        op.id = op.historicId
                    }
                });
                this.setState({
                    sortingOptions: sortingOpts
                })
            }
            this.setMenu(sortingOpts[0])
        } else {
            this.setMenu(this.state.sortingOptions[0])
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }


    // sorting options
    sortingOptions(value) {
        if (value && (value.value == DESCENDING)) {
            return (
                <div className= {' sorting-section '}>
                    {(this.state.selectedSortingOptions.length != 1) && <Icon onClick={() => this.deleteSortingOption(value)}>close</Icon>}
                    <Button onClick={() => this.toggleRespectiveSorting(value)}>
                        {this.getSortingLabel(value)} <span title="Descending"><ExpandLessIcon /></span>
                    </Button>
                </div>
            )
        } else if (value && (value.value == ASCENDING)) {
            return (
                <div className='sorting-section'>
                    {(this.state.selectedSortingOptions.length != 1) && <Icon onClick={() => this.deleteSortingOption(value)}>close</Icon>}
                    <Button onClick={() => this.toggleRespectiveSorting(value)}>
                        {this.getSortingLabel(value)} <span title="Ascending"><ExpandMoreIcon /></span>
                    </Button>
                </div>
            )
        }
    }

    getSortingLabel(value) {
        if (value.parameters) {
            return value.parameters?.variable
        } else {
            return value.label
        }
    }

    toggleRespectiveSorting(value) {
        let options = [...this.state.selectedSortingOptions];
        let index = options.findIndex(item => item.id === value.id);
        if ((index > -1) && (value.value === DESCENDING)) {
            options[index].value = ASCENDING;
        } else if ((index > -1) && (value.value === ASCENDING)) {
            options[index].value = DESCENDING;
        }

        this.props.refreshTasksOnSorting(options);
        this.setState({
            selectedSortingOptions: options
        })
    }

    deleteSortingOption(value) {
        let selectedOps = [...this.state.selectedSortingOptions];
        let sortingOps = [...this.state.sortingOptions];
        let index = selectedOps.findIndex(item => item.id == value.id);
        selectedOps.splice(index, 1);

        if (!value.parameters) {
            sortingOps.push(value);
        }

        this.props.refreshTasksOnSorting(selectedOps);
        this.setState({
            selectedSortingOptions: selectedOps,
            sortingOptions: sortingOps
        })
    }

    handleSortingMenuClick(event) {
        this.setState({
            sortingMenu: event.currentTarget
        })
    };

    setMenu(value) {
        let selectedOptions = [...this.state.selectedSortingOptions];
        let options = [...this.state.sortingOptions];
        let index = options.findIndex(item => item.id == value.id);
        options.splice(index, 1)

        if (value) {
            value['value'] = DESCENDING;
            selectedOptions.push(value);
        }

        this.props.refreshTasksOnSorting(selectedOptions);
        this.setState({
            sortingMenu: null,
            selectedSortingOptions: selectedOptions,
            sortingOptions: options
        })
    }

    // SORTING ENDS HERE

    handleChange(event) {
        this.setState({
            variableType: event.target.value
        })
    };

    openVariableForm(value, idx) {
        let array = [...this.state.openVariableFormArray];
        array.map((item, index) => {
            array[index] = false;
        })
        array[idx] = true;
        this.setState({
            openVariableFormArray: array
        })
    }

    setVariableForSorting(value) {
        let selectedOptions = [...this.state.selectedSortingOptions];
        let array = [...this.state.openVariableFormArray];
        if (value && this.state.variableName) {
            value['value'] = DESCENDING;
            value['parameters'] = { variable: this.state.variableName, type: this.state.variableType }
            selectedOptions.push(value);
        }

        array.map((item, index) => {
            array[index] = false;
        })

        this.props.refreshTasksOnSorting(selectedOptions);
        this.setState({
            sortingMenu: null,
            selectedSortingOptions: selectedOptions,
            variableName: '',
            variableType: 'integer',
            openVariableFormArray: array
        })
    }
    render() {
        const {classes} = this.props

        return (
            <div className={classes.sortingWrapper + ' sorting-wrapper'}>
                {(this.state.selectedSortingOptions.length > 0) &&
                    this.state.selectedSortingOptions.map((value, index) => {
                        return (
                            this.sortingOptions(value)
                        )
                    })
                }
                {this.state.sortingOptions && (this.state.sortingOptions.length > 0) &&
                    <Tooltip title="Sorting">
                        <Icon onClick={(event) => this.handleSortingMenuClick(event)}>add</Icon>
                    </Tooltip>}


                <Menu
                    id="sorting-menu"
                    anchorEl={this.state.sortingMenu}
                    keepMounted
                    open={Boolean(this.state.sortingMenu)}
                    onClose={() => { this.setState({ sortingMenu: null }) }}
                    className={'menu-dark'}
                >
                    {this.state.sortingOptions.map((value, index) => {
                        return (
                            <MenuItem key={value.id} button onClick={(event) => this.setMenu(value)}>
                                {value.label}
                            </MenuItem>
                        );
                    })}

                    {!this.props.state && <Divider className={'light-divider'} />}

                    {!this.props.state && this.state.sortingOptionsWithVariables.map((value, index) => {
                        return (
                            <MenuItem key={value.id} button>
                                <div onClick={() => this.openVariableForm(value, index)}>{value.label}</div>

                                {this.state.openVariableFormArray[`${index}`] && <div className={'sorting-varibale-form'}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label='Variable name'
                                        type="text"
                                        value={this.state.variableName}
                                        onChange={(event) => this.setState({ variableName: event.target.value })}
                                        fullWidth
                                    />
                                    <FormControl >
                                        <InputLabel>Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.variableType}
                                            onChange={(event) => this.handleChange(event)}
                                        >
                                            {DATA_TYPES.map(value => {
                                                return (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                    <Button color="primary" onClick={() => this.setVariableForSorting(value)}>
                                        Add
                                    </Button>
                                </div>
                                }

                            </MenuItem>
                        );
                    })}
                </Menu>

            </div>

        );
    }
};
export default withStyles(styles)(Sorting)
