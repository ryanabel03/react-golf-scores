import React, { Component } from 'react';

class RoundSummary extends Component {
  formattedScores() {
    return this.props.rounds.map((round, i) => {
      let scores = "";
      if (round.blind) {
        scores = round.player.initials +"-x" + " " + round.player.handicap + " " + round.scores.join(" ");
      }
      else {
        scores = round.player.initials + " " + round.player.handicap + " " + round.scores.join(" ");
      }
      return <div key={i}>{scores}</div>;
    });
  }
  render() {
      return <div className="scores">{this.formattedScores()}</div>;
  }
}

export default RoundSummary;
