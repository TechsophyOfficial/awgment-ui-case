import React, { Component } from 'react';
import {
  TextField,
  IconButton
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import config from '../auth/config.js'
import './style.css'
import { getConfig } from 'src/services/common';

class Search extends Component {

  constructor(props) {
    super(props);
    const configJson = JSON.parse(sessionStorage.getItem('config'));
    if (configJson) {
      const searchOptions = configJson.search_parameters;
      this.state = {
        searchOptions: searchOptions,
        option: null,
        inputValue: null,
        value: ''
      };
    } else {
      getConfig().then(response => {
        if(response.success) {
          const configJson = JSON.parse(response.data);
          sessionStorage.setItem('config', JSON.stringify(configJson));
          const searchOptions = configJson.search_parameters;
          this.state = {
            searchOptions: searchOptions,
            option: '',
            inputValue: '',
            value: ''
          };
        }
      })
    }

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  onChange(event, newValue) {
    if (newValue) {
      this.setState({
        option: newValue
      });
    } else {
      this.setState({
        option: newValue,
        value: ''
      });
      this.props.onSearchClicked(null);
    }

  }

  onInputChange(event, newInputValue) {
    this.setState({
      inputValue: newInputValue
    });
  }

  handleValueChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSearch() {
    const searchParam = {
      id: this.state.option.variable,
      value: this.state.value.trim(),
      category: this.state.option.category ? this.state.option.category : null
    }
    this.props.onSearchClicked(searchParam);
  }

  renderValueField(value) {
    if (value) {
      return (
        <div className='search-value-field'>
          <TextField id="search-value-input" label="Value" variant="outlined"
            onChange={(event) => this.handleValueChange(event)}
            value={this.state?.value}
          />
          <IconButton id="search-btn" onClick={() => this.handleSearch()}>
            <SearchIcon />
          </IconButton>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
getTextFeild(params) {
  return (
    <TextField {...params}
    value={params.inputProps.value || " "}
     style={{ paddingTop: '1px', paddingBottom: '1px' }}  label="Search"
    variant="outlined"
  />
  )
}
  render() {
    return (
      <div className={this.props.className}>
        <Autocomplete
          value={this.state?.option}
          onChange={(event, newValue) => this.onChange(event, newValue)}
          inputValue={this.state?.inputValue}
          onInputChange={(event, newInputValue) => this.onInputChange(event, newInputValue)}
          id="search-input"
          // groupBy={(option) => option.categoryLabel}
          className={'search-box'}
          options={this.state?.searchOptions}
          getOptionLabel={option =>  option.categoryLabel + ' ' + option.title}
          style={{ width: '100%', padding: '16px 12px 8px' }}
          renderInput={(params) => this.getTextFeild(params) 
            }
        />
        {this.renderValueField(this.state?.option)}
      </div>
    );

  }
}

export default Search;
