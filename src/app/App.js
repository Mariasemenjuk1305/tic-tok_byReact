import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sqrGame: Array(9).fill(null),
            index: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            firstMoveX: true,
            winner: '',
            howWinX: 0,
            howWinO: 0
        };
        this.winnerLine = [
            [
                0, 1, 2
            ],
            [
                3, 4, 5
            ],
            [
                6, 7, 8
            ],
            [
                0, 3, 6
            ],
            [
                1, 4, 7
            ],
            [
                2, 5, 8
            ],
            [
                0, 4, 8
            ],
            [2, 4, 6]
        ]
    }

    firstMoveX = () => {
        this.setState({firstMoveX: true});
    }

    firstMoveO = () => {
        this.setState({firstMoveX: false});
    }

    clearFild = () => {
        this.setState({
            sqrGame: Array(9).fill(null),
            firstMoveX: true,
            winner: ''
        });
        this.howManyTimeWasWin();
    }

    noWinner = () => {
        if (this.state.sqrGame.every(elem => elem != null)) {
            this.setState({winner: 'no one winner'});
        }
    }

    auditWinner = () => {
        let x = (this.state.firstMoveX)
            ? 'X'
            : 'O';
        for (let i = 0; i < this.winnerLine.length; i++) {
            let line = this.winnerLine[i];
            if (this.state.sqrGame[line[0]] === x && this.state.sqrGame[line[1]] === x && this.state.sqrGame[line[2]] === x) {
                this.setState({winner: x});
            }
        }
    }

    howManyTimeWasWin = () => {
        if (this.state.winner === 'X') {
            this.setState({
                howWinX: this.state.howWinX + 1
            })
        }
        if (this.state.winner === 'O') {
            this.setState({
                howWinO: this.state.howWinO + 1
            })
        };
    }

    clickGo = event => {
        if (this.state.winner.length === 0) {
            let data = event
                .target
                .getAttribute('data');
            let currentSqr = this.state.sqrGame;
            if (currentSqr[data] === null) {
                currentSqr[data] = (this.state.firstMoveX)
                    ? 'X'
                    : 'O';
                this.setState({sqrGame: currentSqr});
            } else {
                alert('Dont do it');
            }
        }
        (this.state.firstMoveX)
            ? this.setState({firstMoveX: false})
            : this.setState({firstMoveX: true});
        this.auditWinner();
        this.noWinner();

    };

    render() {
        return (
            <div className = "main">
                <div className="buttonField">
                    <button onClick={this.firstMoveX}>First X</button>
                    <button onClick={this.firstMoveO}>First O</button>
                </div>
                <div className="gameField">
                    {this
                        .state
                        .index
                        .map(elem => {
                            this.state.count++ 
                            return <div data={elem} className="Grid-box" onClick={this.clickGo} key={elem}>{this.state.sqrGame[elem]}</div>
                        })}
                </div>
                <div className = "resultField">
                    <div>Congratulations! Winner is
                        <b> {this.state.winner}</b>
                    </div>
                    <button onClick={this.clearFild}>New Game</button>
                    <div className="winCount">
                        <span>How times was winner X: {this.state.howWinX}</span>
                        <span>How times was winner O: {this.state.howWinO}</span>
                    </div>
                </div>
            </div>
        );

    };
}

export default App;
