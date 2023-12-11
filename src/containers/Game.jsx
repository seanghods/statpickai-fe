import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import { useLocation } from 'react-router-dom';

export default function Game() {
  const [playersHome, setplayersHome] = useState([]);
  const [playersAway, setplayersAway] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedStat, setSelectedStat] = useState();
  const location = useLocation();
  const { state } = location;
  const game = state.game;
  useEffect(() => {
    //fetch players for each team
  });
  function handleStatClick(e) {
    selectedStat == e.target.id
      ? setSelectedStat(null)
      : setSelectedStat(e.target.id);
  }
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-hoop-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            {game.awayTeam.toUpperCase().split(' ').slice(-1)}{' '}
            <span className="text-[#4DE234]">VS</span>{' '}
            {game.homeTeam.toUpperCase().split(' ').slice(-1)}
          </div>
        </div>
      </div>
      <div className="game-area flex-1 mx-24 flex">
        <div className="away flex-1 flex flex-col items-center font-saira_bold text-2xl">
          {game.awayTeam}
        </div>
        <div className="stat flex flex-col gap-5 mt-36 mb-12">
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
        <div className="home flex-1 flex flex-col items-center font-saira_bold text-2xl">
          {game.homeTeam}
        </div>
      </div>
      <div className="analyze w-full flex justify-center mt-12 mb-12">
        <button
          id="analyze"
          className={`font-saira_bold text-2xl px-3 py-1 rounded-lg hover:bg-gray-300 bg-white`}
        >
          ANALYZE
        </button>
      </div>
      <Footer />
    </>
  );
}
