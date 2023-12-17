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
      <div className="game-area flex-1 mx-24 px-12 flex flex-col gap-6 mb-10 bg-gradient-to-r from-gray-200 via-gray-700 to-gray-200">
        {games.map((game, index) => {
          return (
            <NavLink
              key={index}
              to={`/game/${game._id}`}
              state={{ game }}
              className="bg-white p-2 px-6 rounded-md flex font-saira_bold text-lg hover:bg-gray-300 shadow-sm shadow-gray-600 select-none"
            >
              <div className="w-1/4">
                <div>
                  {game.awayTeam} (
                  {game.awayTeamWinOdds > 0
                    ? `+${game.awayTeamWinOdds}`
                    : game.awayTeamWinOdds}
                  )
                </div>
                <div className="text-center text-sm text-gray-700 pr-12">
                  {game.awayTeamWinOdds < game.homeTeamWinOdds ? '-' : '+'}
                  {Math.abs(game.teamSpread)} (
                  {game.awayTeamSpreadOdds > 0
                    ? `+${game.awayTeamSpreadOdds}`
                    : game.awayTeamSpreadOdds}
                  )
                </div>
              </div>
              <div className="px-3 text-center flex items-center text-blue-600">
                AT
              </div>
              <div className="flex-1 px-16 flex flex-col">
                <div>
                  {game.homeTeam} (
                  {game.homeTeamWinOdds > 0
                    ? `+${game.homeTeamWinOdds}`
                    : game.homeTeamWinOdds}
                  ){' '}
                </div>
                <div>
                  {' '}
                  <div className="text-center text-sm pr-12 text-gray-700">
                    {game.homeTeamWinOdds < game.awayTeamWinOdds ? '-' : '+'}
                    {Math.abs(game.teamSpread)} (
                    {game.homeTeamSpreadOdds > 0
                      ? `+${game.homeTeamSpreadOdds}`
                      : game.homeTeamSpreadOdds}
                    )
                  </div>
                </div>
              </div>
              <div className="w-1/6 text-gray-700 justify-center flex items-center">
                o/u {game.overUnder.toFixed(1)}
              </div>
              <div className="w-1/6 justify-end flex items-center pr-4 text-gray-700">
                {showTime(game.startTime)}
              </div>
            </NavLink>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
