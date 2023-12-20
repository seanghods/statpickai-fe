import { useEffect, useState } from 'react';
import { AllGamesComp, AllResponses, Footer, Header } from '../components';
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
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        <div
          className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
          }}
        ></div>
        <Header />
        <div className="flex-1">
          <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="text-3xl m-4 text-center">Your Recent Picks</div>
            <AllResponses />
            <div className="text-3xl m-4 text-center mt-20">
              Today&apos;s Games
            </div>
            <AllGamesComp />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
