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
      scores: {}
    };
  }
  componentDidMount() {
    this.retrieveMatchups().then(json => {
      this.setState({players: json.players, course: json.course});
      console.log(this.state);
    });
  }

  retrieveMatchups() {
    return fetch("http://localhost:3001/seasons/2017/outings/8/player_information.json", {method: 'GET', mode: 'cors'})
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

  handleScoreUpdate(player, hole_index, event) {
    let oldState = this.state.scores;
    if (oldState[player.initials]) {
      oldState[player.initials]['holes'][hole_index] = event.target.value;
    } else {
      oldState[player.initials] = {holes: [], player: player};
      oldState[player.initials]['holes'][hole_index] = event.target.value;
    }
    this.setState({scores: oldState});
  }

  render() {
    let headers = <tr>
      <th></th>
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
      return <PlayerRow key={i} info={player} scores={this.state.scores[player.initials]} coursePar={this.calculatePar()} onScoreUpdate={this.handleScoreUpdate.bind(this)} />;
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
      <RoundSummary scores={this.state.scores} />
    </div>;
  }
}

export default ScoreList;
