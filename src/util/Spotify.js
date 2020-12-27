const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectURI = 'http://localhost:3000/';

let accessToken;

// create Spotify module
export const Spotify = {
  // METHOD 1: get access token
  getAccessToken() {
    // if token already saved
    if (accessToken) {
      return accessToken;
    }
    // if not saved, check if access token in URL of current page; Spotify example success response = https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); 
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // clear access token param from URL so app doesn't get it after expiration
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      // redirect user as per: https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
      const baseURL = 'https://accounts.spotify.com/authorize?';
      const queryParams = `client_id=${clientId}&redirect_uri=${redirectURI}&scope=playlist-modify-public&response_type=token`;
      const accessURL = baseURL + queryParams;
      window.location = accessURL;
    }
  },

  // METHOD 2: implement search function (see https://developer.spotify.com/documentation/web-api/reference/search/search/)
  search(term) {
    const accessToken = Spotify.getAccessToken();
    const baseRequestUrl = 'https://api.spotify.com/v1/search?';
    const queryParams = `type=track&q=${term}`;
    const requestUrl = baseRequestUrl + queryParams;
    return fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        if (!jsonData.tracks) {
          return [];
        }
        return jsonData.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artists: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
     });
  },

  // METHOD 3: save user's playlist
  savePlaylist(name, arrayURIs) {
    if (!name || !arrayURIs.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId; 
    
    // GET user's spotify id/username
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    })
      .then(response => response.json())
      .then(jsonData => {
        userId = jsonData.id;
        //using the userId, POST request to create new playlist to user's Spotify account, & return playlist ID
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ name: name })
        })
          .then(response => response.json())
          .then(jsonData => {
            const playlistID = jsonData.id;
            // using userId and playlistID, POST request to add track URIs to playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({ uris: arrayURIs})
            });
          });
      });
  }
}

export default Spotify;