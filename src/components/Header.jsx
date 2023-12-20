import { NavLink, useNavigate } from 'react-router-dom';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';
import MenuButtonX from './sub-components/MenuButton';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Header() {
  const navigate = useNavigate();
  const { setShowLogInModal, user, setUser } = useResponse();

  async function handleLogOut() {
    const response = await fetch(API_ROUTES.logOut, {
      withCredentials: true,
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setUser({ user: '' });
      navigate('/');
    } else {
      console.log(data.message);
    }
  }
  const [state, setState] = useState(false);
  const navUnlogged = [
    { title: 'Games', path: '/games' },
    { title: 'Pricing', path: '/pricing', class: 'hidden md:block' },
    { title: 'About', path: '/about', class: 'hidden md:block' },
  ];

  const navLogged = [
    { title: 'Games', path: '/games' },
    { title: 'Responses', path: '/all-responses', class: 'hidden md:block' },
    {
      title: user.username && user.username.toUpperCase(),
      path: '/profile',
      class: 'hidden md:block',
    },
  ];

  useEffect(() => {
    document.onclick = e => {
      const target = e.target;
      if (!target.closest('.menu-btn')) setState(false);
    };
  }, []);

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      {/* <NavLink
        to={user.username ? '/home' : '/'}
        className="hover:scale-105 transform transition duration-250 h-full font-saira_bold text-white text-sm md:text-lg"
      >
        STAT <span className="text-[#4DE234]">PICK</span> AI
      </NavLink> */}
      <NavLink to={user.username ? '/home' : '/'}>
        <img
          src={logo}
          alt="Stat Pick AI Logo"
          className="h-[50px] w-[130px]"
        />
      </NavLink>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-400 hover:text-gray-300"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
  return (
    <header>
      {/* <div className={`md:hidden ${state ? 'mx-2 pb-5' : 'hidden'}`}>
        <NavLink to={user.username ? '/home' : '/'}>
          <img
            src={logo}
            alt="Stat Pick AI Logo"
            className="h-[50px] w-[130px]"
          />
        </NavLink>
      </div> */}
      {/* <nav
        className={`pb-5 md:text-sm ${
          state
            ? 'absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent'
            : ''
        }`}
      > */}
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 flex md:px-8 py-5">
        <NavLink to={user.username ? '/home' : '/'}>
          <img
            src={logo}
            alt="Stat Pick AI Logo"
            className="h-[45px] md:h-[50px] w-[130px]"
          />
        </NavLink>
        {/* <div
            className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
              state ? 'block' : 'hidden'
            } `}
          > */}
        <ul className="flex-1 gap-2 md:gap-1 justify-end items-center flex md:space-x-6 md:space-y-0">
          {user.username ? (
            <>
              <div
                className="text-sm pr-4 md:text-base font-saira_bold text-white"
                to="/all-responses"
              >
                <span className="hidden md:inline-block">
                  TODAY&apos;S PICKS:
                </span>{' '}
                <span
                  className={`${
                    user.picksPerDay - user.picksUsed == 0
                      ? `text-red-200`
                      : 'text-green-200'
                  }`}
                >
                  {user.picksUsed
                    ? user.picksPerDay - user.picksUsed
                    : user.picksPerDay}
                </span>
                /{user.picksPerDay}
              </div>
              {navLogged.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-sm md:text-sm text-gray-300 hover:text-gray-400"
                  >
                    <NavLink to={item.path} className={item.class}>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
              <div className="md:hidden">
                <MenuButtonX handleLogOut={handleLogOut} />
              </div>
              <button
                className="hidden md:block transform transition duration-250 text-gray-300 hover:text-gray-400 text-xs md:text-sm"
                onClick={() => handleLogOut()}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {navUnlogged.map((item, idx) => {
                return (
                  <li key={idx} className="text-gray-300 hover:text-gray-400">
                    <NavLink to={item.path} className={item.class}>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}{' '}
              <div className="md:hidden">
                <MenuButtonX handleLogOut={handleLogOut} />
              </div>
              <button
                className="hidden md:block transform transition duration-250 text-gray-300 hover:text-gray-400 text-sm md:text-base"
                onClick={() => setShowLogInModal(true)}
              >
                Log In
              </button>
              <li>
                <NavLink
                  to="./sign-up"
                  className="flex w-[100px] md:w-auto text-xs items-center justify-center gap-x-0 md:gap-x-1 py-2 px-1 md:px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* </div> */}
      {/* // </nav> */}
    </header>
  );
}
