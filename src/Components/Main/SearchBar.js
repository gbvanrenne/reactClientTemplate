
import React, { Component } from 'react';
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead';
import DB_Users_GET from '../../DBqueries/DB_Users_GET'
import propTypes from 'prop-types'
import mock_customer_data from '../../Test/mock_customer_data.js'

import './SearchBar.css';

// Style suggestion:
// .mark, mark {
//   padding: 0;
//   background-color: inherit;
//   color: inherit;
//   font-weight: bold;
// }

const AsyncTypeahead = asyncContainer(Typeahead);

class SearchBar extends Component
{
    state = {
      dropup: false,
      flip: false,
      highlightOnlyResult: true,
      minLength: 0,
      selectHintOnEnter: false,
      isLoading: false,
      initialState: true,
      bsSize: 'large',
      options: [],
    };

  componentWillMount() {
    this._handleSearch()
  }

  componentDidUpdate() {

    if(this.props.refreshList) {
      this._handleSearch()
      this.props.setRefreshListFlag(false)
    }
  }

  _getContent = selected => {
    this.props.setCustomer_callback(selected[0])
    this._typeahead.getInstance().clear()
  }

  _handleSearch = async () => {
    this.setState({isLoading: true});

    // When first loading the component, populate the search bar with
    // some customers
    this.setState({initialState: false})
    
    var userList = await DB_Users_GET({
      first: 10, 
      orderBy: 'lastName_ASC'
    })

    this.setState({
      options: userList.sort(this._sortByName),
      // options: mock_customer_data.sort(this._sortByName),
      isLoading: false,
    })
  }

  _sortByName = (a,b) => {
    if (a.lastName < b.lastName)
      return -1;

    if (a.lastName > b.lastName)
      return 1;

    if (a.lastName === b.lastName) {
      if (a.firstName < b.firstName)
        return -1;

      if (a.firstName > b.firstName)
        return 1;
    }
      return 0;
  }

  render()
  {
    return (
      <div className="search-bar">
      <code><ul>
        <li>use offline test data during dev to remove network / prisma dependency</li>
      </ul></code>
      <AsyncTypeahead 
        {...this.state}
        disabled={! this.props.disabled}
        options={this.state.options}
        labelKey={ option => { 
          let label = option.firstName + ' ' + option.lastName + ' | ' + option.address
          if (option.phone != null) {
            label = label + ' | ' + option.phone
          }
          return(label)
          }
        }
        ref={ ref => this._typeahead = ref }
        placeholder={"Search by Name, Address or Phone..."}
        onSearch={ this._handleSearch }
        onChange={ selected => this._getContent(selected) }
      />
      </div>
    );
  }
}

SearchBar.propTypes = {
  setSelectedCustomer_callback: propTypes.func
}

export default SearchBar;