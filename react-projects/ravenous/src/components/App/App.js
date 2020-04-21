import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchYelp = this.searchYelp.bind(this);
    this.state = { businesses: [] };
  }
  searchYelp(term, location, sortBy) {
    try {
      Yelp.search(term, location, sortBy).then(businesses => {
        this.setState({ businesses: businesses })
      });
    } catch(e) {
      console.log('Yelp api request failed.')
    }

  }
  render() {
    return (
      <div className="App">
        <h1>Ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;
