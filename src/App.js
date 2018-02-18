import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Street Maintenance Simulator</a>
        <button className='btn btn-secondary'>Next Turn</button>
      </nav>
    );
  }
}

class switchideBar extends Component {
  render() {
    return (
      <div>{this.props.year}</div>
    );
  }
}

class Tile extends Component {
  render() {
    return (
      <div>Tile</div>
    );
  }
}

class Board extends Component {
  renderTile(){
    return (
      <Tile/>
    );
  }
  render() {
    return (
      <div className='board'>
        {
          this.props.tiles.map(
            tileRow =>
              <div className='tileRow' key={tileRow}>
                {
                  tileRow.map(
                    tile =>
                      <span className={'tile tile-'+tile} >{tile}</span>
                  )
                }
              </div>
            )
          }
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [
        [0,0,0],
        [0,1,0],
        [0,0,0],
      ],
      year: 1,
      numStreets: 0,
      revenue: 0,
      expense: 0,
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        <Board
          tiles = {this.state.tiles}
        />
        <sidebar
          year={this.state.year}
        />
      </div>
    );
  }
}

export default App;
