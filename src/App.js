import React from 'react';
import Favicon from 'react-favicon';
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
          id: 4,
          name: 'Jet Plane', 
          artist: 'Angus and Julia Stone', 
          album: 'Unknown',
          uri: ''
        },
        {
          id: 2,
          name: 'Circles', 
          artist: 'Post Malone', 
          album: 'Unknown',
          uri: ''
        },
        {
          id: 3,
          name: 'Dynamite', 
          artist: 'BTS', 
          album: 'Unknown',
          uri: ''
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
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return; 
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  };

  removeTrack = (track) => {
    const filteredPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({ playlistTracks: filteredPlaylist });
  };

  updatePlaylistName = (name) => {
    this.setState({ playlistName: name});
  };

  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    // return trackURIs; 
  };

  search = (searchTerm) => {
    console.log(searchTerm);
  };

  render = () => {
    return (
      <div>
        <Favicon url="https://content.codecademy.com/programs/react/jammming/favicon.ico"/>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div> 
    );
  };
}

export default App;
