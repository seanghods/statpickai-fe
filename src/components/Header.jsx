import { NavLink, useNavigate } from 'react-router-dom';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';
import MenuButtonX from './sub-components/MenuButton';

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
  function notLoggedInHeader() {
    return (
      <>
        <NavLink
          className="md:text-lg text-sm hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/games"
        >
          GAMES
        </NavLink>
        <MenuButtonX />
        <NavLink
          className="hidden md:block hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/pricing"
        >
          PRICING
        </NavLink>
        <NavLink
          className="hidden md:block hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/about"
        >
          ABOUT
        </NavLink>
        <button
          className="hover:scale-105 md:text-lg text-sm transform transition duration-250 font-saira_bold text-white tracking-wide"
          onClick={() => setShowLogInModal(true)}
        >
          LOG IN
        </button>
        <NavLink
          to="/sign-up"
          className="hidden md:block bg-[#4DE234] rounded-lg px-1 py-0.5 hover:scale-105 transform transition duration-250 font-saira_bold text-white"
        >
          SIGN-UP
        </NavLink>
      </>
    );
  }
  function loggedInHeader() {
    return (
      <>
        <div
          className="text-xs pr-4 md:text-lg hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/all-responses"
        >
          <span className="hidden md:inline-block">TODAY&apos;S PICKS:</span>{' '}
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
        <NavLink
          className="text-sm md:text-lg hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/games"
        >
          GAMES
        </NavLink>
        <MenuButtonX />
        <NavLink
          className="hidden md:block hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/all-responses"
        >
          RESPONSES
        </NavLink>
        <NavLink
          className="hidden md:block hover:scale-105 text-green-200 transform transition duration-250 font-saira_bold tracking-wide"
          to="/profile"
        >
          {user.username.toUpperCase()}
        </NavLink>
        <button
          className="text-sm md:text-base hover:scale-105 transform transition duration-250 font-saira_bold text-white tracking-wide"
          onClick={() => handleLogOut()}
        >
          LOG OUT
        </button>
      </>
    );
  }
  return (
    <div className="mx-8 my-3 rounded-lg px-3 md:px-10 py-2 bg-black bg-opacity-50 flex justify-between items-center text-xl tracking-wider">
      <NavLink
        to={user.username ? '/home' : '/'}
        className="hover:scale-105 transform transition duration-250 h-full font-saira_bold text-white text-sm md:text-lg"
      >
        STAT <span className="text-[#4DE234]">PICK</span> AI
      </NavLink>
      <div className="flex gap-1 md:gap-6 font-saira items-center">
        {user.username ? loggedInHeader() : notLoggedInHeader()}
      </div>
    </div>
  );
}
