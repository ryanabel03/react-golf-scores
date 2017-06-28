import React, { Component } from 'react';

class PlayerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  updateScore(hole_key, event) {
    var newState = this.state || {};
    newState[hole_key] = event.target.value;
    this.setState(newState);
  }

  totalScore() {
    if (this.props.scores) {
      return this.props.scores.holes.reduce(function(a, b) { return a + parseInt(b) }, 0);
    } else {
      return 0;
    }
  }
  render() {
    return <tr>
      <td key='1'>{this.props.info.name}</td>
      <td key='3'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 0)}></input></td>
      <td key='4'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 1)}></input></td>
      <td key='5'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 2)}></input></td>
      <td key='6'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 3)}></input></td>
      <td key='7'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 4)}></input></td>
      <td key='8'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 5)}></input></td>
      <td key='9'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 6)}></input></td>
      <td key='10'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 7)}></input></td>
      <td key='11'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 8)}></input></td>
      <td key='12'>{this.totalScore()}</td>
      <td key='13'>{this.props.info.handicap}</td>
      <td key='14'>{this.totalScore() - this.props.info.handicap}</td>
    </tr>;
  }
}

export default PlayerRow;
