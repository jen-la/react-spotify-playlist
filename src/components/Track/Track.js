import React from 'react';
import './Track.css';

class Track extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isRemoval: this.props.isRemoval,
  //   };
  // }
  renderAction = () => {
    return this.props.isRemoval === true ? <button className="Track-action" onClick={() => this.removeTrack}>-</button> : <button className="Track-action" onClick={() => this.addTrack}>+</button>;
  };
  
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };

  removeTrack = () => {
    this.props.onRemove(this.props.track);
  };

  render = () => {
    return (
      <div className="Track" key={this.props.track.id}>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  };
}

export default Track;