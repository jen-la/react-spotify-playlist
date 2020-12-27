import React from 'react';
import Favicon from 'react-favicon';
import { SearchBar, SearchResults, Playlist } from './components';
import { Spotify } from './util/Spotify';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: window.innerWidth,
      searchResults: [],
      playlistName: 'Jen\'s special mix',
      playlistTracks: [],
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

  savePlaylist = (name, arrayURIs) => {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ 
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  };

  search = (term) => {
    Spotify.search(term)
      .then(searchResults => {
        this.setState({ searchResults: searchResults });
      });
  };

  render = () => {
    return (
      <div>
        <Favicon url="https://content.codecademy.com/programs/react/jammming/favicon.ico"/>
        <h1>Ja<span className="highlight">mmm</span>ing with Jen</h1>
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
