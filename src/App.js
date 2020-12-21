import React from 'react';
import Favicon from 'react-favicon';
import { ExamplePage } from './pages';
import { SearchBar, SearchResults, Playlist } from './components';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: window.innerWidth,
    };
  }
  
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  };

  handleResize = () => {
    this.setState({ viewportWidth: window.innerWidth});
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  render = () => {
    return (
      <div>
        <Favicon url="https://content.codecademy.com/programs/react/jammming/favicon.ico"/>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <ExamplePage viewportWidth={this.state.viewportWidth} /> */}
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar />
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            {/* <!-- Add a Playlist component --> */}
          </div>
        </div>
      </div> 
    );
  };
}

export default App;
