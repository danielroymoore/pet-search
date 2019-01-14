import React from "react";
import { navigate } from "@reach/router";
import SearchBox from "./SearchBox";

class SearchParams extends React.Component {
  search = () => {
    navigate("/");
  };

  render() {
    return (
      <div className="search-route">
        <SearchBox search={this.search} />
      </div>
    );
  }
}

export default SearchParams;
