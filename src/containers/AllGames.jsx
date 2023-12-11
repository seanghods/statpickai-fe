import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import { API_ROUTES } from '../utils/constants';
import { NavLink } from 'react-router-dom';

export default function Games() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function getGames() {
      const response = await fetch(API_ROUTES.games);
      const data = await response.json();
      console.log(data);
      setGames(data);
    }
    getGames();
  }, []);
  function showTime(iso) {
    const obj = new Date(iso);
    return obj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-score-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            TODAY&apos;S <span className="text-[#4DE234]">GAMES</span>
          </div>
        </div>
      </div>
      <div className="game-area flex-1 mx-24 px-12 flex flex-col gap-6 mb-10">
        {games.map((game, index) => {
          return (
            <NavLink
              key={index}
              to={`/game/${game._id}`}
              state={{ game }}
              className="bg-white p-3 px-6 rounded-md flex font-saira_bold text-lg hover:bg-gray-100 shadow-md shadow-gray-400 select-none"
            >
              <div className="w-1/4">
                {game.awayTeam} (
                {game.awayTeamWinOdds > 0
                  ? `+${game.awayTeamWinOdds}`
                  : game.awayTeamWinOdds}
                )
              </div>
              <div className="px-3 text-center">@</div>
              <div className="flex-1 px-16">
                {game.homeTeam} (
                {game.homeTeamWinOdds > 0
                  ? `+${game.homeTeamWinOdds}`
                  : game.homeTeamWinOdds}
                ){' '}
              </div>
              <div className="w-1/6">Over/Under {game.overUnder}</div>
              <div className="w-1/6 text-right">{showTime(game.startTime)}</div>
            </NavLink>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
