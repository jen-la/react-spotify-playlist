import React from 'react';
import { ExampleComponent } from '../../components';
import './ExamplePage.css';

class ExamplePage extends React.Component {
  render = () => {
    return (
      <div className="example-page">
        {this.props.viewportWidth < 1024 ? 'mobile-view' : 'desktop-view'}
        <ExampleComponent />
      </div>
    );
  };
}

export default ExamplePage;
