import { useEffect, useState } from 'react';
import slugify from 'slugify';

export default function GameInfo({ game }) {
  const examplePlayers = ['Tyrese Haliburton', 'Myles Turner', 'Buddy Hield'];
  const [playersHome, setplayersHome] = useState([]);
  const [playersAway, setplayersAway] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedStat, setSelectedStat] = useState();
  const [line, setLine] = useState();
  useEffect(() => {
    //fetch players for each team
  });
  const options = [];
  for (let i = 0.5; i <= 50; i += 0.5) {
    options.push({ value: i, label: i.toString() });
  }
  function handlePlayerClick(e) {
    selectedPlayer == e.target.id
      ? setSelectedPlayer(null)
      : setSelectedPlayer(e.target.id);
  }
  function handleStatClick(e) {
    selectedStat == e.target.id
      ? setSelectedStat(null)
      : setSelectedStat(e.target.id);
  }
  function handleAnalyze() {
    if (selectedPlayer && selectedStat && line) {
      confirm(`Please confirm your selections to analyze`);
    } else {
      alert('Please ensure you have selected a player, stat, and line.');
    }
  }
  return (
    <>
      <div className="game-area flex-1 mx-24 flex">
        <div className="AWAY flex-1 flex flex-col items-center gap-20">
          <div className="font-saira_bold text-2xl tracking-wide">
            {game.awayTeam}
          </div>
          <div className="players flex flex-col gap-8">
            {examplePlayers.map((player, index) => {
              return (
                <button
                  key={index}
                  id={slugify(player, { lower: true })}
                  onClick={e => handlePlayerClick(e)}
                  className={`font-saira_bold text-xl px-3 py-1 rounded-lg hover:bg-gray-300 text-center ${
                    selectedPlayer == slugify(player, { lower: true })
                      ? 'bg-gray-300'
                      : `bg-white`
                  }`}
                >
                  {player}
                </button>
              );
            })}
          </div>
        </div>
        <div className="STATS flex flex-col gap-5 mt-36 mb-12">
          <button
            id="points"
            onClick={e => {
              handleStatClick(e);
            }}
            className={`font-saira_bold text-2xl px-3 py-1 rounded-lg hover:bg-gray-300 ${
              selectedStat == 'points' ? 'bg-gray-300' : `bg-white`
            }`}
          >
            POINTS
          </button>
          <button
            id="rebounds"
            onClick={e => {
              handleStatClick(e);
            }}
            className={`font-saira_bold text-2xl px-3 py-1 rounded-lg hover:bg-gray-300 ${
              selectedStat == 'rebounds' ? 'bg-gray-300' : `bg-white`
            }`}
          >
            REBOUNDS
          </button>
          <button
            id="assists"
            onClick={e => {
              handleStatClick(e);
            }}
            className={`font-saira_bold text-2xl px-3 py-1 rounded-lg hover:bg-gray-300 ${
              selectedStat == 'assists' ? 'bg-gray-300' : `bg-white`
            }`}
          >
            ASSISTS
          </button>
          <button
            id="3pm"
            className="font-saira_bold text-2xl px-3 py-1 rounded-lg cursor-default"
          >
            3 POINT FG
          </button>
          <button
            id="steals"
            className="font-saira_bold text-2xl px-3 py-1 rounded-lg cursor-default"
          >
            STEALS
          </button>
          <button
            id="blocks"
            className="font-saira_bold text-2xl px-3 py-1 rounded-lg cursor-default"
          >
            BLOCKS
          </button>
          <button
            id="turnovers"
            className="font-saira_bold text-2xl px-3 py-1 rounded-lg cursor-default"
          >
            TURNOVERS
          </button>
        </div>
        <div className="HOME flex-1 flex flex-col items-center">
          <div className="font-saira_bold text-2xl tracking-wide">
            {game.homeTeam}
          </div>
        </div>
      </div>
      <div className="ANALYZE w-full flex justify-center mt-12 mb-12 flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center">
          <label className="font-saira_bold text-2xl">Line</label>
          <select
            name="line"
            id="line"
            value={line}
            onChange={e => setLine(e.target.value)}
            className="w-[100px] font-inter"
          >
            <option selected disabled>
              Select
            </option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          id="analyze"
          onClick={handleAnalyze}
          className={`font-saira_bold text-2xl px-3 py-1 rounded-lg hover:bg-gray-300 bg-white`}
        >
          ANALYZE
        </button>
      </div>
    </>
  );
}
