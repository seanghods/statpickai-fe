import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import { NavLink } from 'react-router-dom';
import { capitalize, showTime } from '../utils/helpers';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';

export default function UserHome() {
  const { user, setShowLogInModal } = useResponse();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function getGames() {
      const response = await fetch(API_ROUTES.games);
      const data = await response.json();
      setGames(data);
    }
    getGames();
  }, []);
  useEffect(() => {
    async function checkAuthenticationStatus() {
      setLoading(true);
      try {
        const response = await fetch(API_ROUTES.checkSession, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
      setLoading(false);
    }
    checkAuthenticationStatus();
  }, []);
  return (
    <>
      <div className="hero h-[400px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-5xl md:text-7xl text-center cursor-default">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            HOME
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-6">
        <div className="font-saira_bold uppercase text-3xl m-4">
          Your recent picks
        </div>
        <div className="responses w-full px-2 md:px-0 md:w-2/3 flex flex-col gap-2 font-bold">
          {user.username &&
            user.responses
              .sort((a, b) => {
                if (a.createdAt < b.createdAt) {
                  return 1; // For descending order, put 'b' before 'a'
                }
                if (a.createdAt > b.createdAt) {
                  return -1; // For descending order, put 'a' before 'b'
                }
                return 0; // 'a' and 'b' are equal
              })
              .map((response, index) => {
                return (
                  <NavLink
                    to={`../response/${response.dateOfGame}-${response._id}`}
                    state={{ response }}
                    className="flex gap-3 text-xs md:text-sm hover:bg-gray-400 shadow-sm shadow-gray-500 p-2 py-3 rounded-xl flex-1 justify-between text-left bg-white"
                    key={index}
                  >
                    <div className="md:w-[100px]">
                      {response.dateOfGame.slice(5)}
                    </div>
                    <div className="flex-1">{response.player}</div>
                    <div className="">
                      {response.playerTeam.split(' ').pop()}
                    </div>
                    <div className="md:w-[100px]">
                      {capitalize(response.stat)}
                    </div>
                    <div className="md:w-[75px]">{response.line}</div>
                    <div className="flex-1">
                      {response.opponentTeam.split(' ').pop()}
                    </div>
                  </NavLink>
                );
              })}
        </div>
        <div className="font-saira_bold uppercase text-3xl text-center">
          Today&apos;s Games
        </div>
        <div className="games flex-1 w-full px-2 md:px-0 md:w-2/3 flex flex-col gap-2 mb-10 md:mt-2">
          {games.map((game, index) => {
            return (
              <NavLink
                key={index}
                to={`/game/${game._id}`}
                state={{ game }}
                className="bg-white p-2 md:px-6 rounded-lg flex text-[10px] md:text-sm hover:bg-gray-300 shadow-sm shadow-gray-600 select-none font-bold"
              >
                <div className="w-1/4">
                  <div>
                    {game.awayTeam} (
                    {game.awayTeamWinOdds > 0
                      ? `+${game.awayTeamWinOdds}`
                      : game.awayTeamWinOdds}
                    )
                  </div>
                  <div className="hidden md:block text-center text-sm text-gray-700 pr-12">
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
                <div className="flex-1 md:pl-16 flex flex-col">
                  <div>
                    {game.homeTeam} (
                    {game.homeTeamWinOdds > 0
                      ? `+${game.homeTeamWinOdds}`
                      : game.homeTeamWinOdds}
                    ){' '}
                  </div>
                  <div>
                    {' '}
                    <div className="hidden md:block text-center text-sm pr-12 text-gray-700">
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
                <div className="w-1/6 justify-end flex items-center md:pr-4 text-gray-700">
                  {showTime(game.startTime)}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
