import { NavLink, useNavigate } from 'react-router-dom';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';

export default function Header() {
  const navigate = useNavigate();
  const { setShowLogInModal, loggedIn, setLoggedIn } = useResponse();
  async function handleLogOut() {
    const response = await fetch(API_ROUTES.logOut, {
      withCredentials: true,
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setLoggedIn(false);
      navigate('/');
    } else {
      console.log(data.message);
    }
  }
  function notLoggedInHeader() {
    return (
      <>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/games"
        >
          GAMES
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/pricing"
        >
          PRICING
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/about"
        >
          ABOUT
        </NavLink>
        <button
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white tracking-wide"
          onClick={() => setShowLogInModal(true)}
        >
          LOG IN
        </button>
        <NavLink
          to="/sign-up"
          className="bg-[#4DE234] rounded-lg px-1 py-0.5 hover:scale-105 transform transition duration-250 font-saira_bold text-white"
        >
          SIGN-UP
        </NavLink>
      </>
    );
  }
  function loggedInHeader() {
    return (
      <>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/all-responses"
        >
          RESPONSES
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/games"
        >
          GAMES
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white tracking-wide"
          to="/profile"
        >
          PROFILE
        </NavLink>
        <button
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white tracking-wide"
          onClick={() => handleLogOut()}
        >
          LOG OUT
        </button>
      </>
    );
  }
  return (
    <div className="mx-8 my-3 rounded-lg px-10 py-2 bg-black bg-opacity-50 flex justify-between items-center text-xl tracking-wider">
      <NavLink
        to="/"
        className="hover:scale-105 transform transition duration-250 h-full font-saira_bold text-white"
      >
        STAT <span className="text-[#4DE234]">PICK</span> AI
      </NavLink>
      <div className="flex gap-6 font-saira items-center">
        {loggedIn ? loggedInHeader() : notLoggedInHeader()}
      </div>
    </div>
  );
}
