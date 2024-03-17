/** @format */

import React from "react";
class Search extends React.Component {
  render() {
    return (
      <input
        type='text'
        placeholder='Search for location...'
        value={this.props.location}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Search;
