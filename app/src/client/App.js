import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { storageValue: null };

  componentDidMount() {
            
    fetch('/api/getValueStore')
      .then(res => res.json())
      .then(simpleStorageContract => this.setState({ storageValue: simpleStorageContract.value}));  
  }

  render() {        
    return (
      <div className="App">
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>      
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 0 (by default).
        </p>
        <div>        
          <div>The stored value is: {this.state.storageValue}</div>        
        </div>
      </div>                
    );
  }
}
