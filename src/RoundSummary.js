import React, { Component } from 'react';

class RoundSummary extends Component {
  formattedScores() {
    return Object.keys(this.props.scores).map((key, i) => {
      let scores = key + " " + this.props.scores[key].player.handicap + " " + this.props.scores[key].holes.join(",");
      return <div key={i}>{scores}</div>;
    });
  }
  render() {
      return <div class="scores">{this.formattedScores()}</div>;
  }
}

export default RoundSummary;
