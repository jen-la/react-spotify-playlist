let accessToken;

// create Spotify module
const Spotify = {
  // if accessToken already saved, return that value, otherwise get accessToken
  getAccessToken = () => {
    if (accessToken) {
      return accessToken;
    }
  };
}

export default Spotify;

/* Notes re Spotify API:
The base address of Web API is https://api.spotify.com. The API provides a set of endpoints, each with its own unique path. To access private data through the Web API, such as user profiles and playlists, an application must get the user’s permission to access the data. Authorization is via the Spotify Accounts service.
URI (resource identifier) format: spotify:track:6rqhFgbbKwnb9MLmUQDhG6 
Implicit Grant Flow (relevant option for connecting to Spotify API): use for apps using JavaScript and running in browser - no server-side code needed. See https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow */
