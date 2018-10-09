
import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from 'axios'
import getUserListQuery from '../DBqueries/DBquery'

import './SearchBar.css';

// Style suggestion:
// .mark, mark {
//   padding: 0;
//   background-color: inherit;
//   color: inherit;
//   font-weight: bold;
// }

// const AsyncTypeahead = asyncContainer(Typeahead);

class SearchBar extends Component 
{
  constructor(props) {
    super(props)

    this.state = {
      disabled: false,
      dropup: false,
      flip: false,
      highlightOnlyResult: true,
      minLength: 0,
      selectHintOnEnter: false,
      isLoading: false,
      options: [],
    };
  }

  componentWillMount() {
    this._handleSearch()
  }

  render()
  {
    return (
      <Typeahead 
        {...this.state}
        // labelKey={this.props.searchType}
        placeholder={"Search here by Name, Address or Phone..."}
      />
    );
  }

  _handleSearch = () => {
    this.setState({isLoading: true});

    // Get user data from the database
    axios({
      url: 'http://172.16.0.10:4001',
      method: 'post',
      data: getUserListQuery,
    })

    // Convert the raw JSON array into a string array made up of
    // the first and last name of each customer
    .then( result => {
      // console.log(result.data.data.getUsers)

      var searchList = []
      let jsonData = result.data.data.getUsers
      
      for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          let listItem =  jsonData[key].firstName + " " + jsonData[key].lastName + " | " + 
                          jsonData[key].address 
          
          // Add phone number if one was provided
          if (jsonData[key].phone != null) {
            listItem = listItem + " | " + jsonData[key].phone
          } 
          
          searchList.push(listItem)
        }
      }
      
      this.setState(
        { 
          options: searchList,
          isLoading: false
        }
      )
    });  
  }
}

export default SearchBar;