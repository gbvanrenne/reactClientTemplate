
import React, { Component } from 'react';
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead';
import DB_Users_GET from '../../DBqueries/DB_Users_GET'
import propTypes from 'prop-types'

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
      disabled: false,
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

  _getContent = selected => {
    this.props.setSelectedCustomer_callback(selected[0])
    this._typeahead.getInstance().clear()
  }

  _handleSearch = async () => {
    this.setState({isLoading: true});

    // When first loading the component, populate the search bar with
    // some customers
    var queryParams = ''
    if (this.state.initialState) {
      queryParams = '(first: 10)'
      this.setState({initialState: false})
    }
    
    var userList = await DB_Users_GET(queryParams)

    this.setState({
      options: userList,
      isLoading: false,
    })
  }

  render()
  {
    return (
      <div>
      <code><ul>
        <li>use offline test data during dev to remove network / prisma dependency</li>
      </ul></code>
      <AsyncTypeahead 
        {...this.state}
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