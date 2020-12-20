import React from 'react';
import Favicon from 'react-favicon';
import { ExamplePage } from './pages';
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
      // <Router>
      //   <Switch>
      //     <Route exact path="/">
      <div>
        <Favicon url="https://content.codecademy.com/programs/react/jammming/favicon.ico"/>
        <ExamplePage viewportWidth={this.state.viewportWidth} />
      </div>
      //     </Route>
      //   </Switch>
      // </Router>    
    );
  };
}
//CRA default: 
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
