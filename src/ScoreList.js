import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerRow from './PlayerRow';
import RoundSummary from './RoundSummary';

class ScoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      players: [],
      rounds: []
    };
  }
  componentDidMount() {
    this.retrieveMatchups().then(json => {
      console.log(json);
      let rounds = json.players.map(function(player) {
        return {scores: [], player: player, blind: false};
      });
      this.setState({players: json.players, course: json.course, rounds: rounds});
    });
  }

  retrieveMatchups() {
    return fetch("http://localhost:3001/seasons/2017/outings/10/player_information.json", {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(json => {
        return json;
      });
  }

  calculatePar() {
    return ['hole_1_par',
            'hole_2_par',
            'hole_3_par',
            'hole_4_par',
            'hole_5_par',
            'hole_6_par',
            'hole_7_par',
            'hole_8_par',
            'hole_9_par'
            ].reduce((a,b) => {
              return a + parseInt(this.state.course[b]);
            }, 0);
  }

  findRound(player) {
    return this.state.rounds.find(function(round, index) {
      if (round.player == player) {
        return true;
      }
      return false;
    });
  }

  findRoundIndex(player, numRounds) {
    let roundIndex = numRounds;
    this.state.rounds.find(function(round, index) {
      if (round.player == player) {
        return true;
      }
      return false;
    });

    return roundIndex;
  }

  calculateBlindRound(course, handicap) {
    let courses = {
      red: {
        par: [4, 4, 4, 3, 5, 3, 4, 4, 4],
        handicap: [3, 6, 5, 4, 7, 1, 9, 2, 8]
      },
      white: {
        par: [5, 4, 3, 5, 4, 4, 5, 3, 4],
        handicap: [8, 4, 2, 9, 7, 1, 5, 6, 3]
      },
      blue: {
        par: [4, 5, 4, 4, 5, 3, 4, 3, 4],
        handicap: [1, 8, 7, 4, 2, 9, 5, 6, 3]
      },
      gold: {
        par: [4, 4, 3, 4, 5, 5, 3, 4, 4],
        handicap: [3, 2, 5, 1, 7, 9, 8, 4, 6]
      }
    }

    console.log(course.name.toLowerCase());
    let courseInfo = courses[course.name.toLowerCase()];
    let scores = courseInfo.par;
    let i = 1;
    for(i = 1; i <= handicap + 4; i++) {
      let handicapIndex = i;
      if (i > 9) {
        handicapIndex = i % 9;
      }
      if (i % 9 == 0) {
        handicapIndex = 9;
      }
      let holeIndex = courseInfo.handicap.indexOf(handicapIndex);
      scores[holeIndex] += 1;
    }
    let sum = scores.reduce(function(m, s) {
      return m + s;
    }, 0);
    console.log(scores.join(" ") + " " + sum);
    return scores;
  }

  handleScoreUpdate(player, hole_index, event) {
    let oldRounds = this.state.rounds;
    let round = this.findRound(player);
    round.scores[hole_index] = event.target.value;
    oldRounds[oldRounds.indexOf(round)] = round;
    this.setState({rounds: oldRounds});
  }

  updateBlind(player, event) {
    let oldRounds = this.state.rounds;
    let round = this.findRound(player);
    round.blind = event.target.checked;
    if (round.blind) {
      round.scores = this.calculateBlindRound(this.state.course, player.handicap);
    }
    oldRounds[oldRounds.indexOf(round)] = round;
    this.setState({rounds: oldRounds});
  }

  render() {
    let headers = <tr>
      <th>Name</th>
      <th>Blind?</th>
      <th>Hole 1 ({this.state.course.hole_1_par})</th>
      <th>Hole 2 ({this.state.course.hole_2_par})</th>
      <th>Hole 3 ({this.state.course.hole_3_par})</th>
      <th>Hole 4 ({this.state.course.hole_4_par})</th>
      <th>Hole 5 ({this.state.course.hole_5_par})</th>
      <th>Hole 6 ({this.state.course.hole_6_par})</th>
      <th>Hole 7 ({this.state.course.hole_7_par})</th>
      <th>Hole 8 ({this.state.course.hole_8_par})</th>
      <th>Hole 9 ({this.state.course.hole_9_par})</th>
      <th>Total Score</th>
      <th>Handicap</th>
      <th>Net</th>
    </tr>;
    let players = this.state.players.map((player, i) => {
      let round = this.findRound(player);
      return <PlayerRow key={i} scores={round.scores} info={player} coursePar={this.calculatePar()} onScoreUpdate={this.handleScoreUpdate.bind(this)} onBlindUpdate={this.updateBlind.bind(this)} />;
    });
    return <div className="">
      <table className="table">
        <thead>
          {headers}
        </thead>
        <tbody>
        {players}
        </tbody>
      </table>
      <RoundSummary rounds={this.state.rounds}/>
    </div>;
  }
}

export default ScoreList;
