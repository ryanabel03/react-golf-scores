import React, { Component } from 'react';
import Select from 'react-select';

class PlayerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  totalScore() {
    if (this.props.scores) {
      return this.props.scores.reduce(function(a, b) { return a + parseInt(b) }, 0);
    } else {
      return 0;
    }
  }

  hasSub() {
    return this.props.sub.initials.length > 0;
  }

  subOptions() {
    return this.props.players.reduce(function(memo, a) {
      memo.push({value: a.initials, label: a.name});
      return memo;
    }, []);
  }

  netScore() {
    if (this.hasSub()) {
      return this.totalScore() - this.props.sub.handicap;
    } else {
      return this.totalScore() - this.props.info.handicap;
    }
  }

  render() {
    let scoreCell = <td key='13'>{this.props.info.handicap}</td>;

    if (this.hasSub()) {
      scoreCell = <td key='13'>
        <span className="orig-handicap">{this.props.info.handicap}</span>
        <span>{this.props.sub.handicap}</span>
      </td>;
    }
    return <tr>
      <td key='1' className="player-info">
        {this.props.info.name}
      <Select
        name="sub-player-select"
        value={this.props.sub.initials}
        clearable={false}
        options={this.subOptions()}
        onChange={this.props.onSubAssign.bind(this, this.props.info)}
      />
      </td>
      <td key='2'><input type="checkbox" onChange={this.props.onBlindUpdate.bind(this, this.props.info)}></input></td>
      <td key='3'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 0)} value={this.props.scores[0]}></input></td>
      <td key='4'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 1)} value={this.props.scores[1]}></input></td>
      <td key='5'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 2)} value={this.props.scores[2]}></input></td>
      <td key='6'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 3)} value={this.props.scores[3]}></input></td>
      <td key='7'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 4)} value={this.props.scores[4]}></input></td>
      <td key='8'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 5)} value={this.props.scores[5]}></input></td>
      <td key='9'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 6)} value={this.props.scores[6]}></input></td>
      <td key='10'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 7)} value={this.props.scores[7]}></input></td>
      <td key='11'><input className="hole-value" onChange={this.props.onScoreUpdate.bind(this, this.props.info, 8)} value={this.props.scores[8]}></input></td>
      <td key='12'>{this.totalScore()}</td>
      {scoreCell}
      <td key='14'>{this.netScore()}</td>
    </tr>;
  }
}

export default PlayerRow;
