import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



class Navbar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Street Maintenance Simulator</a>
      </nav>
    );
  }
}

class Toolbar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-light bg-light toolbar">
      <span class="navbar-text">
        Year: {this.props.year} | Funds: ${this.props.funds} | Revenue: ${this.props.revenue} | Expense: ${this.props.expense}
      </span>
        <button className='btn btn-secondary'>Next Turn</button>
      </nav>
    );
  }
}


class Tile extends Component {
  render() {
    return (
      <span
        className={'tile tile-'+this.props.tile}
        onClick={()=>this.props.handleClick(this.props.row, this.props.col)}
      >
      </span>
    );
  }
}

class Board extends Component {
  render() {
    var self = this;
    var tileRows = this.props.tiles.map(function(tileRow, rowIndex){
      var tiles = tileRow.map(function(tile, colIndex){
        return <Tile tiles={self.props.tiles} tile = {tile} row = {rowIndex} col={colIndex} handleClick={self.props.handleClick} />
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
        [0,1,0],
        [0,0,0],
      ],
      year: 0,
      numStreets: 0,
      revenue: 0,
      expense: 0,
      funds: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(row, col){
    var tiles = this.state.tiles;
    var numRows = tiles.length;
    var numCols = tiles[row].length;
    console.log(row, col, numRows, numCols);
    if(row == 0){
      if(
        tiles[row+1][col]==1 ||
        tiles[row][col+1]==1 ||
        tiles[row][col-1]==1
      ){
        tiles[row][col]=1;
        tiles.unshift(Array(numCols).fill(0));
      };
    }
    else if(row == numRows-1){
      if(
        tiles[row-1][col]==1 ||
        tiles[row][col+1]==1 ||
        tiles[row][col-1]==1
      ){
        tiles[row][col]=1;
        tiles.push(Array(numCols).fill(0));
      };

    };

    if(col == 0 && row > 0 && row < numRows-1){
      if(
        tiles[row+1][col]==1 ||
        tiles[row-1][col]==1 ||
        tiles[row][col+1]==1
      ){
        tiles[row][col]=1;
        tiles.forEach(function(tileRow){
          tileRow.unshift(0);
        });
      };

    }
    else if(col == numCols-1 && row > 0 && row < numRows-1){
      if(
        tiles[row+1][col]==1 ||
        tiles[row-1][col]==1 ||
        tiles[row][col-1]==1
      ){
        tiles[row][col]=1;
        tiles.forEach(function(tileRow){
          tileRow.push(0);
        });
      };

    };

    if( row != 0 && row != numRows-1 && col !=0 && col != numCols){
      if(
        tiles[row+1][col]==1 ||
        tiles[row-1][col]==1 ||
        tiles[row][col+1]==1 ||
        tiles[row][col-1]==1
      ){
        tiles[row][col]=1;
      }
    }

    this.setState({tiles: tiles})
  }
  render() {
    return (
      <div>
        <Navbar />
        <Toolbar
          year = {this.state.year}
          funds = {this.state.funds}
          revenue = {this.state.revenue}
          expense = {this.state.expense}
        />
        <Board
          tiles = {this.state.tiles}
          handleClick = {this.handleClick}
        />
      </div>
    );
  }
}

export default App;
