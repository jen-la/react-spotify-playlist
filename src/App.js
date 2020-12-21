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
      playlistName: 'Jen\'s special mix',
      playlistTracks: [
        { 
          id: 1,
          name: 'Jet Plane', 
          artist: 'Angus and Julia Stone', 
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
  
  addTrack = (track) => {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      // add song to playlist
      const updatedPlaylist = [...this.state.playlistTracks, track];
      // set new state of playlist
      this.setState({ playlistTracks: updatedPlaylist });
    } 
  };

  removeTrack = (track) => {
    const filteredPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({ playlistTracks: filteredPlaylist });
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
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div> 
    );
  };
}

export default App;
