import { Footer, Header } from '../components';
import useResponse from '../context/useResponse';
import { NavLink } from 'react-router-dom';
import { capitalize } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import { LoadingIcon } from '../components/sub-components/Icons';

export default function ResponseList() {
  const { user, setShowLogInModal } = useResponse();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
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
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-3xl md:text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            RESPONSES
          </div>
        </div>
      </div>
      <div className="flex-1 flex mt-10 w-full mb-12 flex-col items-center text-center ">
        {user.username ? (
          <div className="flex flex-col font-inter_bold text-base gap-4 w-full px-2 md:px-0 md:w-4/5">
            {loading ? (
              <div className="flex justify-center w-full">
                <LoadingIcon />
              </div>
            ) : loggedIn && user.responses.length == 0 ? (
              <div>
                All your past analysis is listed here. Choose a player and line
                to analyze in{' '}
                <NavLink className="text-blue-700 font-bold" to="/games">
                  Today&apos;s Games
                </NavLink>{' '}
                to start your list!
              </div>
            ) : (
              <>
                <div className="flex gap-3 text-sm mb-3 justify-between text-left">
                  <div className="md:w-[100px] pl-8">Date</div>
                  <div className="w-[75px] md:w-[150px]">Player</div>
                  <div className="w-[50px] md:w-[220px]">Team</div>
                  <div className="md:w-[100px]">Stat</div>
                  <div className="md:w-[75px]">Line</div>
                  <div className="flex-1">Opponent</div>
                </div>
                {user.responses
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
                        <div className="pl-5 md:w-[100px]">
                          {response.dateOfGame.slice(5)}
                        </div>
                        <div className="w-[100px]">{response.player}</div>
                        <div className="md:hidden">
                          {response.playerTeam.split(' ').pop()}
                        </div>
                        <div className="hidden md:block w-[250px] pl-12">
                          {response.playerTeam}
                        </div>
                        <div className="md:w-[100px]">
                          {capitalize(response.stat)}
                        </div>
                        <div className="md:w-[75px]">{response.line}</div>
                        <div className="md:hidden flex-1">
                          {response.opponentTeam.split(' ').pop()}
                        </div>
                        <div className="hidden md:block flex-1">
                          {response.opponentTeam}
                        </div>
                      </NavLink>
                    );
                  })}
              </>
            )}
          </div>
        ) : (
          <div className="w-1/3">
            <div className="font-saira_bold ">
              Please log in to view your account&apos;s responses.
            </div>
            <button
              onClick={() => setShowLogInModal(true)}
              className="bg-gray-300 font-saira_bold px-3 py-1 rounded-lg font-bold text-indigo-500"
            >
              Log In
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
