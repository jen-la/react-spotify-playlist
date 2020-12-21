import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoval: false,
    };
  }
  
  renderAction = () => {
    return this.state.isRemoval ? '-' : '+';
  };
  
  render = () => {
    return (
      <div className="Track" key={this.props.track.id}>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button className="Track-action">{this.renderAction}</button>
      </div>
      );
  };
}

export default Track;