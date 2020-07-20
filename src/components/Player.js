import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div>
        <h1>Player</h1>
        {this.state.value}
      </div>
    );
  }
}
