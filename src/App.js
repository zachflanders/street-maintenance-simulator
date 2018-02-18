import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



class Navbar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
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
      <div>tile</div>
    );
  }
  render() {
    var self = this;
    var tileRows = this.props.tiles.map(function(tileRow, rowIndex){
      var tiles = tileRow.map(function(tile, colIndex){
        return <span className={'tile tile-'+tile}  key={colIndex} onClick={()=>self.props.handleClick(rowIndex, colIndex)}>value: {tile}<br /> row: {rowIndex}<br />  col: {colIndex},</span>
      })
      return <div key={rowIndex}>{tiles}</div>;
    })
    return (
      <div className='board'>
        {tileRows}
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
        [0,1,1],
        [0,0,0],
      ],
      year: 1,
      numStreets: 0,
      revenue: 0,
      expense: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(row, col){
    var tiles = this.state.tiles;
    console.log(row, col);
    tiles[row][col]=1;
    var numRows = tiles.length;
    var numCols = tiles[row].length;
    if(row == 0){
      tiles.unshift(Array(numCols).fill(0));
    }
    else if(row == numRows-1){
      tiles.push(Array(numCols).fill(0));
    }
    if(col == 0){
      tiles.forEach(function(tileRow){
        tileRow.unshift(0);
      })
    }
    else if(col == numCols-1){
      tiles.forEach(function(tileRow){
        tileRow.push(0);
      })
    }
    console.log(tiles);
    this.setState({tiles: tiles})
  }
  render() {
    return (
      <div>
        <Navbar />
        <Board
          tiles = {this.state.tiles}
          handleClick = {this.handleClick}
        />
        <sidebar
          year={this.state.year}
        />
      </div>
    );
  }
}

export default App;
