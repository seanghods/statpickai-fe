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
      <div className="game-area flex-1 mx-24">
        {games.map((game, index) => {
          return (
            <NavLink
              key={index}
              to={`/game/${game._id}`}
              state={{ game }}
              className="bg-white p-3 rounded-lg flex justify-between font-saira_bold text-xl hover:bg-gray-100 shadow-md shadow-gray-300"
            >
              <div>{game.awayTeam.toUpperCase()}</div>
              <div>@</div>
              <div>{game.homeTeam.toUpperCase()}</div>
              <div>O/U - {game.overUnder}</div>
              <div>{game.startTime}</div>
            </NavLink>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
