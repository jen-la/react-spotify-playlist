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
      searchResults: [
        { 
          id: 1,
          name: 'Umbrella', 
          artist: 'Rhianna', 
          album: 'Unknown'
        },
        { 
          id: 2,
          name: 'Circles', 
          artist: 'Post Malone', 
          album: 'Unknown'
        },
        { 
          id: 3,
          name: 'Dynamite', 
          artist: 'BTS', 
          album: 'Unknown'
        }
      ],
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
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div> 
    );
  };
}

export default App;
